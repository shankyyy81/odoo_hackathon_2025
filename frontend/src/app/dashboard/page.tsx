import { UserProfile } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

export default async function DashboardPage() {
  const user = await currentUser();
  
  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-semibold">Welcome, {user?.firstName || 'User'}!</h2>
          <div className="mt-4 flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-green-800">Available Points</p>
              <p className="text-2xl font-bold text-green-900">500</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800">Active Swaps</p>
              <p className="text-2xl font-bold text-blue-900">2</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-sm text-purple-800">Listed Items</p>
              <p className="text-2xl font-bold text-purple-900">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
          <UserProfile />
        </div>
      </div>
    </div>
  );
} 