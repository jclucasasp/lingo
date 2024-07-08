import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/../db/schema";

export default function DConn() {
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0) {
        const sql = neon(process.env.DATABASE_URL);
        return drizzle(sql, { schema });
        // return drizzle(sql, { schema, logger: true });
    } else {
        throw new Error("Process.env or process.env.DATABASE_URL does not exixt in root.");
    }
}