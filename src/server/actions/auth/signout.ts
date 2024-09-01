"use server";

import { lucia, validateRequest } from "~/server/auth";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<{ error?: string }> {
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await lucia.invalidateSession(session.id);
  } catch (error) {
    return {
      error: "trouble invalidating session",
    };
  }
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
