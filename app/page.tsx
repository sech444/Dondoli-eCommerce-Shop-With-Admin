'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, Shield, Heart, MapPin, Phone, Mail, Star, AlertCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ORDERS_API = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/orders';

// Nigeria states (36 + FCT)
const NG_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa',
  'Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger',
  'Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT - Abuja'
];

// Error types for better error handling
type ErrorType = 'network' | 'validation' | 'server' | 'timeout' | 'unknown';

interface FormError {
  type: ErrorType;
  message: string;
  field?: string;
}

const DondooilLandingPage = () => {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [currentError, setCurrentError] = useState<FormError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    deliveryAddress: '',
    otherConcerns: ''
  });

  // Reveal-on-scroll animation
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Enhanced form validation
  const validateForm = (): FormError | null => {
    if (!formData.fullName.trim()) {
      return { type: 'validation', message: 'Please enter your full name', field: 'fullName' };
    }
    
    if (!formData.phoneNumber.trim()) {
      return { type: 'validation', message: 'Please enter your phone number', field: 'phoneNumber' };
    }
    
    // Basic phone number validation for Nigerian numbers
    const phoneRegex = /^(\+234|0)[789]\d{9}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      return { type: 'validation', message: 'Please enter a valid Nigerian phone number', field: 'phoneNumber' };
    }
    
    if (!selectedState) {
      return { type: 'validation', message: 'Please select your state', field: 'state' };
    }
    
    if (!formData.deliveryAddress.trim()) {
      return { type: 'validation', message: 'Please enter your delivery address', field: 'deliveryAddress' };
    }
    
    if (formData.deliveryAddress.trim().length < 10) {
      return { type: 'validation', message: 'Please provide a more detailed delivery address', field: 'deliveryAddress' };
    }
    
    if (!selectedPackage) {
      return { type: 'validation', message: 'Please select a package', field: 'package' };
    }

    return null;
  };

  // Enhanced error handling
  const handleError = (error: any, context: string): FormError => {
    console.error(`${context} error:`, error);
    
    // Network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        type: 'network',
        message: 'Unable to connect to our servers. Please check your internet connection and try again.'
      };
    }
    
    // Timeout errors
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return {
        type: 'timeout',
        message: 'Request timed out. Please check your connection and try again.'
      };
    }
    
    // Server errors based on status codes
    if (error.status) {
      switch (error.status) {
        case 400:
          return {
            type: 'validation',
            message: 'Invalid order information. Please check your details and try again.'
          };
        case 429:
          return {
            type: 'server',
            message: 'Too many requests. Please wait a moment and try again.'
          };
        case 500:
        case 502:
        case 503:
        case 504:
          return {
            type: 'server',
            message: 'Our servers are temporarily unavailable. Please try again in a few minutes.'
          };
        default:
          return {
            type: 'server',
            message: `Server error (${error.status}). Please try again or contact support.`
          };
      }
    }
    
    // Validation errors from server
    if (error.message?.includes('validation') || error.message?.includes('required')) {
      return {
        type: 'validation',
        message: error.message || 'Please check your form details and try again.'
      };
    }
    
    // Default unknown error
    return {
      type: 'unknown',
      message: 'An unexpected error occurred. Please try again or contact our support team.'
    };
  };

  // Enhanced form submission with retry logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous errors
    setCurrentError(null);
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setCurrentError(validationError);
      setShowErrorModal(true);
      return;
    }

    const orderData = {
      fullName: formData.fullName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      whatsappNumber: formData.whatsappNumber.trim() || undefined,
      state: selectedState,
      deliveryAddress: formData.deliveryAddress.trim(),
      package: selectedPackage,
      concerns: [...selectedConcerns, formData.otherConcerns.trim()].filter(Boolean),
    };

    try {
      setIsSubmitting(true);
      
      // Create AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const res = await fetch(ORDERS_API, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        let errorMessage = 'Failed to submit order';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = await res.text() || errorMessage;
        }
        
        const error = new Error(errorMessage);
        (error as any).status = res.status;
        throw error;
      }

      // Success - redirect to thank you page
      router.push('/thank-you');
      
    } catch (err: any) {
      const error = handleError(err, 'Order submission');
      setCurrentError(error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Retry submission
  const handleRetry = async () => {
    if (retryCount >= 3) {
      setCurrentError({
        type: 'server',
        message: 'Maximum retry attempts reached. Please try again later or contact our support team.'
      });
      return;
    }
    
    setRetryCount(prev => prev + 1);
    setShowErrorModal(false);
    
    // Add delay before retry
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.requestSubmit();
      }
    }, 1000 * retryCount); // Exponential backoff
  };

  // Navigation handlers
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/welcome');
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
  };

  const handleBrowseProducts = () => {
    router.push('/welcome');
  };

  const handleConcernChange = (concern: string, checked: boolean) => {
    if (checked) setSelectedConcerns((p) => [...p, concern]);
    else setSelectedConcerns((p) => p.filter((c) => c !== concern));
  };

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-inter antialiased">
      {/* Enhanced Global Styles + Mobile fixes */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        /* Hide any site-wide header/nav on this page */
        header, .site-header, .global-header, nav[role="navigation"] {
          display: none !important;
        }
        body {
          padding-top: 0 !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Enhanced reveal animation */
        .reveal {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                     transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Sharp accent line with enhanced animation */
        .accent-bar {
          background: linear-gradient(90deg,
            rgba(34,197,94,0) 0%,
            rgba(34,197,94,0.8) 20%,
            #22c55e 50%,
            rgba(34,197,94,0.8) 80%,
            rgba(34,197,94,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
          border-radius: 9999px;
        }
        @keyframes shimmer {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }

        /* Enhanced gradient blobs */
        .blob {
          filter: blur(60px);
          opacity: 0.35;
          animation: blob 25s ease-in-out infinite;
          border-radius: 50%;
        }
        .blob-delay { animation-delay: 8s; }
        .blob-delay-2 { animation-delay: 16s; }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(30px, -40px) scale(1.1) rotate(90deg); }
          50% { transform: translate(-20px, 30px) scale(0.9) rotate(180deg); }
          75% { transform: translate(40px, 20px) scale(1.05) rotate(270deg); }
        }

        /* Premium button with enhanced shine */
        .btn-premium {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          box-shadow: 0 8px 32px rgba(34, 197, 94, 0.25);
        }
        .btn-premium::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .btn-premium:hover::before {
          opacity: 1;
        }
        .btn-premium::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-120%) skewX(-15deg);
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .btn-premium:hover::after {
          transform: translateX(120%) skewX(-15deg);
        }

        /* Card hover effects */
        .card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 197, 94, 0.05);
        }

        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Enhanced form inputs */
        .form-input {
          border: 2px solid #e2e8f0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .form-input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.08);
          transform: translateY(-1px);
        }
        .form-input.error {
          border-color: #dc2626;
          box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.08);
        }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Loading spinner */
        .spinner {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 2px solid white;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Shadow effects */
        .shadow-sharp {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .shadow-sharp-green {
          box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.1), 0 2px 4px -1px rgba(34, 197, 94, 0.06);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .reveal, .blob, .accent-bar, .btn-premium::after, .spinner {
            animation: none !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100/40">
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-green-400/30 to-emerald-400/30 blob" />
          <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-gradient-to-r from-emerald-400/25 to-green-400/25 blob blob-delay" />
          <div className="absolute top-1/4 -right-16 w-72 h-72 bg-gradient-to-r from-green-300/20 to-emerald-300/20 blob blob-delay-2" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center mx-auto max-w-4xl">
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                <Star className="w-4 h-4 fill-current" />
                NAFDAC Approved • A7-102209L
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '200ms' }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                Boost Your Immunity,
                <span className="gradient-text block">Naturally & Safely</span>
              </h1>
            </div>

            <div className="mx-auto mt-4 sm:mt-6 w-24 sm:w-32 h-1.5 accent-bar reveal" style={{ transitionDelay: '300ms' }}></div>

            <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed reveal max-w-3xl mx-auto" style={{ transitionDelay: '400ms' }}>
              Discover <span className="font-semibold text-green-700">Dondooil</span> — the NAFDAC-verified herbal wellness formula trusted by thousands across Nigeria and beyond.
              <span className="block mt-2 font-medium">Delivered to your doorstep. Pay only on delivery.</span>
            </p>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 reveal" style={{ transitionDelay: '500ms' }}>
              <button
                onClick={scrollToForm}
                className="group btn-premium px-7 py-3 sm:px-10 sm:py-4 text-white font-bold text-lg sm:text-xl rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Order Now – Pay on Delivery
                </span>
              </button>

              <button
                onClick={handleBrowseProducts}
                className="group border-2 border-green-600 text-green-700 hover:bg-green-50 px-7 py-3 sm:px-10 sm:py-4 font-bold text-lg sm:text-xl rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse Products
                </span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 font-medium mt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                100% Herbal
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Nationwide Delivery
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Pay on Delivery
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 reveal" style={{ transitionDelay: '600ms' }}>
              {[
                { icon: '🛡️', text: 'NAFDAC Verified', subtext: 'Government Approved' },
                { icon: '⚡', text: 'Fast Delivery', subtext: '1-3 Working Days' },
                { icon: '💯', text: 'Trusted by Thousands', subtext: 'Proven Results' }
              ].map((item, i) => (
                <div key={i} className="glass p-4 sm:p-6 rounded-2xl shadow-sharp text-center">
                  <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-slate-900">{item.text}</div>
                  <div className="text-xs sm:text-sm text-slate-600">{item.subtext}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Dondooil */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-green-100/60 to-emerald-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center reveal mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900">
              Why Choose <span className="gradient-text">Dondooil?</span>
            </h2>
            <div className="mx-auto mt-4 sm:mt-6 w-24 sm:w-28 h-1.5 accent-bar"></div>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Scientifically formulated, traditionally trusted, and proven effective for comprehensive wellness.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: '🛡️', title: 'Natural Immunity Boost', desc: 'Boosts immune system to prevent and fight disease naturally' },
              { icon: '🫁', title: 'Respiratory & Digestive Health', desc: 'Perfect for digestive and respiratory health issues' },
              { icon: '👨‍👩‍👧‍👦', title: 'Safe for All Ages', desc: 'Safe for adults, pregnant women, and infants' },
              { icon: '💪', title: 'Rich in Essential Nutrients', desc: 'Rich in Protein, Vitamins A, E, K & Antioxidants' },
              { icon: '❤️', title: 'Heart Healthy', desc: 'Zero cholesterol & Zero trans-fat' },
              { icon: '🕒', title: 'Long Shelf Life', desc: 'Does not oxidize easily, maintaining potency' },
              { icon: '⚡', title: 'Powerful MCTs', desc: 'Contains beneficial MCTs that have no respect for any disease' },
              { icon: '🍼', title: 'Unique Nutrient', desc: 'Contains nutrient only found in breast milk' }
            ].map((feature, index) => (
              <div
                key={index}
                className="reveal card-hover bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sharp border-l-4 border-green-500 group"
                style={{ transitionDelay: `${100 + index * 60}ms` }}
              >
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Benefits */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-emerald-50 via-green-50 to-emerald-100/50 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[40rem] h-[40rem] bg-gradient-to-r from-green-200/20 to-emerald-200/20 blob rounded-full" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center reveal mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900">
              Health <span className="gradient-text">Benefits</span>
            </h2>
            <div className="mx-auto mt-4 sm:mt-6 w-24 sm:w-28 h-1.5 accent-bar"></div>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Regular use of Dondooil® provides comprehensive wellness support:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              { icon: '🔬', title: 'Immune System Enhancement', desc: 'Enhancement of the immune system from the Myeloid and Lymphoid progenitor' },
              { icon: '🫁', title: 'Respiratory Health', desc: 'Treats Respiratory issues (Pneumonia, Asthma, Cough, Bronchitis, Breathing difficulties and Cancer of the lungs)' },
              { icon: '🏥', title: 'Gastrointestinal Support', desc: 'Treats Gastrointestinal issues, including Chronic ulcer, Hemorrhoid, Indigestion and other Ulceration' },
              { icon: '👨‍👩‍👧', title: 'Reproductive Health', desc: 'Treats Reproductive health issues (Infertility, Fibroids, Menstrual disorders, ED/low libido and Prostate enlargement)' },
              { icon: '❤️', title: 'Cardiovascular Wellness', desc: 'Blood pressure regulation, Cholesterol management, Blood clot prevention and Blood cleansing' },
              { icon: '🦠', title: 'Disease Prevention', desc: 'Malaria, Common cold and other related conditions' },
              { icon: '🧹', title: 'Detoxification', desc: 'General detoxification and Protection from free radicals' }
            ].map((benefit, index) => (
              <div
                key={index}
                className="reveal card-hover glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sharp-green group"
                style={{ transitionDelay: `${100 + index * 70}ms` }}
              >
                <div className="text-2xl sm:text-3xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-4">{benefit.title}</h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Validation */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-emerald-100/60 to-green-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center reveal mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900">
              <span className="gradient-text">NAFDAC Approved.</span> Tested. Trusted.
            </h2>
            <div className="mx-auto mt-4 sm:mt-6 w-24 sm:w-28 h-1.5 accent-bar"></div>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Dondooil's efficacy is confirmed by NAFDAC approval and independent laboratory analysis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            {[
              { icon: <Shield className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />, title: 'Dosage Verification', desc: 'Confirmed by NIPRD (National Institute for Pharmaceutical Research and Development)' },
              { icon: <CheckCircle className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />, title: 'Fame Analysis', desc: 'Conducted at Analytical Laboratories (ATL), Beirut, Lebanon, confirming the presence of MCTs and other beneficial compounds' },
              { icon: <Heart className="w-8 sm:w-10 h-8 sm:h-10 text-green-600" />, title: 'Breast Milk Components', desc: 'Dondooil® contains elements also found in breast milk. Can be administered to infants (in water or with baby food) to help provide immunity' }
            ].map((validation, index) => (
              <div
                key={index}
                className="reveal card-hover bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sharp group"
                style={{ transitionDelay: `${100 + index * 90}ms` }}
              >
                <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">{validation.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-slate-900">{validation.title}</h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{validation.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal glass p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-sharp" style={{ transitionDelay: '200ms' }}>
            <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-900">Key Constituents:</h3>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              <span className="font-semibold">Essential Fatty Acids:</span> Myristic Acids, Lauric Acids, Palmitic Acid, Oleic Acids (Omega 9), Stearic Acid, Linoleic Acids (Omega 6), Alpha-linolenic Acid (Omega 3) •
              <span className="font-semibold"> Vitamins & Antioxidants:</span> Vitamins E, K, A, Antioxidants & Tocotrienols •
              <span className="font-semibold">Natural Compounds:</span> Carotenoids, Nimbin, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-green-50 to-emerald-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center reveal mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900">
              Proven <span className="gradient-text">Results</span>
            </h2>
            <div className="mx-auto mt-4 sm:mt-6 w-24 sm:w-28 h-1.5 accent-bar"></div>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Real stories from satisfied customers across Nigeria
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              { text: 'I used Dondooil for just 2 weeks and my energy levels came back like never before.', author: 'Joy, Lagos', rating: 5 },
              { text: 'I was always down with malaria. Since I started Dondooil, I feel stronger and healthier.', author: 'Emeka, Abuja', rating: 5 },
              { text: 'The Family Pack has been a blessing to my household. No regrets at all.', author: 'Ngozi, PH', rating: 5 }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="reveal card-hover glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sharp relative group"
                style={{ transitionDelay: `${120 + index * 90}ms` }}
              >
                <div className="text-5xl sm:text-6xl text-green-500 absolute -top-4 left-4 sm:left-6 opacity-50">"</div>
                <div className="flex gap-1 mb-3 sm:mb-4 pt-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">{testimonial.text}</p>
                <div className="text-green-700 font-bold text-sm sm:text-base">– {testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-emerald-50 to-green-100/70 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute -top-20 left-20 w-80 h-80 bg-gradient-to-r from-green-300/20 to-emerald-300/20 blob" />
          <div className="absolute -bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-300/20 to-green-300/20 blob blob-delay" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16 reveal">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-slate-900">
              Get Dondooil Delivered to Your <span className="gradient-text">Doorstep</span>
            </h2>
            <div className="mx-auto w-24 sm:w-28 h-1.5 accent-bar mb-4 sm:mb-6"></div>
            <h3 className="text-lg sm:text-2xl font-bold text-green-700 mb-2 sm:mb-4">Pay Only When It Arrives!</h3>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto">Fill the form below to place your order. Delivery in 1–3 working days depending on your location.</p>
          </div>

          <div className="reveal glass border-2 border-amber-200 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 text-amber-800 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto" style={{ transitionDelay: '120ms' }}>
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl">⚠️</div>
              <div>
                <strong className="text-base sm:text-lg">Important Notice:</strong>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base">Please only fill this form if you are ready to receive and pay on delivery. Our delivery agents will be dispatched as soon as your order is confirmed. Kindly respect their time and yours.</p>
              </div>
            </div>
          </div>

          <div className="reveal glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sharp max-w-lg sm:max-w-xl md:max-w-2xl mx-auto" style={{ transitionDelay: '200ms' }}>
            <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-slate-800 font-bold mb-2 sm:mb-3 text-base sm:text-lg">Full Name *</label>
                <input
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`form-input w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-base sm:text-lg ${
                    currentError?.field === 'fullName' ? 'error' : ''
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-slate-800 font-bold mb-2 sm:mb-3 text-base sm:text-lg">Phone Number *</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className={`form-input w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-base sm:text-lg ${
                      currentError?.field === 'phoneNumber' ? 'error' : ''
                    }`}
                    placeholder="e.g., 08123456789"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-800 font-bold mb-2 sm:mb-3 text-base sm:text-lg">WhatsApp Number</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="form-input w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-base sm:text-lg"
                    placeholder="e.g., 08123456789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                  <label className="block text-slate-800 font-bold mb-2 sm:mb-3 text-base sm:text-lg">State (Nigeria) *</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className={`form-input w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-base sm:text-lg bg-white ${
                      currentError?.field === 'state' ? 'error' : ''
                    }`}
                    required
                  >
                    <option value="" disabled>Choose your state</option>
                    {NG_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-2 sm:mb-3 text-base sm:text-lg">City + Street / Landmark *</label>
                  <textarea
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    rows={3}
                    className={`form-input w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-base sm:text-lg resize-none ${
                      currentError?.field === 'deliveryAddress' ? 'error' : ''
                    }`}
                    placeholder="e.g., Ikeja, 12 Adeniyi Jones Ave, near XYZ Bank"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-4 text-base sm:text-lg">Select Package: *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { id: 'starter', name: '1 Bottle (Starter Bottle)', price: '₦14,000' },
                    { id: 'family', name: '4 Bottles (Family Pack – Save 10%)', price: '₦40,000' }
                  ].map((pkg, i) => (
                    <div
                      key={pkg.id}
                      className={`border-2 p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all group ${
                        selectedPackage === pkg.id ? 'border-green-600 bg-green-50' : 
                        currentError?.field === 'package' ? 'border-red-500 hover:border-red-600' :
                        'border-slate-300 hover:border-green-500'
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <input
                          type="radio"
                          id={pkg.id}
                          name="package"
                          value={pkg.id}
                          checked={selectedPackage === pkg.id}
                          onChange={() => setSelectedPackage(pkg.id)}
                          className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                          required
                        />
                        <label htmlFor={pkg.id} className="cursor-pointer flex-1">
                          <div className="font-bold text-slate-900 text-base sm:text-lg">{pkg.name}</div>
                          <div className="text-green-700 text-xl sm:text-2xl font-black">{pkg.price}</div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-4 text-base sm:text-lg">
                  What health concern are you treating? (Select one or more)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    'General Immunity Boost',
                    'Malaria / Frequent Infections',
                    'Ulcer / Digestive Issues',
                    'Joint Pains / Arthritis',
                    'High Blood Pressure / Cholesterol',
                    'Reproductive Health Support'
                  ].map((concern) => (
                    <label key={concern} className="flex items-center space-x-3 cursor-pointer text-slate-700 p-2.5 sm:p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedConcerns.includes(concern)}
                        onChange={(e) => handleConcernChange(concern, e.target.checked)}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 rounded"
                      />
                      <span className="text-sm sm:text-base font-medium">{concern}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Others (specify)"
                  value={formData.otherConcerns}
                  onChange={(e) => setFormData({ ...formData, otherConcerns: e.target.value })}
                  className="form-input w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-base sm:text-lg mt-4"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full btn-premium py-3.5 px-6 sm:py-5 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Order'
                  )}
                </span>
              </button>
            </form>
          </div>

          <div className="reveal text-center text-slate-700 mt-6 sm:mt-10 text-sm sm:text-lg max-w-2xl mx-auto" style={{ transitionDelay: '180ms' }}>
            <div className="glass p-3 sm:p-4 rounded-xl">
              📦 After submitting, our team will contact you by phone/WhatsApp to confirm your order before shipping.
              Delivery is fast, secure, and nationwide.
            </div>
          </div>

          {/* Guarantee Section */}
          <div className="reveal glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sharp mt-10 sm:mt-16" style={{ transitionDelay: '220ms' }}>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 text-center mb-6 sm:mb-10">Guarantee & Trust</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: '✅', title: 'NAFDAC Approved', subtitle: 'No. A7-102209L' },
                { icon: '💰', title: 'Pay ONLY on Delivery', subtitle: 'No upfront payment required' },
                { icon: '🚚', title: 'Secure & Fast Delivery', subtitle: 'Nationwide coverage' },
                { icon: '🏭', title: '100% Authentic', subtitle: 'Direct from Manufacturer' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="reveal card-hover flex items-center space-x-3 sm:space-x-4 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sharp border border-green-100"
                  style={{ transitionDelay: `${260 + index * 80}ms` }}
                >
                  <span className="text-2xl sm:text-3xl">{item.icon}</span>
                  <div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</div>
                    <div className="text-xs sm:text-sm text-slate-600">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-green-100/70 to-emerald-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center reveal mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="mx-auto mt-4 sm:mt-6 w-24 sm:w-28 h-1.5 accent-bar"></div>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about Dondooil and our delivery process
            </p>
          </div>

          <div className="max-w-2xl sm:max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {[
              { q: 'How do I pay?', a: 'You pay cash or transfer on delivery once the product arrives at your doorstep. No upfront payment required.' },
              { q: 'How fast is delivery?', a: 'Orders within Lagos are usually same or next day. Other states typically take 2–3 working days depending on location.' },
              { q: 'Is it safe?', a: 'Yes — Dondooil is NAFDAC approved (No. A7-102209L) and made from 100% natural herbs with scientific validation.' },
              { q: 'Can I order for my family?', a: 'Absolutely! Many customers buy the Family Pack for household wellness. Dondooil is safe for all ages including infants.' }
            ].map((faq, index) => (
              <details key={index} className="reveal glass rounded-xl sm:rounded-2xl shadow-sharp overflow-hidden group" style={{ transitionDelay: `${100 + index * 100}ms` }}>
                <summary className="p-4 sm:p-6 cursor-pointer font-bold text-slate-900 text-base sm:text-lg hover:bg-green-50 transition-colors group-hover:text-green-700">
                  {faq.q}
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-slate-700 text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-emerald-50 to-green-100 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-gradient-to-r from-green-300/30 to-emerald-300/30 blob" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-300/25 to-green-300/25 blob blob-delay" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="reveal max-w-3xl sm:max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-slate-900 leading-tight">
              Don't Wait Until Illness Strikes —
              <span className="gradient-text block">Take Charge of Your Health Today</span>
            </h2>
            <div className="mx-auto mb-6 sm:mb-8 w-24 sm:w-32 h-1.5 accent-bar"></div>
            <p className="text-base sm:text-2xl mb-8 sm:mb-12 text-slate-600 max-w-2xl sm:max-w-3xl mx-auto">
              Dondooil is trusted nationwide for immunity, strength, and vitality.
              <span className="block mt-2 font-semibold">Place your order now and pay only when it arrives at your doorstep.</span>
            </p>
            <button
              onClick={scrollToForm}
              className="btn-premium px-8 py-3.5 sm:px-12 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <span className="relative z-10">Yes, I Want Dondooil – Deliver to Me</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-green-600 bg-slate-900 text-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div className="reveal bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors" style={{ transitionDelay: '60ms' }}>
              <Phone className="w-6 sm:w-8 h-6 sm:h-8 mb-3 sm:mb-4 text-green-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Call/WhatsApp</h3>
              <p className="text-slate-100 text-base sm:text-lg font-medium">+234 803 336 7384</p>
            </div>
            <div className="reveal bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors" style={{ transitionDelay: '120ms' }}>
              <Mail className="w-6 sm:w-8 h-6 sm:h-8 mb-3 sm:mb-4 text-green-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Email</h3>
              <p className="text-slate-100 text-base sm:text-lg font-medium">info@dondooil.com</p>
            </div>
            <div className="reveal bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors" style={{ transitionDelay: '180ms' }}>
              <MapPin className="w-6 sm:w-8 h-6 sm:h-8 mb-3 sm:mb-4 text-green-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Address</h3>
              <p className="text-slate-100 font-medium text-sm sm:text-base">Suit 19, Anafaraa Plaza, Opp Oando Filling Station, 1st Avenue, Gwarimpa, Abuja</p>
            </div>
            <div className="reveal bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors" style={{ transitionDelay: '240ms' }}>
              <Shield className="w-6 sm:w-8 h-6 sm:h-8 mb-3 sm:mb-4 text-green-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">NAFDAC Registration</h3>
              <p className="text-slate-100 text-base sm:text-lg font-medium">A7-102209L</p>
            </div>
          </div>

          <div className="text-center pt-6 sm:pt-8 border-t border-white/20">
            <p className="text-sm sm:text-lg text-white font-medium">&copy; 2024 Dondooil. All rights reserved. NAFDAC Approved Herbal Wellness Formula.</p>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleSuccessClose}
          />

          <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full mx-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10" />

            <div className="relative p-6 sm:p-8 text-center">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounce">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4">
                Order Submitted Successfully!
              </h3>

              <p className="text-base sm:text-lg text-slate-700 mb-5 sm:mb-6 leading-relaxed">
                Thank you for your order! Our team will contact you shortly to confirm your order before shipping.
                <span className="block mt-2 font-semibold text-green-700">
                  Please keep your phone available.
                </span>
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Quick Confirmation Call
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Fast Delivery
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Pay on Delivery
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  NAFDAC Approved
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleSuccessClose}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleSuccessClose}
                  className="flex-1 bg-slate-100 text-slate-700 py-3.5 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-slate-200 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 sm:w-24 h-20 sm:h-24 bg-green-200/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 sm:w-32 h-24 sm:h-32 bg-emerald-200/30 rounded-full blur-2xl" />
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && currentError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleErrorClose}
          />

          <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full mx-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-orange-400/10" />

            <div className="relative p-6 sm:p-8 text-center">
              {/* Error Icon */}
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* Title based on error type */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4">
                {currentError.type === 'validation' ? 'Please Check Your Details' :
                 currentError.type === 'network' ? 'Connection Problem' :
                 currentError.type === 'timeout' ? 'Request Timed Out' :
                 currentError.type === 'server' ? 'Server Issue' :
                 'Something Went Wrong'}
              </h3>

              {/* Error Message */}
              <p className="text-base sm:text-lg text-slate-700 mb-6 sm:mb-8 leading-relaxed">
                {currentError.message}
              </p>

              {/* Error-specific help */}
              {currentError.type === 'network' && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <strong>Troubleshooting tips:</strong>
                  <ul className="mt-2 text-left list-disc list-inside space-y-1">
                    <li>Check your internet connection</li>
                    <li>Try switching between WiFi and mobile data</li>
                    <li>Refresh the page and try again</li>
                  </ul>
                </div>
              )}

              {currentError.type === 'validation' && (
                <div className="mb-6 p-4 bg-amber-50 rounded-lg text-sm text-amber-800">
                  <strong>Please ensure:</strong>
                  <ul className="mt-2 text-left list-disc list-inside space-y-1">
                    <li>All required fields are filled</li>
                    <li>Phone number is in correct format (e.g., 08123456789)</li>
                    <li>Delivery address is detailed enough</li>
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {currentError.type !== 'validation' && retryCount < 3 && (
                  <button
                    onClick={handleRetry}
                    className="flex-1 btn-premium py-3.5 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Try Again {retryCount > 0 && `(${retryCount}/3)`}
                    </span>
                  </button>
                )}

                <button
                  onClick={handleErrorClose}
                  className="flex-1 bg-slate-100 text-slate-700 py-3.5 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-slate-200 transition-all duration-300"
                >
                  {currentError.type === 'validation' ? 'Fix Form' : 'Close'}
                </button>

                {/* Browse products option for non-validation errors */}
                {currentError.type !== 'validation' && (
                  <button
                    onClick={handleBrowseProducts}
                    className="flex-1 border-2 border-green-600 text-green-700 hover:bg-green-50 py-3.5 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300"
                  >
                    Browse Products
                  </button>
                )}
              </div>

              {/* Support contact for persistent issues */}
              {(retryCount >= 3 || currentError.type === 'server') && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg text-sm text-green-800">
                  <strong>Need help?</strong> Contact our support team:
                  <div className="mt-2 space-y-1">
                    <div>📞 WhatsApp: +234 803 336 7384</div>
                    <div>📧 Email: info@dondooil.com</div>
                  </div>
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={handleErrorClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 sm:w-24 h-20 sm:h-24 bg-red-200/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 sm:w-32 h-24 sm:h-32 bg-orange-200/30 rounded-full blur-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DondooilLandingPage;