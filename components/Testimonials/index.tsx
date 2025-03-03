// components/Testimonials/index.tsx

"use client"

import React, { useEffect, useRef, useState } from "react";
import { Testimonial } from "@/types/testimonial";
import SingleTestimonial from "./SingleTestimonial";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sandra Abu",
    designation: "User",
    content: "I felt severe cough and fever, I tried quit a lot of malaria and cough medicines but it didn't seem better and you know what that means since corona is around. I was introduced to Hosannaoil, I took it for just three days and the situation that looked like my lungs where closing up all opened and the fever also left me till date.",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Ceff",
    designation: "User",
    content: "I and my family don't take orthodox medicines and I don't go to hospital oyes, I know this sounds weird coming from someone who is an average class and with some good level of education. On this beautiful day after my wife had given birth in the house with few hands to help she eventually developed fever, the fever lasted for a while and like never before my wife and I became scared... to cut the long story short I luckily got Hosannaoil and administered it as prescribed and immediately she began feeling better, few days after she became perfectly well till date....I really thank God.",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Sam Devis",
    designation: "Proprietor Princess Adeja College",
    content: "I had severe dry cough for two weeks, I tried a couple of medications but it won't seem better, I took Dondooil and the relief was amazing.",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
  {
    id: 4,
    name: "Engr Nassim Yassin",
    designation: "Engineer",
    content: "I met Dr Dondo and he had given me just about 10cc of the Dondooil from his car which I was skeptical to take, so it was there in my house for about four weeks until one day I mistakenly ate poison from a left over can of fish (sydin), wou!, I began to feel like to go to toilet but nothing will come out, just after words I began to feel like knives cutting my intestines, at this point I really knew my life was in danger, I called Dr Dondo and he reminded me about the small quantity I was with at home, I struggled to carry it and eventually it pored out and was remaining just about 5cc, I managed to drink it and that was what saved me almost immediately and without side effects till date.",
    image: "/images/testimonials/author-04.png",
    star: 5,
  },
  {
    id: 5,
    name: "Dr. A. Shaker",
    designation: "Doctor, CAIRO REHABILITATION CENTER",
    content: "Both I and my son run a hospital called CAIRO REHABILITATION CENTER in Abuja Nigeria. A friend introduced me to Dr Dondo whom decided to market his product to me as a very effective medicine, well, as a doctor who have been in practice for over fifty years I thought this is not new, but because of the optimism on his face I decided that well, you should drop a sample, to cut the long story short, that sample saved my son's life when he ate food poison. I sincerely recommend Dondooil as a very effective medicine for the body. Thank you Dr Dondo",
    image: "/images/69.jpg",
    star: 5,
  },
  {
    id: 6,
    name: "Mrs Kwafan Agber",
    designation: "User",
    content: "I felt like a hole in my intestine, though it was not certified but I suffered the pain for months which I suspect could be due to eating very hot spices, I took Dondooil and the pain is no more, halelujah.",
    image: "/images/testimonials/author-06.png",
    star: 5,
  },
  {
    id: 7,
    name: "Sarah Johnson",
    designation: "Health Coach",
    content: "DONDOOIL has transformed my clients' health journeys. The immune-boosting properties are truly remarkable, and I've seen consistent results across all age groups.",
    image: "/images/testimonials/author-04.png",
    star: 5,
  },
  {
    id: 8,
    name: "Michael Chen",
    designation: "Medical Researcher",
    content: "As someone who studies immune health professionally, I'm impressed by the quality of DONDOOIL's formulation. It stands out among similar products for its effectiveness.",
    image: "/images/69.jpg",
    star: 4,
  },
  {
    id: 9,
    name: "Amara Okafor",
    designation: "Wellness Advocate",
    content: "I've been recommending DONDOOIL to my community for over a year now. The family pack option is perfect for households looking to boost their overall immunity together.",
    image: "/images/testimonials/author-06.png",
    star: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-slide functionality
  useEffect(() => {
    startAutoSlide();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPaused]);
  
  const startAutoSlide = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Only set interval if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        const isLastTestimonial = currentIndex === testimonialData.length - 1;
        const newIndex = isLastTestimonial ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      }, 5000); // Change slide every 5 seconds
    }
  };
  
  const goToPrevious = () => {
    setIsPaused(true); // Pause auto-slide when manually changing
    const isFirstTestimonial = currentIndex === 0;
    const newIndex = isFirstTestimonial ? testimonialData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    
    // Resume auto-slide after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };
  
  const goToNext = () => {
    setIsPaused(true); // Pause auto-slide when manually changing
    const isLastTestimonial = currentIndex === testimonialData.length - 1;
    const newIndex = isLastTestimonial ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    
    // Resume auto-slide after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };
  
  const goToSlide = (slideIndex: number) => {
    setIsPaused(true); // Pause auto-slide when manually changing
    setCurrentIndex(slideIndex);
    
    // Resume auto-slide after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };
  
  // Pause auto-slide when hovering over testimonial
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  // Resume auto-slide when mouse leaves
  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-4">What Our Clients Say</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Discover why our customers love DONDOOIL products and how they&apos;ve experienced the benefits of our immune boosting supplements.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <a href="#" className="text-green-700 hover:text-green-900 transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-green-700 hover:text-green-900 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-green-700 hover:text-green-900 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-green-700 hover:text-green-900 transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-green-700 hover:text-green-900 transition-colors">
              <FaYoutube size={24} />
            </a>
          </div>
          <p className="text-sm text-green-600 font-medium">
            For more testimonials follow us on social media
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div 
          className="relative" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Current Testimonial */}
          <div className="mx-auto max-w-3xl">
            <SingleTestimonial testimonial={testimonialData[currentIndex]} />
          </div>
          
          {/* Left Arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <button 
              onClick={goToPrevious}
              className="bg-white rounded-full p-3 shadow-md hover:bg-green-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-green-800" size={24} />
            </button>
          </div>
          
          {/* Right Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button 
              onClick={goToNext}
              className="bg-white rounded-full p-3 shadow-md hover:bg-green-50 transition-colors"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-green-800" size={24} />
            </button>
          </div>
          
          {/* Dots/Indicators */}
          <div className="flex justify-center mt-8">
            {testimonialData.map((testimonial, slideIndex) => (
              <div
                key={testimonial.id}
                onClick={() => goToSlide(slideIndex)}
                className={`h-3 w-3 mx-1 rounded-full cursor-pointer transition-colors duration-300
                  ${currentIndex === slideIndex ? "bg-green-600" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${slideIndex + 1}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;