// In app/api/orders/[...slug]/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Use your environment variable. Provide a fallback for local development.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

/**
 * This is a dynamic API proxy route. It catches any request made to /api/orders/*
 * and forwards it to the corresponding path on the Express backend.
 *
 * Examples:
 * - GET /api/orders -> GET http://localhost:3001/api/orders
 * - GET /api/orders/some-id -> GET http://localhost:3001/api/orders/some-id
 * - PUT /api/orders/some-id/status -> PUT http://localhost:3001/api/orders/some-id/status
 */
async function handler(req: NextRequest) {
  // 1. Reconstruct the full backend URL
  const { pathname, search } = req.nextUrl;
  const backendUrl = `${API_BASE_URL}${pathname}${search}`;

  try {
    // 2. Forward the request to the backend
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        // Forward essential headers from the original request
        'Content-Type': 'application/json',
        'Cookie': req.headers.get('Cookie') || '', // Forward cookies for authentication
      },
      // Only include a body for methods that support it
      body: (req.method !== 'GET' && req.method !== 'HEAD') ? req.body : undefined,
      // Disable caching for API routes to ensure fresh data
      cache: 'no-store',
    });

    // 3. Forward the response from the backend back to the client
    // We use NextResponse to stream the body and headers directly
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

  } catch (error) {
    console.error(`API proxy error for ${pathname}:`, error);
    return NextResponse.json(
      { message: 'Error forwarding request to backend API.' },
      { status: 502 } // 502 Bad Gateway is an appropriate error for a proxy failure
    );
  }
}

// 4. Export the handler for all common HTTP methods
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };