import { getLesson, getUserProgress } from '@/../db/queries'
import { redirect } from 'next/navigation';
import Quiz from '@/app/lesson/quiz';
import '@/app/lesson/layout';

export default async function LessonPage() {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData]);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    const percentage = lesson.challenges!.filter((challenge) => challenge.completed).length / lesson.challenges!.length * 100;

    return (
        <Quiz
            lessonId={lesson.id}
            lessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={percentage}
            userSubscription={null}>
        </Quiz>
    )
}