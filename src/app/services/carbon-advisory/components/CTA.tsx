'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 px-6 md:px-12 bg-green-50 text-center text-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* Main heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Ready to Start Your Carbon Journey?
        </h2>

        {/* Supporting text */}
        <p className="text-lg text-gray-700 mb-8">
          Whether you run a school, a small business, or a community project — we’re here to guide you.
        </p>

        {/* Primary CTA button */}
        <Link href="/contact">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
            Book a Carbon Audit
          </button>
        </Link>
      </div>

      {/* 🔗 Internal Link Network */}
      <div className="mt-12 text-sm text-gray-700">
        <p className="max-w-2xl mx-auto leading-relaxed">
          Learn more{" "}
          <Link href="/about" className="text-green-700 underline hover:text-green-900">
            about Supacare
          </Link>
          , explore our{" "}
          <Link href="/services" className="text-green-700 underline hover:text-green-900">
            sustainability services
          </Link>
          , see{" "}
          <Link href="/projects" className="text-green-700 underline hover:text-green-900">
            real-world projects
          </Link>
          , or{" "}
          <Link href="/shop" className="text-green-700 underline hover:text-green-900">
            shop eco-friendly products
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
