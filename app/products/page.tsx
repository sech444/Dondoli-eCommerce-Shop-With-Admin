// app/products/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { staticProducts, getProductBySlug } from "@/app/_data/products";

export const metadata: Metadata = {
  title: "Products | DONDOOIL",
  description: "Browse our range of DONDOOIL health products",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-48">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {staticProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-green-800">{product.name}</h2>
                  <p className="text-gray-600 mt-2 h-12 overflow-hidden">{product.description.substring(0, 80)}...</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-green-700 font-bold">₦{product.price.toLocaleString()}</p>
                    {product.originalPrice > product.price && (
                      <p className="text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}