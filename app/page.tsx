import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Advanced Patient Monitor",
    description: "Multi-parameter patient monitor for ICU and OR use. High resolution display.",
    image: "/placeholder.jpg",
    category: "Medical Equipment",
  },
  {
    id: "2",
    name: "Surgical LED Light",
    description: "Shadowless operating lamp with adjustable color temperature and intensity.",
    image: "/placeholder.jpg",
    category: "Surgical",
  },
  {
    id: "3",
    name: "Digital Ultrasound System",
    description: "Portable ultrasound scanner with high image quality and doppler function.",
    image: "/placeholder.jpg",
    category: "Imaging",
  },
  {
    id: "4",
    name: "Hospital Bed Series",
    description: "Electric ICU bed with weighing scale and multiple position adjustments.",
    image: "/placeholder.jpg",
    category: "Furniture",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Professional Medical Solutions for Global Health
            </h1>
            <p className="text-lg text-primary-100 mb-8">
              Karemax provides high-quality medical equipment and consumables to hospitals and distributors worldwide. Trusted quality, competitive prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                  Browse Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50">
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Certified</h3>
              <p className="text-gray-500">All products meet international standards (CE, ISO, FDA) ensuring safety and reliability.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50">
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-500">Serving clients in over 50 countries with dedicated export support and documentation.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50">
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Logistics</h3>
              <p className="text-gray-500">Efficient supply chain management to ensure timely delivery of your medical supplies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/products" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to place an order?</h2>
          <p className="text-primary-200 mb-8 max-w-2xl mx-auto">
            Contact our sales team for a customized quote or bulk order inquiries. We are here to support your medical supply needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary-900 hover:bg-primary-50">
              Get a Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
