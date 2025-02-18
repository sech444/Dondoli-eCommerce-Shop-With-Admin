import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20">
      {/* Top spacing and decorative elements */}
      <div className="h-32 bg-green-50"></div>
      <div className="relative w-full h-20 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" 
                fill="#4ade80" fillOpacity="0.2"/>
        </svg>
      </div>

      <div className="grid grid-cols-2 items-center justify-items-center px-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10 -mt-20 pt-16">
        <div className="flex flex-col gap-y-5 px-5 text-center max-lg:text-left">
          <h1 className="text-6xl text-green-800 font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            <span className="font-extrabold font-sans inset-y-px block mb-2 inline-block px-2">DONDOIL</span>
            <span className="text-gray-600 text-sm block mb-2">Aka</span>
            <span className="text-green-600 text-sm font-serif italic block mb-2">Ishannderoil / Hosannahoil</span>
            <span className="text-green-600 text-sm font-serif italic block">Enhancing immunity to fight diseases</span>
          </h1>
          <p className="text-gray-700 max-sm:text-sm max-w-2xl mx-auto">
            Discover nature&apos;s power with DONDOIL, your trusted partner in natural health and wellness. 
            Our premium herbal supplements are scientifically developed to enhance your body&apos;s natural 
            defense systems and promote overall wellbeing.
          </p>
          <div className="flex gap-x-4 justify-center max-lg:flex-col max-lg:gap-y-4">
            <button className="bg-green-600 text-white font-bold px-12 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              BUY NOW
            </button>
            <button className="bg-white text-green-600 font-bold px-12 py-3 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              LEARN MORE
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center max-lg:order-first">
          <div className="relative">
            <div className="absolute -inset-4 bg-green-100 rounded-full opacity-50 blur-2xl"></div>
            <Image
              src="/banner24.jpeg"
              width={800}
              height={800}
              alt="DONDOIL Product"
              className="relative max-md:w-[450px] max-md:h-[450px] max-sm:h-[300px] max-sm:w-[300px] w-auto h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;