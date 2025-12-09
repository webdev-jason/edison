import { products } from "./data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black mb-4 tracking-tight text-gray-900">
            EDISON AVENUE
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Custom laser engraving, handcrafted signs, and precision decor. 
            Made to last, made for you.
          </p>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </main>
  );
}