"use client";

import { useState } from "react";

// Mock data for demonstration
const mockMyItems = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition",
    category: "outerwear",
    size: "M",
    condition: "good",
    price: 50,
    images: ["https://via.placeholder.com/300x400"],
    status: "active",
    views: 12,
    likes: 3,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "White Cotton T-Shirt",
    description: "Comfortable cotton t-shirt, barely worn",
    category: "tops",
    size: "L",
    condition: "like-new",
    price: 0,
    images: ["https://via.placeholder.com/300x400"],
    status: "sold",
    views: 8,
    likes: 1,
    createdAt: "2024-01-14",
  },
];

export default function MyItemsPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredItems = mockMyItems.filter(item => {
    if (selectedStatus === "all") return true;
    return item.status === selectedStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Active</span>;
      case "sold":
        return <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">Sold</span>;
      case "pending":
        return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Items</h1>
          <p className="mt-2 text-gray-600">Manage your clothing listings</p>
        </div>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add New Item
        </button>
      </div>

      {/* Status Filter */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              selectedStatus === "all"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All ({mockMyItems.length})
          </button>
          <button
            onClick={() => setSelectedStatus("active")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              selectedStatus === "active"
                ? "bg-green-100 text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Active ({mockMyItems.filter(item => item.status === "active").length})
          </button>
          <button
            onClick={() => setSelectedStatus("sold")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              selectedStatus === "sold"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sold ({mockMyItems.filter(item => item.status === "sold").length})
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(item => (
          <div key={item.id} className="rounded-lg bg-white shadow-sm">
            <div className="relative">
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-64 w-full rounded-t-lg object-cover"
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(item.status)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.description}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {item.size}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {item.price === 0 ? "Free" : `${item.price} pts`}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <div className="flex space-x-4">
                  <span>👁 {item.views} views</span>
                  <span>♥ {item.likes} likes</span>
                </div>
                <span>{item.condition}</span>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Edit
                </button>
                <button className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View
                </button>
                <button className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found.</p>
        </div>
      )}
    </div>
  );
} 