"use client";

import { course, progress } from "@/../db/schema";
import Card from "@/app/(main)/courses/card";

type ListProps = {
    course: typeof course.$inferInsert[],
    activeCourseId?: typeof progress.$inferSelect["courseId"],
}

export default function ListItems({ course, activeCourseId }: ListProps) {
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {course.map((c, i) => {
                return (
                    <Card
                        key={i}
                        title={c.title}
                        id={c.id!}
                        imageSrc={c.imageSrc}
                        onClick={() => {}}
                        disabled={false}
                        active={activeCourseId === c.id ? true : false}
                    />
                )
            })}
        </div>
    )
}
