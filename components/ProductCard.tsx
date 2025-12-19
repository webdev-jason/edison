import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}