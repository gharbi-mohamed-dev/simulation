import { Schema } from "@effect/schema";
import type { PageServerLoad } from "./$types";
import { SimulationSchema } from "$lib/validation";
import { Either } from "effect";
import { simulate } from "$lib/simulation";


export const load: PageServerLoad = async (event) => {
    const getEntry = (name: string) => event.url.searchParams.get(name);
    const entries = {
        months: getEntry("months"),
        total: getEntry("total"),
        salary: getEntry("salary"),
        previous: getEntry("previous"),
        firstName: getEntry("firstName"),
        lastName: getEntry("lastName"),
        phone: getEntry("phone"),
    };

    const either = Schema.decodeUnknownEither(SimulationSchema)(entries);

    
    if (Either.isLeft(either)) {
        return {
            success: false as const,
        }
    } else {
        const data = either.right;
        return {
            success: true as const,
            result: simulate(data),
        }
    }
};