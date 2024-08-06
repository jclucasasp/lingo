export interface LessonPostBodyInterface {
    id: number,
    title: string,
    unitId: number,
    order: number,
}

export interface CoursePostBodyInterface {
    id: number,
    title: string;
    imageSrc: string;
}


export interface UnitPostBodyInterface {
    id: number;
    title: string;
    description: string;
    courseId: number;
    order: number;
}