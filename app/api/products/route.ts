// // app/api/products/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   const baseUrl = process.env.API_URL || 'http://127.0.0.1:3001';
//   const res = await fetch(`${baseUrl}/api/products`);
//   const data = await res.json();
//   return NextResponse.json(data);
// }
// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // During Vercel deploy/runtime, process.env.API_URL MUST be set to your public backend URL
  // If it's not set, it will fallback to localhost, causing the error.
  const baseUrl = process.env.API_URL || 'http://127.0.0.1:3001';

  try {
    const res = await fetch(`${baseUrl}/api/products`); // This fetch will now target your deployed backend

    if (!res.ok) {
      console.error(`Error fetching products from external backend: ${res.status} ${res.statusText}`);
      // Attempt to get more detail from the response body
      const errorBody = await res.text();
      console.error("External backend error details:", errorBody);
      return NextResponse.json({ message: "Failed to fetch products from backend" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server-side API route /api/products fetch error:", error);
    return NextResponse.json({ message: "Internal server error fetching products", error: (error as Error).message }, { status: 500 });
  }
}