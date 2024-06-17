"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { courses, userProgress } from "@/../db/schema";
import Card from "@/app/(main)/courses/card";
import { upsertUserProgress } from "@/../actions/user-progress";
import { toast } from "sonner";

type ListProps = {
    course: typeof courses.$inferInsert[],
    activeCourseId?: typeof userProgress.$inferSelect["activeCourseId"],
}

export default function ListItems({ course, activeCourseId }: ListProps) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onMouseClick = (id: number) => {
        if (pending) return;

        if (id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id).catch((err) => {
                toast.error(err.message);
            })
        });
    }
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {course.map((c, i) => {
                return (
                    <Card
                        key={i}
                        title={c.title}
                        id={c.id!}
                        imageSrc={c.imageSrc}
                        onClick={onMouseClick}
                        disabled={pending}
                        active={activeCourseId === c.id ? true : false}
                    />
                )
            })}
        </div>
    )
}
