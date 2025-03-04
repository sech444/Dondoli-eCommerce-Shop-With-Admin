// app/products/[productSlug]/page.tsx
    
import React from "react";
import type { Metadata } from "next";
import ProductDetails from "@/components/ProductPage"; // Renamed import
import Faq from "@/components/Faq";

// Enable dynamic rendering for this route
export const dynamicParams = true;

// You should move these metadata functions from the component to the page
// export { generateMetadata, generateStaticParams } from "@/components/ProductPage";

// Default metadata will be overridden by generateMetadata
export const metadata: Metadata = {
  title: "Products | DONDOIL",
  description: "Browse our premium DONDOIL products",
};

// Rename this to avoid the naming conflict
export default function ProductDetailPage({ params }: { params: { productSlug: string } }) {
  return (
    <>
      <ProductDetails params={params} />
      {/* <Faq /> */}
    </>
  );
}