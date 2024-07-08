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
      
    ]),
    // Seeding Challenges
    DConn().insert(challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these are a man"?',
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: 'Which one of these are a women?',
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these are a robot?',
      },
      {
        id: 4,
        lessonId: 2, // Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these are a man"?',
      },
      {
        id: 5,
        lessonId: 2, // Nouns
        type: "ASSIST",
        order: 5,
        question: 'Which one of these are a women?',
      },
      {
        id: 6,
        lessonId: 2, // Nouns
        type: "SELECT",
        order: 6,
        question: 'Which one of these are a robot?',
      },
      {
        id: 7,
        lessonId: 3, // Nouns
        type: "SELECT",
        order: 7,
        question: 'Which one of these are a man"?',
      },
      {
        id: 8,
        lessonId: 3, // Nouns
        type: "ASSIST",
        order: 8,
        question: 'Which one of these are a women?',
      },
      {
        id: 9,
        lessonId: 3, // Nouns
        type: "SELECT",
        order: 9,
        question: 'Which one of these are a robot?',
      },
    ]),
    // Seeding Challenge Options
    DConn().insert(challengeOptions).values([
      {
        challengeId: 1, // Which one of these are a man"?
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
        challengeId: 2, // "Which one of these are a women"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        imageSrc: "/woman.svg",
        correct: true,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 3, // Which one of these is "a robot"?
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
      {
        challengeId: 4, // Which one of these is "a robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 4,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 4,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 5, // Which one of these is "a robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 5,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 5,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 6, // Which one of these is "a robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 6,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 6,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 7, // Which one of these is "a robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 7,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 7,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 8, // Which one of these is "a robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 8,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 8,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 9, // Which one of these is "a robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 9,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 9,
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