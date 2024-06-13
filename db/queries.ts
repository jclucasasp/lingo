import { cache } from "react";
import DBConn from "./drizzle";
import { auth, } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { progress } from "./schema";


export const getCourses = cache(async () => {
    return await DBConn().query.course.findMany();
});

export const getUserProgress = cache(async () => {
    const { userId } = auth();
    console.log("UserID:", userId);
    
    if (!userId) {
        return null;
    }

    /*Todo: replace 0 with parseInteger(userId) */
    
    return await DBConn().query.progress.findFirst({
        where: eq(progress.userId, 0),
        with: {
            activeCourse: true,
        }
    });
});