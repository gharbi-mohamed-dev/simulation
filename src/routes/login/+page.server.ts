import { db } from "$lib/db";
import { User, Session } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { dev } from "$app/environment";

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = String(formData.get("username"));
		const password = String(formData.get("password"));

		if (!username) {
			return fail(400, {
				success: false as const,
			});
		}
		const [user] = await db
			.select()
			.from(User)
			.where(eq(User.username, username));

		if (!user) {
			return fail(400, {
				success: false as const,
			});
		}
		const passwordMatch = await new Argon2id().verify(
			user.hashedPassword,
			password,
		);

		if (!passwordMatch) {
			return fail(400, {
				success: false as const,
			});
		}
		const [session] = await db
			.insert(Session)
			.values({
				id: crypto.randomUUID(),
				userId: user.id,
			})
			.returning();
		event.cookies.set("X-SESSION", session.id, {
			path: "/",
			sameSite: "strict",
			httpOnly: true,
			secure: !dev,
			maxAge: Number.MAX_SAFE_INTEGER,
		});
		redirect(302, "/pages");
	},
} satisfies Actions;
