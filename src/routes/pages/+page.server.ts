import { db } from "$lib/db";
import { Session, Simulation } from "$lib/db/schema";
import { eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { Schema } from "@effect/schema";
import { Either } from "effect";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	const either = Schema.decodeUnknownEither(Schema.DateFromString)(
		event.url.searchParams.get("date"),
	);
	const cookie = event.cookies.get("X-SESSION");
	if (!cookie) {
		redirect(303, "/login");
	}
	const [session] = await db
		.select()
		.from(Session)
		.where(eq(Session.id, cookie));
	if (!session || session.deletedAt) {
		redirect(303, "/login");
	}
	let date = new Date();
	if (Either.isRight(either)) {
		date = either.right;
	}
	console.log(date.toISOString());
	const simulations = await db
		.select()
		.from(Simulation)
		.where(sql`${Simulation.createdAt}::date = ${date.toDateString()}::date`);

	return {
		simulations,
	};
};
