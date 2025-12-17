"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart, Product } from "@/components/inquiry/CartContext";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        description: string;
        image: string;
        category: string;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        addToCart({
            id: product.id,
            name: product.name,
            image: product.image,
        });
        // Optional: Show toast notification
    };

    return (
        <Link href={`/products/${product.id}`} className="group block h-full">
            <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                </div>
                <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 text-xs font-medium text-primary-600 uppercase tracking-wide">
                        {product.category}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                        {product.name}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-gray-500 line-clamp-2">
                        {product.description}
                    </p>
                    <Button
                        onClick={handleAddToCart}
                        className="w-full gap-2"
                        variant="secondary"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Inquiry
                    </Button>
                </div>
            </div>
        </Link>
    );
}
