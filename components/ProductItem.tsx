
// ProductItem.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/types";
import AddToCartSingleProductBtn from "./AddToCartSingleProductBtn";

interface ProductItemProps {
  product: Product;
  color: string;
}

const ProductItem = ({ product, color }: ProductItemProps) => {
  const { id, name, price, originalPrice, description, image, slug } = product;
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

    // Function to get custom height for each product
    const getImageHeight = (productId: string) => {
      switch(productId) {
        case "1": return "h-64"; // Family Pack - tallest
        case "2": return "h-96 w-full"; // 200ml - medium-tall
        case "3": return "h-72"; // Regular - default height
        case "4": return "h-88"; // Premium - between tall and medium
        default: return "h-72"; // Default
      }
    }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs w-full transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <Link href={`/products/${product?.slug}`}>
          <div className={`relative h-96 w-full${getImageHeight(id)}`}> 
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="transition-opacity duration-300 hover:opacity-90"
            />
          </div>
          
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm">
              {discountPercentage}% OFF
            </div>
          )}
        </Link>
      </div>
      
      <div className="p-4">
      <Link href={`/products/${product?.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {description}
        </p>
        
        <div className="flex items-center mb-4">
          {hasDiscount && (
            <span className="text-xl font-bold text-gray-500 line-through mr-4">
              ₦{originalPrice.toLocaleString()}
            </span>
          )}
          <span className={`text-xl font-bold text-green-600`}>
            ₦{price.toLocaleString()}
          </span>
        </div>
          {/* <Link
        href={`/products/${product?.slug}`}
        className="block flex justify-center items-center w-full uppercase text-orange-400 px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2"
      >
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
        <p>View product</p>
      </Link> */}
      <Link
        href={`/products/${product?.slug}`}
        className="block flex justify-center items-center w-full uppercase text-orange-400 px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2"
      >
        <p>View product</p>
      </Link>
        <button className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-${color}-700 transition-colors`}>
           {/* ✅ Replace with dynamic button */}
           <AddToCartSingleProductBtn product={product} quantityCount={1} />
             
        </button>
      </div>
    </div>
  );
};

export default ProductItem;