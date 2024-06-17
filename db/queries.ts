import { cache } from "react";
import DBConn from "./drizzle";
import { auth, } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses, userProgress } from "./schema";


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
    console.log("UserID:", userId);

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