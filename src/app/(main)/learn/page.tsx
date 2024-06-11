import Header from "@/app/(main)/learn/header";
import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";

export default function Learn() {
  return (
    <div className="flex gap-[48px] p-4">
      <FeedWrapper>
        <Header title="Spanish" />
        <nav className="space-y-4">
        <div className="w-full h-[500px] bg-blue-500"/>
        <div className="w-full h-[500px] bg-blue-500"/>
        <div className="w-full h-[500px] bg-blue-500"/>
        <div className="w-full h-[500px] bg-blue-500"/>
        </nav>
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress activeCourse={{title:"Spanish", imageSrc: "/es.svg"}} hearts={5} points={100} hasActiveSubscription={false} />
        
      </StickyWrapper>

    </div>
  );
}