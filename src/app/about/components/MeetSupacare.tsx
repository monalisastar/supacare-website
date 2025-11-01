"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MeetSupacare() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center md:justify-between px-8 md:px-20 py-24 bg-[#E8FBE8] overflow-hidden">
      {/* 🌀 Rotating Circular Frame with Team Image */}
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center mb-10 md:mb-0">
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute w-full h-full rounded-full border-[20px] border-[#F4B940] border-t-transparent"
        />
        {/* Inner team image */}
        <div className="relative w-[230px] h-[230px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden shadow-lg">
          <Image
            src="/images/team-supacare.png"
            alt="Supacare team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 🟢 Text Content */}
      <div className="max-w-lg text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">
          Meet Supacare
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          A passionate team dedicated to redefining sustainability in Africa
          through innovation, education, and impact-driven waste solutions.
          Together, we’re building a cleaner, greener, and healthier planet for
          communities across Kenya.
        </p>
        <a
          href="/team"
          className="inline-block bg-[#F4B940] hover:bg-[#e0a82f] text-green-900 font-semibold px-8 py-3 rounded-full transition shadow-md"
        >
          Meet the Team
        </a>
      </div>
    </section>
  );
}
