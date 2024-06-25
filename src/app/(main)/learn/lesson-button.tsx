"use client"
import { Crown, Check, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "react-circular-progressbar/dist/styles.css";

type LessonButtonProps = {
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
}

export default function LessonButton({ id, index, totalCount, locked, current, percentage }: LessonButtonProps) {

    const cycleLenght = 8;
    const clycleIndex = index % cycleLenght;

    let indentationLevel;

    if (clycleIndex <= 2) {
        indentationLevel = clycleIndex;
    } else if (clycleIndex <= 4) {
        indentationLevel = 4 - clycleIndex;
    } else if (clycleIndex <= 6) {
        indentationLevel = 4 - clycleIndex;
    } else {
        indentationLevel = clycleIndex - 8;
    }

    const rightPosistion = indentationLevel * 40;
    const isFirst = index == 0;
    const isLast = index == totalCount;
    const isCompleted = !current && !locked;

    const Icon = isCompleted ? Check : isLast ? Crown : Star;

    const href = isCompleted ? `/lesson/${id}` : "/lesson";

    return (
        <Link href={href} aria-disabled={locked} style={{ pointerEvents: locked ? "none" : "auto" }}>
            <div className="relative" style={
                { right: `${rightPosistion}px`, marginTop: isFirst && !isCompleted ? 60 : 24 }
            }>
                {current ? (
                    <div className="relative h-[120px] w-[102px]">
                        <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 rounded-xl animate-bounce tracking-wide z-10 bg-white">
                            start
                            <div className="absolute -bottom-3 border-x-transparent border-x-8 border-t-8 left-8" />
                        </div>

                        <CircularProgressbarWithChildren value={Number.isNaN(percentage) ? 0 : percentage}
                            styles={{
                                path: {
                                    stroke: "#4ade80",
                                },
                                trail: {
                                    stroke: "#e5e7eb",
                                }
                            }}>

                            <Button size={"rounded"} variant={locked ? "locked" : "secondary"} className="h-[70px] w-[70px] border-2 border-b-8">
                                <Icon className={cn("h-10 w-10", locked ? "fill-neutral-400 text-neutral-400" : "fill-primary-foreground text-primary-foreground",
                                    isCompleted && "fill-none stroke-[4]"
                                )} />
                            </Button>
                        </CircularProgressbarWithChildren>
                    </div>
                ) : (
                    <Button size={"rounded"} variant={locked ? "locked" : "secondary"} className="h-[70px] w-[70px] border-2 border-b-8">
                        <Icon className={cn("h-10 w-10", locked ? "fill-neutral-400 text-neutral-400" : "fill-primary-foreground text-primary-foreground",
                            isCompleted && "fill-none stroke-[4]"
                        )} />
                    </Button>
                )}
            </div>
        </Link>
    );
}