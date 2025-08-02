import React from 'react';
import { Building2, Users, Award, Globe, Target, Heart, Shield, Leaf, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';
import SEOHeader from '@/components/SEOHeader';

export const metadata = {
  title: 'Company Profile | DONDOOIL - Leading Natural Health Solutions',
  description: 'Comprehensive company profile of DONDOOIL, a pioneering natural health and wellness company specializing in organic stem cell dietary supplements and immune boosters.',
};

const CompanyProfilePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 text-green-100" />
          <h1 className="text-5xl font-bold mb-6">Company Profile</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Leading the revolution in natural health solutions through innovative organic stem cell dietary supplements
          </p>
        </div>
      </div>

      <SEOHeader />

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Company Overview */}
          <section className="mb-20">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-green-700 mb-6">DONDOOIL</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  A pioneering natural health and wellness company dedicated to enhancing human immunity and overall well-being through scientifically-validated organic solutions.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-6">Our Mission</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    To revolutionize healthcare by providing natural, effective, and scientifically-proven health solutions that empower individuals to achieve optimal wellness and immunity.
                  </p>
                  <h3 className="text-2xl font-semibold text-green-700 mb-6">Our Vision</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To become the global leader in organic stem cell nutrition and natural health solutions, making holistic wellness accessible to everyone worldwide.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-semibold text-green-700 mb-6">Core Values</h3>
                  <div className="space-y-4">
                    {[
                      { icon: <Heart className="w-5 h-5" />, value: "Health First", desc: "Prioritizing customer health and well-being" },
                      { icon: <Shield className="w-5 h-5" />, value: "Quality Assurance", desc: "Maintaining highest standards in all products" },
                      { icon: <Leaf className="w-5 h-5" />, value: "Natural Solutions", desc: "Commitment to organic and natural ingredients" },
                      { icon: <CheckCircle className="w-5 h-5" />, value: "Scientific Integrity", desc: "Evidence-based product development" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="text-green-600 mt-1">{item.icon}</div>
                        <div>
                          <h4 className="font-semibold text-green-700">{item.value}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Leadership Team</h2>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3">
                    <img 
                      src="/founder.png" 
                      alt="Dr. Dondo Emmanuel Shande" 
                      className="rounded-xl shadow-lg w-full h-auto transform hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-semibold text-green-700 mb-4">Dr. Dondo Emmanuel Shande, M.D.</h3>
                    <p className="text-xl text-green-600 mb-6">Founder & Chief Executive Officer</p>
                    <div className="space-y-4 text-lg text-gray-700">
                      <p>
                        <strong>Specialization:</strong> Doctor of Herbal Remedy with specialty in Immunology
                      </p>
                      <p>
                        <strong>Expertise:</strong> Natural health solutions, immune system enhancement, herbal medicine research
                      </p>
                      <p>
                        <strong>Location:</strong> Abuja, Nigeria
                      </p>
                      <p className="leading-relaxed">
                        Dr. Shande combines extensive medical expertise with a passion for natural remedies, pioneering innovative approaches that bridge traditional wisdom with modern scientific validation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Products & Services */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Products & Services</h2>
            
            {/* Flagship Product */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 mb-12">
              <div className="text-center mb-8">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-green-700 mb-4">DONDOOIL - Our Flagship Product</h3>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  A revolutionary holistic healing organic stem cell dietary supplement that boosts the immune system to treat various health conditions.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="text-xl font-semibold text-green-700 mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {[
                      "100% Organic & Herbal Formula",
                      "NAFDAC Approved (NO. A7-102209L)",
                      "Scientifically Validated",
                      "Organic Stem Cell Nutrition",
                      "Holistic Wellness Approach",
                      "No Side Effects"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h4 className="text-xl font-semibold text-green-700 mb-4">Health Benefits</h4>
                  <ul className="space-y-3">
                    {[
                      "Immune System Enhancement",
                      "Respiratory Health Support",
                      "Gastrointestinal Wellness",
                      "Reproductive Health",
                      "Cardiovascular Support",
                      "Malaria Prevention & Treatment",
                      "Ulcer Treatment",
                      "Infection Control",
                      "Arthritis Relief",
                      "Cholesterol Management"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <Heart className="w-5 h-5 text-green-500 mr-3" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Food Production",
                  description: "Manufacturing natural, effective supplements and wellness products using cutting-edge organic stem cell technology.",
                  icon: <Leaf className="w-8 h-8" />
                },
                {
                  title: "Branding & Marketing",
                  description: "Developing trusted health and wellness brands that customers can rely on for authentic natural solutions.",
                  icon: <Award className="w-8 h-8" />
                },
                {
                  title: "Health Consultancy",
                  description: "Providing expert guidance on natural health solutions, immune system enhancement, and holistic wellness approaches.",
                  icon: <Users className="w-8 h-8" />
                }
              ].map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications & Validations */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Certifications & Validations</h2>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "NAFDAC Approval",
                    subtitle: "NO. A7-102209L",
                    description: "Officially approved by Nigeria's National Agency for Food and Drug Administration and Control"
                  },
                  {
                    title: "NIPRD Validation",
                    subtitle: "Research Institute",
                    description: "Tested and validated by the National Institute for Pharmaceutical Research and Development"
                  },
                  {
                    title: "International Testing",
                    subtitle: "ATL Beirut, Lebanon",
                    description: "Quality tested by Analytical Laboratories in Beirut, Lebanon for international standards"
                  }
                ].map((cert, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-xl border border-green-100">
                    <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-700 mb-2">{cert.title}</h3>
                    <p className="text-green-600 font-medium mb-3">{cert.subtitle}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Company Information */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-12">Company Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">Head Office</p>
                      <p className="text-gray-600">Suit 19, Anafaraa Plaza</p>
                      <p className="text-gray-600">Opp Oando Filling Station</p>
                      <p className="text-gray-600">1st Avenue, Gwarimpa, Abuja</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">Phone Numbers</p>
                      <p className="text-gray-600">+234 8033367384</p>
                      <p className="text-gray-600">+234 0874747449</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <p className="text-gray-600">info@dondooil.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Stats */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3" />
                  Company Highlights
                </h3>
                <div className="space-y-6">
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-green-100" />
                    <p className="text-2xl font-bold">Global Reach</p>
                    <p className="text-green-100">Expanding natural health solutions worldwide</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-green-100" />
                    <p className="text-2xl font-bold">Expert Team</p>
                    <p className="text-green-100">Led by medical professionals</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <Award className="w-8 h-8 mx-auto mb-2 text-green-100" />
                    <p className="text-2xl font-bold">Certified Quality</p>
                    <p className="text-green-100">NAFDAC approved and internationally tested</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in revolutionizing natural health solutions. Whether you're interested in our products, services, or partnership opportunities, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
                Contact Us
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default CompanyProfilePage;