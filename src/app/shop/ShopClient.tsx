'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Category = 'All' | 'Hardware' | 'Compost' | 'Support';

const allProducts = [
  {
    name: 'Compost Delivery',
    image: '/images/shop/compostdelivery.png',
    alt: 'Supacare compost delivery truck unloading compost',
    category: 'Compost',
  },
  {
    name: 'Compost Curing Chamber',
    image: '/images/shop/curingchamber.png',
    alt: 'Supacare compost curing chamber wooden shed',
    category: 'Hardware',
  },
  {
    name: 'Enriched Compost Blend',
    image: '/images/shop/enriched blend.png',
    alt: 'Supacare enriched compost blend urban mix 25kg',
    category: 'Compost',
  },
  {
    name: 'Rotary Drum Composter',
    image: '/images/shop/rotarydrum.jpg',
    alt: 'Supacare rotary drum composting machine',
    category: 'Hardware',
  },
  {
    name: 'Solar Dryer',
    image: '/images/shop/Solar Dryer.png',
    alt: 'Supacare solar dryer with mesh panels',
    category: 'Hardware',
  },
  {
    name: 'Site Assessment',
    image: '/images/shop/siteassement.png',
    alt: 'Supacare staff performing compost site assessment',
    category: 'Support',
  },
  {
    name: 'Bagged Compost (25kg & 50kg)',
    image: '/images/shop/bagged compost.png',
    alt: 'Supacare branded compost bags 25kg and 50kg',
    category: 'Compost',
  },
  {
    name: 'Biogas Digester',
    image: '/images/shop/biogasdigester.png',
    alt: 'Supacare dome-shaped biogas digester rural setup',
    category: 'Hardware',
  },
  {
    name: 'Bokashi Bin',
    image: '/images/shop/bokashibin.jpg',
    alt: 'Supacare branded indoor bokashi compost bin',
    category: 'Hardware',
  },
];

export default function ShopClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProducts =
    activeCategory === 'All'
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  const categories: Category[] = ['All', 'Hardware', 'Compost', 'Support'];

  return (
    <main className="min-h-screen bg-[#c1e3c3] px-4 pt-32 pb-12 sm:px-6 lg:px-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-900 mb-8 scroll-mt-32">
        Supacare Shop
      </h1>

      <p className="text-center max-w-3xl mx-auto text-green-800 mb-8">
        Discover our range of composting machines, enriched blends, and sustainable tools for communities, institutions, and urban farms.
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
        {filteredProducts.map((product, index) => (
          <Link href="/contact" key={index}>
            <div className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative w-full h-52 sm:h-64 md:h-56 lg:h-60">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-900">
                  {product.name}
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Click to request quote or learn more
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
