// import React from 'react';
// import type { Metadata } from 'next';
// import SEOHeader from '@/components/SEOHeader';

// export const metadata: Metadata = {
//   title: 'DONDOIL Natural Supplement | Premium Wellness Product',
//   description: 'DONDOIL natural supplement - Premium dietary supplement for holistic wellness and immune system support. NAFDAC-approved herbal formula for optimal health.',
//   openGraph: {
//     title: 'DONDOIL Natural Supplement | Premium Wellness Product',
//     description: 'Premium dietary supplement for holistic wellness and immune system support. NAFDAC-approved herbal formula.',
//     type: 'website',
//     locale: 'en_US',
//     siteName: 'DONDOIL Health',
//   }
// };

// export default function ProductPage() {
//   return (
//     <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//       <SEOHeader />
//       {/* Add additional product details and content here */}
//     </main>
//   );
// }


import React from "react";
import type { Metadata } from "next";
import SEOHeader from "@/components/SEOHeader";
import { useParams } from "next/navigation";
import Image from "next/image";

// Import static products
const staticProducts = [
    {
      id: "1",
      name: "DONDOOIL - Family Pack",
      title: "DONDOOIL - Family Pack",
      slug: "dondoil-100ml",
      price: 35000,
      originalPrice: 40000, // Original price before discount
      description: "Holistic healing organic stem cell dietary supplement, an immune booster that boost the immune system from the myeloid and lymphoid progenitor (bone marrow)",
      image: "/images/design-2.jpeg",
      mainImage: "/images/design-2.jpeg",
      category: { name: "Immune Boosters" },
      categoryId: "immune-boosters",
      manufacturer: "DONDOOIL",
      inStock: 1,
      rating: 5,
    },
    {
      id: "2",
      name: "DONDOOIL - 200ml",
      title: "DONDOOIL - 200ml",
      slug: "dondoil-200ml",
      price: 18500,
      originalPrice: 20000,
      description: "Enhanced formula for maximum immunity",
      image: "/images/dosage.png",
      mainImage: "/images/dosage.png",
      category: { name: "Immune Boosters" },
      categoryId: "immune-boosters",
      manufacturer: "DONDOOIL",
      inStock: 1,
      rating: 4,
    },
    {
      id: "3",
      name: "DONDOOIL ",
      title: "DONDOOIL",
      slug: "dondoil-family-pack",
      price: 8000,
      originalPrice: 10000,
      description: "Holistic healing organic stem cell dietary supplement, an immune booster that boost the immune system from the myeloid and lymphoid progenitor (bone marrow)",
      image: "/images/dondooil.jpeg",
      mainImage: "/images/dondooil.jpeg",
      category: { name: "Immune Boosters" },
      categoryId: "immune-boosters",
      manufacturer: "DONDOOIL",
      inStock: 1,
      rating: 5,
    },
    {
      id: "4",
      name: "DONDOOIL - Premium",
      title: "DONDOOIL - Premium",
      slug: "dondoil-premium",
      price: 25000,
      originalPrice: 30000,
      description: "Premium strength formula",
      image: "/images/product-premium.jpeg",
      mainImage: "/images/product-premium.jpeg",
      category: { name: "Immune Boosters" },
      categoryId: "immune-boosters",
      manufacturer: "DONDOOIL",
      inStock: 1,
      rating: 5,
    },
   ];
   
  

export const metadata: Metadata = {
  title: "DONDOIL Natural Supplement | Premium Wellness Product",
  description:
    "DONDOIL natural supplement - Premium dietary supplement for holistic wellness and immune system support. NAFDAC-approved herbal formula for optimal health.",
  openGraph: {
    title: "DONDOIL Natural Supplement | Premium Wellness Product",
    description:
      "Premium dietary supplement for holistic wellness and immune system support. NAFDAC-approved herbal formula.",
    type: "website",
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const product = staticProducts.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-40 flex items-center justify-center">
        <h1 className="text-3xl text-red-600">Product not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-40">
      <SEOHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-green-700">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-gray-600">Category: {product.category.name}</p>
            <p className="text-gray-600">Manufacturer: {product.manufacturer}</p>

            {/* Stock Status */}
            <p
              className={`mt-4 font-semibold ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>

            {/* Buy Button */}
            <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
