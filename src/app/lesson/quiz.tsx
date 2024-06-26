"use client"
import { useState } from "react";
import { challengeOptions, challenges, challengeProgress } from "@/../db/schema";
import { X, InfinityIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useExitModal } from "@/lib/utils";

type QuizProps = {
    lessonId: number | undefined,
    initialHearts: number,
    initialPercentage: number,
    userSubscription: any, //Todo: replace with subscription db type
    lessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
        challengeProgress: typeof challengeProgress.$inferSelect[];
    })[] | undefined, 
}

export default function Quiz({ lessonId, initialHearts, initialPercentage, userSubscription, lessonChallenges }: QuizProps) {
  
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const { onOpen } = useExitModal();
  
    return (
    <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
        <X onClick={onOpen}  className="text-slate-500 hover:opacity-75 transition cursor-pointer"/>
            <Progress value={50 | percentage}/>
            <div className="text-rose-500 flex items-center font-bold">
                <Image src={"/heart.svg"} alt="heart" height={28} width={28} className="mr-2" />
                    {userSubscription ? <InfinityIcon className="h-6 w-6 stroke-[3]" /> : hearts}
            </div>
    </div>
  );
}