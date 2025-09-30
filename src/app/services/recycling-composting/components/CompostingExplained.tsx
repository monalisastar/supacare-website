'use client';

import Image from 'next/image';
import React from 'react';

export default function CompostingExplained() {
  return (
    <section className="py-16 bg-green-100">
      <div className="container mx-auto px-4 space-y-16">

        {/* Section 1: Intro */}
        <div className="md:flex md:items-center md:gap-8">
          <div className="md:w-1/2 h-64 relative rounded-lg overflow-hidden shadow-lg mb-6 md:mb-0">
            <Image
              src="/images/shop/bagged compost.png"
              alt="Composting Process"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-900">
            <h2 className="text-3xl font-bold mb-3">Composting Explained</h2>
            <p>
              Composting is the natural process of recycling organic matter, such as 
              leaves, food scraps, and garden waste, into a rich soil amendment. 
              Supacare uses state-of-the-art composting techniques to transform 
              waste into nutrient-rich soil improver for agriculture and landscaping.
            </p>
          </div>
        </div>

        {/* Section 2: Why Compost? */}
        <div className="md:flex md:flex-row-reverse md:items-center md:gap-8">
          <div className="md:w-1/2 h-64 relative rounded-lg overflow-hidden shadow-lg mb-6 md:mb-0">
            <Image
              src="/images/recycling and composting/composting-site.png"
              alt="Composting Site"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-900">
            <h3 className="text-2xl font-semibold mb-3">Why Compost?</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Reduces landfill waste and greenhouse gases</li>
              <li>Enhances soil fertility and structure</li>
              <li>Increases water retention in soil</li>
              <li>Provides slow-release nutrients for crops and plants</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Supacare’s Approach */}
        <div className="md:flex md:items-center md:gap-8">
          <div className="md:w-1/2 h-64 relative rounded-lg overflow-hidden shadow-lg mb-6 md:mb-0">
            <Image
              src="/images/recycling and composting/compost-use.png"
              alt="Using Compost"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 text-green-900">
            <h3 className="text-2xl font-semibold mb-3">Supacare’s Approach</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>In-vessel composting for safe processing of food and green waste</li>
              <li>Open windrow composting for garden and green waste</li>
              <li>Monitored for temperature, moisture, and nutrient content</li>
              <li>Produces peat-free PAS100 certified compost for agriculture</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/contact"
            className="inline-block bg-lime-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-lime-600 transition"
          >
            Learn More
          </a>
        </div>

      </div>
    </section>
  );
}
