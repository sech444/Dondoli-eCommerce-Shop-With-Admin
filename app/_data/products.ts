

// app/_data/products.ts

import { cache } from "react";
import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient once globally to leverage connection pooling
const prisma = new PrismaClient();

// Wrap the function definition in cache() for memoization
export const getProductBySlug = cache(async (slug: string) => {
  // console.log(`[getProductBySlug] Attempting to find product with slug: ${slug}`);

  try {
    const product = await prisma.product.findUnique({
      where: { slug }, // This is the direct database query by slug
      include: {
        category: true,
      },
    });

    // console.log(`[getProductBySlug] Result: ${product ? product.title + ' (Slug: ' + product.slug + ')' : 'Product not found for slug: ' + slug}`);

    return product;
  } catch (error) {
    // console.error(`[getProductBySlug] Error fetching product with slug ${slug}:`, error);
    return null; // Return null or throw an error if the product cannot be fetched
  }
});

// New function: Fetch all products
export const getAllProducts = cache(async () => {
  // console.log(`[getAllProducts] Attempting to fetch all products.`);
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Include category data if needed for the product list
      },
    });
    // console.log(`[getAllProducts] Found ${products.length} products.`);
    return products;
  } catch (error) {
    // console.error(`[getAllProducts] Error fetching all products:`, error);
    return []; // Return an empty array or handle the error as appropriate
  }
});
