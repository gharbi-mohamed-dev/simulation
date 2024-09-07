import { Schema } from "@effect/schema";
import parsePhoneNumber from "libphonenumber-js";

export const MaybeNumberFromString = Schema.Union(
	Schema.Number,
	Schema.NumberFromString,
);
export const SimulationSchema = Schema.Struct({
	salary: MaybeNumberFromString.pipe(Schema.greaterThanOrEqualTo(30000)),
	months: MaybeNumberFromString.pipe(Schema.int(), Schema.between(6, 24)),
	previous: MaybeNumberFromString.pipe(Schema.nonNegative()),
	total: MaybeNumberFromString.pipe(
		Schema.positive(),
		Schema.lessThanOrEqualTo(1200000),
	),
	name: Schema.Trim.pipe(
		Schema.compose(Schema.Lowercase),
		Schema.compose(Schema.NonEmptyString),
	),
	phone: Schema.Trim.pipe(
		Schema.compose(Schema.Lowercase),
		Schema.compose(Schema.NonEmptyString),
		Schema.filter((value) => {
			const phoneNumber = parsePhoneNumber(value, "DZ");
			if (phoneNumber) {
				return true;
			}
			return {
				path: ["phone"],
				message: "invalid phone number",
			};
		}),
	),
}).pipe(
	Schema.filter(({ salary, previous }) => {
		if (salary <= previous) {
			return {
				path: ["previous"],
				message: "vous avez trop de credit",
			};
		}
		return true;
	}),
);
