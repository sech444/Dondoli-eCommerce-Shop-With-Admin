import React from "react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DONDOOIL | News & Updates",
  description: "Latest news, articles and updates about DONDOOIL products and natural health wellness."
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative bg-green-50 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-green-800 sm:text-5xl md:text-6xl">
              News & Updates
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
              Stay informed about our latest products, research, and health tips
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-16 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#ffffff" fillOpacity="1"/>
          </svg>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-64 lg:h-auto">
              <Image
                src="/images/news-featured.jpeg" 
                alt="Featured News"
                fill
                style={{objectFit: "cover"}}
                className="w-full h-full"
                priority
              />
            </div>
            <div className="p-8 lg:p-12">
              <div className="text-sm text-green-600 font-semibold mb-2">May 15, 2023</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">DONDOOIL Launches New Herbal Formula</h2>
              <p className="text-gray-600 mb-6">
                We&apos;re excited to announce our newest herbal supplement formulation, developed after years of research and testing. This breakthrough formula combines traditional healing plants with modern extraction techniques.
              </p>
              <a href="#" className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Recent Articles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/news-1.jpeg" 
                alt="News Article" 
                fill
                style={{objectFit: "cover"}}
              />
            </div>
            <div className="p-6">
              <div className="text-xs text-green-600 font-semibold mb-1">April 22, 2023</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">The Benefits of Natural Remedies</h3>
              <p className="text-sm text-gray-600 mb-4">
                Discover how natural remedies can help boost your immune system and improve overall health without harmful side effects.
              </p>
              <a href="#" className="text-green-600 font-semibold text-sm hover:text-green-800">
                Read More →
              </a>
            </div>
          </div>
          
          {/* Article 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/images/news-2.jpeg" 
                alt="News Article" 
                fill
                style={{objectFit: "cover"}}
              />
            </div>
            <div className="p-6">
              <div className="text-xs text-green-600 font-semibold mb-1">March 18, 2023</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">DONDOOIL Featured in Health Magazine</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our premium herbal products were recognized in this month's edition of Health & Wellness Magazine as top alternative remedies.
              </p>
              <a href="#" className="text-green-600 font-semibold text-sm hover:text-green-800">
                Read More →
              </a>
            </div>
          </div>
          
          {/* Article 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/news-3.jpg" 
                alt="News Article" 
                fill
                style={{objectFit: "cover"}}
              />
            </div>
            <div className="p-6">
              <div className="text-xs text-green-600 font-semibold mb-1">February 5, 2023</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Success Stories</h3>
              <p className="text-sm text-gray-600 mb-4">
                Read inspiring testimonials from customers who have experienced remarkable health improvements with DONDOOIL products.
              </p>
              <a href="#" className="text-green-600 font-semibold text-sm hover:text-green-800">
                Read More →
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="bg-green-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, product updates, and health tips directly to your inbox.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Contact Our Media Team</h2>
          <p className="text-gray-600 mb-2">
            For press inquiries or media opportunities:<br />
            Email: info@dondooil.com<br />
            Tel: +234 8033367384 | +234 0874747449<br />
            Suite 19, Anafaraa Plaza, Opp Oando Filling Station,<br />
            1st Avenue, Gwarimpa, Abuja
          </p>
        </div>
      </section>
    </main>
  );
}