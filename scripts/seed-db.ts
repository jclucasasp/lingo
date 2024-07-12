import "dotenv/config";
import DConn from "@/../db/drizzle";
import { courses, lessons, units, challenges, challengeOptions, challengeProgress } from "@/../db/schema";

async function seedDb() {

  await DConn().batch([
    // Seeding Courses
    DConn().insert(courses).values([
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
      },
    ]),
    // Seeding Units  
    DConn().insert(units).values([
      {
        id: 1,
        courseId: 1, // Spanish
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      }
    ]),
    // Seeding Lessons
    DConn().insert(lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 3,
        title: "Adjetives",
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 4,
        title: "Phrases",
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 5,
        title: "Sentences",
      },

    ]),
    // Seeding Challenges
    DConn().insert(challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "a man"?',
      },

      {
        id: 2,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: '"a man"',
      },

      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "a robot"?',
      },

      {
        id: 4,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "a boy"?',
      },
      {
        id: 5,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 2,
        question: 'Which one of these is "a girl"?',
      },
      {
        id: 6,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 3,
        question: '"a boy"',
      },
    ]),
    // Seeding Challenge Options
    DConn().insert(challengeOptions).values([
      // Which one of these is "a man"?
      {
        challengeId: 1,
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      // "a man"?
      {
        challengeId: 2,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      // Which one of these is the "a robot"?
      {
        challengeId: 3,
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      // Which one of these is "a boy"?
      {
        challengeId: 4,
        imageSrc: "/boy.svg",
        correct: true,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 4,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 4,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      // Which one of these is "a girl"?
      {
        challengeId: 5,
        imageSrc: "/girl.svg",
        correct: true,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 5,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombie",
        audioSrc: "/es_zombie.mp3",
      },
      {
        challengeId: 5,
        imageSrc: "/boy.svg",
        correct: false,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      //  "a boy"?
      {
        challengeId: 6,
        imageSrc: "/boy.svg",
        correct: true,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 6,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 6,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombie",
        audioSrc: "/es_zombie.mp3",
      },
    ])
  ]).catch((err) => {
    console.log("Unable to seed db:", err);
  }).finally(() => {
    console.log("Seeding complete");
  });
}

seedDb();