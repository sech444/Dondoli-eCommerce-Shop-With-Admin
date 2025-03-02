// components/Testimonials/index.tsx
import React from "react";
import { Testimonial } from "@/types/testimonial";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sabo Masties",
    designation: "Founder @ Rolex",
    content: "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Margin Gesmu",
    designation: "Founder @ UI Hunter",
    content: "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "William Smith",
    designation: "Founder @ Trorex",
    content: "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    designation: "Health Coach",
    content: "DONDOOIL has transformed my clients' health journeys. The immune-boosting properties are truly remarkable, and I've seen consistent results across all age groups.",
    image: "/images/testimonials/author-04.png",
    star: 5,
  },
  {
    id: 5,
    name: "Michael Chen",
    designation: "Medical Researcher",
    content: "As someone who studies immune health professionally, I'm impressed by the quality of DONDOOIL's formulation. It stands out among similar products for its effectiveness.",
    image: "/images/69.jpg",
    star: 4,
  },
  {
    id: 6,
    name: "Amara Okafor",
    designation: "Wellness Advocate",
    content: "I've been recommending DONDOOIL to my community for over a year now. The family pack option is perfect for households looking to boost their overall immunity together.",
    image: "/images/testimonials/author-06.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">What Our Clients Say</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover why our customers love DONDOOIL products and how they've experienced the benefits of our immune boosting supplements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;