// In app/api/orders/route.ts

import { NextResponse } from 'next/server';

// The URL of your actual Node.js/Express backend
const EXPRESS_BACKEND_URL = 'http://localhost:3001/api/orders'; // <-- IMPORTANT: Use the correct port for your Express server

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Forwarding data to Express backend:', body);

    // Use fetch to send the data from your Next.js server to your Express server
    const response = await fetch(EXPRESS_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the request to the Express backend was successful
    if (!response.ok) {
      // If the backend returned an error, forward that error to the client
      const errorData = await response.text();
      console.error('Express backend returned an error:', errorData);
      throw new Error(errorData || 'Failed to submit order to the backend');
    }

    const responseData = await response.json();

    // Return the successful response from the Express backend to the original client
    return NextResponse.json(responseData, { status: response.status });

  } catch (error: any) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: error.message || "An internal server error occurred." },
      { status: 500 }
    );
  }
}