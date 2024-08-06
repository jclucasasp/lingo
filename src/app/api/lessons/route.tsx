import { checkRole } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { LessonPostBodyInterface } from "@/app/api/interfaces/interface";
import { lessons } from "@/../../db/schema";
import { count } from "drizzle-orm";
import DConn from "@/../../db/drizzle";


export async function GET(req: NextRequest) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const headers = new Headers();
    const res = await DConn().query.lessons.findMany()
        .then((l) => {
            headers.set("content-range", l.length.toString());
            return l;
        })
        .catch((err) => {
            console.log(err);
            return NextResponse.json({ error: "Error fetching lessons" }, { status: 500 });
        });

    return NextResponse.json(res, { status: 200, headers });
}

export async function POST(req: NextRequest) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body: LessonPostBodyInterface = await req.json();

    const existingLessons = await DConn().select({ count: count() }).from(lessons);
    body.id = (existingLessons[0].count + 1);
    body.order = body.id;

    const res = await DConn().insert(lessons).values(body).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error creating lesson" }, { status: 500 });
        });

    return NextResponse.json({ res, id: body.id }, { status: 200 });
}
