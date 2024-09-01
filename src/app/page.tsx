import { Button } from "~/components/ui/button";
import Link from "next/link";
import { validateRequest } from "~/server/auth";

export default async function HomePage() {
  const { user } = await validateRequest();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-900">
      <div className="container mx-auto mb-32 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="bg-gradient-to-br from-gray-600 to-black bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
              The oppinionated starter for fast and modern web development
            </h1>
            <p className="bg-gradient-to-br from-gray-600 to-gray-700 bg-clip-text text-xl font-light text-transparent sm:text-2xl">
              From idea to product so you can focus on features
            </p>
          </div>

          <div className="pt-10">
            {user ? (
              <div className="flex flex-col items-center gap-3 rounded-lg border px-6 py-12">
                <p className="text-xl font-medium text-gray-900">
                  Welcome back,{" "}
                  <span className="font-semibold text-gray-900">
                    {user.email}
                  </span>
                  !
                </p>
                <p className="mt-2 text-gray-600">
                  You are signed in. Continue exploring our features or visit
                  your dashboard.
                </p>
                <Button className="w-fit" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-center gap-4">
                  <Button asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
