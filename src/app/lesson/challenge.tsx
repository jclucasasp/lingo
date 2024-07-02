import { challenges, challengeOptions } from "@/../db/schema";
import { cn } from "@/lib/utils";
import { LessonCard } from "@/app/lesson/lesson-card";

type ChallengeProps = {
    options: typeof challengeOptions.$inferSelect[],
    onSelect: (id:number)=> void,
    status: "correct" | "incorrect" | "none",
    selectedOption?: number | null,
    disabled: boolean,
    type: typeof challenges.$inferSelect["type"],
}
export function Challenge({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    type
}: ChallengeProps) {

    return (
        <div className={cn("grid gap-2", type === "ASSIST" && "grid-cols-1", 
        type==="SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]")}>
            {options.map((option, i)=>(
                <LessonCard key={i} id={option.id} text={option.text} type={type} imgSrc={option.imageSrc} audioSrc={option.audioSrc} shortcut={`${i+1}`} selected={selectedOption === option.id} onClick={()=> onSelect(option.id)} 
                status={status} disabled={disabled} />
            ))}
        </div>
    )
}