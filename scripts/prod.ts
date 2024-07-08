import "dotenv/config";
import DBConn from "@/../db/drizzle";
import * as schema from "@/../db/schema";

async function main() {
    console.log("Dropping DB...");
    await Promise.all([
        DBConn().delete(schema.userProgress),
        DBConn().delete(schema.challenges),
        DBConn().delete(schema.units),
        DBConn().delete(schema.lessons),
        DBConn().delete(schema.courses),
        DBConn().delete(schema.challengeOptions),
        // DBConn().delete(schema.userSubscription),
      ]).catch((err) => console.error(err)).finally(()=> console.log("Finished dropping DB"));
    console.log("Seeding DB...");

    const courses = await DBConn().insert(schema.courses).values([
        {
            id: 1,
            title: "Spanish",
            imageSrc: "/es.svg",
        },
        {
            id: 2,
            title: "Italian",
            imageSrc: "/it.svg",
        },
        {
            id: 3,
            title: "French",
            imageSrc: "/fr.svg",
        },
        {
            id: 4,
            title: "Croatian",
            imageSrc: "/hr.svg",
        }
    ]).returning().catch((err) => console.error(err)).finally(()=> console.log("Finished inserting courses"));

    if (!courses) return;

    for (let course of courses) {
        const units = await DBConn().insert(schema.units).values([
            {
                courseId: course.id, // Spanish
                title: `Unit ${course.id}`,
                description: `Learn the basics of ${course.title}`,
                order: course.id
            }
        ]).returning().catch((err) => console.error(err)).finally(()=> console.log("Finished inserting units[", course.id, "]"));

        if (!units) return;

        for (let i=0; i < units.length; i++) {
            const unit = units[i];
            const lessons = await DBConn().insert(schema.lessons).values([
                { unitId: unit.id, title: "Nouns", order: i },
                { unitId: unit.id, title: "Verbs", order: i },
                { unitId: unit.id, title: "Adjectives", order: i },
                { unitId: unit.id, title: "Phrases", order: i },
                { unitId: unit.id, title: "Sentences", order: i },
            ]).returning().catch((err) => console.error(err));

            if (!lessons) return;

            for (const lesson of lessons) {
                const challenges = await DBConn().insert(schema.challenges).values([
                    { lessonId: lesson.id, type: "SELECT", question: "Which of these is a man?", order: 1 },
                    { lessonId: lesson.id, type: "SELECT", question: "Which of these is a woman?", order: 2 },
                    { lessonId: lesson.id, type: "SELECT", question: "Which of these is a boy?", order: 3 },
                    { lessonId: lesson.id, type: "ASSIST", question: "A man?", order: 4 },
                    { lessonId: lesson.id, type: "SELECT", question: "Which of these is a zombie?", order: 5 },
                    { lessonId: lesson.id, type: "SELECT", question: "Which of these is a robot?", order: 6 },
                    { lessonId: lesson.id, type: "SELECT", question: "Which of these is a girl?", order: 7 },
                    { lessonId: lesson.id, type: "ASSIST", question: "A zombie?", order: 8 },
                ]).returning().catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenges[", i,"]"));

                if (!challenges) return;

                for (const challenge of challenges) {
                    if (challenge.order == 1) {
                        await DBConn().insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el hombre",
                                imageSrc: "/man.svg",
                                audioSrc: "/es_man.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer",
                                imageSrc: "/woman.svg",
                                audioSrc: "/es_woman.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el chico",
                                imageSrc: "/boy.svg",
                                audioSrc: "/es_boy.mp3",
                            },
                        ]).catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenge options[", i, "]"));
                    }

                    if (challenge.order === 2) {
                        await DBConn().insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "la mujer",
                                imageSrc: "/woman.svg",
                                audioSrc: "/es_woman.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el chico",
                                imageSrc: "/boy.svg",
                                audioSrc: "/es_boy.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el hombre",
                                imageSrc: "/man.svg",
                                audioSrc: "/es_man.mp3",
                            },
                        ]).catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenge options[", i, "]"));
                    }

                    if (challenge.order === 3) {
                        await DBConn().insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer",
                                imageSrc: "/woman.svg",
                                audioSrc: "/es_woman.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el hombre",
                                imageSrc: "/man.svg",
                                audioSrc: "/es_man.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el chico",
                                imageSrc: "/boy.svg",
                                audioSrc: "/es_boy.mp3",
                            },
                        ]).catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenge options[", i, "]"));
                    }

                    if (challenge.order === 4) {
                        await DBConn().insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer",
                                audioSrc: "/es_woman.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el hombre",
                                audioSrc: "/es_man.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el chico",
                                audioSrc: "/es_boy.mp3",
                            },
                        ]).catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenge options[", i, "]"));
                    }

                    if (challenge.order === 5) {
                        await DBConn().insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el hombre",
                                imageSrc: "/man.svg",
                                audioSrc: "/es_man.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer",
                                imageSrc: "/woman.svg",
                                audioSrc: "/es_woman.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el zombie",
                                imageSrc: "/zombie.svg",
                                audioSrc: "/es_zombie.mp3",
                            },
                        ]).catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenge options[", i, "]"));
                    }

                    if (challenge.order === 6) {
                        await DBConn().insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el robot",
                                imageSrc: "/robot.svg",
                                audioSrc: "/es_robot.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el zombie",
                                imageSrc: "/zombie.svg",
                                audioSrc: "/es_zombie.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el chico",
                                imageSrc: "/boy.svg",
                                audioSrc: "/es_boy.mp3",
                            },
                        ]).catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenge options[", i, "]"));
                    }

                    if (challenge.order === 7) {
                        await DBConn().insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "la nina",
                                imageSrc: "/girl.svg",
                                audioSrc: "/es_girl.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el zombie",
                                imageSrc: "/zombie.svg",
                                audioSrc: "/es_zombie.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el hombre",
                                imageSrc: "/man.svg",
                                audioSrc: "/es_man.mp3",
                            },
                        ]).catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenge options[", i, "]"));
                    }

                    if (challenge.order === 8) {
                        await DBConn().insert(schema.challengeOptions).values([
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "la mujer",
                                audioSrc: "/es_woman.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: true,
                                text: "el zombie",
                                audioSrc: "/es_zombie.mp3",
                            },
                            {
                                challengeId: challenge.id,
                                correct: false,
                                text: "el chico",
                                audioSrc: "/es_boy.mp3",
                            },
                        ]).catch((err) => console.error(err)).finally(()=> console.log("Finished inserting challenge options[", i, "]"));
                    }
                }
            }
        }
    }
    console.log("Finished inserting challenges");
}

main();