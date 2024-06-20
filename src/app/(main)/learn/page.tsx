import Header from "@/app/(main)/learn/header";
import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import UnitHeader from "@/app/(main)/learn/unit-header";
import Link from "next/link";
import LessonButton from "@/app/(main)/learn/lesson-button";
import { getUnits, getUserProgress } from "@/../db/queries";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NotebookIcon } from "lucide-react";

export default async function Learn() {

  const userProgressPromise = getUserProgress();
  const unitsData = getUnits();

  const [userProgress, units] = await Promise.all([userProgressPromise, unitsData]);

  if (!userProgress || !userProgress.activeCourse) {
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
                <Link href={`/learn/${unit.lessons[0].id}`}>
                  <Button variant={"default"} size={"default"}>
                    <NotebookIcon className="h-5 w-5 mr-2" />
                    continue
                  </Button>
                </Link>
              </div>

            </div>
            <div className="flex flex-col items-center gap-4 relative">
            {unit.lessons.map((lesson, index)=> {
              const isCurrent = lesson.id === userProgress.activeCourse?.id;
              const isLocked = !lesson.completed && !isCurrent;
              return(<LessonButton key={index} 
                id={lesson.id} 
                index={index} 
                totalCount={unit.lessons.length - 1} 
                locked={isLocked} 
                current={isCurrent} 
                percentage={10} />)
            })}
            </div>
          </div>
        ))}
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress activeCourse={{ title: userProgress.activeCourse.title, imageSrc: userProgress.activeCourse.imageSrc }} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false} />
      </StickyWrapper>

    </div>
  );
}