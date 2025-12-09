"use client";

import Link from "next/link";
import { useCart } from "../app/context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
              EDISON AVENUE
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-500 hover:text-black transition-colors">
              Products
            </Link>
            <Link href="/cart" className="flex items-center text-black font-medium hover:text-gray-600 transition-colors">
              Cart 
              <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}