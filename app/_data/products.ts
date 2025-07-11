

// const getBaseUrlForFrontendFetch = () => {
//   // Local development URL
//   if (process.env.NODE_ENV === 'development') {
//     return 'http://localhost:3000';
//   }

//   // Production URL strategy for Vercel
//   let vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;

//   // Fallback to a hardcoded URL if environment variables are not present.
//   // This should ideally not happen in Vercel production, but provides robustness.
//   if (!vercelUrl) {
//     console.warn("VERCEL_URL or NEXT_PUBLIC_VERCEL_URL not found. Falling back to hardcoded production URL.");
//     vercelUrl = 'dondoli-ecommerce-shop.vercel.app'; // This should be your base Vercel domain
//   }

//   // Ensure the URL always starts with a protocol (http:// or https://)
//   // Vercel typically provides VERCEL_URL with https://, but this adds a safety net.
//   if (!vercelUrl.startsWith('http://') && !vercelUrl.startsWith('https://')) {
//     vercelUrl = `https://${vercelUrl}`;
//   }

//   return vercelUrl;
// };

// export const getAllProducts = async () => {
//   const url = `${getBaseUrlForFrontendFetch()}/api/products`;
//   console.log("Fetching products via Next.js API route from URL:", url);

//   try {
//     const res = await fetch(url, {
//       next: { revalidate: 3600 } // Revalidate data every hour
//     });

//     if (!res.ok) {
//       const errorText = await res.text(); // Get raw error message from response
//       console.error(`Failed to fetch products from proxy: ${res.status} - ${res.statusText}. Details: ${errorText}`);
//       throw new Error(`Failed to fetch products from proxy: ${res.status} - ${res.statusText}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error("Error in getAllProducts fetch:", error);
//     // Re-throw the error to ensure it propagates up and can be caught by error boundaries
//     throw error;
//   }
// };

// export async function getProductBySlug(slug: string) {
//   console.log("Looking for product with slug:", slug);
//   try {
//     const products = await getAllProducts(); // This now fetches from your Next.js API route
//     const foundProduct = products.find((p: any) => p.slug === slug);
//     console.log("Found product:", foundProduct ? foundProduct.title : "None");
//     return foundProduct || null;
//   } catch (error) {
//     console.error(`Error fetching product by slug ${slug}:`, error);
//     return null; // Return null or handle the error gracefully for the UI
//   }
// }

// export default getAllProducts;


// app/_data/products.ts

import { cache } from "react";
import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient once globally to leverage connection pooling
const prisma = new PrismaClient();

// Wrap the function definition in cache() for memoization
export const getProductBySlug = cache(async (slug: string) => {
  console.log(`[getProductBySlug] Attempting to find product with slug: ${slug}`);

  try {
    const product = await prisma.product.findUnique({
      where: { slug }, // This is the direct database query by slug
      include: {
        category: true,
      },
    });

    console.log(`[getProductBySlug] Result: ${product ? product.title + ' (Slug: ' + product.slug + ')' : 'Product not found for slug: ' + slug}`);

    return product;
  } catch (error) {
    console.error(`[getProductBySlug] Error fetching product with slug ${slug}:`, error);
    return null; // Return null or throw an error if the product cannot be fetched
  }
});

// New function: Fetch all products
export const getAllProducts = cache(async () => {
  console.log(`[getAllProducts] Attempting to fetch all products.`);
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Include category data if needed for the product list
      },
    });
    console.log(`[getAllProducts] Found ${products.length} products.`);
    return products;
  } catch (error) {
    console.error(`[getAllProducts] Error fetching all products:`, error);
    return []; // Return an empty array or handle the error as appropriate
  }
});
