"use server";
import { auth } from "@clerk/nextjs/server";
import { getUserProgress } from "@/../db/queries";
import { challengeProgress, challenges, userProgress } from "@/../db/schema";
import { and, eq } from "drizzle-orm";
import { Revalidate } from "@/lib/utils";
import DBConn from "@/../db/drizzle";

export async function upsertChallengeProgress(challengeId: number) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("No user found");
    }

    const currentUserProgress = await getUserProgress();
    // Todo: Handle subscription query here

    if (!currentUserProgress) {
        throw new Error("No user progress found");
    }

    const challenge = await DBConn().query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if (!challenge) {
        throw new Error("No challenge found");
    }

    const existingProgress = await DBConn().query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        ),
    });

    const isPractise = existingProgress?.completed;

    if (currentUserProgress.hearts == 0 && !isPractise) {
        return { error: "hearts" };
    }

    if (isPractise) {
        console.log("Practise session, increasing hearts...");
        await DBConn().batch([
            DBConn().update(challengeProgress).set({
                completed: true,
            }).where(eq(challengeProgress.id, existingProgress.id)),

            DBConn().update(userProgress).set({
                hearts: Math.min(currentUserProgress.hearts + 1, 5),
                points: currentUserProgress.points + 10,
            }).where(eq(userProgress.userId, userId)),
        ]).catch((err) => console.error(err))
        .finally(()=> console.log("Hearts increased and challenge set to completed"))

        Revalidate(["/learn", "/courses", "/quests", "/leaderboard", `/lesson/${challenge.lessonId}`]);
        return;
    }

    await DBConn().batch([
        DBConn().insert(challengeProgress).values({
            challengeId,
            userId,
            completed: true,
        }),

        DBConn().update(userProgress).set({
            points: currentUserProgress.points + 10,
        }).where(eq(userProgress.userId, userId))
    ]).catch((err) => console.error(err));

    Revalidate(["/learn", "/courses", "/quests", "/leaderboard", `/lesson/${challenge.lessonId}`]);
}