"use server";

import { UserDrizzleRepo } from "../domains/user/user-repo";
import { revalidatePath } from "next/cache";
import { userService } from "../domains/user/user-packaged-service";
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

  const user = await userService.findUserById(session.user.id);

  if (!user) {
    return { error: "User not found" };
  }

  return {
    user: {
      ...user,
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
  const userRepo = new UserDrizzleRepo();
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

  const user = await userService.findUserByEmail(emailString);

  if (user?.email === emailString && user.id !== session.user.id) {
    return {
      error: {
        general: "Email already in use",
      },
    };
  }

  try {
    await userRepo.updateUser(session.user.id, {
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
