// import { CategoryMenu, Hero, Incentives, IntroducingSection, Newsletter, ProductsSection } from "@/components";

// export default function Home() {
//   return (
//     <>
//     <Hero />
//     <IntroducingSection />
//     <CategoryMenu />
//     <ProductsSection />
//     </>
//   );
// }



import { CategoryMenu, Hero, IntroducingSection, ProductsSection } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen relative">
    {/* Background div with specific size, positioned absolutely */}
    <div 
      className="bg-no-repeat bg-bottom ...[url('/background-2.jpg')] bg-contain bg-no-repeat"
      // w-96 = 384px, h-96 = 384px
    />
    
    {/* Content container */}
    <div className="relative min-h-screen">
        <Hero />
        {/* <IntroducingSection />
        <CategoryMenu /> */}
        {/* <ProductsSection /> */}
      </div>
    </main>
  );
}
