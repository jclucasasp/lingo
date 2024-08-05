import { checkRole } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { courses } from "@/../../db/schema";
import DConn from "@/../../db/drizzle";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;
    // const { pathname } = new URL(req.url);
    // const id = pathname.split("/").pop();

    const res = await DConn().select({ id: courses.id }).from(courses).catch((err) => {
        console.error(err);
        return NextResponse.json({ erro: "Error fetching course" }, { status: 500 });
    })

    return NextResponse.json({ res, id }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;
    const body = await req.json();

    const res = DConn().update(courses).set(body).where(eq(courses.id, id)).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error updating course" }, { status: 500 });
        });

    return NextResponse.json({ res, id }, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;
    // const { pathname } = new URL(req.url);
    // const id = pathname.split("/").pop();

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const res = await DConn().delete(courses).where(eq(courses.id, id)).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error deleting course" }, { status: 500 });
        });

    return NextResponse.json(res, { status: 200 });
}