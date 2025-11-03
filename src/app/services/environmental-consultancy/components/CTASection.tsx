"use client";

import React from "react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-[#4a9f74] py-16 px-4 text-center text-white">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Environmental Project?
        </h2>

        {/* Subheading */}
        <p className="text-lg mb-8 max-w-2xl mx-auto text-green-50">
          Let Supacare help you navigate compliance, sustainability, and community impact
          with ease and expertise.
        </p>

        {/* Primary CTA */}
        <Link href="/contact">
          <button className="bg-white text-[#4a9f74] font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#f0f0f0] transition">
            Book a Consultation
          </button>
        </Link>
      </div>

      {/* 🔗 Internal Linking Network */}
      <div className="mt-12 text-green-100 text-sm">
        <p className="max-w-2xl mx-auto leading-relaxed">
          Learn more{" "}
          <Link href="/about" className="underline hover:text-white">
            about Supacare
          </Link>
          , explore our{" "}
          <Link href="/services" className="underline hover:text-white">
            sustainability services
          </Link>
          , see{" "}
          <Link href="/projects" className="underline hover:text-white">
            real-world projects
          </Link>
          , or{" "}
          <Link href="/shop" className="underline hover:text-white">
            shop eco-friendly products
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default CTASection;
