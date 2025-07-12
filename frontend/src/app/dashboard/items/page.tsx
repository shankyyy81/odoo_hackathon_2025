import Link from "next/link";

export default function ItemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Items</h2>
        <Link 
          href="/dashboard/items/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Item
        </Link>
      </div>

      {/* Placeholder for items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample item card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Blue Denim Jacket</h3>
            <p className="text-gray-600">Size: M</p>
            <p className="text-gray-600">Condition: Like New</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-green-600 font-semibold">500 points</span>
              <button className="text-blue-600 hover:text-blue-800">Edit</button>
            </div>
          </div>
        </div>

        {/* Add more sample items here */}
      </div>
    </div>
  );
} 