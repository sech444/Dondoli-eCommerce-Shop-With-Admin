// *********************
// Role of the component: Classical hero component on home page
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Classical hero component with two columns on desktop and one column on smaller devices
// *********************

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src="/wealth banner.jpeg"
          alt="smart watch"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
      {/* Uncomment this section if you want to keep the content overlay
       <div className="absolute inset-0 bg-black/50">
         <div className="max-w-screen-2xl mx-auto h-full px-4 sm:px-6 md:px-10">
           <div className="flex flex-col justify-center h-full gap-y-3 sm:gap-y-5 max-w-2xl">
             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2 sm:mb-3">
               THE PRODUCT OF THE FUTURE
             </h1>
             <p className="text-sm sm:text-base text-white">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor modi
               iure laudantium necessitatibus ab, voluptates vitae ullam. Officia
               ipsam iusto beatae nesciunt, consequatur deserunt minima maiores
               earum obcaecati. Optio, nam!
             </p>
             <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 sm:gap-x-4">
               <button className="bg-white text-blue-600 font-bold px-8 sm:px-12 py-2 sm:py-3 text-lg sm:text-xl hover:bg-gray-100">
                 BUY NOW
               </button>
               <button className="bg-white text-blue-600 font-bold px-8 sm:px-12 py-2 sm:py-3 text-lg sm:text-xl hover:bg-gray-100">
                 LEARN MORE
               </button>
             </div>
           </div>
         </div>
       </div>
      */}
    </div>
  );
};

export default Hero;