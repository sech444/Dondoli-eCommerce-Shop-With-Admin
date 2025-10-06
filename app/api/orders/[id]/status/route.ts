// In app/api/orders/[id]/status/route.ts

import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`PUT /api/orders/${params.id}/status route handler invoked.`);

  try {
    const body = await req.json();
    const backendUrl = `${API_BASE_URL}/api/orders/${params.id}/status`;
    console.log(`Forwarding request to backend at: ${backendUrl}`);

    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.get('Cookie') || '',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    console.log(`Backend responded with status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from backend:", errorText);
      return NextResponse.json(
        { success: false, message: "Failed to update order status.", backendError: errorText },
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
