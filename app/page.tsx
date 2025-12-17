import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Globe, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      <section>
        <div className="relative isolate overflow-hidden pt-14">
          <Image
            src="/hero-bg.png"
            alt="Medical Background"
            fill
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-900/90 to-primary-800/60" />

          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in-up">
                Professional Medical Solutions for Global Health
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-100 animate-fade-in-up delay-100" style={{ animationDelay: '100ms' }}>
                Karemax provides high-quality medical equipment and consumables to
                hospitals and distributors worldwide. Trusted quality, competitive
                prices.
              </p>
              <div className="mt-10 flex items-center gap-x-6 animate-fade-in-up delay-200" style={{ animationDelay: '200ms' }}>
                <Link href="/products">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Browse Products
                  </Button>
                </Link>
                <Link href="/contact" className="text-sm font-semibold leading-6 text-white hover:text-gray-200 transition-colors">
                  Contact Us <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div></section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Certified</h3>
                <p className="text-gray-500">All products meet international standards (CE, ISO, FDA) ensuring safety and reliability.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
                <p className="text-gray-500">Serving clients in over 50 countries with dedicated export support and documentation.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Logistics</h3>
                <p className="text-gray-500">Efficient supply chain management to ensure timely delivery of your medical supplies.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-in">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <Link href="/products" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={index * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <ScrollReveal animation="fade-up">
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
        </ScrollReveal>
      </section>
    </div>
  );
}
