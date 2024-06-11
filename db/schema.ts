import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("c_title").notNull(),
    imageSrc: text("c_image_src").notNull(),
});