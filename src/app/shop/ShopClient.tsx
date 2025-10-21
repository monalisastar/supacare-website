'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { allProducts, Product, Category } from '@/lib/products';

export default function ShopClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const { addToCart } = useCart();

  // Filter products based on selected category
  const filteredProducts =
    activeCategory === 'All'
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  // Define category filter buttons
  const categories: Category[] = ['All', 'Hardware', 'Compost', 'Support'];

  return (
    <main className="min-h-screen bg-[#c1e3c3] px-4 pt-32 pb-12 sm:px-6 lg:px-20">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-900 mb-8">
        Supacare Shop
      </h1>
      <p className="text-center max-w-3xl mx-auto text-green-800 mb-8">
        Discover our range of composting machines, enriched blends, and sustainable tools
        for communities, institutions, and urban farms.
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-green-700 text-white'
                : 'bg-white text-green-800 hover:bg-green-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
          >
            {/* Product Image */}
            <div className="relative w-full h-52 sm:h-64 md:h-56 lg:h-60">
              <Image
                src={product.images[0]}
                alt={product.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  {product.name}
                </h3>
                <p className="text-green-700 mt-1">${product.price.toFixed(2)}</p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={`/shop/${product.id}`}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-center transition"
                >
                  View Details
                </Link>

                <button
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      image: product.images[0], // ✅ Only first image for the cart
                      price: product.price,
                      quantity: 1,
                    });
                    alert(`${product.name} added to cart`);
                  }}
                  className="flex-1 border border-green-600 text-green-600 py-2 rounded hover:bg-green-100 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* No Products Fallback */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-green-900 mt-10">No products found.</p>
      )}
    </main>
  );
}
