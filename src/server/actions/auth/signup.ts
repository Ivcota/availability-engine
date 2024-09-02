"use server";

import { UserDTO } from "~/server/dto/user";
import { cookies } from "next/headers";
import { lucia } from "~/server/auth";
import { redirect } from "next/navigation";
import { userService } from "~/server/domains/user/user-packaged-service";
import { z } from "zod";

const SignupSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
  firstName: z.string().max(255).optional(),
  lastName: z.string().max(255).optional(),
});

type SignupActionResult = {
  error?: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    general?: string;
  };
};

async function signup(
  _: SignupActionResult,
  formData: FormData,
): Promise<SignupActionResult> {
  const formDataObject = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    firstName: formData.get("firstName")?.toString(),
    lastName: formData.get("lastName")?.toString(),
  };

  const result = SignupSchema.safeParse(formDataObject);

  if (!result.success) {
    return {
      error: {
        general: result.error.issues.map((issue) => issue.message).join(", "),
      },
    };
  }

  const { email, password, firstName, lastName } = result.data;

  const existingUser = await userService.findUserByEmail(email);

  if (existingUser) {
    return {
      error: {
        general: "Email already in use",
      },
    };
  }

  let user: UserDTO | null = null;

  try {
    user = await userService.createUser({
      email,
      password,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (error) {
    return {
      error: {
        general: (error as Error).message,
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

  return redirect("/");
}

export { signup };
