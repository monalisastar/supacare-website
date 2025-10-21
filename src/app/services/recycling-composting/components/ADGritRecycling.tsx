'use client';

import Image from 'next/image';
import { FaLeaf, FaRecycle, FaSeedling, FaIndustry } from 'react-icons/fa';
import React from 'react';

export default function ADGritRecycling() {
  const features = [
    { icon: <FaRecycle className="text-lime-500 w-6 h-6" />, text: "Recycles AD grit from biogas production" },
    { icon: <FaLeaf className="text-lime-500 w-6 h-6" />, text: "Processed into high-quality compost soil improver" },
    { icon: <FaSeedling className="text-lime-500 w-6 h-6" />, text: "Peat-free and certified" },
    { icon: <FaIndustry className="text-lime-500 w-6 h-6" />, text: "Supports sustainable agriculture and waste reduction" },
  ];

  return (
    <section className="py-16 bg-green-100">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
          AD Grit Recycling
        </h2>

        {/* Block 1 - Image Left */}
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/recycling and composting/ad grit.png"
              alt="AD Grit Processing"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <p>
              Supacare recycles anaerobic digestion (AD) grit, transforming it into high-quality
              compost soil improver. AD grit includes bones, seeds, fruit stones, and other
              indigestible matter from biogas production.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition"
                >
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
              src="/images/recycling and composting/Supacare In-Vessel ad grit.png"
              alt="Supacare In-Vessel AD Grit System"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <p>
              Supacare carefully processes AD grit alongside green and food waste using
              in-vessel composting technology. After 6–8 weeks of maturation, the material
              is screened and sorted to remove inorganics, resulting in nutrient-rich,
              peat-free soil improver that enhances soil structure and fertility.
            </p>
          </div>
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
