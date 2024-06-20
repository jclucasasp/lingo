"use client"
import { Crown, Check, Star } from "lucide-react";

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
    const clycleIndex= index % cycleLenght;

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
    const isFirst = index  == 0;
    const isLast = index == totalCount;
    const isCompleted = !current && !locked;

    const Icon = isCompleted ? Check : isLast ? Crown : Star;

    const href = isCompleted ? `/learn/${id}` : "/learn";

    return (
        <div>
            {id}
        </div>
    );
}