"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Download, Share2, Eye, FileText } from 'lucide-react';
import SEOHeader from '@/components/SEOHeader';

const FlyersPage = () => {
  const [selectedFlyer, setSelectedFlyer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Flyer data - using actual flyers from Learn-more directory
  const flyers = [
    {
      id: 1,
      title: "DONDOOIL Meningitis Treatment Flyer",
      description: "Comprehensive guide to treating meningitis with DONDOOIL natural supplements",
      image: "/Learn-more/DONDOOIL menigitis FLYER.jpg",
      category: "Medical Treatment",
      downloadUrl: "/Learn-more/DONDOOIL menigitis FLYER.jpg"
    },
    {
      id: 2,
      title: "DONDOOIL Meningitis Prevention",
      description: "Prevention and treatment strategies for meningitis using natural remedies",
      image: "/Learn-more/DONDOOIL menigitis FLYER2.jpg",
      category: "Medical Treatment",
      downloadUrl: "/Learn-more/DONDOOIL menigitis FLYER2.jpg"
    },
    {
      id: 3,
      title: "DONDOOIL Eye Drops",
      description: "Natural eye care solutions and treatment with DONDOOIL eye drops",
      image: "/Learn-more/Dondooil eye dropj.jpg",
      category: "Eye Care",
      downloadUrl: "/Learn-more/Dondooil eye dropj.jpg"
    },
    {
      id: 4,
      title: "Ulcer Treatment Guide",
      description: "Effective natural treatment for ulcers using DONDOOIL supplements",
      image: "/Learn-more/Ulcers0.jpg",
      category: "Digestive Health",
      downloadUrl: "/Learn-more/Ulcers0.jpg"
    },
    {
      id: 5,
      title: "DONDOOIL Wellness Initiative",
      description: "Community wellness program and health education initiative",
      image: "/Learn-more/dondooil wellnes initiative5.jpg",
      category: "Wellness Program",
      downloadUrl: "/Learn-more/dondooil wellnes initiative5.jpg"
    },
    {
      id: 6,
      title: "Health Giveaway Campaign",
      description: "Community health giveaway program - promoting wellness for all",
      image: "/Learn-more/GIVEAWAY FLYER1.jpg",
      category: "Community Outreach",
      downloadUrl: "/Learn-more/GIVEAWAY FLYER1.jpg"
    },
    {
      id: 7,
      title: "Health Awareness Giveaway",
      description: "Educational health awareness and product giveaway initiative",
      image: "/Learn-more/GIVEAWAY FLYER2.jpg",
      category: "Community Outreach",
      downloadUrl: "/Learn-more/GIVEAWAY FLYER2.jpg"
    },
    {
      id: 8,
      title: "Community Health Drive",
      description: "Free health screening and product distribution campaign",
      image: "/Learn-more/GIVEAWAY FLYER3.jpg",
      category: "Community Outreach",
      downloadUrl: "/Learn-more/GIVEAWAY FLYER3.jpg"
    },
    {
      id: 9,
      title: "Wellness Outreach Program",
      description: "Comprehensive community wellness and health education program",
      image: "/Learn-more/GIVEAWAY FLYER4.jpg",
      category: "Community Outreach",
      downloadUrl: "/Learn-more/GIVEAWAY FLYER4.jpg"
    },
    {
      id: 10,
      title: "HOSANNAOIL Product Package",
      description: "Complete product information and packaging details for HOSANNAOIL",
      image: "/Learn-more/hosannaoil pack propk.jpg",
      category: "Product Information",
      downloadUrl: "/Learn-more/hosannaoil pack propk.jpg"
    },
    {
      id: 11,
      title: "Natural Remedies Guide",
      description: "Comprehensive guide to natural remedies and herbal treatments",
      image: "/Learn-more/Backup_of_REMEDIES.jpg",
      category: "Natural Remedies",
      downloadUrl: "/Learn-more/Backup_of_REMEDIES.jpg"
    },
    {
      id: 12,
      title: "Health Literature - Part 1",
      description: "Educational literature on natural health and wellness practices",
      image: "/Learn-more/our literature01.jpg",
      category: "Educational",
      downloadUrl: "/Learn-more/our literature01.jpg"
    },
    {
      id: 13,
      title: "Health Literature - Part 2",
      description: "Advanced health education materials and treatment guidelines",
      image: "/Learn-more/our literature02.jpg",
      category: "Educational",
      downloadUrl: "/Learn-more/our literature02.jpg"
    },
    {
      id: 14,
      title: "Health Research Essay",
      description: "Research findings and brief essay on natural health solutions",
      image: "/Learn-more/MY brief essay.prop.jpg",
      category: "Research",
      downloadUrl: "/Learn-more/MY brief essay.prop.jpg"
    },
    {
      id: 15,
      title: "Product Documentation 2020",
      description: "Official product documentation and certification from 2020",
      image: "/Learn-more/IMG_20200819_201303.jpg",
      category: "Documentation",
      downloadUrl: "/Learn-more/IMG_20200819_201303.jpg"
    },
    {
      id: 16,
      title: "Clinical Results 2020",
      description: "Clinical trial results and patient testimonials from 2020",
      image: "/Learn-more/IMG_20200916_133836.jpg",
      category: "Clinical Results",
      downloadUrl: "/Learn-more/IMG_20200916_133836.jpg"
    },
    {
      id: 17,
      title: "Treatment Success Stories 2021",
      description: "Documented success stories and treatment outcomes from 2021",
      image: "/Learn-more/IMG_20210301_153058.jpg",
      category: "Success Stories",
      downloadUrl: "/Learn-more/IMG_20210301_153058.jpg"
    },
    {
      id: 18,
      title: "Patient Testimonials 2021",
      description: "Real patient testimonials and recovery documentation",
      image: "/Learn-more/IMG_20210302_172027.jpg",
      category: "Testimonials",
      downloadUrl: "/Learn-more/IMG_20210302_172027.jpg"
    },
    {
      id: 19,
      title: "Health Certification 2021",
      description: "Official health certifications and regulatory approvals",
      image: "/Learn-more/IMG_20210305_131717.jpg",
      category: "Certification",
      downloadUrl: "/Learn-more/IMG_20210305_131717.jpg"
    },
    {
      id: 20,
      title: "Product Efficacy Report",
      description: "Detailed efficacy reports and clinical study results",
      image: "/Learn-more/IMG_20210419_181225.jpg",
      category: "Clinical Results",
      downloadUrl: "/Learn-more/IMG_20210419_181225.jpg"
    },
    {
      id: 21,
      title: "Treatment Guidelines 2021",
      description: "Updated treatment guidelines and dosage recommendations",
      image: "/Learn-more/IMG_20210421_174325.jpg",
      category: "Treatment Guidelines",
      downloadUrl: "/Learn-more/IMG_20210421_174325.jpg"
    },
    {
      id: 22,
      title: "Research Documentation",
      description: "Latest research findings and scientific documentation",
      image: "/Learn-more/IMG_20210709_201116_428.JPG",
      category: "Research",
      downloadUrl: "/Learn-more/IMG_20210709_201116_428.JPG"
    },
    {
      id: 23,
      title: "Scientific Study Results",
      description: "Comprehensive scientific study results and analysis",
      image: "/Learn-more/IMG_20210709_201409_583.JPG",
      category: "Scientific Studies",
      downloadUrl: "/Learn-more/IMG_20210709_201409_583.JPG"
    }
  ];

  const categories = ["All", ...Array.from(new Set(flyers.map(flyer => flyer.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFlyers = selectedCategory === "All" 
    ? flyers 
    : flyers.filter(flyer => flyer.category === selectedCategory);

  const openModal = (flyer: any) => {
    setSelectedFlyer(flyer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlyer(null);
  };

  const downloadFlyer = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareFlyer = async (flyer: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: flyer.title,
          text: flyer.description,
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
          <FileText className="w-16 h-16 mx-auto mb-6 text-green-100" />
          <h1 className="text-5xl font-bold mb-6">Educational Flyers & Materials</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Explore our comprehensive collection of educational materials about DONDOOIL and natural health solutions
          </p>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Browse by Category</h2>
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

          {/* Flyers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFlyers.map((flyer) => (
              <div
                key={flyer.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(flyer)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={flyer.image}
                    alt={flyer.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {flyer.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">{flyer.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{flyer.description}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadFlyer(flyer.downloadUrl, flyer.title);
                      }}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        shareFlyer(flyer);
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

          {/* Call to Action */}
          <div className="mt-20 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">Need More Information?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Have questions about our products or need personalized health guidance? Our team of experts is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </a>
              <a
                href="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
              >
                View Products
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing flyers */}
      {isModalOpen && selectedFlyer && (
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
                  src={selectedFlyer.image}
                  alt={selectedFlyer.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-700 mb-3">{selectedFlyer.title}</h3>
                <p className="text-gray-600 mb-6">{selectedFlyer.description}</p>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => downloadFlyer(selectedFlyer.downloadUrl, selectedFlyer.title)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={() => shareFlyer(selectedFlyer)}
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

export default FlyersPage;