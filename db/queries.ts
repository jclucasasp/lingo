import { cache } from "react";
import DBConn from "./drizzle";

export const getCourses = cache(async ()=> {
    return await DBConn().query.courses.findMany();
});