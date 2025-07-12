


// // ProductItem.tsx
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Product } from "../lib/types";
// import AddToCartSingleProductBtn from "./AddToCartSingleProductBtn";

// interface ProductItemProps {
//   product: Product;
//   color?: string;
// }

// const ProductItem = ({ product, color}: ProductItemProps) => {
//   const { id, name, title, price, originalPrice, description, mainImage, slug } = product;
//   const hasDiscount = originalPrice && originalPrice > price;
//   const discountPercentage = hasDiscount
//     ? Math.round(((originalPrice - price) / originalPrice) * 100)
//     : 0;

//   // REMOVED getImageHeight function
//   // We will use a consistent height for ALL images to make boxes uniform

//   return (
//     // Make the outer div a flex container (column) and set its height to full if placed in a grid with items-stretch
//     <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs w-full transition-transform duration-300 hover:scale-105 flex flex-col h-full">
//       <div className="relative">
//         <Link href={`/products/${product?.slug}`}>
//           {/* Use a consistent height for the image container, e.g., h-72 (288px) or h-80 (320px) */}
//           {/* This height will be applied to ALL product images */}
//           <div className="relative h-72 w-full"> {/* Changed getImageHeight(id) to a fixed h-72 */}
//             <Image
//               src={mainImage}
//               alt={title || name}
//               fill
//               // The sizes prop needs to be accurate for image optimization.
//               // If the max-w-xs is 320px, then 100vw is usually accurate for small screens.
//               // For larger screens, it depends on the grid layout where ProductItem is used.
//               // Assuming it's in a grid where the item maxes out at ~320px.
//               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 320px" // Adjusted for max-w-xs (320px)
//               style={{ objectFit: 'contain' }} // Changed objectFit to 'contain' to show full image
//               className="transition-opacity duration-300 hover:opacity-90"
//             />
//           </div>

//           {hasDiscount && (
//             <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm">
//               {discountPercentage}% OFF
//             </div>
//           )}
//         </Link>
//       </div>

//       {/* Make the content area flexible to fill remaining space */}
//       <div className="p-4 flex-grow flex flex-col">
//         <Link href={`/products/${product?.slug}`}>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
//             {title || name}
//           </h3>
//         </Link>

//         {/* Use line-clamp-3 for a bit more description, adjust mb-auto to push buttons down */}
//         <p className="text-gray-600 text-sm line-clamp-3 mb-auto">
//           {description}
//         </p>

//         <div className="flex items-center mt-3 mb-4"> {/* Adjusted margin-top */}
//           {hasDiscount && (
//             <span className="text-lg font-bold text-gray-500 line-through mr-2">
//               ₦{originalPrice?.toLocaleString()}
//             </span>
//           )}
//           <span className="text-xl font-bold text-green-600">
//             ₦{price.toLocaleString()}
//           </span>
//         </div>

//         {/* View Product Button */}
//         <Link
//           href={`/products/${product?.slug}`}
//           className="block flex justify-center items-center w-full uppercase text-orange-400 px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2"

//         >
//           View Details
//         </Link>

//         {/* Add to Cart Button */}
//         <button className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-${color}-700 transition-colors`}>
//           <AddToCartSingleProductBtn product={product} quantityCount={1} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductItem;

// ProductItem.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/types";
import AddToCartSingleProductBtn from "./AddToCartSingleProductBtn";

interface ProductItemProps {
  product: Product;
  color?: string;
}

const ProductItem = ({ product, color}: ProductItemProps) => {
  const { id, name, title, price, originalPrice, description, mainImage, slug } = product;
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Ensure alt text is always a string
  const altText = title || name || "Product image";

  return (
    // Make the outer div a flex container (column) and set its height to full if placed in a grid with items-stretch
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs w-full transition-transform duration-300 hover:scale-105 flex flex-col h-full">
      <div className="relative">
        <Link href={`/products/${product?.slug}`}>
          {/* Use a consistent height for the image container, e.g., h-72 (288px) or h-80 (320px) */}
          {/* This height will be applied to ALL product images */}
          <div className="relative h-72 w-full">
            <Image
              src={mainImage}
              alt={altText} // Fixed: Use the guaranteed string value
              fill
              // The sizes prop needs to be accurate for image optimization.
              // If the max-w-xs is 320px, then 100vw is usually accurate for small screens.
              // For larger screens, it depends on the grid layout where ProductItem is used.
              // Assuming it's in a grid where the item maxes out at ~320px.
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 320px" // Adjusted for max-w-xs (320px)
              style={{ objectFit: 'contain' }} // Changed objectFit to 'contain' to show full image
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

      {/* Make the content area flexible to fill remaining space */}
      <div className="p-4 flex-grow flex flex-col">
        <Link href={`/products/${product?.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
            {title || name || "Product"} {/* Added fallback for display text too */}
          </h3>
        </Link>

        {/* Use line-clamp-3 for a bit more description, adjust mb-auto to push buttons down */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-auto">
          {description}
        </p>

        <div className="flex items-center mt-3 mb-4"> {/* Adjusted margin-top */}
          {hasDiscount && (
            <span className="text-lg font-bold text-gray-500 line-through mr-2">
              ₦{originalPrice?.toLocaleString()}
            </span>
          )}
          <span className="text-xl font-bold text-green-600">
            ₦{price.toLocaleString()}
          </span>
        </div>

        {/* View Product Button */}
        <Link
          href={`/products/${product?.slug}`}
          className="block flex justify-center items-center w-full uppercase text-orange-400 px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2"
        >
          View Details
        </Link>

        {/* Add to Cart Button */}
        <button className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-${color}-700 transition-colors`}>
          <AddToCartSingleProductBtn product={product} quantityCount={1} />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;