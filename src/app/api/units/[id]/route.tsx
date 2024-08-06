import { checkRole } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { units } from "@/../../db/schema";
import DConn from "@/../../db/drizzle";


export async function GET(req: NextRequest, { params }: { params: { id: number } }) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;
    const headers = new Headers();

    const res = await DConn().select().from(units).where(eq(units.id, id))
        .then((u) => {
            headers.set("content-range", u.length.toString());
            return u;
        })
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error fetching unit" }, { status: 500 });
        });

    return NextResponse.json({ ...res, id }, { status: 200, headers });
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
    if (checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;
    const body = await req.json();

    const res = await DConn().update(units).set(body).where(eq(units.id, id)).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error updating unit" }, { status: 500 });
        });

    return NextResponse.json({ res, id }, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const id = params.id;
    const res = await DConn().delete(units).where(eq(units.id, id)).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error deleting unit" }, { status: 500 });
        });

    return NextResponse.json(res, { status: 200 });
}