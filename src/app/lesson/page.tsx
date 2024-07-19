import { getLesson, getUserProgress, getLessonPercentage } from '@/../db/queries'
import { redirect } from 'next/navigation';
import Quiz from '@/app/lesson/quiz';
import '@/app/lesson/layout';

export default async function LessonPage() {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();
    const percentageData = getLessonPercentage();

    const [lesson, userProgress, percentage] = await Promise.all([lessonData, userProgressData, percentageData]);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    console.log("\nLesson data from Lesson page: ", lesson);
    //Todo: Test if percentageData yields the same as the below calculation
    // const percentage = lesson.challenges!.filter((challenge) => challenge.completed).length / lesson.challenges!.length * 100;

    return (
        <Quiz
            lessonId={lesson.id}
            lessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={percentage}
            userSubscription={null}
        />
    )
}