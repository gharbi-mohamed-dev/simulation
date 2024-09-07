import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import {
	POSTGRES_DB,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_USER,
} from "$env/static/private";

// for query purposes
const queryClient = postgres({
	database: POSTGRES_DB,
	password: POSTGRES_PASSWORD,
	user: POSTGRES_USER,
	host: POSTGRES_HOST,
	debug: true,
});
export const db = drizzle(queryClient, {
	schema,
});
