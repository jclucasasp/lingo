import { relations } from "drizzle-orm";
import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const course = pgTable("course", {
    id: serial("c_id").primaryKey(),
    title: text("c_title").notNull(),
    imageSrc: text("c_image_src").notNull(),
    dateCreated: date("c_date_created").notNull().defaultNow(),
});

export const user = pgTable("user", {
    id: serial("u_id").primaryKey(),
    email: text("u_email").notNull(),
    name: text("u_name").notNull().default("User"),
    dateJoined: date("u_date_joined").notNull().defaultNow(),
});

export const progress = pgTable("progress", {
    id: serial("p_id").primaryKey(),
    userId: integer("p_user_id").references(()=> user.id, {onDelete: "cascade"}),
    courseId: integer("p_course_id").references(()=> course.id, {onDelete: "cascade"}),
    points: integer("p_points").default(0),
    hearts: integer("p_hearts").default(5),
});

export const progressRelation = relations(progress, ({one}) => ({ activeCourse: one(course, { 
    fields: [progress.courseId], references: [course.id] }) 
}));