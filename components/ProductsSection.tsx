

// import React from "react";
// import ProductItem from "./ProductItem";
// import Heading from "./Heading";

// const ProductsSection = async () => {
//   // sending API request for getting all products
//   const data = await fetch("http://localhost:3001/api/products");
//   const products = await data.json();
//   return (
//     <div className="bg-green-300 border-t-4 border-white">
//       <div className="max-w-screen-2xl mx-auto pt-20">
//         <Heading title="FEATURED PRODUCTS" />
//         <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
//           {products.map((product: Product) => (
//             <ProductItem key={product.id} product={product} color="white" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsSection;



// ProductsSection.tsx
import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "../lib/types";
import Heading from "./Heading";


const staticProducts = [
  {
    id: "1",
    name: "DONDOOIL",
    title: "DONDOOIL",
    slug: "dondoil-100ml",
    price: 20000,
    description: "Natural immune system booster",
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
    name: "DONDOOIL - Family Pack",
    title: "DONDOOIL - Family Pack",
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

const ProductsSection = () => {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    //   {staticProducts.map((product) => (
    //     <ProductItem 
    //       key={product.id}
    //       product={product}
    //       color="blue"
    //     />
    //   ))}
    // </div>

    <div className="bg-green-100 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-10">
        <Heading title="FEATURED PRODUCTS" />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {staticProducts.map((products) => (
        <ProductItem 
          key={products.id}
          product={products}
          color="blue"
        />
      ))}
          
        </div>
      </div>
    </div>
  );
};

export default ProductsSection; 