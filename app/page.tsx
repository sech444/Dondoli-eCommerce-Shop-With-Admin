
//app/page.tsx
// "use client";

// import { CategoryMenu, Hero, IntroducingSection, ProductsSection } from "@/components";
// import Testimonials from "@/components/Testimonials";
// import React, { useState } from "react";

// export default function Home() {
//   const [showLanding, setShowLanding] = useState(true);

//   return (
//     <main className="min-h-screen relative">
//       {/* Background div with specific size, positioned absolutely */}
//       <div 
//         className="bg-no-repeat bg-bottom bg-[url('/background-2.jpg')] bg-contain"
//         // w-96 = 384px, h-96 = 384px
//       />
//       <IntroducingSection open={showLanding} onClose={() => setShowLanding(false)} />
      
//       {/* Content container */}
//       <div className="relative min-h-screen">
//         <Hero />
//         {/* <CategoryMenu /> */}
//         <ProductsSection />
//         <Testimonials />
//       </div>
//     </main>
//   );
// }

// app/page.tsx
// NO 'use client' HERE - This will now be a Server Component
import { CategoryMenu, Hero, ProductsSection } from "@/components"; // Remove IntroducingSection import here
import Testimonials from "@/components/Testimonials";
import React from "react"; // No need for useState directly here

// Create a separate Client Component for your landing page logic
import ClientLandingPageWrapper from "@/components/ClientLandingPageWrapper"; // Create this file

export default async function Home() { // Make Home an async Server Component
  // ProductsSection is already async, so no need to await it here, just render it.
  // If you need any data fetching directly in Home, you can do it here:
  // const myData = await fetchSomeOtherData();

  return (
    <ClientLandingPageWrapper> {/* Wrap your page content in a client component */}
      <main className="min-h-screen relative">
        {/* Background div can stay here or be moved */}
        <div
          className="bg-no-repeat bg-bottom bg-[url('/background-2.jpg')] bg-contain"
        />

        {/* Content container */}
        <div className="relative min-h-screen">
          <Hero />
          {/* <CategoryMenu /> */}
          <ProductsSection /> {/* ProductsSection is now correctly nested */}
          <Testimonials />
        </div>
      </main>
    </ClientLandingPageWrapper>
  );
}