"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * OUR STORY SECTION
 * - Smooth gradient transition from FocusAreas
 * - Full background image (always visible)
 * - Text sits on the left half
 * - Slight upward overlap for seamless join
 */
export default function OurStory() {
  return (
    <section
      id="our-story"
      className="relative flex items-center justify-start
                 overflow-hidden min-h-screen w-full
                 bg-black text-white scroll-smooth -mt-32 z-10"
      style={{
        margin: 0,
        paddingTop: "0",
        paddingBottom: "0",
      }}
    >
      {/* ✅ Full background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/our-story.png"
          alt="Supacare composting fieldwork"
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        {/* Soft gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent" />
      </div>

      {/* ✅ Left text block */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 w-full md:w-1/2 px-6 md:px-12 lg:px-20 py-24 space-y-6"
      >
        <h2
          className="text-3xl md:text-4xl font-semibold mb-4"
          style={{ color: "#f4b400" }} // ✅ navbar yellow tone
        >
          Who We Are
        </h2>

        <p className="text-lg md:text-xl leading-relaxed text-justify">
          Supacare Solutions is a climate innovation company driving circular,
          low-carbon transformation across Africa. We turn community waste,
          clean energy, and sustainability initiatives into measurable climate
          impact through verified carbon projects, environmental consultancy,
          and regenerative practices.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-justify">
          Guided by data, science, and inclusivity, we empower local
          institutions, businesses, and households to become active participants
          in the global transition toward a sustainable, climate-resilient
          future.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-justify">
          From composting pilots to clean cooking access and digital waste
          tracking, our journey is rooted in the belief that small systems can
          spark systemic change. We're here to prove that local innovation can
          lead global transitions.
        </p>
      </motion.div>

      {/* ✅ Gradient bridge from green to black for seamless section merge */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-green-50 via-green-900/50 to-black opacity-90" />
    </section>
  );
}
