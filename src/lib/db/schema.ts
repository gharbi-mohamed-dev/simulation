import {
	pgTable,
	bigserial,
	text,
	numeric,
	integer,
	timestamp,
} from "drizzle-orm/pg-core";

export const Simulation = pgTable("simulations", {
	id: bigserial("id", { mode: "number" }).primaryKey(),
	name: text("name").notNull(),
	phone: text("phone").notNull(),
	salary: numeric("salary").notNull(),
	months: integer("months").notNull(),
	previous: numeric("previous").notNull(),
	total: numeric("total").notNull(),
	createdAt: timestamp("createdAt", { mode: "string", withTimezone: true })
		.notNull()
		.defaultNow(),
	deletedAt: timestamp("deletedAt", { mode: "string", withTimezone: true }),
});
