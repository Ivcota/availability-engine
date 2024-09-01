import { Button } from "~/components/ui/button";
import Link from "next/link";
import React from "react";
import Signout from "../components/signout";
import { validateRequest } from "~/server/auth";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-900">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
          <p className="mb-4">Please sign in to view this page.</p>
          <Button asChild variant="outline">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex bg-gradient-to-r from-gray-700 to-black bg-clip-text text-2xl font-bold tracking-tight text-transparent"
          >
            Dashboard
          </Link>
          <div className="flex gap-3">
            <Button asChild variant="link">
              <Link href="/dashboard/settings/user-settings">Settings</Link>
            </Button>
            <Signout />
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg border-4 border-dashed border-gray-200 p-4 sm:p-6 lg:p-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Welcome, {user?.email}!
              </h2>
              <p className="mb-4 text-gray-600">
                This is your personal dashboard. Here you can view and manage
                your account information, settings, and more.
              </p>

              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default layout;
