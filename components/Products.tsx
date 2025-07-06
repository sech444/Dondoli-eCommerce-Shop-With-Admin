import React from "react";
import ProductItem from "./ProductItem";
import { useSortStore } from "@/app/_zustand/sortStore";
import getAllProducts from "@/app/_data/products";
import type { Product } from "../lib/types";

// Updated to accept both slug and searchParams
const Products = async ({ 
  slug, 
  searchParams 
}: { 
  slug?: string[]; 
  searchParams?: { [key: string]: string } 
}) => {
  // Fetch products from backend
  const products: Product[] = await getAllProducts();

  // Get filter parameters
  const inStockFilter = searchParams?.inStock === "true";
  const outOfStockFilter = searchParams?.outOfStock === "true";
  const maxPrice = Number(searchParams?.price) || 300000;
  const minRating = Number(searchParams?.rating) || 0;
  const categoryFilter = searchParams?.category || "";

  // Filter products based on parameters
  let filteredProducts = products.filter((product: Product) => {
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
        filteredProducts.map((product: Product) => (
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

