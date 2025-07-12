"use client";

import { useState } from "react";

// Mock data for demonstration
const mockPurchases = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition",
    category: "outerwear",
    size: "M",
    condition: "good",
    price: 50,
    images: ["https://res.cloudinary.com/djvgfbjjf/image/upload/v1752321708/rewear/clothing/rewear/clothing/68724e2e6b16c05c71cecdf6/7ca3695a-7231-458d-8f2c-30a249cb8211.jpg"],
    seller: "John Doe",
    purchasedAt: "2024-01-15",
    status: "delivered",
  },
  {
    id: "2",
    title: "White Cotton T-Shirt",
    description: "Comfortable cotton t-shirt, barely worn",
    category: "tops",
    size: "L",
    condition: "like-new",
    price: 0,
    images: ["https://res.cloudinary.com/djvgfbjjf/image/upload/v1752321778/rewear/clothing/rewear/clothing/68724e2e6b16c05c71cecdf6/e36b11c2-0687-41f7-8ec0-7278af5294b6.jpg"],
    seller: "Jane Smith",
    purchasedAt: "2024-01-14",
    status: "in-transit",
  },
];

export default function PurchasesPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPurchases = mockPurchases.filter(purchase => {
    if (selectedStatus === "all") return true;
    return purchase.status === selectedStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Delivered</span>;
      case "in-transit":
        return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">In Transit</span>;
      case "pending":
        return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Purchases</h1>
        <p className="mt-2 text-gray-600">Items you've purchased from the community</p>
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
            All ({mockPurchases.length})
          </button>
          <button
            onClick={() => setSelectedStatus("delivered")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              selectedStatus === "delivered"
                ? "bg-green-100 text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Delivered ({mockPurchases.filter(p => p.status === "delivered").length})
          </button>
          <button
            onClick={() => setSelectedStatus("in-transit")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              selectedStatus === "in-transit"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            In Transit ({mockPurchases.filter(p => p.status === "in-transit").length})
          </button>
        </div>
      </div>

      {/* Purchases Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPurchases.map(purchase => (
          <div key={purchase.id} className="rounded-lg bg-white shadow-sm">
            <div className="relative">
              <img
                src={purchase.images[0].replace('via.placeholder.com', 'placehold.co')}
                alt={purchase.title}
                width={300}
                height={400}
                className="h-64 w-full rounded-t-lg object-cover"
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(purchase.status)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{purchase.title}</h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{purchase.description}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {purchase.category}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {purchase.size}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {purchase.price === 0 ? "Free" : `${purchase.price} pts`}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <span>from {purchase.seller}</span>
                <span>Purchased {purchase.purchasedAt}</span>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  View Details
                </button>
                <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPurchases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No purchases found.</p>
        </div>
      )}
    </div>
  );
} 