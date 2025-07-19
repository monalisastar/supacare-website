"use client";

import Image from "next/image";
import React from "react";

const WhyChooseSupaCare = () => {
  return (
    <section className="bg-[#e6f4ea] py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Image */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/environmental consultancy/why-choose-supacare.webp"
            alt="Community members smiling outdoors"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
            priority
          />
        </div>

        {/* Right: Reasons */}
        <div>
          <h2 className="text-3xl font-bold text-[#2e3e30] mb-4">
            Why Choose SupaCare?
          </h2>
          <ul className="space-y-4 text-[#2e3e30]">
            <li className="flex items-start">
              <span className="text-green-700 font-bold mr-2">✓</span>
              Community-rooted solutions tailored to peri-urban and rural realities.
            </li>
            <li className="flex items-start">
              <span className="text-green-700 font-bold mr-2">✓</span>
              Trusted track record in schools, SMEs, and county-level audits.
            </li>
            <li className="flex items-start">
              <span className="text-green-700 font-bold mr-2">✓</span>
              Blending traditional environmental expertise with climate innovation.
            </li>
            <li className="flex items-start">
              <span className="text-green-700 font-bold mr-2">✓</span>
              Led by passionate Kenyans who understand our unique environmental needs.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSupaCare;
