'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/carbon-advisory/carbon-hero.webp"
        alt="Carbon Advisory Hero"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md">
          Carbon Advisory for a <br /> Climate-Resilient Future
        </h1>
        <p className="mt-4 text-lg md:text-xl text-green-200 max-w-2xl">
          We help businesses, schools, and communities assess, reduce, and offset their carbon emissions.
        </p>
        <Link href="/contact">
          <button className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
            Book a Carbon Audit
          </button>
        </Link>
      </div>
    </section>
  );
}
