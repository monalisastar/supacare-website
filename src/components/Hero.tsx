"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type HeroData = {
  title?: string;
  taglines?: string[];
  backgroundVideo?: string;
  ctaText?: string;
  ctaLink?: string;
};

const defaultData: HeroData = {
  title: "Revitalizing Nature, Empowering Communities",
  taglines: [
    "Building a greener tomorrow through community action",
    "Nature-first solutions for real-world impact",
    "From waste to wealth: Sustainable change starts here",
  ],
  backgroundVideo: "/videos/hero-video.webm",
  ctaText: "Explore Our Work",
  ctaLink: "/projects",
};

export default function Hero() {
  const [data] = useState<HeroData>(defaultData);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!data?.taglines) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.taglines!.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  const scrollToNextSection = () => {
    const section = document.getElementById("next-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] snap-start w-full overflow-hidden text-white">
      {/* Background Video */}
      {data.backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={data.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-28 sm:py-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-10 sm:mt-16 text-3xl sm:text-4xl md:text-6xl font-bold leading-tight max-w-4xl"
        >
          {data.title}
        </motion.h1>

        {data.taglines && (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl text-green-100"
            >
              {data.taglines[current]}
            </motion.div>
          </AnimatePresence>
        )}

        {data.ctaText && data.ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link
              href={data.ctaLink}
              className="mt-6 inline-block bg-[#f5b942] hover:bg-[#e8a933] text-white px-6 py-3 rounded-lg shadow-lg transition"
            >
              {data.ctaText}
            </Link>
          </motion.div>
        )}
      </div>

      {/* Scroll Down Icon */}
      <div
        onClick={scrollToNextSection}
        className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white opacity-80"
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>
    </section>
  );
}
