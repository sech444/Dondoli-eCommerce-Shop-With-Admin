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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100/40 font-inter antialiased">
      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                     transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
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
        }
        @keyframes shimmer {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }

        .blob {
          filter: blur(60px);
          opacity: 0.35;
          animation: blob 25s ease-in-out infinite;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
          75% { transform: translate(40px, 20px) scale(1.05); }
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
      `}</style>

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-green-400/30 to-emerald-400/30 blob" />
        <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-gradient-to-r from-emerald-400/25 to-green-400/25 blob" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-4xl w-full">
          {/* Success Card */}
          <div className="reveal glass rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-8 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Order Submitted <span className="gradient-text">Successfully!</span>
            </h1>

            <div className="mx-auto mt-6 w-32 h-1.5 accent-bar mb-8"></div>

            {/* Message */}
            <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              Thank you for your order! Our team will contact you shortly to confirm your order before shipping.
              <span className="block mt-4 font-semibold text-green-700 text-2xl">
                Please keep your phone available.
              </span>
            </p>

            {/* Order Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl mb-2">📞</div>
                <div className="text-sm text-slate-600">Quick Confirmation</div>
                <div className="font-semibold">Within 24 hours</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl mb-2">🚚</div>
                <div className="text-sm text-slate-600">Fast Delivery</div>
                <div className="font-semibold">1-3 Days</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm text-slate-600">Payment</div>
                <div className="font-semibold">On Delivery</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-sm text-slate-600">NAFDAC</div>
                <div className="font-semibold">Approved</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleContinueShopping}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleBackToHome}
                className="bg-slate-100 text-slate-700 py-4 px-8 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all duration-300"
              >
                Back to Home
              </button>
            </div>

            {/* What's Next Section */}
            <div className="reveal glass rounded-2xl p-6 mb-8" style={{ transitionDelay: '200ms' }}>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">What Happens Next?</h3>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Order Confirmation</h4>
                    <p className="text-slate-600">Our team will call you within 24 hours to confirm your order details and delivery address.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Processing & Shipping</h4>
                    <p className="text-slate-600">Your order will be carefully packaged and shipped via our trusted delivery partners.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-700 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Delivery & Payment</h4>
                    <p className="text-slate-600">Receive your Dondooil at your doorstep and pay the delivery agent. Start your wellness journey!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="reveal glass rounded-2xl p-6" style={{ transitionDelay: '300ms' }}>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Need Help?</h3>
              <p className="text-slate-600 mb-4">Our support team is here to assist you</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+2348033367384" className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
                  <Phone className="w-5 h-5" />
                  +234 803 336 7384
                </a>
                <a href="mailto:info@dondooil.com" className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
                  <Mail className="w-5 h-5" />
                  info@dondooil.com
                </a>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mt-8" style={{ transitionDelay: '400ms' }}>
            <div className="glass p-4 rounded-xl text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-semibold">NAFDAC Approved</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-semibold">Trusted by Thousands</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-semibold">Nationwide Delivery</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl mb-2">💯</div>
              <div className="text-sm font-semibold">100% Natural</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;