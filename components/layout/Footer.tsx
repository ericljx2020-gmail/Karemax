import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary-400">Karemax</h3>
                        <p className="text-sm text-gray-400">
                            Professional supplier of medical devices and healthcare products. Dedicated to quality and service.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-white">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-white">Products</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
                            Categories
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/products?cat=medical" className="hover:text-white">Medical Equipment</Link>
                            </li>
                            <li>
                                <Link href="/products?cat=consumables" className="hover:text-white">Consumables</Link>
                            </li>
                            <li>
                                <Link href="/products?cat=lab" className="hover:text-white">Lab Supplies</Link>
                            </li>
                            <li>
                                <Link href="/products?cat=homecare" className="hover:text-white">Home Care</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">
                            Contact Us
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary-400" />
                                <span>123 Medical Park, Shanghai, China</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary-400" />
                                <span>+86 21 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary-400" />
                                <span>info@karemax.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Karemax. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
