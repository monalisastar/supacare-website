'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/recycling and composting/Supacaretruck.png"
        alt="Supacare Truck"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Dark Overlay + Content */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
        {/* Supacare Logo Badge */}
        <div className="absolute top-6 left-6 w-24 h-24 md:w-28 md:h-28">
          <Image
            src="/images/supalogo.png"
            alt="Supacare Logo"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-xl"
          />
        </div>

        <h2 className="text-white text-3xl md:text-4xl font-bold max-w-3xl">
          Join the Composting Movement Today
        </h2>
        <p className="text-white mt-3 text-base md:text-lg max-w-xl">
          Let’s build cleaner, greener communities — one compost bin at a time.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <Link
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition"
          >
            Book Composting Service
          </Link>
          <Link
            href="/contact"
            className="bg-white text-green-800 hover:bg-gray-100 font-semibold py-2 px-5 rounded-lg transition"
          >
            Request a Machine
          </Link>
        </div>
      </div>
    </section>
  );
}
