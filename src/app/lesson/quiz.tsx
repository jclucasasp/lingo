"use client"
import { useState } from "react";
import { challengeOptions, challenges, challengeProgress } from "@/../db/schema";
import { X, InfinityIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useExitModal } from "@/lib/utils";
import { QuestionBubble } from "@/app/lesson/question-bubble";
import { Challenge } from "./challenge";

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
    const [challenges] = useState(lessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const activeChallenges = challenges?.findIndex((challenge) => !challenge.completed);
        return activeChallenges !== -1 ? activeChallenges : 0;
    });

    const challenge = challenges![activeIndex!];
    const challengeOptions = challenge.challengeOptions || [];
    const title = challenge.type === 'ASSIST' ? "Select the correct meaning" : challenge.question;

    const { onOpen } = useExitModal();

    return (
        <div className="flex flex-col items-center">
            <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 justify-between max-w-[1140px] mx-auto w-full">
                <X onClick={onOpen} className="text-slate-500 hover:opacity-75 transition cursor-pointer" />
                <Progress value={50 | percentage} />
                <div className="text-rose-500 flex items-center font-bold">
                    <Image src={"/heart.svg"} alt="heart" height={28} width={28} className="mr-2" />
                    {userSubscription ? <InfinityIcon className="h-6 w-6 stroke-[3]" /> : hearts}
                </div>
            </div>

            <div className="h-full flex items-center justify-center lg:min-h-[350px] lg:w-[600px]">
                <div className=" px-6 lg:px-0 flex flex-col gap-12">
                    <h3 className="font-bold text-lg lg:text-3xl text-center text-neutral-700 lg:text-start">
                        {title}
                    </h3>
                    <div>
                        {challenge.type === 'ASSIST' && (
                            <QuestionBubble question={challenge.question} />
                        )}
                        <Challenge options={challengeOptions} onSelect={()=> {}} status={"none"} 
                        selectedOption={null} disabled={false} type={challenge.type} />
                    </div>
                </div>
            </div>
        </div>
    );
}