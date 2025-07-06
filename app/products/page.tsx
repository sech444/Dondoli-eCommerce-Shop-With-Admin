// // app/products/page.tsx
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Metadata } from "next";
// import getAllProducts from "@/app/_data/products";

// export const metadata: Metadata = {
//   title: "Products | DONDOOIL",
//   description: "Browse our range of DONDOOIL health products",
// };

// export default async function ProductsPage() {
//   const products = await getAllProducts();
//   return (
//     <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-48">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Products</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {products.map((product: any) => (
//             <Link key={product.id} href={`/products/${product.slug}`} className="block">
//               <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                 <div className="h-64 relative">
//                   <Image
//                     src={product.mainImage}
//                     alt={product.title}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 568px) 100vw, 50vw"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold text-green-800">{product.title}</h2>
//                   <p className="text-gray-600 mt-2 h-12 overflow-hidden">{product.description.substring(0, 80)}...</p>
//                   <div className="flex justify-between items-center mt-4">
//                     <p className="text-green-700 font-bold">₦{product.price.toLocaleString()}</p>
//                     {product.originalPrice > product.price && (
//                       <p className="text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }



// // app/products/page.tsx
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Metadata } from "next";
// import getAllProducts from "@/app/_data/products";

// export const metadata: Metadata = {
//   title: "Products | DONDOOIL",
//   description: "Browse our range of DONDOOIL health products",
// };

// export default async function ProductsPage() {
//   const products = await getAllProducts();
//   return (
//     <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-48">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Products</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"> {/* Added items-stretch */}
//           {products.map((product: any) => (
//             <Link key={product.id} href={`/products/${product.slug}`} className="block">
//               <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"> {/* Added flex flex-col h-full */}
//                 <div className="h-64 relative">
//                   <Image
//                     src={product.mainImage}
//                     alt={product.title}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 568px) 100vw, 50vw"
//                   />
//                 </div>
//                 <div className="p-4 flex-grow flex flex-col justify-between"> {/* Added flex-grow and flex flex-col justify-between */}
//                   <div> {/* Wrap title and description to push price to bottom */}
//                     <h2 className="text-xl font-semibold text-green-800">{product.title}</h2>
//                     {/* Increased description height slightly, adjust h-16 or h-20 as needed */}
//                     <p className="text-gray-600 mt-2 h-16 overflow-hidden">{product.description.substring(0, 100)}...</p> 
//                   </div>
//                   <div className="flex justify-between items-center mt-4">
//                     <p className="text-green-700 font-bold">₦{product.price.toLocaleString()}</p>
//                     {product.originalPrice > product.price && (
//                       <p className="text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }



// app/products/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import getAllProducts from "@/app/_data/products";

export const metadata: Metadata = {
  title: "Products | DONDOOIL",
  description: "Browse our range of DONDOOIL health products",
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-48">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Products</h1>
        {/* Changed grid-cols-1 md:grid-cols-2 to grid-cols-1 lg:grid-cols-2 */}
        {/* This means: 1 column up to lg breakpoint (1024px), then 2 columns from lg onwards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {products.map((product: any) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                {/* Changed h-64 to h-96 for a larger image container */}
                <div className="h-96 relative">
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    fill
                    className="object-contain"
                    // Updated sizes to reflect the new column layout
                    // - On screens up to lg breakpoint (1023px), image takes 100vw
                    // - From lg breakpoint (1024px) onwards, it's 2 columns, so image takes 50vw
                    sizes="(max-width: 1023px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-green-800">{product.title}</h2>
                    <p className="text-gray-600 mt-2 h-16 overflow-hidden">{product.description.substring(0, 100)}...</p>
                  </div>
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