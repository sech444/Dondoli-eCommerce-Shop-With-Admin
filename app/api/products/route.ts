
// app/api/products/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient once globally to leverage connection pooling
// This is crucial for performance in serverless environments
const prisma = new PrismaClient();

export async function GET() {
  ;

  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany();

    // Return the products as a JSON response
    return NextResponse.json(products);
  } catch (error) {
  

    // Return a 500 Internal Server Error response with a user-friendly message
    return NextResponse.json({ message: "Internal Server Error fetching products from database" }, { status: 500 });
  }
  // Removed prisma.$disconnect() as it's not recommended for serverless functions.
  // Prisma manages connections automatically within the function's lifecycle.
}
