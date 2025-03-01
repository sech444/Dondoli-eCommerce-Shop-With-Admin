
// ProductItem.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/types";

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
    
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs w-full transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <Link href={`/products/${slug}`}>
          <div className="relative h-96 w-full"> {/* Changed from h-64 to h-72 for more height */}
            <Image
              src={image}
              alt={name}
              fill
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
        <Link href={`/products/${slug}`}>
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
          <Link
        href={`/products/${product?.slug}`}
        className="block flex justify-center items-center w-full uppercase text-orange-400 px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2"
      >
        <p>View product</p>
      </Link>
        <button className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-${color}-700 transition-colors`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;