import { cn } from "@/lib/utils";
import Image from "next/image";

type ResultCardProps = {
    variant: "points" | "hearts",
    value: number,
}

export function ResultCard({ value, variant }: ResultCardProps) {
    const ImgSrc = variant === "points" ? "/points.svg" : "/heart.svg";
    return (
        <div className={cn("rounded-2xl p-0.5 min-w-44 text-center", variant === "points" && "border-orange-400, bg-orange-400", variant === "hearts" && "border-rose-400, bg-rose-400")}>
            <div className={cn("text-white font-bold uppercase text-xs", )}>
            {variant === "hearts" ? "Hearts Left" : "Total XP"}
            <div className={cn("flex items-center justify-center bg-white p-4 mb font-bold text-lg rounded-2xl text-black")}>
                <Image src={ImgSrc} height={25} width={25} alt="points" className="mr-1.5" />
                {value || 0}
            </div>
            </div>
        </div>
    );
}