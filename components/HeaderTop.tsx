// *********************
// Role of the component: Topbar of the header
// Name of the component: HeaderTop.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <HeaderTop />
// Input parameters: no input parameters
// Output: topbar with phone, email and login and register links
// *********************

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { 
  FaHeadphones, 
  FaRegEnvelope, 
  FaLocationDot, 
  FaRegUser,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  }

  return (
    <div className="bg-gradient-to-r from-green-900 to-green-700 text-white shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-2">
          {/* Contact Information */}
          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <a href="tel:+2348074747449" className="flex items-center gap-2 hover:text-green-200 transition-colors">
              <FaHeadphones className="text-lg" />
              <span className="text-sm font-medium">+234 807 474 7449</span>
            </a>
            <a href="mailto:test@email.com" className="flex items-center gap-2 hover:text-green-200 transition-colors">
              <FaRegEnvelope className="text-lg" />
              <span className="text-sm font-medium">info@dondooil.com</span>
            </a>
          </div>

         {/* Social Media Icons */}
          <div className="flex items-center gap-4 mt-2 lg:mt-0">
            <a href="https://web.facebook.com/profile.php?id=61573731174557" className="hover:text-green-200 transition-colors">
              <FaFacebook className="text-lg" />
            </a>
            <a href="https://x.com/dondooil" className="hover:text-green-200 transition-colors">
              <FaTwitter className="text-lg" />
            </a>
            <a href="https://instagram.com/dondooil" className="hover:text-green-200 transition-colors">
              <FaInstagram className="text-lg" />
            </a>
            <a href="https://linkedin.com/company/dondooil" className="hover:text-green-200 transition-colors">
              <FaLinkedin className="text-lg" />
            </a>
          </div>
          {/* User Session Info */}
          {session && (
            <div className="flex items-center justify-center lg:justify-end gap-4 mt-2 lg:mt-0">
              <span className="text-sm font-medium">{session.user?.email}</span>
              <div className="w-px h-4 bg-green-600" />
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 hover:text-green-200 transition-colors"
              >
                <FaRegUser className="text-lg" />
                <span className="text-sm font-medium">Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
