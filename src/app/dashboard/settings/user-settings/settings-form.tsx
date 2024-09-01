"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { updateUser } from "~/server/actions/user-actions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type UserSettingsFormData = {
  email: string;
  firstName: string;
  lastName: string;
};

type Props = {
  user: {
    error?: string;
    user?: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
    };
  };
};

const SettingsForm = ({ user }: Props) => {
  const { register } = useForm<UserSettingsFormData>({
    defaultValues: {
      email: user?.user?.email,
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
    },
  });

  const [errors, updateUserAction] = useFormState(updateUser, { error: {} });

  useEffect(() => {
    if (errors.error?.general) {
      toast({
        title: "Error",
        description: errors.error.general,
      });
    }
  }, [errors]);

  return (
    <form action={updateUserAction}>
      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block">
          Email
        </label>
        <Input id="email" {...register("email")} />
        {errors.error?.email && (
          <p className="text-red-500">{errors.error.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="firstName" className="mb-2 block">
          First Name
        </label>
        <Input id="firstName" {...register("firstName")} />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="mb-2 block">
          Last Name
        </label>
        <Input id="lastName" {...register("lastName")} />
      </div>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-fit" type="submit">
      Save
    </Button>
  );
};

export default SettingsForm;
