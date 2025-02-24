import React from "react";
import ProductItem from "./ProductItem";

const staticProducts = [
  {
    id: "1",
    name: "DONDOOIL - 100ml",
    title: "DONDOOIL - 100ml", // ✅ Add title
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
    title: "DONDOOIL - 200ml", // ✅ Add title
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
    title: "DONDOOIL - Family Pack", // ✅ Add title
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
    title: "DONDOOIL - Premium", // ✅ Add title
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


const Products = ({ searchParams }: { searchParams?: { [key: string]: string } }) => {
  // Get filter parameters
  const inStockFilter = searchParams?.inStock === "true";
  const outOfStockFilter = searchParams?.outOfStock === "true";
  const maxPrice = Number(searchParams?.price) || 300000;
  const minRating = Number(searchParams?.rating) || 0;

  // Filter products based on static data
  let filteredProducts = staticProducts.filter((product) => {
    const matchesStock =
      (inStockFilter && product.inStock) ||
      (outOfStockFilter && !product.inStock) ||
      (!inStockFilter && !outOfStockFilter);

    const matchesPrice = product.price <= maxPrice;
    const matchesRating = product.rating >= minRating;

    return matchesStock && matchesPrice && matchesRating;
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
