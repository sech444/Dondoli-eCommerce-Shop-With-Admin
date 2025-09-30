

"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of 10 images - you can replace these with your actual image paths
   const images = [
    "/banner24.jpeg",
    "/images/immunebooster.jpeg", 
    "/images/GoodHealth.png",
    "/yourhealth.png",
    "/mind.png",
    "/images/news-featured.jpeg",
    "/wealth banner.jpeg",
  ];

  // Auto-rotate images every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);

    return () => clearInterval(interval);
  }, [images.length]);

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
      
      {/* Main content grid - Balanced 4-column grid with 2 columns each for text and image */}
      <div className="grid grid-cols-4 items-center justify-items-center px-4 sm:px-6 lg:px-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10 -mt-20 pt-16">
        
        {/* Text content - Takes 2 columns */}
        <div className="col-span-2 flex flex-col gap-y-5 px-2 sm:px-5 text-center max-lg:text-left">
          <h1 className="text-6xl text-green-800 font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            <span className="font-extrabold font-sans inset-y-px block mb-2 inline-block px-2">DOND0OIL</span>
            <span className="text-gray-600 text-sm block mb-2">Aka</span>
            <span className="text-green-600 text-sm font-serif italic block mb-2">Ishannderoil / Hosannahoil</span>
            <span className="text-green-600 text-sm font-serif italic block">Enhancing immunity to fight diseases</span>
          </h1>
          <p className="text-gray-700 max-sm:text-sm max-w-2xl mx-auto">
            Discover nature&apos;s power with DONDOOIL, your trusted partner in natural health and wellness.
            Our premium herbal supplements are scientifically developed to enhance your body&apos;s natural
            defense systems and promote overall wellbeing.
          </p>
          <div className="flex gap-x-4 justify-center max-lg:flex-col max-lg:gap-y-4">
            <Link href="/products" className="bg-green-600 text-white font-bold px-12 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg inline-block text-center">
              BUY NOW
            </Link>
            <Link href="/flyers" className="bg-white text-green-600 font-bold px-12 py-3 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg inline-block text-center">
              LEARN MORE
            </Link>
          </div>
        </div>
        
        {/* Animated Image section - Takes 2 columns */}
        <div className="col-span-2 flex justify-center items-center max-lg:order-first w-full max-lg:px-4">
          <div className="relative w-full h-full flex justify-center max-w-lg lg:max-w-full">
            {/* Animated background glow */}
            <div className="absolute -inset-6 bg-green-100 rounded-full opacity-50 blur-3xl animate-pulse"></div>
            
            {/* Image container with smooth transitions and swipe functionality */}
            <div 
              className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing" 
              onTouchStart={(e) => {
                const touch = e.touches[0];
                e.currentTarget.dataset.startX = touch.clientX.toString();
              }}
              onTouchEnd={(e) => {
                const startX = parseFloat(e.currentTarget.dataset.startX || '0');
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Minimum swipe distance
                  if (diff > 0) {
                    // Swipe left - next image
                    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
                  } else {
                    // Swipe right - previous image
                    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
                  }
                }
              }}
              onMouseDown={(e) => {
                e.currentTarget.dataset.startX = e.clientX.toString();
              }}
              onMouseUp={(e) => {
                const startX = parseFloat(e.currentTarget.dataset.startX || '0');
                const endX = e.clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Minimum drag distance
                  if (diff > 0) {
                    // Drag left - next image
                    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
                  } else {
                    // Drag right - previous image
                    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
                  }
                }
              }}
            >
              {images.map((imageSrc, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                    index === currentImageIndex 
                      ? 'opacity-100 scale-100 translate-x-0' 
                      : index === (currentImageIndex - 1 + images.length) % images.length
                      ? 'opacity-0 scale-95 -translate-x-full'
                      : 'opacity-0 scale-95 translate-x-full'
                  }`}
                >
                  <Image
                    src={imageSrc}
                    width={1800}
                    height={1800}
                    alt={`DONDOIL Product ${index + 1}`}
                    priority={index === 0}
                    quality={90}
                    className="w-full h-full object-cover rounded-2xl select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;