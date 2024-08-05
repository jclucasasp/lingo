import { NextRequest, NextResponse } from "next/server";
import DConn from "@/../../db/drizzle";
import { checkRole } from "@/lib/utils";


export async function GET() {

    if (!checkRole("admin")) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const headers = new Headers();
    const res = await DConn().query.units.findMany()
        .then((u) => {
            console.log("Setting headers to length: ", u.length);
            headers.set("content-range", u.length.toString());
            return u;
        })
        .catch((err) => {
            console.error(err);
            return NextResponse.json({ error: "Error fetching units" }, { status: 500 });
        });

    return NextResponse.json(res, { status: 200, headers });
}