import { relations } from "drizzle-orm";
import { date, integer, pgEnum, pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("c_id").primaryKey(),
    title: text("c_title").notNull(),
    imageSrc: text("c_image_src").notNull(),
    dateCreated: date("c_date_created").notNull().defaultNow(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units),
}));

export const units = pgTable("units", {
    id: serial("u_id").primaryKey(),
    title: text("u_title").notNull(),
    description: text("u_description").notNull(),
    courseId: integer("u_course_id").notNull().references(() => courses.id, { onDelete: "cascade"}),   
    order: integer("u_order").notNull(), 
});

export const unitRelations = relations(units, ({many, one})=> ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id]
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: serial("l_id").primaryKey(),
    title: text("l_title").notNull(),
    unitId: integer("l_unit_id").notNull().references(() => units.id, { onDelete: "cascade"}),
    order: integer("l_order").notNull(),
});

export const lessonRelations = relations(lessons, ({one, many}) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id]
    }),  
    challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
    id: serial("ch_id").primaryKey(),
    lessonId: integer("ch_lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade"}),   
    type: challengesEnum("ch_type").notNull(),
    question: text("ch_question").notNull(),
    order: integer("ch_order").notNull(),
})

export const challengeRelations = relations(challenges, ({one, many}) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id]
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
    id: serial("co_id").primaryKey(),
    challengeId: integer("co_challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade"}),
    text: text("co_text").notNull(),
    correct: boolean("co_correct").notNull(),   
    imageSrc: text("co_image_src"),
    audioSrc: text("co_audio_src"),
});

export const challengeOptionsRelations = relations(challengeOptions, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}));

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("cp_id").primaryKey(),
    userId: text("cp_user_id").notNull(),
    challengeId: integer("cp_challenge_id").notNull().references(() => challenges.id, { onDelete: "cascade"}),
    completed: boolean("cp_completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id]
    }),
}))

export const userProgress = pgTable("user_progress", {
    userId: text("up_user_id").primaryKey(),
    userName: text("up_user_name").notNull().default("User"),
    imageSrc: text("up_image_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("up_active_course_id").references(() => courses.id, { onDelete: "cascade"}),
    points: integer("up_points").default(0),
    hearts: integer("up_hearts").default(5),
    dateCreated: date("up_date_created").notNull().defaultNow(),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId], references: [courses.id]
    })
}));