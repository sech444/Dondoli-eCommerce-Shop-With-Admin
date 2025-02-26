import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import AddToCartSingleProductBtn from "@/components/AddToCartSingleProductBtn";
import { FaSquareFacebook, FaSquareXTwitter, FaSquarePinterest } from "react-icons/fa6";

const staticProducts = [
  {
    id: "1",
    name: "DONDOOIL - Family Pack",
    title: "DONDOOIL - Family Pack",
    slug: "dondoil-100ml",
    price: 35000,
    originalPrice: 40000,
    discount: true,
    discountPercentage: 12.5,  // (40000 - 35000) / 40000 * 100 = 12.5%
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
    price: 5000,
    description: "Holistic healing organic stem cell dietary supplement, an immune booster that boost the immune system from the myeloid and lymphoid progenitor (bone marrow)",
    image: "/images/dondooil.png",
    mainImage: "/images/dondooil.png",
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
    price: 250000,
    description: "Premium strength formula",
    image: "/images/product-premium.png",
    mainImage: "/images/product-premium.png",
    category: { name: "Immune Boosters" },
    categoryId: "immune-boosters",
    manufacturer: "DONDOOIL",
    inStock: 1,
    rating: 5,
  },
];


// ✅ Generate metadata dynamically
export async function generateMetadata({ params }: { params: { productSlug: string } }): Promise<Metadata> {
  const product = staticProducts.find((p) => p.slug === params.productSlug);
  return {
    title: product ? `${product.name} | DONDOIL` : "Product Not Found",
    description: product ? product.description : "This product does not exist.",
  };
}

// ✅ Main product details page
export default function ProductDetailPage({ params }: { params: { productSlug: string } }) {
  const product = staticProducts.find((p) => p.slug === params.productSlug);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl text-red-600">Product Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-48">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Image src={product.image} alt={product.name} width={400} height={400} className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-green-700">&#8358;{product.price.toLocaleString()}</p>
            <p className="text-gray-600">Category: {product.category.name}</p>
            <p className="text-gray-600">Manufacturer: {product.manufacturer}</p>
            <p className={`mt-4 font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <div className="flex flex-col gap-y-2 max-[500px]:items-center">
                <div className="text-lg flex gap-x-2">
                  <span>Share:</span>
                  <div className="flex items-center gap-x-1 text-2xl">
                    <FaSquareFacebook />
                    <FaSquareXTwitter />
                    <FaSquarePinterest />
                  </div>
                </div>

                {/* ✅ Replace with dynamic button */}
                <AddToCartSingleProductBtn product={product} quantityCount={1} />
              </div>

           
          </div>
        </div>
      </div>
    </main>
  );
}
