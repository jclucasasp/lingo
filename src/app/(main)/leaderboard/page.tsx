import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/../db/queries";
import { redirect } from "next/navigation";
import FeedWrapper from "@/components/feed-wrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Promo from "@/components/promo";

export default async function page() {
    const userProgressData = getUserProgress();
    const topTenUsersData = getTopTenUsers();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, topTenusers, userSubscription] = await Promise.all([userProgressData, topTenUsersData, userSubscriptionData]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex gap-[48px] p-4">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/leaderboard.svg" height={90} width={90} alt="leaderboard" />
                    <h1 className="text-2xl font-bold text-neutral-800 my-6">Leaderboard</h1>
                    <p className="text-muted-foreground text-lg mb-6">Your rank among other learners</p>
                    <Separator className="mb-4" />
                    {topTenusers.map((user, i) => {
                        return (
                            <div key={i} className="flex items-center rounded-xl cursor-pointer p-2 px-4 hover:bg-gray-200/50 gap-4">
                                <p className="font-bold text-lime-500 text-xl">
                                    {i + 1}
                                </p>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.userImageSrc} />
                                </Avatar>
                                <p className="text-xl">{user.userName}</p>
                                <Separator orientation="vertical" />
                                <p className="text-xl text-muted-foreground">{user.points} XP</p>
                            </div>
                        )
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