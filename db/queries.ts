import { challengeProgress, challenges, courses, lessons, units, userProgress, userSubscription } from "@/../db/schema";
import { cache } from "react";
import { DAY_IN_MS } from "@/lib/constants";
import { auth, } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import DBConn from "@/../db/drizzle";

export const getCourses = cache(async () => {
    return await DBConn().query.courses.findMany();
});

export const getCourseById = (async (id: number) => {
    return await DBConn().query.courses.findFirst({
        where: eq(courses.id, id),
        with: {
            units: {
                orderBy: (units, { asc }) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, { asc }) => [asc(lessons.order)],
                    }
                }
            }
        }
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
        orderBy: (units, { asc })=> [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourse!.id),
        with: {
            lessons: {
                orderBy: (lessons, { asc })=> [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, { asc })=> [(asc(challenges.order))],
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            }
                        }
                    }
                }
            }
        }
    }).catch((err) => console.error(err));

    if (!unitsData) {
        return [];
    }
    // Todo: if the program brakes, change .filter to .every
    return unitsData.map((unit) => ({
        ...unit,
        lessons: unit.lessons.map((lesson) => ({
            ...lesson, 
            completed: lesson.challenges.every((challenge) => {
                challenge.challengeProgress?.filter((progress) => {
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
    }).catch((err) => console.error(err));

    if (!activeCourseUnits) {
        return null;
    }

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
    console.info("Incoming search for lesson using getLesson() from queries...");

    const { userId } = auth();
    if (!userId) {
        console.error("No user found...");
        return null;
    }

    const courseProgress = await getCourseProgress();

    if(!courseProgress || !courseProgress.activeLesson) {
        console.error("No courseprogress...");
        return null;
    }

    const lessonId = id || courseProgress.activeLessonId;

    if (!lessonId) {
        return null;
    }

    const lessonData = await DBConn().query.lessons.findFirst({
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
    }).catch((err) => console.error(err));

    if (!lessonData) {
        console.error("Unable to find lesson...");
        return null;
    }

    const normalisedChallenges = lessonData.challenges.map((challenge) => {
        const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed);
        return { ...challenge, completed };
    });

    return {
        ...lessonData, challenges: normalisedChallenges
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

export const getUserSubscription = cache(async () => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }

    const subscriptionData = await DBConn().query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId),
    }).catch((err) => console.error(err));
    
    if (!subscriptionData) {
        return null;
    }

    const isActive = subscriptionData.stripePriceId && (subscriptionData.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS) > Date.now();

    return { ...subscriptionData, isActive };

});

export const getTopTenUsers = cache(async() => {
    const { userId } = auth();
    if (!userId) return [];

    return await DBConn().query.userProgress.findMany({
        orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        }
    })
});