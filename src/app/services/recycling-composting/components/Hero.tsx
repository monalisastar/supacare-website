'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const FALLBACK_OFFSET = 112; // px - fallback while JS runs
  const EXTRA_SPACING = 12; // extra breathing room so text isn't flush with navbar
  const [offsetTop, setOffsetTop] = useState<number>(FALLBACK_OFFSET + EXTRA_SPACING);

  // Measure navbar and keep offset in sync (resize + ResizeObserver)
  useEffect(() => {
    let ro: ResizeObserver | null = null;

    const updateOffset = () => {
      const navbar = document.querySelector<HTMLElement>('[data-navbar]');
      if (navbar) {
        const navHeight = Math.ceil(navbar.getBoundingClientRect().height);
        setOffsetTop(navHeight + EXTRA_SPACING);
      } else {
        setOffsetTop(FALLBACK_OFFSET + EXTRA_SPACING);
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    const navbarEl = document.querySelector<HTMLElement>('[data-navbar]');
    if (navbarEl && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateOffset);
      ro.observe(navbarEl);
    }

    return () => {
      window.removeEventListener('resize', updateOffset);
      if (ro && navbarEl) ro.unobserve(navbarEl);
    };
  }, []);

  return (
    <section
      className="relative w-full h-[80vh] overflow-hidden"
      style={{
        marginTop: offsetTop,
        transition: 'margin-top 220ms ease',
      }}
    >
      {/* Background Image */}
      <Image
        src="/images/recycling and composting/Supacarecompactmachine.webp"
        alt="Supacare Composting Machine"
        fill
        style={{ objectFit: 'cover' }}
        className="z-0"
        priority
      />

      {/* Overlay + Content */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-white mt-4 max-w-xl text-base md:text-lg">
          Empowering homes, estates, and institutions through sustainable composting.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <Link
            href="/contact?service=compost"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition"
          >
            Book Composting Service
          </Link>
          <Link
            href="/composting-machines"
            className="bg-white text-green-800 hover:bg-gray-100 font-semibold py-2 px-5 rounded-lg transition"
          >
            Request a Machine
          </Link>
        </div>
      </div>
    </section>
  );
}
