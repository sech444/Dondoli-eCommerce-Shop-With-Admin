"use client";

import { CategoryMenu, Hero, IntroducingSection, ProductsSection } from "@/components";
import Testimonials from "@/components/Testimonials";
import React, { useState } from "react";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <main className="min-h-screen relative">
      {/* Background div with specific size, positioned absolutely */}
      <div 
        className="bg-no-repeat bg-bottom bg-[url('/background-2.jpg')] bg-contain"
        // w-96 = 384px, h-96 = 384px
      />
      <IntroducingSection open={showLanding} onClose={() => setShowLanding(false)} />
      
      {/* Content container */}
      <div className="relative min-h-screen">
        <Hero />
        {/* <CategoryMenu /> */}
        <ProductsSection />
        <Testimonials />
      </div>
    </main>
  );
}