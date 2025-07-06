// components/ClientLandingPageWrapper.tsx
'use client'; // This is a Client Component

import React, { useState } from 'react';
import { IntroducingSection } from "@/components"; // Import IntroducingSection here

export default function ClientLandingPageWrapper({ children }: { children: React.ReactNode }) {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <>
      <IntroducingSection open={showLanding} onClose={() => setShowLanding(false)} />
      {children} {/* This renders the content passed from the Server Component Home */}
    </>
  );
}