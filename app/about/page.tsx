

import React from 'react';
import { ChevronRight, Leaf, Shield, Heart, Award, MessageCircle } from 'lucide-react';
import SEOHeader from '@/components/SEOHeader';

export const metadata = {
    title: 'About DONDOOIL | Natural Health & Wellness Solutions',
    description: 'Learn about DONDOOIL&apos;s mission and our innovative Hosannaoil supplement for enhancing immunity and overall wellness.',
  };

const AboutPage = () => {
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
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-green-800 mb-6">
              About DONDOOIL
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bringing Originality to Natural Health Solutions
            </p>
          </div>
          <SEOHeader />
          {/* Rest of the content remains the same */}
          {/* Founder Section */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-3xl font-semibold text-green-700 mb-6 flex items-center">
                      <Shield className="w-8 h-8 mr-3 text-green-600" />
                      Our Founder
                    </h2>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      DONDOOIL was founded by Dr. Dondo Emmanuel Shande, M.D., a Doctor of Herbal Remedy with specialty in immunology. Through intensive study of the human body and nature, Dr. Shande has pioneered innovative approaches to natural wellness solutions.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Based in Abuja, Nigeria, Dr. Shande combines his medical expertise with a passion for natural remedies to develop effective therapeutic products that bridge traditional wisdom with modern science.
                    </p>
                  </div>
                  <div className="w-full md:w-1/3">
                    <img src="/founder.png" alt="Founder" className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Section */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-semibold text-green-700 mb-6 flex items-center">
                <Award className="w-8 h-8 mr-3 text-green-600" />
                Our Flagship Product: DONDOOIL
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  DONDOOIL is our revolutionary Food Supplement and Immune Booster, scientifically developed to enhance the body&apos;s natural defense systems. This herbal remedy wonder has been rigorously tested and validated by respected institutions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <ChevronRight className="w-5 h-5 text-green-500 mr-2" />
                      <span>NIPRD (National Institute for Pharmaceutical Research and Development)</span>
                    </div>
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <ChevronRight className="w-5 h-5 text-green-500 mr-2" />
                      <span>Analytical Laboratories (ATL) Beirut, Lebanon</span>
                    </div>
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <ChevronRight className="w-5 h-5 text-green-500 mr-2" />
                       <span>National Agency for Food and Drug Administration and Control (NAFDAC) NO. A7-102209L</span>
                     </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    {[
                      "Enhancement of the immune system",
                      "Respiratory health support",
                      "Gastrointestinal wellness",
                      "Reproductive health",
                      "Cardiovascular support",
                      "Malaria prevention and treatment"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center p-2 hover:bg-green-50 rounded-lg transition-colors">
                        <Heart className="w-5 h-5 text-green-500 mr-3" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Food Production",
                  description: "Creating natural, effective supplements and wellness products.",
                  icon: <Leaf className="w-6 h-6" />
                },
                {
                  title: "Branding",
                  description: "Developing trusted health and wellness brands that customers can rely on.",
                  icon: <Award className="w-6 h-6" />
                },
                {
                  title: "Consultancy",
                  description: "Providing expert guidance on natural health solutions and immune system enhancement.",
                  icon: <MessageCircle className="w-6 h-6" />
                }
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-semibold text-green-700 mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-700 mb-4">
                Visit us at: Suit 19, Anafaraa Plaza, Opp Oando Filling Station,<br />
                1st Avenue, Gwarimpa, Abuja
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Email: info@dondooil.com<br />
                Tel: +234 8033367384 | +234 0874747449
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;