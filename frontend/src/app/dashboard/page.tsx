import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
        <p className="mt-2 text-gray-600">Manage your clothing exchange activities</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add New Item */}
        <Link href="/dashboard/add-item" className="group">
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Add New Item</h3>
            <p className="mt-2 text-sm text-gray-600">List a clothing item for exchange</p>
          </div>
        </Link>

        {/* My Items */}
        <Link href="/dashboard/my-items" className="group">
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-200">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">My Items</h3>
            <p className="mt-2 text-sm text-gray-600">View and manage your listings</p>
          </div>
        </Link>

        {/* Browse Items */}
        <Link href="/dashboard/browse" className="group">
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 group-hover:bg-purple-200">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Browse Items</h3>
            <p className="mt-2 text-sm text-gray-600">Discover clothing from the community</p>
          </div>
        </Link>

        {/* My Purchases */}
        <Link href="/dashboard/purchases" className="group">
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 group-hover:bg-orange-200">
              <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">My Purchases</h3>
            <p className="mt-2 text-sm text-gray-600">View items you've purchased</p>
          </div>
        </Link>

        {/* Favorites */}
        <Link href="/dashboard/favorites" className="group">
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 group-hover:bg-red-200">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Favorites</h3>
            <p className="mt-2 text-sm text-gray-600">Your liked items</p>
          </div>
        </Link>

        {/* Profile */}
        <Link href="/dashboard/profile" className="group">
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Profile</h3>
            <p className="mt-2 text-sm text-gray-600">Manage your account</p>
          </div>
        </Link>
      </div>
    </div>
  );
} 