import { cache } from "react";
import DBConn from "./drizzle";
import { auth, } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challengeProgress, courses, units, userProgress } from "./schema";


export const getCourses = cache(async () => {
    return await DBConn().query.courses.findMany();
});

/* Todo: Populate units and lessons once implemented */
export const getCourseById = (async (id: number) => {
    return await DBConn().query.courses.findFirst({
        where: eq(courses.id, id),
    });
});

export const getUserProgress = cache(async () => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    return await DBConn().query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        }
    });
});

export const getUnits = cache(async () => {
    const { userId } = auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }

    const unitsData = await DBConn().query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            }
                        }
                    }
                }
            }
        }
    });

    return unitsData.map((unit) => ({
        ...unit,
        lessons: unit.lessons.map((lesson) => ({
            ...lesson,
            completed: lesson.challenges.every((challenge) => {
                challenge.challengeProgress?.every((progress) => { 
                    progress.completed})
            })
        })),
    }));
});