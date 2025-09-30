'use client';

import React, { useEffect } from 'react';
import { CheckCircle, Phone, Mail, MapPin, Shield, Star, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ThankYouPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Reveal animations
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

  const handleContinueShopping = () => {
    router.push('/welcome');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-inter antialiased">
      {/* Styles - matching landing page */}
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

        .blob {
          filter: blur(60px);
          opacity: 0.35;
          animation: blob 25s ease-in-out infinite;
          border-radius: 50%;
        }
        .blob-delay { animation-delay: 8s; }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(30px, -40px) scale(1.1) rotate(90deg); }
          50% { transform: translate(-20px, 30px) scale(0.9) rotate(180deg); }
          75% { transform: translate(40px, 20px) scale(1.05) rotate(270deg); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

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

        .card-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 197, 94, 0.05);
        }

        .shadow-sharp {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .reveal, .blob, .accent-bar, .btn-premium::after {
            animation: none !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Main Section with gradient background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100/40">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-green-400/30 to-emerald-400/30 blob" />
          <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-gradient-to-r from-emerald-400/25 to-green-400/25 blob blob-delay" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Success Card */}
            <div className="reveal glass rounded-2xl sm:rounded-3xl shadow-sharp p-6 sm:p-8 md:p-12 text-center">
              {/* Success Icon */}
              <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 sm:mb-8 animate-bounce">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Order Submitted <span className="gradient-text">Successfully!</span>
              </h1>

              <div className="mx-auto mt-4 sm:mt-6 w-24 sm:w-32 h-1.5 accent-bar mb-6 sm:mb-8"></div>

              {/* Message */}
              <p className="text-lg sm:text-xl text-slate-700 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
                Thank you for your order! Our team will contact you shortly to confirm your order before shipping.
                <span className="block mt-3 sm:mt-4 font-semibold text-green-700 text-xl sm:text-2xl">
                  Please keep your phone available.
                </span>
              </p>

              {/* Order Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
                <div className="glass p-3 sm:p-4 rounded-xl shadow-sharp">
                  <div className="text-2xl mb-2">📞</div>
                  <div className="text-xs sm:text-sm text-slate-600">Quick Confirmation</div>
                  <div className="font-semibold text-sm sm:text-base">Within 24 hours</div>
                </div>
                <div className="glass p-3 sm:p-4 rounded-xl shadow-sharp">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="text-xs sm:text-sm text-slate-600">Fast Delivery</div>
                  <div className="font-semibold text-sm sm:text-base">1-3 Days</div>
                </div>
                <div className="glass p-3 sm:p-4 rounded-xl shadow-sharp">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-xs sm:text-sm text-slate-600">Payment</div>
                  <div className="font-semibold text-sm sm:text-base">On Delivery</div>
                </div>
                <div className="glass p-3 sm:p-4 rounded-xl shadow-sharp">
                  <div className="text-2xl mb-2">✅</div>
                  <div className="text-xs sm:text-sm text-slate-600">NAFDAC</div>
                  <div className="font-semibold text-sm sm:text-base">Approved</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <button
                  onClick={handleContinueShopping}
                  className="btn-premium py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg text-white transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Continue Shopping
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                </button>
                <button
                  onClick={handleBackToHome}
                  className="bg-slate-100 text-slate-700 py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg hover:bg-slate-200 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>

              {/* What's Next Section */}
              <div className="reveal glass rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 shadow-sharp" style={{ transitionDelay: '200ms' }}>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">What Happens Next?</h3>
                <div className="space-y-3 sm:space-y-4 text-left max-w-2xl mx-auto">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                      <span className="text-green-700 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Order Confirmation</h4>
                      <p className="text-slate-600 text-sm sm:text-base">Our team will call you within 24 hours to confirm your order details and delivery address.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                      <span className="text-green-700 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Processing & Shipping</h4>
                      <p className="text-slate-600 text-sm sm:text-base">Your order will be carefully packaged and shipped via our trusted delivery partners.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                      <span className="text-green-700 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base">Delivery & Payment</h4>
                      <p className="text-slate-600 text-sm sm:text-base">Receive your Dondooil at your doorstep and pay the delivery agent. Start your wellness journey!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="reveal glass rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sharp" style={{ transitionDelay: '300ms' }}>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-900">Need Help?</h3>
                                <p className="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base">Our support team is here to assist you</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a href="tel:+2348033367384" className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 text-sm sm:text-base">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    +234 803 336 7384
                  </a>
                  <a href="mailto:info@dondooil.com" className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 text-sm sm:text-base">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    info@dondooil.com
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8" style={{ transitionDelay: '400ms' }}>
              <div className="glass p-3 sm:p-4 rounded-xl text-center shadow-sharp card-hover">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                <div className="text-xs sm:text-sm font-semibold">NAFDAC Approved</div>
              </div>
              <div className="glass p-3 sm:p-4 rounded-xl text-center shadow-sharp card-hover">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                <div className="text-xs sm:text-sm font-semibold">Trusted by Thousands</div>
              </div>
              <div className="glass p-3 sm:p-4 rounded-xl text-center shadow-sharp card-hover">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                <div className="text-xs sm:text-sm font-semibold">Nationwide Delivery</div>
              </div>
              <div className="glass p-3 sm:p-4 rounded-xl text-center shadow-sharp card-hover">
                <div className="text-xl sm:text-2xl mb-2">💯</div>
                <div className="text-xs sm:text-sm font-semibold">100% Natural</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - matching landing page style */}
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
    </div>
  );
};

export default ThankYouPage;
               