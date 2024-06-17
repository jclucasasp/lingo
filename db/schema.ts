import { relations } from "drizzle-orm";
import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("c_id").primaryKey(),
    title: text("c_title").notNull(),
    imageSrc: text("c_image_src").notNull(),
    dateCreated: date("c_date_created").notNull().defaultNow(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
}));

export const userProgress = pgTable("user_progress", {
    userId: text("u_user_id").primaryKey(),
    userName: text("u_user_name").notNull().default("User"),
    imageSrc: text("u_image_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("u_active_course_id").references(() => courses.id, { onDelete: "cascade"}),
    points: integer("u_points").default(0),
    hearts: integer("u_hearts").default(5),
    dateCreated: date("u_date_created").notNull().defaultNow(),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId], references: [courses.id]
    })
}));