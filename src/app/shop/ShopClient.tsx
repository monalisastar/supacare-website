'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Category = 'All' | 'Hardware' | 'Compost' | 'Support';

interface Product {
  name: string;
  image: string;
  alt: string;
  category: Category;
  price: number; // added price field
  id: string; // unique id for cart management
}

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Compost Delivery',
    image: '/images/shop/compostdelivery.png',
    alt: 'Supacare compost delivery truck unloading compost',
    category: 'Compost',
    price: 50,
  },
  {
    id: '2',
    name: 'Compost Curing Chamber',
    image: '/images/shop/curingchamber.png',
    alt: 'Supacare compost curing chamber wooden shed',
    category: 'Hardware',
    price: 300,
  },
  {
    id: '3',
    name: 'Enriched Compost Blend',
    image: '/images/shop/enriched blend.png',
    alt: 'Supacare enriched compost blend urban mix 25kg',
    category: 'Compost',
    price: 25,
  },
  {
    id: '4',
    name: 'Rotary Drum Composter',
    image: '/images/shop/rotarydrum.jpg',
    alt: 'Supacare rotary drum composting machine',
    category: 'Hardware',
    price: 1200,
  },
  {
    id: '5',
    name: 'Solar Dryer',
    image: '/images/shop/Solar Dryer.png',
    alt: 'Supacare solar dryer with mesh panels',
    category: 'Hardware',
    price: 400,
  },
  {
    id: '6',
    name: 'Site Assessment',
    image: '/images/shop/siteassement.png',
    alt: 'Supacare staff performing compost site assessment',
    category: 'Support',
    price: 80,
  },
  {
    id: '7',
    name: 'Bagged Compost (25kg & 50kg)',
    image: '/images/shop/bagged compost.png',
    alt: 'Supacare branded compost bags 25kg and 50kg',
    category: 'Compost',
    price: 20,
  },
  {
    id: '8',
    name: 'Biogas Digester',
    image: '/images/shop/biogasdigester.png',
    alt: 'Supacare dome-shaped biogas digester rural setup',
    category: 'Hardware',
    price: 1500,
  },
  {
    id: '9',
    name: 'Bokashi Bin',
    image: '/images/shop/bokashibin.jpg',
    alt: 'Supacare branded indoor bokashi compost bin',
    category: 'Hardware',
    price: 75,
  },
];

export default function ShopClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: Product[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      // increase quantity if already in cart
      const updated = cart.map((item) =>
        item.id === product.id ? { ...item, price: item.price } : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, product]);
    }
    alert(`${product.name} added to cart`);
  };

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
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-52 sm:h-64 md:h-56 lg:h-60">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  {product.name}
                </h3>
                <p className="text-green-700 mt-1">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
                <Link
                  href="/cart"
                  className="flex-1 border border-green-600 text-green-600 py-2 rounded hover:bg-green-100 text-center transition"
                >
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
