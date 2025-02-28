
import React from "react";
import ProductItem from "./ProductItem";
import { useSortStore } from "@/app/_zustand/sortStore";

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
 
// Updated to accept both slug and searchParams
const Products = ({ 
  slug, 
  searchParams 
}: { 
  slug?: string[]; 
  searchParams?: { [key: string]: string } 
}) => {
  // Get filter parameters
  const inStockFilter = searchParams?.inStock === "true";
  const outOfStockFilter = searchParams?.outOfStock === "true";
  const maxPrice = Number(searchParams?.price) || 300000;
  const minRating = Number(searchParams?.rating) || 0;
  const categoryFilter = searchParams?.category || "";

  // Filter products based on parameters
  let filteredProducts = staticProducts.filter((product) => {
    // Stock filter
    const matchesStock =
      (inStockFilter && product.inStock) ||
      (outOfStockFilter && !product.inStock) ||
      (!inStockFilter && !outOfStockFilter);

    // Price and rating filters
    const matchesPrice = product.price <= maxPrice;
    const matchesRating = product.rating >= minRating;
    
    // Category filter
    const matchesCategory = 
      categoryFilter === "" || 
      product.categoryId.toLowerCase() === categoryFilter.toLowerCase();
    
    // Slug filter (if slug exists, check if it matches product slug)
    const matchesSlug = !slug || 
      slug.length === 0 || 
      product.slug === slug[0];
    
    return matchesStock && matchesPrice && matchesRating && matchesCategory && matchesSlug;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full">
          No products found for specified query
        </h3>
      )}
    </div>
  );
};

export default Products;

// const Products = ({
//   slug,
//   searchParams
// }: {
//   slug?: string[];
//   searchParams?: { [key: string]: string }
// }) => {
//   // Get sort value from Zustand store
//   const { sortBy } = useSortStore();
  
//   // Filter products based on parameters
//   let filteredProducts = staticProducts.filter((product) => {
//     // Your existing filter logic
//     const inStockFilter = searchParams?.inStock === "true";
//     const outOfStockFilter = searchParams?.outOfStock === "true";
//     const maxPrice = Number(searchParams?.price) || 300000;
//     const minRating = Number(searchParams?.rating) || 0;
//     const categoryFilter = searchParams?.category || "";
//     const matchesSlug = !slug || slug.length === 0 || product.slug === slug[0];
    
//     return matchesStock && matchesPrice && matchesRating && matchesCategory && matchesSlug && matchesSlug;
//   });
  
//   // Sort products based on sortBy value
//   if (sortBy === "titleAsc") {
//     filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
//   } else if (sortBy === "titleDesc") {
//     filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
//   } else if (sortBy === "lowPrice") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   } else if (sortBy === "highPrice") {
//     filteredProducts.sort((a, b) => b.price - a.price);
//   }
//   // defaultSort uses the original order

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
//       {filteredProducts.length > 0 ? (
//         filteredProducts.map((product) => (
//           <ProductItem key={product.id} product={product} color="black" />
//         ))
//       ) : (
//         <h3 className="text-3xl mt-5 text-center w-full col-span-full">
//           No products found for specified query
//         </h3>
//       )}
//     </div>
//   );
// };

// export default Products;