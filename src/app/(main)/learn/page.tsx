import Header from "@/app/(main)/learn/header";
import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import UnitHeader from "@/app/(main)/learn/unit-header";
import LessonButton from "@/app/(main)/learn/lesson-button";
import { getCourseProgress, getUnits, getUserProgress, getLessonPercentage, getUserSubscription } from "@/../db/queries";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Promo from "@/components/promo";
import { NotebookIcon } from "lucide-react";
import Link from "next/link";
import QuestItems from "@/components/ui/quest-items";

export default async function Learn() {

  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, units, courseProgress, lessonPercentage, userSubscription] = await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData, userSubscriptionData]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-[48px] p-4">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit, index) => (
          <div key={index}>
            <div className="w-full flex items-center justify-between bg-green-400 border rounded-xl p-4">
              <UnitHeader title={unit.title} description={unit.description} />

              <div className="hidden xl:flex">
                <Link href={`/lesson`}>
                  <Button variant={"default"} size={"default"}>
                    <NotebookIcon className="h-5 w-5 mr-2" />
                    continue
                  </Button>
                </Link>
              </div>

            </div>
            <div className="flex flex-col items-center gap-4 relative">
              {unit.lessons.map((lesson, index) => {
                const isCurrent = lesson.id === userProgress?.activeCourseId;
                const heartsBool = (!!userProgress.hearts && userProgress.hearts > 0);
                // const isLocked = !isCurrent || !heartsBool; 
                const isLocked = !!lesson.completed && !isCurrent || !heartsBool;

                return (<LessonButton key={index}
                  id={lesson.id}
                  index={index}
                  totalCount={unit.lessons.length - 1}
                  locked={isLocked}
                  current={isCurrent}
                  percentage={lessonPercentage} />)
              })}
            </div>
          </div>
        ))}
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={userSubscription?.isActive || false} />
        {!userSubscription?.isActive &&
          <Promo />
        }
        <QuestItems points={userProgress.points} />
      </StickyWrapper>

    </div>
  );
}