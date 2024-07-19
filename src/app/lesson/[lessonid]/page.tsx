import { getLesson, getUserProgress, getLessonPercentage } from '@/../db/queries'
import { redirect } from 'next/navigation';
import Quiz from '@/app/lesson/quiz';
import '@/app/lesson/layout';

type LessonIdPageProps = {
    params: {
        lessonid: string
    }
}

export default async function LessonIdPage({params}: LessonIdPageProps) {

    console.log("\nLesson Id Page hit with lesson id: ", params);

    const lessonData = getLesson((parseInt(params.lessonid)));
    const userProgressData = getUserProgress();
    const percentageData = getLessonPercentage();

    const [lesson, userProgress, percentage] = await Promise.all([lessonData, userProgressData, percentageData]);
    console.log("\nLesson from LessonIdPage: ", lesson);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    console.log("Lesson data from LessonIdPage: ", lesson);

    //Todo: Test if percentageData yields the same as the below calculation
    // const percentage = lesson.challenges!.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <Quiz
            lessonId={lesson.id}
            lessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={percentage}
            userSubscription={null} //Todo: add user subscription
        />
    );
}