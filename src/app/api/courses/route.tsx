import { NextRequest, NextResponse } from "next/server";
import { CoursePostBodyInterface } from "@/app/api/interfaces/interface";
import { courses } from "@/../../db/schema";
import { checkRole } from "@/lib/utils";
import { count } from "drizzle-orm";
import DConn from "@/../../db/drizzle";

export async function GET() {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const headers = new Headers();
    const res = await DConn().query.courses.findMany()
        .then((c) => {
            headers.set("content-range", c.length.toString());
            return c;
        }).catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error fetching courses" }, { status: 500 });
        });

    return NextResponse.json(res, { status: 200, headers });
}

export async function POST(req: NextRequest) {
    
    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const existingCourses = await DConn().select({count: count()}).from(courses);
    const body: CoursePostBodyInterface = await req.json();

    if (existingCourses) {
        body.id = (existingCourses[0].count + 1);
    }

    const res = await DConn().insert(courses).values(body).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error creating course" }, { status: 500 });
        });


    return NextResponse.json({...res, id: body.id }, { status: 200 });
}