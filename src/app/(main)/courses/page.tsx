import { getCourses } from "@/../db/queries";
import ListItems from "@/app/(main)/courses/list-items";

export default async function Courses() {
    const courses = await getCourses();

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto"> 
    <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
    <ListItems courses={courses} activeCourseId={1} />
    </div>
  );
}