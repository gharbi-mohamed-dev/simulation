import {
	pgTable,
	bigserial,
	text,
	numeric,
	integer,
	timestamp,
	bigint,
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

export const User = pgTable("users", {
	id: bigserial("id", { mode: "number" }).primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull(),
	createdAt: timestamp("createdAt", { mode: "string", withTimezone: true })
		.notNull()
		.defaultNow(),
	deletedAt: timestamp("deletedAt", { mode: "string", withTimezone: true }),
});

export const Session = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: bigint("username", { mode: "number" })
		.notNull()
		.references(() => User.id),
	createdAt: timestamp("createdAt", { mode: "string", withTimezone: true })
		.notNull()
		.defaultNow(),
	deletedAt: timestamp("deletedAt", { mode: "string", withTimezone: true }),
});
