// In app/api/orders/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`GET /api/orders/${params.id} route handler invoked.`);

  try {
    const backendUrl = `${API_BASE_URL}/api/orders/${params.id}`;
    console.log(`Forwarding request to backend at: ${backendUrl}`);

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.get('Cookie') || '',
      },
      cache: 'no-store',
    });

    console.log(`Backend responded with status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from backend:", errorText);
      return NextResponse.json(
        { success: false, message: "Failed to fetch order from backend.", backendError: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { success: false, message: "Failed to connect to the backend service.", error: error.message },
      { status: 502 }
    );
  }
}
