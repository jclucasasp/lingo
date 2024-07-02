import { useCallback } from "react";
import { useAudio, useKey } from "react-use";
import { cn } from "@/lib/utils";
import Image from "next/image";

type LessonCardProps = {
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

export function LessonCard({ id, text, imgSrc, audioSrc, type, selected, onClick, shortcut, status, disabled }: LessonCardProps) {

    const [audio, _, controls] = useAudio({ src: audioSrc || "" });

    const hanldeClick = useCallback(() => {
        if (disabled) return;
        onClick();
        controls.play();
    }, [disabled, onClick, controls]);

    useKey(shortcut, hanldeClick, {}, [shortcut, hanldeClick]);

    return (
        <div className={cn("h-full border-2 border-b-4 rounded-xl hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-3", selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
            selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100", "text-green-500",
            selected && status === "incorrect" && "border-rose-300 bg-rose-100 hover:bg-green-100",
            disabled && "bg-slate-300/10")}
            onClick={hanldeClick}>
            {audio}
            {imgSrc && (
                <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full" >
                    <Image src={imgSrc} alt={text} fill />
                </div>
            )}
            <div className={cn("flex items-center justify-between", type === "ASSIST" && "flex-row-reverse")}>
                {type === "ASSIST" && <div />}
                <p className={cn("text-neutral-600 text-sm lg:text-base",
                    selected && "text-sky-500",
                    selected && status === "correct" && "text-green-500",
                    selected && status === "incorrect" && "text-rose-500",
                )}>
                    {text}
                </p>
                <div className={cn("text-neutral-400 border-2 text-xs font-semibold rounded-full px-2")}>
                    {shortcut}
                </div>
            </div>
        </div>
    );
}