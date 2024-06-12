import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type CardProps = {
    title: string,
    id: number,
    imageSrc: string,
    onClick: (id: number) => void,
    disabled: boolean,
    active: boolean,
}

export default function Card({ title, id, imageSrc, onClick, disabled, active }: CardProps) {
    return (
        <section onClick={() => onClick(id)}
            className={cn("flex flex-col gap-4 justify-center items-center border-2 rounded-xl border-b-4 hover:gb-black/5 cursor-pointer active:border-b-2 p-3 min-h-[217px] min-w-[200px]", disabled && "pointer-events-none opacity-50")}>
            <div className="min-h-[24px] w-full flex justify-end">
                {active && <div className="rounded-md bg-green-600 p-1.5">
                    <Check className="text-white stroke-[4] h-4 w-4" />
                </div>
                }
            </div>
            <Image src={imageSrc} alt={title} height={90} width={110} className="rounded-md drop-shadow-md object-cover" />
            <h1 className="text-neutral-600 font-bold">{title}</h1>
        </section>
    );
}