

// // app/_data/products.ts

// const getBaseUrlForFrontendFetch = () => {
//   // In development, call our own local API routes
//   if (process.env.NODE_ENV === 'development') {
//     return 'http://localhost:3000'; // Your Next.js app's base URL
//   }
//   // In production, call our own deployed API routes
//   return process.env.NEXT_PUBLIC_VERCEL_URL || 'https://dondoli-ecommerce-shop.vercel.app'; // Or your actual deployed URL
// };

// export const getAllProducts = async () => {
//   // This function is typically called from Server Components, but if called from Client,
//   // it should hit our own Next.js /api/products route.
//   // The 'typeof window === "undefined"' check for server vs. client side is not strictly needed here
//   // if all fetches go through your Next.js API routes (which is the recommended pattern).

//   const url = `${getBaseUrlForFrontendFetch()}/api/products`; // Always fetch from our own API route
//   console.log("Fetching products via Next.js API route from URL:", url);

//   const res = await fetch(url, {
//     // Optional: Add cache control for revalidation
//     next: { revalidate: 3600 } // Revalidate data every hour
//   });

//   if (!res.ok) {
//     console.error(`Failed to fetch products from proxy: ${res.status} - ${res.statusText}`);
//     throw new Error(`Failed to fetch products from proxy: ${res.status}`);
//   }
//   return res.json();
// };

// export async function getProductBySlug(slug: string) {
//   // This will also hit the Next.js API route /api/products/[slug] if you create one
//   // Or, if your /api/products route can handle filtering by slug, use that.
//   // For simplicity, let's keep fetching all and finding for now, but direct slug fetch is better.

//   console.log("Looking for product with slug:", slug);
//   const products = await getAllProducts(); // This now fetches from your Next.js API route
//   const foundProduct = products.find((p: any) => p.slug === slug);
//   console.log("Found product:", foundProduct ? foundProduct.title : "None");
//   return foundProduct || null;
// }

// // Keep this if you still want getAllProducts to be the default export in other places
// export default getAllProducts;

// app/_data/products.ts

const getBaseUrlForFrontendFetch = () => {
  // Local development URL
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // Production URL strategy for Vercel
  let vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;

  // Fallback to a hardcoded URL if environment variables are not present.
  // This should ideally not happen in Vercel production, but provides robustness.
  if (!vercelUrl) {
    console.warn("VERCEL_URL or NEXT_PUBLIC_VERCEL_URL not found. Falling back to hardcoded production URL.");
    vercelUrl = 'dondoli-ecommerce-shop.vercel.app'; // This should be your base Vercel domain
  }

  // Ensure the URL always starts with a protocol (http:// or https://)
  // Vercel typically provides VERCEL_URL with https://, but this adds a safety net.
  if (!vercelUrl.startsWith('http://') && !vercelUrl.startsWith('https://')) {
    vercelUrl = `https://${vercelUrl}`;
  }

  return vercelUrl;
};

export const getAllProducts = async () => {
  const url = `${getBaseUrlForFrontendFetch()}/api/products`;
  console.log("Fetching products via Next.js API route from URL:", url);

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate data every hour
    });

    if (!res.ok) {
      const errorText = await res.text(); // Get raw error message from response
      console.error(`Failed to fetch products from proxy: ${res.status} - ${res.statusText}. Details: ${errorText}`);
      throw new Error(`Failed to fetch products from proxy: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error in getAllProducts fetch:", error);
    // Re-throw the error to ensure it propagates up and can be caught by error boundaries
    throw error;
  }
};

export async function getProductBySlug(slug: string) {
  console.log("Looking for product with slug:", slug);
  try {
    const products = await getAllProducts(); // This now fetches from your Next.js API route
    const foundProduct = products.find((p: any) => p.slug === slug);
    console.log("Found product:", foundProduct ? foundProduct.title : "None");
    return foundProduct || null;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null; // Return null or handle the error gracefully for the UI
  }
}

export default getAllProducts;