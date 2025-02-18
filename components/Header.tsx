

"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaRegUser, FaBars, FaXmark } from "react-icons/fa6";
import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { useEffect } from "react";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  const getWishlistByUserId = async (id: string) => {
    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        cache: "no-store",
      });
      const wishlistData = await response.json();
      
      const productArray = wishlistData.map((item: any) => ({
        id: item?.product?.id,
        title: item?.product?.title,
        price: item?.product?.price,
        image: item?.product?.mainImage,
        slug: item?.product?.slug,
        stockAvailabillity: item?.product?.inStock
      }));
      
      setWishlist(productArray);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      try {
        const response = await fetch(`/api/users/email/${session.user.email}`, {
          cache: "no-store",
        });
        const data = await response.json();
        if (data?.id) {
          await getWishlistByUserId(data.id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <HeaderTop />
      {!pathname.startsWith("/admin") ? (
        <div className="bg-white">
          <div className="h-16 flex items-center justify-between px-6 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
            <div className="flex justify-end">
              <Link href="/" className="flex-shrink-0">
                <Image 
                  src="/logo design.svg" 
                  width={80}
                  height={80}
                  alt="dondooil logo" 
                  className="size-80"
                />
              </Link>
            </div>
            <div className="hidden md:block text-center flex flex-col gap-y-5">
              <h2 className="text-green-800 absolute text-4xl pl-2 mb-2 inset-x-0 h-16 top-8 max-md:text-2xl max-[380px]:text-2xl">
                <span className="text-white font-extrabold bg-green-700 font-sans inset-y-px block mb-2 inline-block px-2">DONDOIL</span>
                <span className="text-black text-sm block mb-2">Aka</span>
                <span className="text-orange-300 text-sm font-serif italic block mb-2">Ishannderoil / Hosannahoil</span>
                <span className="text-orange-300 text-sm font-serif italic block">Enhancing immunity to fight diseases</span>
              </h2>
            </div>
            
            <div className="flex items-center space-x-6">
              <HeartElement wishQuantity={wishQuantity} />
              <CartElement />
              <button 
                className="md:hidden text-green-800 text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaXmark /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block bg-gradient-to-r from-green-800 to-green-700 text-white">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between py-4">
                <div className="flex items-center space-x-6">
                  {!session && (
                    <>
                      <Link href="/login" className="flex items-center gap-2 hover:text-green-200 font-medium transition-colors">
                        <FaRegUser className="text-lg" />
                        <span>Login</span>
                      </Link>
                      <Link href="/register" className="flex items-center gap-2 hover:text-green-200 font-medium transition-colors">
                        <FaRegUser className="text-lg" />
                        <span>Register</span>
                      </Link>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-8">
                  {['Home', 'Products', 'About', 'Contact'].map((item) => (
                    <Link 
                      key={item}
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="hover:text-green-200 font-medium transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Dropdown */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="bg-gradient-to-r from-green-800 to-green-700 text-white">
              <div className="px-4 py-2 space-y-2">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <Link 
                    key={item}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="block py-2 hover:text-green-200 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                {!session && (
                  <>
                    <Link 
                      href="/login" 
                      className="block py-2 hover:text-green-200 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/register" 
                      className="block py-2 hover:text-green-200 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      ) : (
        <div className="flex justify-between h-24 bg-white items-center px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
          <Link href="/">
            <Image
              src="/logo design.svg"
              width={200}
              height={200}
              alt="dondooil logo"
              className="h-16 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <FaBell className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-10">
                <Image
                  src="/randomuser.jpg"
                  alt="random profile photo"
                  width={30}
                  height={30}
                  className="w-full h-full rounded-full"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;



