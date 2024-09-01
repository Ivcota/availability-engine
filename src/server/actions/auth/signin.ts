"use server";

import { User } from "~/server/models/user-model";
import { cookies } from "next/headers";
import { hashPassword } from "~/server/utils/utils";
import { lucia } from "~/server/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1).max(255),
});

type SignInActionState = {
  error: {
    email?: string;
    password?: string;
    general?: string;
  };
};

export async function signIn(
  _: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const emailString = formData.get("email")?.toString();
  const passwordString = formData.get("password")?.toString();

  if (!emailString || !passwordString) {
    return {
      error: {
        email: "Email is required",
        password: "Password is required",
      },
    };
  }

  const result = SignInSchema.parse({
    email: emailString,
    password: passwordString,
  });

  const { email, password } = result;

  const user = await User.findByEmail(email);

  if (!user) {
    return {
      error: {
        general: "User not found",
      },
    };
  }

  const passwordHash = hashPassword(password);
  if (user.password !== passwordHash) {
    return {
      error: {
        general: "Invalid email or password",
      },
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/"); // Redirect to dashboard or home page after successful sign-in
}
