// In app/api/orders/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Get the backend URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest) {
  // Log to Vercel to confirm this function is running
  console.log("GET /api/orders route handler invoked.");

  // Check if the environment variable is set
  if (!API_BASE_URL) {
    console.error("FATAL: NEXT_PUBLIC_API_BASE_URL is not set in Vercel environment variables.");
    return NextResponse.json(
      { success: false, message: "Server configuration error: API base URL is not set." },
      { status: 500 }
    );
  }

  // Get search params (like ?page=1&limit=20) from the original request
  const { search } = req.nextUrl;
  const backendUrl = `${API_BASE_URL}/api/orders${search}`;

  console.log(`Forwarding request to backend at: ${backendUrl}`);

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward cookies for authentication
        'Cookie': req.headers.get('Cookie') || '',
      },
      cache: 'no-store', // Ensure fresh data
    });

    // Log the backend's response status
    console.log(`Backend responded with status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from backend:", errorText);
      return NextResponse.json(
        { success: false, message: "Failed to fetch data from backend.", backendError: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the successful response from the backend
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Catastrophic error in API route:", error);
    return NextResponse.json(
      { success: false, message: "Failed to connect to the backend service.", error: error.message },
      { status: 502 } // 502 Bad Gateway for proxy connection errors
    );
  }
}
