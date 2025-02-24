
"use client"

import Link from "next/link";
import React from "react";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import SEOHeader from "./SEOHeader";

const Contact = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Top spacing and decorative elements */}
      <div className="h-32 bg-green-50"></div>
      <div className="relative w-full h-20 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" 
                fill="#4ade80" fillOpacity="0.2"/>
        </svg>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with extra padding */}
          <div className="text-center mb-20 pt-16 animate-fade-in">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-green-800 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let&apos;s talk about how we can help with health needs
            </p>
          </div>
          <SEOHeader />

          {/* Contact Info Section */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">Our Location</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-green-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-1">Visit Us</h3>
                        <p className="text-gray-600">Suit 19, Anafaraa Plaza, Opp Oando Filling Station, 1st Avenue, Gwarimpa, Abuja</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-green-600">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-1">Email Us</h3>
                        <p className="text-gray-600">info@dondooil.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-green-600">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-1">Call Us</h3>
                        <p className="text-gray-600">+234 8033367384 | +234 0874747449</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Form */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-green-700 mb-6">Send us a Message</h3>
                    <form>
                      <div className="mb-4">
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name*
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Your Name"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email*
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone*
                        </label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Your Phone Number"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Message*
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Type your message here"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition"
                        ></textarea>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg w-full md:w-auto"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">Find Us</h2>
                <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="h-full w-full">
                    <div className="mapouter h-full">
                      <div className="gmap_canvas h-full">
                        <iframe 
                          className="gmap_iframe" 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          scrolling="no" 
                          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Suit 19, Anafaraa Plaza, Opp Oando Filling Station, 1st Avenue, Gwarimpa, Abuja&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                      <style jsx>{`
                        .mapouter {
                          position: relative;
                          text-align: right;
                          width: 100%;
                          height: 100%;
                        }
                        .gmap_canvas {
                          overflow: hidden;
                          background: none !important;
                          width: 100%;
                          height: 100%;
                        }
                        .gmap_iframe {
                          height: 100% !important;
                        }
                      `}</style>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl overflow-hidden text-white">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Reach out today and let us know how we can help you achieve your goals.
              </p>
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
