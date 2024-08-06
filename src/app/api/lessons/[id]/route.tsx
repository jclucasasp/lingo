import { NextRequest, NextResponse } from "next/server";
import { LessonPostBodyInterface } from "@/app/api/interfaces/interface";
import { checkRole } from "@/lib/utils";
import { lessons } from "@/../../db/schema";
import { eq } from "drizzle-orm";
import DConn from "@/../../db/drizzle";


export async function GET(req: NextRequest, { params }: { params: { id: number } }) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;

    const res = await DConn().query.lessons.findFirst({ where: (eq(lessons.id, id)) })
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error fetching lesson" }, { status: 500 });
        });

    return NextResponse.json({ res, id }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;
    const body: LessonPostBodyInterface = await req.json();
    const res = await DConn().update(lessons).set(body).where(eq(lessons.id, id)).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error updating lesson" }, { status: 500 });
        });

    return NextResponse.json({ res, id }, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;
    const res = await DConn().delete(lessons).where(eq(lessons.id, id)).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error deleting lesson" }, { status: 500 });
        });

    return NextResponse.json(res, { status: 200 });
}