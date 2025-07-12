"use client";

import { useState } from "react";

// Mock data for demonstration
const mockItems = [
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
    images: ["https://res.cloudinary.com/djvgfbjjf/image/upload/v1752321778/rewear/clothing/rewear/clothing/68724e2e6b16c05c71cecdf6/e36b11c2-0687-41f7-8ec0-7278af5294b6.jpg"],
    seller: "Jane Smith",
    createdAt: "2024-01-14",
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
    createdAt: "2024-01-13",
  },
];

export default function BrowsePage() {
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    condition: "",
    maxPrice: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredItems = mockItems.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.size && item.size !== filters.size) return false;
    if (filters.condition && item.condition !== filters.condition) return false;
    if (filters.maxPrice && item.price > parseInt(filters.maxPrice)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Items</h1>
        <p className="mt-2 text-gray-600">Discover clothing from the community</p>
      </div>

      {/* Filters */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="dresses">Dresses</option>
              <option value="outerwear">Outerwear</option>
              <option value="shoes">Shoes</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <select
              id="size"
              name="size"
              value={filters.size}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Sizes</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </div>

          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Conditions</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              min="0"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="No limit"
            />
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(item => (
          <div key={item.id} className="rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-w-3 aspect-h-4">
              <img
                src={item.images[0].replace('via.placeholder.com', 'placehold.co')}
                alt={item.title}
                width={300}
                height={400}
                className="h-64 w-full rounded-t-lg object-cover"
              />
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
                <span>{item.condition}</span>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  View Details
                </button>
                <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  ♥
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found matching your filters.</p>
        </div>
      )}
    </div>
  );
} 