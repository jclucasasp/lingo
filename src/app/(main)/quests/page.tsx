import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/../db/queries";
import { redirect } from "next/navigation";
import FeedWrapper from "@/components/feed-wrapper";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Promo from "@/components/promo";
import { QUESTS } from "@/lib/constants";

export default async function page() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([userProgressData, userSubscriptionData]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex gap-[48px] p-4">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center gap-4">
                    <Image src="/quests.svg" height={90} width={90} alt="quests" />
                    <h1 className="text-2xl font-bold text-neutral-800">Quests</h1>
                    <p className="text-muted-foreground text-lg mb-8">Complete Questst to earn extra points</p>
                    {QUESTS.map((quest, i) => {
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
                {!userSubscription?.isActive &&
                    <Promo />
                }
            </StickyWrapper>
        </div>
    );
}