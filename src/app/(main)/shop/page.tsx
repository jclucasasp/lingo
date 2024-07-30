import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/../db/queries";
import { redirect } from "next/navigation";
import FeedWrapper from "@/components/feed-wrapper";
import Image from "next/image";
import Items from "./items";
import QuestItems from "@/components/ui/quest-items";

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
        <div className="w-full flex flex-col items-center">
          <Image src="/shop.svg" height={90} width={90} alt="shop" />
          <h1 className="text-2xl font-bold text-neutral-800 my-6">Shop</h1>
          <p className="text-muted-foreground text-lg mb-6">Redeem your points for hearts</p>
          <Items hearts={userProgress.hearts} points={userProgress.points} subscription={userSubscription?.isActive || false} />
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} hasActiveSubscription={userSubscription?.isActive ||false}
          hearts={userProgress.hearts} points={userProgress.points} />
          <QuestItems points={userProgress.points}/>
      </StickyWrapper>
    </div>
  );
}