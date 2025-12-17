import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Check, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton"; // We'll create this client component

const prisma = new PrismaClient();

async function getProduct(id: string) {
    return await prisma.product.findUnique({
        where: { id },
    });
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    const images = JSON.parse(product.images) as string[];
    const specs = JSON.parse(product.specifications) as Record<string, string>;

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/products"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Link>
                </div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative">
                            {/* Placeholder for now */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                                <span className="text-6xl font-bold text-gray-200">IMG</span>
                            </div>
                            {/* 
              <Image
                src={images[0] || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="h-full w-full object-cover object-center"
              />
              */}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-primary-600">{product.category}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <p className="space-y-6 text-base text-gray-700">{product.description}</p>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
                            <div className="mt-4 prose prose-sm text-gray-500">
                                <ul role="list" className="space-y-2">
                                    {Object.entries(specs).map(([key, value]) => (
                                        <li key={key} className="flex items-start">
                                            <span className="font-medium text-gray-900 mr-2">{key}:</span>
                                            <span>{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10 flex">
                            <AddToCartButton product={{
                                id: product.id,
                                name: product.name,
                                image: images[0] || "/placeholder.jpg"
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
