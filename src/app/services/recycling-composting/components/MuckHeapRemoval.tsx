'use client';

import Image from 'next/image';
import { FaTruck, FaLeaf, FaSeedling, FaRecycle } from 'react-icons/fa';
import React from 'react';

export default function MuckHeapRemoval() {
  const features = [
    { icon: <FaLeaf className="text-lime-500 w-6 h-6" />, text: "Horse manure & stable bedding collection" },
    { icon: <FaTruck className="text-lime-500 w-6 h-6" />, text: "Safe and environmentally responsible disposal" },
    { icon: <FaSeedling className="text-lime-500 w-6 h-6" />, text: "Compostable waste turned into soil improver" },
    { icon: <FaRecycle className="text-lime-500 w-6 h-6" />, text: "Reduces landfill and improves carbon footprint" },
  ];

  return (
    <section className="py-16 bg-green-100">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
          Muck Heap Removal
        </h2>

        {/* Block 1 - Image Left */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
          <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/recycling and composting/farmer.jpg"
              alt="Muck Heap Collection"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <p>
              Supacare offers professional muck heap removal services across urban and rural locations.
              We help private yards, farms, and stables dispose of stable waste responsibly while turning
              it into high-quality compost soil improver.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                  {feature.icon}
                  <span className="ml-3">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Block 2 - Image Right */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-12 gap-8">
          <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/recycling and composting/Supacaretruck.png"
              alt="Supacare Truck"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <p>
              Our lorries are equipped with grabs for direct loading from muck heaps, ensuring
              a safe, efficient, and compliant removal process for both private and commercial clients.
            </p>
          </div>
        </div>

        {/* Block 3 - Image Left */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
          <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/recycling and composting/compost-use.png"
              alt="Compost Soil Improver"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <p>
              Proper muck heap management benefits the environment and supports soil health.
              By turning stable waste into compost, we reduce landfill usage, replace high carbon
              footprint materials, and aid carbon sequestration.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <a
            href="/contact"
            className="inline-block bg-lime-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-lime-600 transition"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
