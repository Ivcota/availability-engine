"use server";

import { User } from "../models/user-model";
import { revalidatePath } from "next/cache";
import { validateRequest } from "../auth";

export const getUserFromSession = async (): Promise<{
  error?: string;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}> => {
  const session = await validateRequest();

  if (!session.user) {
    return {
      error: "User session not found",
    };
  }

  const user = await User.findById(session.user.id);

  if (!user) {
    return { error: "User not found" };
  }
  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user?.firstName ?? undefined,
      lastName: user?.lastName ?? undefined,
    },
  };
};

type UpdateUserActionState = {
  error?: {
    email?: string;
    general?: string;
  };
};

export const updateUser = async (
  _: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> => {
  const session = await validateRequest();

  if (!session.user) {
    return {
      error: {
        general: "User session not found",
      },
    };
  }

  const emailString = formData.get("email")?.toString();
  const firstNameString = formData.get("firstName")?.toString();
  const lastNameString = formData.get("lastName")?.toString();

  if (!emailString) {
    return {
      error: {
        email: "Email is required",
      },
    };
  }

  const user = await User.findByEmail(emailString);

  if (user?.email === emailString && user.id !== session.user.id) {
    return {
      error: {
        general: "Email already in use",
      },
    };
  }

  try {
    await User.update(session.user.id, {
      email: emailString,
      firstName: firstNameString,
      lastName: lastNameString,
    });
  } catch (error) {
    return {
      error: {
        general: "Error updating user",
      },
    };
  } finally {
    revalidatePath("/dashboard/settings/user-settings");
    return {};
  }
};
