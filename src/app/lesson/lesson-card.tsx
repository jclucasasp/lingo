import { cn } from "@/lib/utils";
import Image from "next/image";

type LessonCardProps = {
    key: number,
    id: number,
    text: string,
    imgSrc: string | null,
    audioSrc: string | null,
    type: "ASSIST" | "SELECT",
    selected?: boolean,
    onClick: () => void,
    shortcut: string,
    status?: "correct" | "incorrect" | "none",
    disabled?: boolean
}

export function LessonCard({ key, id, text, imgSrc, audioSrc, type, selected, shortcut, status, disabled }: LessonCardProps) {
    return (
        <div className={cn("h-full border-2 border-b-4 rounded-xl hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-3", selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
            selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
            selected && status === "incorrect" && "border-rose-300 bg-rose-100 hover:bg-green-100",
            disabled && "bg-slate-300/10")}
            onClick={() => { }}>
                {imgSrc && (
                    <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full" >
                        <Image src={imgSrc} alt={text} fill />
                    </div>
                    )}
        </div>
    );
}