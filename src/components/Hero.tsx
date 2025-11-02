'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

type HeroData = {
  title?: string;
  taglines?: string[];
  backgroundVideo?: string;
  ctaText?: string;
  ctaLink?: string;
};

const defaultData: HeroData = {
  title: 'Revitalizing Nature, Empowering Communities',
  taglines: [
    'Building a greener tomorrow through community action',
    'Nature-first solutions for real-world impact',
    'From waste to wealth: Sustainable change starts here',
  ],
  backgroundVideo: '/videos/hero-video.webm',
  ctaText: 'Explore Our Work',
  ctaLink: '/projects',
};

export default function Hero() {
  const [data] = useState<HeroData>(defaultData);
  const [current, setCurrent] = useState(0);
  const { data: session } = useSession();

  // 🌿 Cycle through taglines every 4s
  useEffect(() => {
    if (!data?.taglines) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.taglines!.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  // 🌿 Smooth scroll to next section
  const scrollToNextSection = () => {
    const section = document.getElementById('next-section');
    if (section) {
      const y =
        section.getBoundingClientRect().top +
        window.scrollY -
        (document.querySelector('nav')?.offsetHeight || 0);
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full min-h-[100vh] flex flex-col justify-center text-white overflow-hidden pt-20 sm:pt-24"
    >
      {/* 🎥 Optimized Background Video */}
      {data.backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-[center_40%] z-0"
          src={data.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata" // ✅ Loads video metadata only
          poster="/images/for-communities.webp"
        />
      )}

      {/* 🌫️ Stronger Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 z-10" />

      {/* 🌍 Hero Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 sm:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
        >
          {data.title}
        </motion.h1>

        {/* ✨ Animated Taglines */}
        {data.taglines && (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="mt-5 text-base sm:text-lg md:text-xl max-w-2xl text-green-100 leading-relaxed"
            >
              {data.taglines[current]}
            </motion.div>
          </AnimatePresence>
        )}

        {/* 💡 CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 flex-wrap justify-center"
        >
          {/* Main CTA */}
          {data.ctaText && data.ctaLink && (
            <Link
              href={data.ctaLink}
              className="bg-[#f5b942] hover:bg-[#e8a933] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300"
              prefetch={true}
            >
              {data.ctaText}
            </Link>
          )}

          {/* Mobile-only CTAs */}
          <div className="flex flex-col gap-4 sm:hidden">
            <Link
              href="/shop"
              className="bg-[#f5b942] hover:bg-[#e8a933] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300"
              prefetch={false}
            >
              Shop With Us
            </Link>

            <Link
              href="/services"
              className="bg-[#f5b942] hover:bg-[#e8a933] text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300"
              prefetch={false}
            >
              Book Consultancy
            </Link>
          </div>

          {/* 🔒 Logout (only if signed in) */}
          {session && (
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-500 font-semibold px-8 py-3 rounded-lg shadow-lg transition"
            >
              Logout
            </button>
          )}
        </motion.div>
      </div>

      {/* ⬇️ Scroll Down Icon */}
      <div
        onClick={scrollToNextSection}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white opacity-90 hover:text-[#f5b942] transition drop-shadow-lg"
        >
          <ChevronDown size={48} />
        </motion.div>
      </div>

      {/* 🖼️ Lazy-loaded fallback image for SEO (below video) */}
      <div className="hidden">
        <Image
          src="/images/for-communities.webp"
          alt="Supacare Solutions - Nature and Community"
          width={1920}
          height={1080}
          priority
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
