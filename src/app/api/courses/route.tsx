"use server";
import { NextRequest, NextResponse } from "next/server";
import DConn from "@/../../db/drizzle";
import { courses } from "@/../../db/schema";
import { checkRole } from "@/lib/utils";

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

interface CoursePostBody {
    id: number,
    title: string;
    imageSrc: string;
}

export async function POST(req: NextRequest) {
    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const existingCourses = await DConn().query.courses.findMany();
    const body: CoursePostBody = await req.json();

    if (existingCourses) {
        body.id = (existingCourses.length + 1);
    }

    const res = await DConn().insert(courses).values(body).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error creating course" }, { status: 500 });
        });


    return NextResponse.json({...res, id: body.id }, { status: 200 });
}