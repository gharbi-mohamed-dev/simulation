import { Schema } from "@effect/schema";
import type { PageServerLoad } from "./$types";
import { SimulationSchema } from "$lib/validation";
import { Either } from "effect";
import { simulate } from "$lib/simulation";
import { db } from "$lib/db";
import { Simulation } from "$lib/db/schema";

export const load: PageServerLoad = async (event) => {
	const getEntry = (name: string) => event.url.searchParams.get(name);
	const entries = {
		months: getEntry("months"),
		total: getEntry("total"),
		salary: getEntry("salary"),
		previous: getEntry("previous"),
		name: getEntry("name"),
		phone: getEntry("phone"),
	};

	const either = Schema.decodeUnknownEither(SimulationSchema)(entries);

	if (Either.isLeft(either)) {
		return {
			success: false as const,
		};
	}
	const data = either.right;
	await db
		.insert(Simulation)
		.values({
			name: data.name,
			salary: data.salary,
			months: data.months,
			previous: data.previous,
			phone: data.phone,
			total: data.total,
		})
		.onConflictDoNothing();
	return {
		success: true as const,
		result: simulate(data),
	};
};
