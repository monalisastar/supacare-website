"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/environmental consultancy/hero-environmental-consultancy.webp"
        alt="Environmental Consultancy Hero"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#e6f4ea]/80 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2e3e30] drop-shadow-md">
          Environmental Consultancy Services
        </h1>
        <p className="mt-4 text-lg md:text-xl text-[#2e3e30] max-w-2xl">
          Tailored solutions for sustainable impact, regulatory compliance, and climate resilience across Kenya’s communities and industries.
        </p>

        {/* Updated Button */}
        <Link href="/contact">
          <button className="mt-6 px-6 py-3 bg-[#4a9f74] text-white rounded-lg hover:bg-[#3c845f] transition">
            Book a Consultation
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
