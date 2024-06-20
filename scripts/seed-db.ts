import "dotenv/config";
import DConn from "@/../db/drizzle";
import { courses, lessons, units, challenges, challengeOptions, challengeProgress } from "@/../db/schema";

async function seedDb() {
    
    // Seeding Courses
    console.log("Seeding Courses...");
    await DConn().insert(courses).values([
        {
            id: 1,
            title: "Spanish",
            imageSrc: "/es.svg"
        },
        {
            id: 2,
            title: "French",
            imageSrc: "/fr.svg"
        },
        {
            id: 3,
            title: "Italian",
            imageSrc: "/it.svg"
        },
        {
            id: 4,
            title: "Croatian",
            imageSrc: "/hr.svg"
        },
    ]).catch((e) => console.error("Failed to seed courses: ", e.message));

    // Seeding Units
    console.log("Seeding units...");
    await DConn().insert(units).values([
        {
            id: 1,
            title: "Unit 1",
            description: "Learn the basics of Spanish",
            courseId: 1,
            order: 1
        },
        {
            id: 2,
            title: "Unit 2",
            description: "Learn the basics of French",
            courseId: 2,
            order: 2
        },
        {
            id: 3,
            title: "Unit 3",
            description: "Learn the basics of Italian",
            courseId: 3,
            order: 3
        },
        {
            id: 4,
            title: "Unit 4",
            description: "Learn the basics of Croatian",
            courseId: 4,
            order: 4
        }
    ]).catch((e) => console.error("Failed to seed units: ", e.message));

    // Seeding Lessons
    console.log("Seeding lessons...");
    await DConn().insert(lessons).values([
        {
            id: 1,
            title: "Nouns",
            unitId: 1,
            order: 1
        }, {
            id: 2,
            title: "Verbs",
            unitId: 1,
            order: 2
        }, {
            id: 3,
            title: "Nouns",
            unitId: 2,
            order: 1
        }, {
            id: 4,
            title: "Verbs",
            unitId: 2,
            order: 2
        }, {
            id: 5,
            title: "Nouns",
            unitId: 3,
            order: 1
        }, {
            id: 6,
            title: "Verbs",
            unitId: 3,
            order: 2
        }, {
            id: 7,
            title: "Nouns",
            unitId: 4,
            order: 1
        }, {
            id: 8,
            title: "Verbs",
            unitId: 4,
            order: 2
        }
    ]).catch((e) => console.error("Failed to seed lessons: ", e.message));


    // Seeding Challenges
    console.log("Seeding challenges...");
    await DConn().insert(challenges).values([
        {
            id: 1,
            lessonId: 1,
            type: "SELECT",
            order: 1,
            question: "Which one of these is a 'man'?",
        }, {
            id: 2,
            lessonId: 2,
            type: "ASSIST",
            order: 2,
            question: "What is the plural of 'man'?",
        }, {
            id: 3,
            lessonId: 3,
            type: "SELECT",
            order: 1,
            question: "Which one of these is a 'man'?",

        // }, {
        //     id: 4,
        //     lessonId: 4,
        //     type: "ASSIST",
        //     order: 2,
        //     question: "What is the plural of 'man'?",
        // }, {
        //     id: 5,
        //     lessonId: 5,
        //     type: "SELECT",
        //     order: 1,
        //     question: "Which one of these is a 'man'?",
        // }, {
        //     id: 6,
        //     lessonId: 6,
        //     type: "ASSIST",
        //     order: 2,
        //     question: "What is the plural of 'man'?",
        // }, {
        //     id: 7,
        //     lessonId: 7,
        //     type: "SELECT",
        //     order: 1,
        //     question: "Which one of these is a 'man'?",
        // }, {
        //     id: 8,
        //     lessonId: 8,
        //     type: "ASSIST",
        //     order: 2,
        //     question: "What is the plural of 'man'?",
        }   
    ]).catch((e) => console.error("Failed to seed challenges: ", e.message));


    // Seeding Challenge Options
    console.log("Seeding challengeOptions...");
    await DConn().insert(challengeOptions).values([
        {
            id: 1,
            challengeId: 1,
            imageSrc: "/man.svg",
            correct: true,
            text: "El hombre",
            audioSrc: "/es_man.mp3",
        }, {
            id: 2, 
            challengeId: 1,
            imageSrc: "/woman.svg",
            correct: false,
            text: "La mujer",
            audioSrc: "/es_woman.mp3",
        }, {
            id: 3,
            challengeId: 1,
            imageSrc: "/robot.svg",
            correct: false,
            text: "el robot",
            audioSrc: "/es_robot.mp3",
        }
    ]).catch((e) => console.error("Failed to seed challengeOptions: ", e.message));
}

seedDb();
// seedCourse();
// seedUnits();
// seedLessons();
// seedChallenges();
// seedChallengeOptions();