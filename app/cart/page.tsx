"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Send, ArrowRight } from "lucide-react";
import { useCart } from "@/components/inquiry/CartContext";
import { Button } from "@/components/ui/Button";
import { submitInquiry } from "@/actions/inquiry";

export default function CartPage() {
    const { items, removeFromCart, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const result = await submitInquiry(formData, items);

        setIsSubmitting(false);

        if (result.success) {
            setIsSuccess(true);
            clearCart();
        } else {
            alert(result.message);
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
                <div className="rounded-full bg-green-100 p-4 text-green-600 mb-4">
                    <Send className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Sent!</h1>
                <p className="text-gray-600 max-w-md mb-8">
                    Thank you for your interest. Our sales team has received your inquiry and will contact you shortly.
                </p>
                <Link href="/products">
                    <Button>Continue Browsing</Button>
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Inquiry Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Browse our products and add items to your inquiry list.</p>
                <Link href="/products">
                    <Button>
                        Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Inquiry Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Product List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <ul className="divide-y divide-gray-200">
                                {items.map((item, index) => (
                                    <li key={`${item.id}-${index}`} className="p-4 flex items-center gap-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center">
                                            {/* Placeholder */}
                                            <span className="text-xs text-gray-400">IMG</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                <Link href={`/products/${item.id}`} className="hover:underline">
                                                    {item.name}
                                                </Link>
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Company / Organization
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message / Specific Requirements
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                                    ></textarea>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                                </Button>
                                <p className="text-xs text-gray-500 text-center">
                                    We will respond within 24 hours.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
