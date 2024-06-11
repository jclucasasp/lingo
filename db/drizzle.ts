import { neon } from "@neondatabase/serverless";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

let db: BetterSQLite3Database<typeof schema> | null = null;

if (process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0) {
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql, {schema});
} else {
    throw new Error("Process.env or process.env.DATABASE_URL does not exixt in root.");
}

export default db;