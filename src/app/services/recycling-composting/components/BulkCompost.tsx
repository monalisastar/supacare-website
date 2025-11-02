'use client';

import Image from 'next/image';
import { FaLeaf, FaWater, FaSeedling, FaRecycle, FaTruck } from 'react-icons/fa';
import React from 'react';

export default function BulkCompost() {
  const features = [
    { icon: <FaLeaf className="text-lime-500 w-6 h-6" />, text: "Slow release of major & micro nutrients" },
    { icon: <FaSeedling className="text-lime-500 w-6 h-6" />, text: "Improves soil structure and rooting potential" },
    { icon: <FaWater className="text-lime-500 w-6 h-6" />, text: "Increases moisture retention and soil drainage" },
    { icon: <FaRecycle className="text-lime-500 w-6 h-6" />, text: "Rich in organic matter for long-term soil fertility" },
  ];

  const deliveryPoints = [
    { icon: <FaTruck className="text-lime-500 w-5 h-5" />, text: "Dandora, Nairobi County" },
    { icon: <FaTruck className="text-lime-500 w-5 h-5" />, text: "Sagana, Kirinyaga" },
    { icon: <FaTruck className="text-lime-500 w-5 h-5" />, text: "Kisumu, Kisumu County" },
    { icon: <FaTruck className="text-lime-500 w-5 h-5" />, text: "Eldoret, Uasin Gishu County" },
    { icon: <FaTruck className="text-lime-500 w-5 h-5" />, text: "Naivasha, Nakuru County" },
    { icon: <FaTruck className="text-lime-500 w-5 h-5" />, text: "Kutus, Kirinyaga" },
    { icon: <FaTruck className="text-lime-500 w-5 h-5" />, text: "Malindi, Kilifi County" },
  ];

  return (
    <section className="py-16 bg-green-100">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
          Bulk Compost for Agriculture
        </h2>

        {/* Block 1 - Image Left */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
          <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={encodeURI("/images/recycling and composting/supacare-compost.webp")}
              alt="Supacare Compost"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <p>
              Supacare supplies high-quality bulk compost soil improver for farmers,
              horticulturists, and viticulturists. Our certified compost improves
              soil health, aids carbon sequestration, and naturally boosts crop yield.
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
              src={encodeURI("/images/recycling and composting/why compost.webp")}
              alt="Why Compost"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <h3 className="text-xl font-semibold">Delivery & Collection</h3>
            <p>Supacare delivers compost nationwide, or you can collect from our sites in:</p>
            <ul className="space-y-2">
              {deliveryPoints.map((point, idx) => (
                <li key={idx} className="flex items-center">
                  {point.icon}
                  <span className="ml-2">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Block 3 - Image Left */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
          <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={encodeURI("/images/recycling and composting/why choose supacare.webp")}
              alt="Why Choose Supacare"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-800 space-y-4">
            <h3 className="text-xl font-semibold">Why Choose Supacare?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center bg-white rounded-lg p-3 shadow hover:shadow-lg transition">
                <FaLeaf className="text-lime-500 w-5 h-5 mr-2" /> Certified soil improver
              </li>
              <li className="flex items-center bg-white rounded-lg p-3 shadow hover:shadow-lg transition">
                <FaSeedling className="text-lime-500 w-5 h-5 mr-2" /> Peat-free and sustainable
              </li>
              <li className="flex items-center bg-white rounded-lg p-3 shadow hover:shadow-lg transition">
                <FaWater className="text-lime-500 w-5 h-5 mr-2" /> Optimizes soil health for all crops
              </li>
              <li className="flex items-center bg-white rounded-lg p-3 shadow hover:shadow-lg transition">
                <FaRecycle className="text-lime-500 w-5 h-5 mr-2" /> Reduces reliance on artificial fertilizers
              </li>
              <li className="flex items-center bg-white rounded-lg p-3 shadow hover:shadow-lg transition">
                <FaTruck className="text-lime-500 w-5 h-5 mr-2" /> Supports long-term carbon sequestration
              </li>
            </ul>
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
