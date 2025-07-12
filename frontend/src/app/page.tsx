import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = auth();

  // If user is already signed in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Welcome to ReWear
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Please sign in to access your dashboard
        </p>
        <div className="space-x-4">
          <Link
            href="/sign-in"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
} 