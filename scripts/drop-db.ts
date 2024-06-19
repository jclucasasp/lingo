import DConn from "@/../db/drizzle";
import "dotenv/config";
import { courses, units, lessons, challenges, challengeOptions, challengeProgress, userProgress } from "@/../db/schema";
import { sql } from "drizzle-orm/sql";

async function dropTables() {
    console.log("Dropping tables...");

    await DConn().execute(sql`DROP TABLE IF EXISTS ${userProgress} CASCADE`).catch((e) => console.error("Unable to delete userProgress: ", e.message));

    await DConn().execute(sql`DROP TABLE IF EXISTS ${courses} CASCADE`).catch((e) => console.error("Unable to delete courses: ", e.message));

    await DConn().execute(sql`DROP TABLE IF EXISTS ${units} CASCADE`).catch((e) => console.error("Unable to delete userProgress: ", e.message));

    await DConn().execute(sql`DROP TABLE IF EXISTS ${lessons} CASCADE`).catch((e) => console.error("Unable to delete userProgress: ", e.message));

    await DConn().execute(sql`DROP TABLE IF EXISTS ${challenges} CASCADE`).catch((e) => console.error("Unable to delete userProgress: ", e.message));

    await DConn().execute(sql`DROP TABLE IF EXISTS ${challengeOptions} CASCADE`).catch((e) => console.error("Unable to delete userProgress: ", e.message));

    await DConn().execute(sql`DROP TABLE IF EXISTS ${challengeProgress} CASCADE`).catch((e) => console.error("Unable to delete userProgress: ", e.message));

    console.log("Tables dropped");
}

dropTables();