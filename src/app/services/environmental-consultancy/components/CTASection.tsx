"use client";

import React from "react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-[#4a9f74] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Environmental Project?
        </h2>
        <p className="text-lg mb-6">
          Let Supacare help you navigate compliance, sustainability, and community impact with ease and expertise.
        </p>
        <Link href="/contact">
          <button className="bg-white text-[#4a9f74] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#f0f0f0] transition">
            Book a Consultation
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
