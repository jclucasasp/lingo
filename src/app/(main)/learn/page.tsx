import Header from "@/app/(main)/learn/header";
import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { getUserProgress } from "@/../db/queries";
import { redirect } from "next/navigation";

export default async function Learn() {

  const userProgressPromise = getUserProgress();

  const [userProgress] = await Promise.all([userProgressPromise]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-[48px] p-4">
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress activeCourse={{ title: "Spanish", imageSrc: "/es.svg" }} hearts={5} points={100} hasActiveSubscription={false} />
      </StickyWrapper>

    </div>
  );
}