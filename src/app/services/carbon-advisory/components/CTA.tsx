'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 px-6 md:px-12 bg-green-50 text-center text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Ready to Start Your Carbon Journey?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Whether you run a school, a small business, or a community project — we’re here to guide you.
        </p>
        <Link href="/contact">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
            Book a Carbon Audit
          </button>
        </Link>
      </div>
    </section>
  );
}
