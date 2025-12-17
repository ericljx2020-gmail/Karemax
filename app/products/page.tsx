import { PrismaClient } from "@prisma/client";
import { ProductCard } from "@/components/product/ProductCard";
import { Search } from "lucide-react";

const prisma = new PrismaClient();

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

async function getProducts(query?: string) {
    const where = query
        ? {
            OR: [
                { name: { contains: query } },
                { description: { contains: query } },
                { category: { contains: query } },
            ],
        }
        : {};

    return await prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { q?: string; cat?: string };
}) {
    const query = searchParams.q || searchParams.cat;
    const products = await getProducts(query);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Browse our wide range of medical equipment and supplies.
                        </p>
                    </div>

                    {/* Simple Search Form */}
                    <form className="mt-4 md:mt-0 flex gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                name="q"
                                placeholder="Search products..."
                                defaultValue={searchParams.q}
                                className="w-full md:w-64 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                            <button type="submit" className="absolute right-2 top-2.5 text-gray-400 hover:text-primary-600">
                                <Search className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No products found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={{
                                    ...product,
                                    category: product.category || "Uncategorized",
                                    // Ensure image is a string, handle JSON parsing if needed or assume it's a string in the component
                                    // In seed we stored it as JSON string of array.
                                    // ProductCard expects a single string image.
                                    image: JSON.parse(product.images)[0] || "/placeholder.jpg",
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
