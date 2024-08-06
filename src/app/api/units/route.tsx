import { NextRequest, NextResponse } from "next/server";
import { UnitPostBodyInterface } from "@/app/api/interfaces/interface";
import { checkRole } from "@/lib/utils";
import { units } from "@/../../db/schema";
import DConn from "@/../../db/drizzle";
import { count } from "drizzle-orm";


export async function GET() {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const headers = new Headers();
    const res = await DConn().query.units.findMany()
        .then((u) => {
            headers.set("content-range", u.length.toString());
            return u;
        })
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error fetching units" }, { status: 500 });
        });

    return NextResponse.json(res, { status: 200, headers });
}

export async function POST(req: NextRequest) {
    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body: UnitPostBodyInterface = await req.json();
    const existingUnits = await DConn().select({ count: count() }).from(units);
    body.id = (existingUnits[0].count + 1);
    body.order = body.id;

    const res = await DConn().insert(units).values(body).returning()
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error creating unit" }, { status: 500 });
        });

    return NextResponse.json({res, id: body.id}, { status: 200 });
}