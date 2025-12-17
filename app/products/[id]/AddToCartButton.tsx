"use client";

import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { useCart, Product } from "@/components/inquiry/CartContext";

export function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <Button
            onClick={() => addToCart(product)}
            size="lg"
            className="flex-1 max-w-xs gap-2"
        >
            <ShoppingCart className="h-5 w-5" />
            Add to Inquiry Cart
        </Button>
    );
}
