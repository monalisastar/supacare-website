'use client';

import Image from 'next/image';

export default function WhatIsCarbonAdvisory() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-700">
          What is Carbon Advisory?
        </h2>
        <p className="text-lg md:text-xl mb-10 text-gray-700 leading-relaxed">
          Carbon advisory helps organizations measure, reduce, and offset their greenhouse gas emissions.
          It includes carbon footprint audits, reduction strategies, project registration, and long-term
          climate compliance support.
        </p>

        {/* Visual: Infographic */}
        <div className="flex justify-center">
          <Image
            src="/images/carbon-advisory/carbon-definition.webp"
            alt="Carbon Advisory Flowchart"
            width={1000}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
