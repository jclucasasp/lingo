"use client";

import { courses } from "@/../db/schema";
import Card from "@/app/(main)/courses/card";

type ListProps = {
    courses: typeof courses.$inferInsert[],
    activeCourseId: number,
}

export default function ListItems({ courses, activeCourseId }: ListProps) {
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course, i) => {
                return (
                    <Card
                        key={i}
                        title={course.title}
                        id={course.id!}
                        imageSrc={course.imageSrc}
                        onClick={() => {}}
                        disabled={false}
                        active={activeCourseId === course.id ? true : false}
                    />
                )
            })}
        </div>
    )
}
