'use client';

import Image from 'next/image';
import { FaLeaf, FaFire, FaTree, FaIndustry, FaCheckCircle } from 'react-icons/fa';
import React from 'react';

export default function BiomassSupply() {
  const features = [
    { icon: <FaCheckCircle className="text-lime-500 w-6 h-6" />, text: "BSL & Woodsure accredited biomass" },
    { icon: <FaTree className="text-lime-500 w-6 h-6" />, text: "Virgin wood sourced sustainably" },
    { icon: <FaLeaf className="text-lime-500 w-6 h-6" />, text: "Custom moisture levels for different applications" },
    { icon: <FaFire className="text-lime-500 w-6 h-6" />, text: "Supports renewable energy & reduces fossil fuel reliance" },
    { icon: <FaIndustry className="text-lime-500 w-6 h-6" />, text: "Reliable supply for power stations & commercial users" },
  ];

  return (
    <section className="py-16 bg-green-100">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
          Biomass Production & Supply
        </h2>

        {/* Block 1 - Image Left */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
          <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/recycling and composting/composting-process.jpg"
              alt="Biomass Production"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <p>
              Supacare produces and supplies high-quality biomass, including BSL and Woodsure
              accredited virgin wood biomass. Our biomass fuel is ideal for power stations,
              horticulture, and commercial biomass boilers, offering a sustainable alternative
              to fossil fuels.
            </p>
          </div>
        </div>

        {/* Block 2 - Image Right */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-12 gap-8">
          <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/shop/Solar Dryer.png"
              alt="Solar Dryer"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <p>
              Supacare sources virgin wood from trusted suppliers and processes it into
              dried woodchip at our biomass production facility. We also supply arb chip or
              “wet” chip with varying moisture levels to suit customer requirements.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-5xl mx-auto mb-10 grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
              {feature.icon}
              <span className="ml-3 text-green-900">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <a
            href="/contact"
            className="inline-block bg-lime-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-lime-600 transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
