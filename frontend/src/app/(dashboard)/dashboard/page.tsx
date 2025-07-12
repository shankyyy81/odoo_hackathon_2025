import { auth, currentUser } from "@clerk/nextjs";

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="mt-6">
        <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
        <p className="mt-2 text-sm text-gray-500">Your user ID is: {userId}</p>
      </div>
    </div>
  );
} 