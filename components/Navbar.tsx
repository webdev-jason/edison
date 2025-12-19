"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-wide uppercase">
              Edison Avenue
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-black font-medium transition-colors">
              Home
            </Link>
            
            {/* UPDATED LINK */}
            <Link href="/shop" className="text-gray-600 hover:text-black font-medium transition-colors">
              Shop
            </Link>

            <Link href="/cart" className="relative group">
              <div className="p-2 text-gray-600 group-hover:text-black transition-colors">
                <span className="sr-only">Cart</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}