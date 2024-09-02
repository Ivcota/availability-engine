"use server";

import { EmailTemplate } from "~/app/components/emails/email.base";
import { Resend } from "resend";
import { User } from "~/server/models/user-model";
import { UserDTO } from "~/server/dto/user";
import { UserDrizzleRepo } from "~/server/domains/user/user-repo";
import { addMinutes } from "date-fns";
import { redirect } from "next/navigation";
import { z } from "zod";

// const resend = new Resend(env.RESEND_KEY);
const resend = new Resend("test");

const ForgotPasswordSchema = z.object({
  email: z.string().email().max(255),
});

type ForgotPasswordActionState = {
  error?: {
    email?: string;
    general?: string;
  };
  sucess?: boolean;
};

export async function forgotPassword(
  _: ForgotPasswordActionState,
  formData: FormData,
): Promise<ForgotPasswordActionState> {
  const userRepo = new UserDrizzleRepo();
  const emailString = formData.get("email");

  const result = ForgotPasswordSchema.safeParse({ email: emailString });

  if (!result.success) {
    return {
      error: {
        general: result.error.issues.map((issue) => issue.message).join(", "),
      },
    };
  }

  const { email } = result.data;

  const user = await userRepo.findUserByEmail(email);

  if (!user) {
    return {
      error: {
        general: "No user found with that email",
      },
    };
  }

  const isCooldown = checkCooldown(user);

  if (isCooldown) {
    return {
      error: {
        general: "You can only resend a password reset link every 15 minutes.",
      },
    };
  }

  const password = await User.generatePasswordForEmail(email);

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev", email],
    subject: "Password reset request",
    react: EmailTemplate({ password }),
    text: "Password reset link",
  });

  if (error) {
    return {
      error: {
        general: "Email Error: " + error.message,
      },
    };
  }

  redirect("/auth/signin?success=true");
}
function checkCooldown(user: UserDTO) {
  const { passwordResetTimestamp } = user;
  if (!passwordResetTimestamp) return false;
  const cooldownExpiration = addMinutes(passwordResetTimestamp, 15);
  if (new Date() > cooldownExpiration) return false;
  return true;
}
