// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.API_URL || 'http://127.0.0.1:3001';
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  return NextResponse.json(data);
}
