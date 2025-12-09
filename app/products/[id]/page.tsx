"use client";

import { products } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react"; // New import for Next.js 15

interface Props {
  params: Promise<{ id: string }>; // Params is now a Promise
}

export default function ProductPage({ params }: Props) {
  // 1. Unwrap the params Promise using React.use()
  const { id } = use(params);
  
  const { addToCart } = useCart();

  // 2. Now we can use the ID safely
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
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <p className="text-3xl tracking-tight text-gray-900 mt-3">${product.price.toFixed(2)}</p>
            <p className="text-base text-gray-700 mt-6">{product.description}</p>
            
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-95 transition-transform"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}