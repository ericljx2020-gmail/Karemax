"use client";

import { createProduct } from "@/actions/product";
import { Button } from "@/components/ui/Button";

export default function NewProductPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Add New Product</h1>

            <form action={createProduct} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary-50 file:text-primary-700
              hover:file:bg-primary-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload a product image (PNG, JPG).</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Specifications (JSON)</label>
                    <textarea
                        name="specifications"
                        rows={4}
                        defaultValue='{"Feature 1": "Value 1", "Feature 2": "Value 2"}'
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 font-mono text-sm"
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Create Product</Button>
                </div>
            </form>
        </div>
    );
}
