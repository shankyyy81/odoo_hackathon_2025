"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    condition: "",
    price: "",
    images: [] as File[],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call to backend
      console.log("Submitting item:", formData);
      
      // For now, just redirect back to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Item</h1>
        <p className="mt-2 text-gray-600">List a clothing item for the community to discover</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Item Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Vintage Denim Jacket"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe your item, including brand, material, style, etc."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select category</option>
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
              Size *
            </label>
            <select
              id="size"
              name="size"
              required
              value={formData.size}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select size</option>
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
              Condition *
            </label>
            <select
              id="condition"
              name="condition"
              required
              value={formData.condition}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (in points) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0"
          />
          <p className="mt-1 text-sm text-gray-500">Set to 0 for free exchange</p>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Images *
          </label>
          <input
            type="file"
            id="images"
            name="images"
            required
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">Upload up to 5 images of your item</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
} 