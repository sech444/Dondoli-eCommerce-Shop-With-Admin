"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Download, Share2, Eye, Gift, Users, TrendingUp, Award } from 'lucide-react';
import SEOHeader from '@/components/SEOHeader';

const RegisterDiscountPage = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Register discount materials - using actual images from Register-discount directory
  const discountMaterials = [
    {
      id: 1,
      title: "Distributor Program Flyer",
      description: "Join our distributor network and earn exclusive discounts on DONDOOIL products",
      image: "/Register-discount/DISTRIBUTOR FLYER.jpg",
      category: "Distributor Program",
      downloadUrl: "/Register-discount/DISTRIBUTOR FLYER.jpg"
    },
    {
      id: 2,
      title: "Advanced Distributor Package",
      description: "Premium distributor benefits and enhanced discount structure",
      image: "/Register-discount/DISTRIBUTOR FLYER. PRO 2.jpg",
      category: "Distributor Program",
      downloadUrl: "/Register-discount/DISTRIBUTOR FLYER. PRO 2.jpg"
    },
    {
      id: 3,
      title: "Distributor Registration Form",
      description: "Official registration form to become a DONDOOIL distributor",
      image: "/Register-discount/DISTRIBUTOR FORM1j.jpg",
      category: "Registration",
      downloadUrl: "/Register-discount/DISTRIBUTOR FORM1j.jpg"
    },
    {
      id: 4,
      title: "DONDOOIL Brand Guidelines",
      description: "Official brand logo and guidelines for distributors and partners",
      image: "/Register-discount/dondooil logo 01k.jpg",
      category: "Brand Guidelines",
      downloadUrl: "/Register-discount/dondooil logo 01k.jpg"
    },
    {
      id: 5,
      title: "Health & Wealth Opportunity",
      description: "Discover how DONDOOIL can improve both your health and financial wellness",
      image: "/Register-discount/Health-Wealth.jpg",
      category: "Business Opportunity",
      downloadUrl: "/Register-discount/Health-Wealth.jpg"
    },
    {
      id: 6,
      title: "HOSANNAOIL Marketing Materials",
      description: "Professional marketing advertisements for HOSANNAOIL products",
      image: "/Register-discount/HOSANNAOIL ADDS1.jpg",
      category: "Marketing Materials",
      downloadUrl: "/Register-discount/HOSANNAOIL ADDS1.jpg"
    },
    {
      id: 7,
      title: "Marketing Guide - Part 1",
      description: "Comprehensive marketing strategies and sales techniques for distributors",
      image: "/Register-discount/marketing guide 01print1.jpg",
      category: "Marketing Guide",
      downloadUrl: "/Register-discount/marketing guide 01print1.jpg"
    },
    {
      id: 8,
      title: "Marketing Guide - Part 2",
      description: "Advanced marketing tactics and customer engagement strategies",
      image: "/Register-discount/marketing guide 01print2.jpg",
      category: "Marketing Guide",
      downloadUrl: "/Register-discount/marketing guide 01print2.jpg"
    }
  ];

  const categories = ["All", ...Array.from(new Set(discountMaterials.map(item => item.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMaterials = selectedCategory === "All" 
    ? discountMaterials 
    : discountMaterials.filter(item => item.category === selectedCategory);

  const openModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const downloadItem = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareItem = async (item: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-32">
      <SEOHeader />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="w-16 h-16 mx-auto mb-6 text-green-100" />
          <h1 className="text-5xl font-bold mb-6">Register for Exclusive Discounts</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Join our distributor network and unlock exclusive discounts, marketing materials, and business opportunities
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Why Register as a Distributor?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">Exclusive Discounts</h3>
              <p className="text-gray-600">Get up to 30% discount on all DONDOOIL products as a registered distributor</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">Marketing Support</h3>
              <p className="text-gray-600">Access professional marketing materials and sales training resources</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">Business Opportunity</h3>
              <p className="text-gray-600">Build a profitable health and wellness business with our proven system</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Browse Materials by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMaterials.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadItem(item.downloadUrl, item.title);
                      }}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        shareItem(item);
                      }}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Call to Action */}
          <div className="mt-20 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Register now to become a DONDOOIL distributor and start earning exclusive discounts while building a profitable health business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/2348033367384?text=I%20want%20to%20register%20as%20a%20DONDOOIL%20distributor%20and%20get%20exclusive%20discounts"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Gift className="w-5 h-5" />
                Register Now on WhatsApp
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
              >
                Contact Us for More Info
              </a>
            </div>
          </div>

          {/* Discount Tiers */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Distributor Discount Tiers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-700 mb-4">Bronze Distributor</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">15% OFF</div>
                <ul className="space-y-3 text-gray-600">
                  <li>• Minimum order: 10 units</li>
                  <li>• Basic marketing materials</li>
                  <li>• Email support</li>
                  <li>• Monthly product updates</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-400 transform scale-105">
                <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold text-center mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-4">Silver Distributor</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">25% OFF</div>
                <ul className="space-y-3 text-gray-600">
                  <li>• Minimum order: 25 units</li>
                  <li>• Premium marketing materials</li>
                  <li>• Phone & email support</li>
                  <li>• Training resources</li>
                  <li>• Quarterly bonuses</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-700 mb-4">Gold Distributor</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">35% OFF</div>
                <ul className="space-y-3 text-gray-600">
                  <li>• Minimum order: 50 units</li>
                  <li>• Complete marketing suite</li>
                  <li>• Priority support</li>
                  <li>• Personal account manager</li>
                  <li>• Exclusive events access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing materials */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="p-6">
              <div className="relative h-[60vh] mb-6">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-700 mb-3">{selectedItem.title}</h3>
                <p className="text-gray-600 mb-6">{selectedItem.description}</p>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => downloadItem(selectedItem.downloadUrl, selectedItem.title)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={() => shareItem(selectedItem)}
                    className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default RegisterDiscountPage;