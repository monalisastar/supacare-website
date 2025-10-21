'use client';

import React from 'react';

interface ProductInfoProps {
  name: string;
  description: string;
}

export default function ProductInfo({ name, description }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Product Title & Brand */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
        <p className="text-green-700 mt-1 font-medium">
          Supacare Official Product
        </p>
      </div>

      {/* Color Variations */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Color Options</h3>
        <div className="flex gap-2">
          {['Light Gray', 'Dark Gray', 'Other'].map((color) => (
            <button
              key={color}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:border-green-500 hover:text-green-700 transition"
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Customization Options */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">
          Customization Options
        </h3>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>• Logo customization (for bulk orders)</li>
          <li>• Packaging customization</li>
          <li>• Color or size customization (on request)</li>
        </ul>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
