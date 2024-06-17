"use server";

import { getCourseById, getUserProgress } from "@/../db/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { userProgress } from "@/../db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DBConn from "@/../db/drizzle";

export const upsertUserProgress = async (courseId: number) => {

    const { userId } = auth();
    const activeUser = await currentUser();

    if (!activeUser || !userId) {
        throw new Error("No user found");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    /*Todo: Enable once units and lessons are added */
    // if(!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course not found");
    // }

    const existingProgress = await getUserProgress();

    if (existingProgress) {
        await DBConn().update(userProgress).set({
            activeCourseId: course.id,
            userName: activeUser.fullName || "User",
            imageSrc: activeUser.imageUrl || "/mascot.svg",
        })

        Revalidate();
    }

    await DBConn().insert(userProgress).values({
        userId,
        activeCourseId: course.id,
        userName: activeUser.fullName || "User",
        imageSrc: activeUser.imageUrl || "/mascot.svg",
    });

    Revalidate();
}

function Revalidate() {
    revalidatePath("/learn");
    revalidatePath("/courses");
    redirect("/learn");
}