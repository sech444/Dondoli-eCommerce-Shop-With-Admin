"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Download, Share2, Eye, FileText, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import SEOHeader from '@/components/SEOHeader';

const TermsOfUsePage = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Terms of use documents - using actual materials from Terms-of-use directory
  const termsDocuments = [
    {
      id: 1,
      title: "DONDOOIL Scientific Literature - Part 1",
      description: "Comprehensive scientific documentation and research findings for DONDOOIL products",
      image: "/Terms- of -use/Dondooil literature 01print1.jpg",
      category: "Scientific Documentation",
      downloadUrl: "/Terms- of -use/Dondooil literature 01print1.jpg"
    },
    {
      id: 2,
      title: "DONDOOIL Scientific Literature - Part 2",
      description: "Advanced scientific studies and clinical research documentation",
      image: "/Terms- of -use/Dondooil literature 01print2.jpg",
      category: "Scientific Documentation",
      downloadUrl: "/Terms- of -use/Dondooil literature 01print2.jpg"
    },
    {
      id: 3,
      title: "Scientific Description & Analysis",
      description: "Detailed scientific description and analysis of DONDOOIL composition and effects",
      image: "/Terms- of -use/LITERATURE.SCIENTIFIC DISCRIPTIONjpeg.jpg",
      category: "Scientific Analysis",
      downloadUrl: "/Terms- of -use/LITERATURE.SCIENTIFIC DISCRIPTIONjpeg.jpg"
    },
    {
      id: 4,
      title: "Scientific Description - Extended",
      description: "Extended scientific description with detailed molecular analysis and research data",
      image: "/Terms- of -use/LITERATURE.SCIENTIFIC DISCRIPTIONjpeg2.jpg",
      category: "Scientific Analysis",
      downloadUrl: "/Terms- of -use/LITERATURE.SCIENTIFIC DISCRIPTIONjpeg2.jpg"
    },
    {
      id: 5,
      title: "Medical Research Report",
      description: "Official medical research report and clinical study results for DONDOOIL",
      image: "/Terms- of -use/Medical reportkllkk.jpg",
      category: "Medical Reports",
      downloadUrl: "/Terms- of -use/Medical reportkllkk.jpg"
    }
  ];

  const categories = ["All", ...Array.from(new Set(termsDocuments.map(doc => doc.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDocuments = selectedCategory === "All" 
    ? termsDocuments 
    : termsDocuments.filter(doc => doc.category === selectedCategory);

  const openModal = (document: any) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const downloadDocument = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareDocument = async (document: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: document.description,
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
          <Shield className="w-16 h-16 mx-auto mb-6 text-green-100" />
          <h1 className="text-5xl font-bold mb-6">Terms of Use</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Important information about the use of DONDOOIL products, scientific documentation, and legal guidelines
          </p>
        </div>
      </div>

      {/* Terms Overview Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Important Terms & Guidelines</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-green-50 p-6 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">Product Usage</h3>
              <p className="text-gray-600">DONDOOIL products are natural supplements designed to enhance immunity and overall health. Follow recommended dosage guidelines.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl">
              <AlertCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">Medical Consultation</h3>
              <p className="text-gray-600">Consult with healthcare professionals before use, especially if you have existing medical conditions or are taking medications.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl">
              <Shield className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">All products are NAFDAC approved (NO. A7-102209L) and scientifically tested for safety and efficacy.</p>
            </div>
          </div>

          {/* Key Terms */}
          <div className="bg-gray-50 p-8 rounded-xl mb-16">
            <h3 className="text-2xl font-bold text-green-700 mb-6">Key Terms & Conditions</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-3">Product Information</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• DONDOOIL is a natural herbal supplement</li>
                  <li>• Contains organic stem cell nutrition</li>
                  <li>• NAFDAC approved for safety and quality</li>
                  <li>• Scientifically validated by NIPRD and international labs</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-3">Usage Guidelines</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Follow recommended dosage instructions</li>
                  <li>• Store in cool, dry place</li>
                  <li>• Keep out of reach of children</li>
                  <li>• Discontinue use if adverse reactions occur</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-16">
            <div className="flex">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimers</h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>�� This product is intended to Enhancing immunity to fight diseases, diagnose, treat, cure, or prevent any disease</li>
                  <li>• Individual results may vary based on personal health conditions</li>
                  <li>• Pregnant or nursing women should consult healthcare providers before use</li>
                  <li>• Not recommended for children under 12 years without medical supervision</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Scientific Documentation & Reports</h2>
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

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(document)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={document.image}
                    alt={document.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {document.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-3">{document.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{document.description}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadDocument(document.downloadUrl, document.title);
                      }}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        shareDocument(document);
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

          {/* Legal Information */}
          <div className="mt-20 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Legal Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-4">Intellectual Property</h3>
                <p className="text-gray-600 mb-4">
                  All content, trademarks, and intellectual property related to DONDOOIL products are owned by 
                  DONDOOIL and protected by applicable laws. Unauthorized use is prohibited.
                </p>
                
                <h3 className="text-lg font-semibold text-green-600 mb-4">Privacy Policy</h3>
                <p className="text-gray-600">
                  We respect your privacy and are committed to protecting your personal information. 
                  All customer data is handled in accordance with applicable privacy laws.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-4">Limitation of Liability</h3>
                <p className="text-gray-600 mb-4">
                  DONDOOIL shall not be liable for any indirect, incidental, or consequential damages 
                  arising from the use of our products beyond the purchase price.
                </p>
                
                <h3 className="text-lg font-semibold text-green-600 mb-4">Governing Law</h3>
                <p className="text-gray-600">
                  These terms are governed by the laws of Nigeria and any disputes shall be resolved 
                  in the appropriate courts of Abuja, Nigeria.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-20 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">Questions About Terms of Use?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              If you have any questions about these terms or need clarification about product usage, please contact our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </a>
              <a
                href="https://wa.me/2348033367384?text=I%20have%20questions%20about%20DONDOOIL%20terms%20of%20use"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing documents */}
      {isModalOpen && selectedDocument && (
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
                  src={selectedDocument.image}
                  alt={selectedDocument.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-700 mb-3">{selectedDocument.title}</h3>
                <p className="text-gray-600 mb-6">{selectedDocument.description}</p>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => downloadDocument(selectedDocument.downloadUrl, selectedDocument.title)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={() => shareDocument(selectedDocument)}
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

export default TermsOfUsePage;