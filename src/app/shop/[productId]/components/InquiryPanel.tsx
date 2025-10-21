'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface InquiryPanelProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function InquiryPanel({ id, name, price, image }: InquiryPanelProps) {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      image,
      price,
      quantity: 1,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const whatsappLink = `https://wa.me/254720096680?text=Hello%20Supacare!%20I'm%20interested%20in%20${encodeURIComponent(
    name
  )}%20product.%20Can%20you%20share%20more%20details%3F`;

  return (
    <aside className="w-full lg:w-1/3 lg:sticky lg:top-28 h-fit self-start">
      <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 shadow-sm space-y-6">
        {/* Price Range */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Price Range</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <div>
              <p className="font-medium">$13.70</p>
              <p>300–499 pieces</p>
            </div>
            <div>
              <p className="font-medium">$7.70</p>
              <p>≥ 500 pieces</p>
            </div>
          </div>
        </div>

        {/* Minimum Order */}
        <div>
          <p className="text-sm text-gray-600">
            Minimum Order Quantity: <strong>300 pieces</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition"
          >
            Add to Cart
          </button>

          {/* WhatsApp Chat */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center border border-green-600 text-green-700 font-semibold py-2.5 rounded-lg hover:bg-green-50 transition"
          >
            Chat Now
          </a>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-3 text-center bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in">
            <p className="text-green-700 text-sm font-medium">
              ✅ {name} added to cart
            </p>
            <Link
              href="/cart"
              className="text-green-700 text-sm underline mt-1 inline-block hover:text-green-900 transition"
            >
              View Cart →
            </Link>
          </div>
        )}

        {/* Branding Footer */}
        <div className="text-sm text-gray-600 border-t pt-4 text-center">
          <p className="font-medium text-green-700">Supacare</p>
          <p>Your trusted partner in sustainable living</p>
        </div>
      </div>
    </aside>
  );
}
