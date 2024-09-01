"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { signup } from "~/server/actions/auth/signup";
import { toast } from "~/components/ui/use-toast";
import { useEffect } from "react";

const SignupPage = () => {
  const [{ error }, signupAction] = useFormState(signup, {});

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.general,
      });
    }
  }, [error]);

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Create an account</h1>
      <form action={signupAction}>
        <div className="mb-4">
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded border px-3 py-2"
          />
          {!!error?.email && <p className="text-red-500">{error.email}</p>}
        </div>
        <div className="mb-4">
          <Label htmlFor="password" className="mb-2 block">
            Password
          </Label>
          <Input
            type="password"
            required
            minLength={6}
            id="password"
            name="password"
            className="w-full rounded border px-3 py-2"
          />
          {!!error?.password && (
            <p className="text-red-500">{error.password}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="firstName" className="mb-2 block">
            First Name (Optional)
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            className="w-full rounded border px-3 py-2"
          />
          {!!error?.firstName && (
            <p className="text-red-500">{error.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="lastName" className="mb-2 block">
            Last Name (Optional)
          </Label>
          <Input name="lastName" id="lastName" type="text" />
        </div>
        <div className="flex flex-col justify-start">
          <SubmitButton />
          <Button asChild variant="link">
            <Link href="/auth/signin">Already have an account? Sign in</Link>
          </Button>
        </div>
      </form>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full" type="submit">
      Sign Up
    </Button>
  );
};

export default SignupPage;
