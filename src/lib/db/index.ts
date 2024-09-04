import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import {
	POSTGRES_DB,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
} from "$env/static/private";

// for query purposes
const queryClient = postgres({
	database: POSTGRES_DB,
	password: POSTGRES_PASSWORD,
	port: +POSTGRES_PORT,
	user: POSTGRES_USER,
	host: POSTGRES_HOST,
});
export const db = drizzle(queryClient, {
	schema,
});
