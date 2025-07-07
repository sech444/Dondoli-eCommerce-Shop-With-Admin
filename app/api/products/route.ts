// // app/api/products/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   const baseUrl = process.env.API_URL || 'http://127.0.0.1:3001';
//   const res = await fetch(`${baseUrl}/api/products`);
//   const data = await res.json();
//   return NextResponse.json(data);
// }
// // app/api/products/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   // During Vercel deploy/runtime, process.env.API_URL MUST be set to your public backend URL
//   // If it's not set, it will fallback to localhost, causing the error.
//   const baseUrl = process.env.API_URL || 'http://127.0.0.1:3001';

//   try {
//     const res = await fetch(`${baseUrl}/api/products`); // This fetch will now target your deployed backend

//     if (!res.ok) {
//       console.error(`Error fetching products from external backend: ${res.status} ${res.statusText}`);
//       // Attempt to get more detail from the response body
//       const errorBody = await res.text();
//       console.error("External backend error details:", errorBody);
//       return NextResponse.json({ message: "Failed to fetch products from backend" }, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Server-side API route /api/products fetch error:", error);
//     return NextResponse.json({ message: "Internal server error fetching products", error: (error as Error).message }, { status: 500 });
//   }
// }


// // app/api/products/route.ts
// import { NextResponse } from "next/server";

// // --- IMPORTANT: Replace this with your actual database client import and instantiation ---
// // Example for Prisma:
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// // Example for Mongoose (MongoDB):
// // import mongoose from 'mongoose';
// // import { ProductModel } from '@/models/Product'; // Assuming you have a Mongoose model
// //
// // const connectDb = async () => {
// //   if (mongoose.connections[0].readyState) return;
// //   await mongoose.connect(process.env.DATABASE_URL!); // DATABASE_URL must be in Vercel ENV
// // };
// // --------------------------------------------------------------------------------------

// export async function GET() {
//   try {
//     // --- IMPORTANT: Replace this with your actual database query ---
//     // Example for Prisma:
//     const products = await prisma.product.findMany(); // Adjust 'product' based on your Prisma model name

//     // Example for Mongoose (MongoDB):
//     // await connectDb();
//     // const products = await ProductModel.find({}); // Fetch all products using your Mongoose model

//     // If you don't have a DB set up yet and just want a temporary placeholder:
//     // const products = [
//     //   { id: '1', name: 'Family Pack', title: 'Dondoli Family Pack', price: 5000, originalPrice: 6000, description: 'Large pack for the whole family.', mainImage: '/images/products/family-pack.png', slug: 'family-pack' },
//     //   { id: '2', name: '200ml Bottle', title: 'Dondoli 200ml Bottle', price: 1500, description: 'Convenient 200ml bottle for on-the-go.', mainImage: '/images/products/200ml-bottle.png', slug: '200ml-bottle' },
//     // ];
//     // --------------------------------------------------------------------------------------

//     return NextResponse.json(products);
//   } catch (error) {
//     console.error("Error fetching products from database:", error);
//     return NextResponse.json({ message: "Internal Server Error fetching products from database" }, { status: 500 });
//   } finally {
//     // --- IMPORTANT: If using Prisma, disconnect after the operation (or manage connection pool) ---
//     // Example for Prisma:
//     if (prisma) {
//       await prisma.$disconnect();
//     }
//     // For Mongoose, you might not disconnect per request if using serverless functions
//     // --------------------------------------------------------------------------------------
//   }
// }


// app/api/products/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  // TEMPORARY LOGGING: Print the DATABASE_URL to Vercel logs
  console.log("Vercel Function DATABASE_URL:", process.env.DATABASE_URL);

  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products from database (Vercel):", error);
    // Log the full error object for more details
    console.error("Full database error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json({ message: "Internal Server Error fetching products from database" }, { status: 500 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}