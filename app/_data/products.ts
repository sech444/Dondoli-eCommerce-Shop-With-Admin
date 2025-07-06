// //app/_data/products.ts

// const getAllProducts = async () => {
//   const baseUrl = typeof window === 'undefined'
//     ? process.env.API_URL || 'http://127.0.0.1:3001'
//     : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

//   const url = `${baseUrl}/api/products`;
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(`Failed to fetch products: ${res.status}`);
//   }
//   return res.json();
// };

// export async function getProductBySlug(slug: string) {
//   const products = await getAllProducts();
//   return products.find((p: any) => p.slug === slug) || null;
// }

// export default getAllProducts;


// app/_data/products.ts

const getBaseUrlForFrontendFetch = () => {
  // In development, call our own local API routes
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'; // Your Next.js app's base URL
  }
  // In production, call our own deployed API routes
  return process.env.NEXT_PUBLIC_VERCEL_URL || 'https://dondoli-ecommerce-shop.vercel.app'; // Or your actual deployed URL
};

export const getAllProducts = async () => {
  // This function is typically called from Server Components, but if called from Client,
  // it should hit our own Next.js /api/products route.
  // The 'typeof window === "undefined"' check for server vs. client side is not strictly needed here
  // if all fetches go through your Next.js API routes (which is the recommended pattern).

  const url = `${getBaseUrlForFrontendFetch()}/api/products`; // Always fetch from our own API route
  console.log("Fetching products via Next.js API route from URL:", url);

  const res = await fetch(url, {
    // Optional: Add cache control for revalidation
    next: { revalidate: 3600 } // Revalidate data every hour
  });

  if (!res.ok) {
    console.error(`Failed to fetch products from proxy: ${res.status} - ${res.statusText}`);
    throw new Error(`Failed to fetch products from proxy: ${res.status}`);
  }
  return res.json();
};

export async function getProductBySlug(slug: string) {
  // This will also hit the Next.js API route /api/products/[slug] if you create one
  // Or, if your /api/products route can handle filtering by slug, use that.
  // For simplicity, let's keep fetching all and finding for now, but direct slug fetch is better.

  console.log("Looking for product with slug:", slug);
  const products = await getAllProducts(); // This now fetches from your Next.js API route
  const foundProduct = products.find((p: any) => p.slug === slug);
  console.log("Found product:", foundProduct ? foundProduct.title : "None");
  return foundProduct || null;
}

// Keep this if you still want getAllProducts to be the default export in other places
export default getAllProducts;

