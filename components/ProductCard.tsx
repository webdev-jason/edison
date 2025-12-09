import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="aspect-square relative w-full bg-gray-50">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <span className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-md text-gray-800">
            {product.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {product.name}
          </h3>
          <p className="mt-2 text-xl font-medium text-gray-600">
            ${product.price.toFixed(2)}
          </p>
          <div className="mt-4 w-full bg-black text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-gray-800 transition-colors">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}