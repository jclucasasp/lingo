"use client"
import { useState, useTransition } from "react";
import { challengeOptions, challenges, challengeProgress } from "@/../db/schema";
import { X, InfinityIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/lib/utils";
import { QuestionBubble } from "@/app/lesson/question-bubble";
import { Challenge } from "@/app/lesson/challenge";
import { LessonFooter } from "@/app/lesson/footer";
import { upsertChallengeProgress } from "@/../../actions/challenge-progress";
import { reduceHearts } from "@/../../actions/user-progress";
import { toast } from "sonner";
import { useAudio } from "react-use";
import { ResultCard } from "@/app/lesson/result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import Image from "next/image";

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

    const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav" });
    const [finshedAutio] = useAudio({ src: "/finish.mp3", autoPlay: true });
    const [pending, startTransition] = useTransition();
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [status, setStatus] = useState<"correct" | "incorrect" | "completed" | "none">("none");
    const [challenges] = useState(lessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const activeChallenges = challenges?.findIndex((challenge) => !challenge.completed);
        return activeChallenges !== -1 ? activeChallenges : 0;
    });

    const [selectedOption, setSelectedOption] = useState<number | null>();
    const router = useRouter();
    const challenge = challenges![activeIndex!];
    const challengeOptions = challenge.challengeOptions || [];
    const title = challenge.type === 'ASSIST' ? "Select the correct meaning" : challenge.question;

    const onSelect = (id: number) => {
        setSelectedOption(id);

        if (status === "none") return;
    }

    const { onOpen } = useExitModal();

    const onContinue = () => {

        if (!selectedOption) return;

        if (status === "incorrect") {
            setStatus("none");
            setSelectedOption(null);
            return;
        }

        if (status === "correct") {
            setActiveIndex((current) => current! + 1);
            setStatus("none");
            setSelectedOption(null);
            setPercentage(percentage * 100);
            return;
        }

        const correctOption = challengeOptions.find((option) => option.correct);
        if (!correctOption) {
            return;
        }

        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((res) => {
                        if (res?.error === "hearts") {
                            return console.error("No more hearts left");
                        }
                        setStatus("correct");
                        correctControls.play();
                        setPercentage((prev) => prev + 100 / challenges!?.length);

                        // Check if this is a completed lesson which means that the user is in practise mode
                        if (initialPercentage == 100) {
                            setHearts((prev) => Math.min(prev + 1, 5));
                        }
                    }).catch((err) => toast.error(err));
            })
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            return;
                        }

                        setStatus("incorrect");
                        incorrectControls.play();
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }).catch((err) => toast.error(err));
            })
        }
    }

    if (!challenge) {
        return (
            <>
            {finshedAutio}
            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} tweenDuration={10000} numberOfPieces={500}/>
            <div className="flex flex-col items-center gap-6">
                <Image src={"/finish.svg"} height={100} width={100} alt="completed" />
                <h3 className="text-2xl font-bold lg:text-3xl">You completed this course!</h3>

                <div className="flex gap-4">
                    <ResultCard variant="points" value={challenges!.length * 10} />
                    <ResultCard variant="hearts" value={hearts} />
                </div>
            </div>
            <LessonFooter lessonId={lessonId} status={"completed"} onCheck={()=> router.push('/learn')} />
            </>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 justify-between max-w-[1140px] w-full">
                <X onClick={onOpen} className="text-slate-500 hover:opacity-75 transition cursor-pointer" />
                <Progress value={50 | percentage} />
                <div className="text-rose-500 flex items-center font-bold">
                    <Image src={"/heart.svg"} alt="heart" height={28} width={28} className="mr-2" />
                    {userSubscription ? <InfinityIcon className="h-6 w-6 stroke-[3]" /> : hearts}
                </div>
            </div>

            <div className="relative h-full flex flex-col items-center justify-center lg:min-h-[350px] lg:w-[600px] mb-8 gap-4 lg:gap-8">
                {correctAudio}
                {incorrectAudio}
                <div className=" px-6 lg:px-0 ">
                    <h3 className="font-bold text-lg lg:text-3xl text-center text-neutral-700 lg:text-start">
                        {title}
                    </h3>
                </div>
                <div className="w-full mx-auto">
                    {challenge.type === 'ASSIST' && (
                        <QuestionBubble question={challenge.question} />
                    )}
                    <Challenge options={challengeOptions} onSelect={onSelect} status={status}
                        selectedOption={selectedOption} disabled={pending} type={challenge.type} />
                </div>
            </div>
            <LessonFooter disabled={pending || !selectedOption} lessonId={lessonId} status={status} onCheck={onContinue} />
        </div>
    );
}