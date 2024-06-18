import "dotenv/config";
import DConn from "@/../db/drizzle";
import { courses } from "@/../db/schema";

async function seedCourse() {
    await DConn().insert(courses).values([
        {
            title: "Spanish",
            imageSrc: "/es.svg"
        },
        {
            title: "French",
            imageSrc: "/fr.svg"
        },
        {
            title: "Italian",
            imageSrc: "/it.svg"
        },
        {
            title: "Croatian",
            imageSrc: "/hr.svg"
        },
    ]).catch((e) => console.error("Failed to seed courses: ", e.message));

    console.log("Seeded courses");
}

seedCourse();