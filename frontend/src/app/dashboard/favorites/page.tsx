"use client";

import { useState } from "react";

// Mock data for demonstration
const mockFavorites = [
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
    likedAt: "2024-01-15",
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
    likedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Black Leather Boots",
    description: "Stylish leather boots, size 9",
    category: "shoes",
    size: "9",
    condition: "good",
    price: 75,
    images: ["https://res.cloudinary.com/djvgfbjjf/image/upload/v1752321817/rewear/clothing/rewear/clothing/68724e2e6b16c05c71cecdf6/e5c30cf3-7662-44f1-85f2-f8bcd63c4e32.jpg"],
    seller: "Mike Johnson",
    likedAt: "2024-01-13",
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
        <p className="mt-2 text-gray-600">Items you've liked and saved for later</p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map(item => (
          <div key={item.id} className="rounded-lg bg-white shadow-sm">
            <div className="relative">
              <img
                src={item.images[0].replace('via.placeholder.com', 'placehold.co')}
                alt={item.title}
                width={300}
                height={400}
                className="h-64 w-full rounded-t-lg object-cover"
              />
              <button
                onClick={() => removeFavorite(item.id)}
                className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
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
                <span>by {item.seller}</span>
                <span>Liked {item.likedAt}</span>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  View Details
                </button>
                <button className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Purchase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No favorites yet. Start browsing items to add some!</p>
        </div>
      )}
    </div>
  );
} 