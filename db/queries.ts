import { cache } from "react";
import DBConn from "./drizzle";
import { auth, } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { challengeProgress, courses, lessons, units, userProgress } from "./schema";


export const getCourses = cache(async () => {
    return await DBConn().query.courses.findMany();
});

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
        where: eq(units.courseId, userProgress.activeCourse!.id),
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
                    progress.completed
                })
            })
        })),
    }));
});

export const getCourseProgress = cache(async () => {
    const { userId } = auth();
    const userProgress = await getUserProgress();
    if (!userId || !userProgress?.activeCourseId) {
        return null;
    }

    const activeCourseUnits = await DBConn().query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
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

    const firstUncompletedLesson = activeCourseUnits
        .flatMap((unit) => unit.lessons).find((lesson) => {
            return lesson.challenges.some((challenge) => {
                return !challenge.challengeProgress || challenge.challengeProgress.length == 0 ||
                    challenge.challengeProgress.some((progress) => progress.completed === false);
            });
        });

    return { activeLesson: firstUncompletedLesson, activeLessonId: firstUncompletedLesson?.id };
});

export const getLesson = cache(async (id?: number) => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }

    const courseProgress = await getCourseProgress();
    const lessonId = id || courseProgress?.activeLesson?.id;

    if (!lessonId) {
        return null;
    }

    const data = await DBConn().query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    }
                }
            }
        }
    });

    const normalisedChallenges = data?.challenges.map((challenge) => {
        const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed);
        return { ...challenge, completed };
    });

    return {
        ...data, challenges: normalisedChallenges
    }
});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();
    if (!courseProgress || !courseProgress.activeLessonId) {
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId);
    if (!lesson) {
        return 0;
    }

    const completedChallenges = lesson.challenges?.filter((challenge) => challenge.completed);
    if (!completedChallenges || completedChallenges.length === 0) {
        return 0;
    }

    return Math.round((completedChallenges.length / lesson.challenges!.length) * 100);
});