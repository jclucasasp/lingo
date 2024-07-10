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
        question: 'Which one of these is the "a man"?',
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
        question: 'Which one of these is the "a robot"?',
      },
      {
        id: 4,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 5,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 6,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
    ]),
    // Seeding Challenge Options
    DConn().insert(challengeOptions).values([
      {
        challengeId: 1, // Which one of these is "a man"?
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
      {
        challengeId: 2, // "a man"?
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
      {
        challengeId: 3, // Which one of these is the "a robot"?
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
      
    ])
  ]).catch((err) => {
    console.log("Unable to seed db:", err);
  }).finally(() => {
    console.log("Seeding complete");
  });

  // // Seeding Courses
  // console.log("Seeding Courses...");
  // await DConn().insert(courses).values([
  //   {
  //     id: 1,
  //     title: "Spanish",
  //     imageSrc: "/es.svg",
  //   },
  //   {
  //     id: 2,
  //     title: "Italian",
  //     imageSrc: "/it.svg",
  //   },
  //   {
  //     id: 3,
  //     title: "French",
  //     imageSrc: "/fr.svg",
  //   },
  //   {
  //     id: 4,
  //     title: "Croatian",
  //     imageSrc: "/hr.svg",
  //   },
  // ]).catch((err) => {
  //   console.log("Unable to seed courses", err);
  // });

  // Seeding Units  
  // console.log("Seeding Units...");
  // await DConn().insert(units).values([
  //   {
  //     id: 1,
  //     courseId: 1, // Spanish
  //     title: "Unit 1",
  //     description: "Learn the basics of Spanish",
  //     order: 1,
  //   }
  // ]);

  // // Seeding Lessons
  // await DConn().insert(lessons).values([
  //   {
  //     id: 1,
  //     unitId: 1, // Unit 1 (Learn the basics...)
  //     order: 1,
  //     title: "Nouns",
  //   },
  //   {
  //     id: 2,
  //     unitId: 1, // Unit 1 (Learn the basics...)
  //     order: 2,
  //     title: "Verbs",
  //   },
  //   {
  //     id: 3,
  //     unitId: 1, // Unit 1 (Learn the basics...)
  //     order: 3,
  //     title: "Verbs",
  //   }

  // ]).catch((err) => {
  //   console.log("Unable to seed lessons", err);
  // });

  // // Seeding Challenges
  // console.log("Seeding Challenges...");
  // await DConn().insert(challenges).values([
  //   {
  //     id: 1,
  //     lessonId: 1, // Nouns
  //     type: "SELECT",
  //     order: 1,
  //     question: 'Which one of these is the "a man"?',
  //   },
  //   {
  //     id: 2,
  //     lessonId: 1, // Nouns
  //     type: "ASSIST",
  //     order: 2,
  //     question: '"A man?"',
  //   },
  //   {
  //     id: 3,
  //     lessonId: 1, // Nouns
  //     type: "SELECT",
  //     order: 3,
  //     question: 'Which one of these is the "the robot"?',
  //   },
  // ]).catch((err) => {
  //   console.log("Unable to seed challenges", err);
  // });

  // // Seeding Challenge Options
  // console.log("Seeding Challenge Options...");
  // await DConn().insert(challengeOptions).values([
  //   {
  //     challengeId: 1, // Which one of these is "the man"?
  //     imageSrc: "/man.svg",
  //     correct: true,
  //     text: "el hombre",
  //     audioSrc: "/es_man.mp3",
  //   },
  //   {
  //     challengeId: 1,
  //     imageSrc: "/woman.svg",
  //     correct: false,
  //     text: "la mujer",
  //     audioSrc: "/es_woman.mp3",
  //   },
  //   {
  //     challengeId: 1,
  //     imageSrc: "/robot.svg",
  //     correct: false,
  //     text: "el robot",
  //     audioSrc: "/es_robot.mp3",
  //   },
  // ]).catch((err) => {
  //   console.log("Unable to seed challenge options", err);
  // });
}

seedDb();
// seedCourse();
// seedUnits();
// seedLessons();
// seedChallenges();
// seedChallengeOptions();