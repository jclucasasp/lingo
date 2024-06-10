import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type UserProgProps = {
    activeCourse: { title: string, imageSrc: string },
    hearts: number,
    points: number,
    hasActiveSubscription: boolean,
}

export default function UserProgress({ activeCourse, points, hearts, hasActiveSubscription }: UserProgProps) {
    return (
        <div className="flex items-center justify-between gap-2 w-full">
            <Link href={"/courses"}>
                <Button variant={"ghost"}>
                    <Image src={activeCourse.imageSrc} alt={activeCourse.title} height={40} width={45} className="rounded-md"/>
                </Button>
            </Link>
            
            <Link href={"/shop"}>
            <Button variant={"ghost"} size={"sm"} className="text-orange-500">
                <Image src={"/points.svg"} height={40} width={40} alt="points" className="mr-2" />
                {points}
            </Button>
            </Link>

            <Link href={"/shop"}>
            <Button variant={"ghost"} size={"sm"} className="text-rose-500">
                <Image src={"/heart.svg"} height={40} width={40} alt="points" className="mr-2" />
                {hasActiveSubscription? <InfinityIcon className="h-4 w-4 stroke-[3]" /> : hearts}
            </Button>
            </Link>

        </div>
    );
}