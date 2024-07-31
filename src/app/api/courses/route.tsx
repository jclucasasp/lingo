"use server";
import { NextResponse } from "next/server";
import DConn from "@/../../db/drizzle";
import { checkRole } from "@/lib/utils";

export async function GET() {
    
    if (!checkRole("admin")){
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