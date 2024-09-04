CREATE TABLE IF NOT EXISTS "simulations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"salary" numeric NOT NULL,
	"months" integer NOT NULL,
	"previous" numeric NOT NULL,
	"total" numeric NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp with time zone
);
