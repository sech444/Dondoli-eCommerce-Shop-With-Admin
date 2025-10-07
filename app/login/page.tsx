// In app/login/page.tsx

import React, { Suspense } from 'react';
import LoginForm from './LoginForm'; // Import the new client component

// This is the UI that will be shown while the LoginForm component,
// which uses useSearchParams, is loading.
const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading Login Page...</p>
    </div>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}
