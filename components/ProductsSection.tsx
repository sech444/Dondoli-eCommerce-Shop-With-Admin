
// export default ProductsSection;


// components/ProductsSection.tsx
import React from "react";
import ProductItem from "./ProductItem"; // Assuming ProductItem is in the same directory or correctly imported
import { Product } from "../lib/types"; // Assuming this path is correct for your Product type
import Heading from "./Heading"; // Assuming this path is correct
// components/ProductsSection.tsx (Corrected import)
import { getAllProducts } from '@/app/_data/products'; // This imports the named export
const ProductsSection = async () => {
  const products: Product[] = await getAllProducts();

  return (
    <div className="bg-green-100 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-10">
        <Heading title="FEATURED PRODUCTS" />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              color="blue"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;