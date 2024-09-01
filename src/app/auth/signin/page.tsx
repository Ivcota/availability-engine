"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { signIn } from "~/server/actions/auth/signin";
import { toast } from "~/components/ui/use-toast";

type SignInPageProps = {
  searchParams: {
    success?: string;
  };
};
export default function SignInPage({ searchParams }: SignInPageProps) {
  const [errors, signInAction] = useFormState(signIn, {
    error: {},
  });

  if (searchParams?.success) {
    toast({
      title: "Success",
      description: "Check your email for a temporary password",
    });
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Sign In</h1>
      <form action={signInAction}>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            className="w-full rounded border px-3 py-2"
            name="email"
          />
          {errors.error.email && (
            <p className="text-red-500">{errors.error.email}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            className="w-full rounded border px-3 py-2"
          />
          {errors.error.password && (
            <p className="text-red-500">{errors.error.password}</p>
          )}
        </div>
        <SubmitButton />
        {errors.error.general && (
          <p className="text-red-500">{errors.error.general}</p>
        )}
        <Button asChild variant="link">
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </Button>
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full" type="submit">
      Sign In
    </Button>
  );
};
