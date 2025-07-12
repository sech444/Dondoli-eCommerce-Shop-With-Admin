


// // app/api/products/route.ts
// import { NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export async function GET() {
//   // TEMPORARY LOGGING: Print the DATABASE_URL to Vercel logs
//   console.log("Vercel Function DATABASE_URL:", process.env.DATABASE_URL);

//   try {
//     const products = await prisma.product.findMany();
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error("Error fetching products from database (Vercel):", error);
//     // Log the full error object for more details
//     console.error("Full database error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
//     return NextResponse.json({ message: "Internal Server Error fetching products from database" }, { status: 500 });
//   } finally {
//     if (prisma) {
//       await prisma.$disconnect();
//     }
//   }
// }

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
