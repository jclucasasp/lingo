import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/../db/queries";
import { redirect } from "next/navigation";
import FeedWrapper from "@/components/feed-wrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default async function page() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([userProgressData, userSubscriptionData]);

    const quests = [
        {
            title: "Earn 50 xp",
            value: 50
        },
        {
            title: "Earn 100 xp",
            value: 100
        },
        {
            title: "Earn 200 xp",
            value: 200
        },
        {
            title: "Earn 400 xp",
            value: 400
        },
        {
            title: "Earn 800 xp",
            value: 800
        },
    ];

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex gap-[48px] px-8">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center gap-4">
                    <Image src="/quests.svg" height={90} width={90} alt="quests" />
                    <h1 className="text-2xl font-bold text-neutral-800">Quests</h1>
                    <p className="text-muted-foreground text-lg">Complete Questst to earn extra points</p>
                    {quests.map((quest, i) => {
                        const progress = Math.round((userProgress.points / quest.value) * 100);

                        return (
                            <div key={i} className="flex items-end border-t-2 w-full gap-2">
                                <div className="mt-4">
                                    <Image src={"/points.svg"} height={50} width={50} alt="points" />
                                </div>
                                <div className="w-full">
                                    <p>{quest.title}</p>
                                    <Progress value={progress} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress activeCourse={{ title: userProgress.activeCourse.title, imageSrc: userProgress.activeCourse.imageSrc }} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={userSubscription?.isActive || false} />
            </StickyWrapper>
        </div>
    );
}