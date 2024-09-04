import { config } from "dotenv";
config();
import { defineConfig } from "drizzle-kit";
export default defineConfig({
	schema: "./src/lib/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		database: process.env.POSTGRES_DB!,
		password: process.env.POSTGRES_PASSWORD!,
		port: +process.env.POSTGRES_PORT!,
		user: process.env.POSTGRES_USER!,
		host: process.env.POSTGRES_HOST!,
	},
	verbose: true,
	strict: true,
});
