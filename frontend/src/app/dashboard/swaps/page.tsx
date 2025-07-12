export default function SwapsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Swaps</h2>

      {/* Active Swaps */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Active Swaps</h3>
          <div className="space-y-4">
            {/* Sample active swap */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Blue Denim Jacket ↔ Red Sweater</h4>
                  <p className="text-sm text-gray-500">With: John Doe</p>
                  <p className="text-sm text-gray-500">Started: Jan 15, 2024</p>
                </div>
                <span className="px-2 py-1 text-sm font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Swaps */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Completed Swaps</h3>
          <div className="space-y-4">
            {/* Sample completed swap */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Black T-shirt ↔ Blue Jeans</h4>
                  <p className="text-sm text-gray-500">With: Jane Smith</p>
                  <p className="text-sm text-gray-500">Completed: Jan 10, 2024</p>
                </div>
                <span className="px-2 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 