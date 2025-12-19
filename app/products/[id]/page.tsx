"use client";

import { products } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react"; 

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const { addToCart } = useCart();
  
  // New: Track what the user types
  const [customText, setCustomText] = useState("");

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="text-sm text-gray-500 hover:text-black mb-8 inline-block">
          ← Back to Shop
        </Link>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          
          {/* Image Section */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info Section */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            
            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 mr-2">Category:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {product.category}
                </span>
              </div>
            </div>

            {/* New: Custom Text Input */}
            <div className="mt-8">
              <label htmlFor="custom-text" className="block text-sm font-medium text-gray-700">
                Custom Engraving (Optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="custom-text"
                  name="custom-text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                  placeholder="e.g. The Smiths, 2024"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="button"
                // Pass the customText to the addToCart function
                onClick={() => addToCart(product, customText)}
                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-full active:scale-95 transition-transform"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}