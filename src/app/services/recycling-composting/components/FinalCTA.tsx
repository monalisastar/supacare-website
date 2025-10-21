'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="relative w-full h-[30vh] md:h-[35vh] overflow-hidden">
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
        <div className="absolute top-3 left-3 w-16 h-16 md:w-20 md:h-20">
          <Image
            src="/images/supalogo.png"
            alt="Supacare Logo"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-lg"
          />
        </div>

        <h2 className="text-white text-xl md:text-2xl font-bold max-w-2xl">
          Join the Composting Movement Today
        </h2>
        <p className="text-white mt-1 text-sm md:text-base max-w-md">
          Build cleaner, greener communities — one compost bin at a time.
        </p>

        <div className="mt-3 flex gap-2 flex-wrap justify-center">
          <Link
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1.5 px-3 rounded-lg text-sm transition"
          >
            Book Composting Service
          </Link>
          <Link
            href="/contact"
            className="bg-white text-green-800 hover:bg-gray-100 font-semibold py-1.5 px-3 rounded-lg text-sm transition"
          >
            Request a Machine
          </Link>
        </div>
      </div>
    </section>
  );
}
