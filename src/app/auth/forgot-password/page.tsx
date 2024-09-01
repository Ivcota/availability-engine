"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { forgotPassword } from "~/server/actions/auth/forgot-password";
import { toast } from "~/components/ui/use-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPasswordPage = () => {
  const { register } = useForm<ForgotPasswordFormData>();

  const [errors, forgotPasswordAction] = useFormState(forgotPassword, {});

  useEffect(() => {
    if (errors.error?.general) {
      toast({
        title: "Error",
        description: errors.error.general,
      });
    }
  }, [errors]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Forgot Password</h1>
      <p>Enter your email address and we will send you a temporary password.</p>

      <form action={forgotPasswordAction} className="flex flex-col gap-1">
        <div className="flex flex-col gap-3 py-5">
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Email" {...register("email")} />
        </div>
        <Button className="w-full" type="submit">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
