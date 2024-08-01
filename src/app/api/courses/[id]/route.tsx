import { checkRole } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import DConn from "@/../../db/drizzle";
import { courses } from "@/../../db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest) {

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

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