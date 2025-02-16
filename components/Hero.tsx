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
      <Image
        src="/wealth banner.jpeg"
        alt="smart watch"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      
      {/* Uncomment this section if you want to keep the content overlay
      <div className="absolute inset-0 bg-black/50">
        <div className="max-w-screen-2xl mx-auto h-full px-10">
          <div className="flex flex-col justify-center h-full gap-y-5 max-w-2xl">
            <h1 className="text-6xl text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
              THE PRODUCT OF THE FUTURE
            </h1>
            <p className="text-white max-sm:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor modi
              iure laudantium necessitatibus ab, voluptates vitae ullam. Officia
              ipsam iusto beatae nesciunt, consequatur deserunt minima maiores
              earum obcaecati. Optio, nam!
            </p>
            <div className="flex gap-x-4 max-lg:flex-col max-lg:gap-y-4">
              <button className="bg-white text-blue-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100">
                BUY NOW
              </button>
              <button className="bg-white text-blue-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100">
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