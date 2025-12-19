"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  // This runs exactly once when the page loads
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We are warming up the laser engraver now!
        </p>

        <Link 
          href="/" 
          className="w-full block bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Return to Store
        </Link>
      </div>
    </div>
  );
}