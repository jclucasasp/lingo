import { getCourses, getUserProgress } from "@/../db/queries";
import ListItems from "@/app/(main)/courses/list-items";

export default async function Courses() {
    const courseData = await getCourses();
    const userProgressData = await getUserProgress();

    const [course, userProgress ] = await Promise.all([courseData, userProgressData]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto"> 
    <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
    <ListItems course={course} activeCourseId={userProgress?.activeCourse?.id} />
    </div>
  );
}