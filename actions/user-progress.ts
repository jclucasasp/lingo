"use server";
import { getCourseById, getUserProgress, getUserSubscription } from "@/../db/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { challengeProgress, challenges, userProgress } from "@/../db/schema";
import { Revalidate } from "@/lib/utils";
import DBConn from "@/../db/drizzle";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { POINTS_TO_REFILL } from "@/lib/constants";

export const upsertUserProgress = async (courseId: number) => {
    console.log("\nUpserting user progress for course: ", courseId);
    const { userId } = auth();
    const activeUser = await currentUser();

    if (!activeUser || !userId) {
        throw new Error("No user found");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if(!course.units.length || !course.units[0].lessons.length) {
        throw new Error("Course not found");
    }

    const existingProgress = await getUserProgress();

    if (existingProgress) {
        await DBConn().update(userProgress).set({
            activeCourseId: course.id,
            userName: activeUser.fullName || "User",
            userImageSrc: activeUser.imageUrl || "/mascot.svg",
        }).catch((err) => console.error(err));
    } else {
        await DBConn().insert(userProgress).values({
            userId,
            activeCourseId: course.id,
            userName: activeUser.fullName || "User",
            userImageSrc: activeUser.imageUrl || "/mascot.svg",
        }).catch((err) => console.error(err));
    }

    Revalidate(["/learn", "/courses"]);
    redirect("/learn");
}
// Todo: When you click to start a course and have not gotten any challenges correct, then there are no data in challenge_progress and when you get an incorrect answer, the program brakes. Fix is to populate challenge_progress as soon as you click on a language.
export const reduceHearts = async (challengeId: number) => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("No user found");
    }

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();

    if (!currentUserProgress) {
        throw new Error("No user progress found");
    }

    const challenge = await DBConn().query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    }).catch((err) => console.error("Unable to find challenge: ", err.message));

    if (!challenge) {
        throw new Error("No challenge found");
    }

    const existingUserProgress = await DBConn().query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        ),
    }).catch((err) => console.error("Unable to find existingUserProgress: ", err.message));

    if (!!existingUserProgress) {
        return { message: "practise" }
    }

    if (!currentUserProgress) {
        throw new Error("No user progress found");
    }

    if (userSubscription?.isActive) {
        return { error: "subscription" };
    }

        if (!currentUserProgress.hearts || currentUserProgress.hearts === 0) {
        return { error: "hearts" }
    }

    await DBConn().update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId))
        .catch((err) => console.error("Unable to update users hearts: ", err.message))
        .then(() => console.log("User hearts decreased"));

    Revalidate(["/learn", "/quests", "/shop", "/leaderboard", `/lesson/${challenge.lessonId}`]);
}

export const refillHearts = async ()=> {
    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) {
        throw new Error("No user progress found");
    }
    
    if (currentUserProgress.hearts === 5) {
        throw new Error("User already has max hearts");
    }

    if (currentUserProgress.points < POINTS_TO_REFILL) {
        throw new Error("Not enough points");
    }

    await DBConn().update(userProgress).set({
        hearts: 5,
        points: Math.max(currentUserProgress.points - POINTS_TO_REFILL, 0),
    }).where(eq(userProgress.userId, currentUserProgress.userId))
    .catch((err) => console.error("Unable to update users hearts: ", err.message))
    .then(() => console.log("User hearts increased"))
    
    Revalidate(["/learn", "/quests", "/shop", "/leaderboard", "/lesson"]);
}