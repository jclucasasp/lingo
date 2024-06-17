import { getCourses, getUserProgress } from "@/../db/queries";
import ListItems from "@/app/(main)/courses/list-items";

export default async function Courses() {
    const coursesPromise = getCourses();
    const userProgressPromise = getUserProgress();

    const [course, userProgress ] = await Promise.all([coursesPromise, userProgressPromise]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto"> 
    <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
    <ListItems course={course} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
}