"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-20 py-20 bg-white">
      {/* Image Section on Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex-1 w-full max-w-md relative"
      >
        <div
          className="w-full h-96 overflow-hidden shadow-lg"
          style={{
            clipPath:
              "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)",
            filter: "drop-shadow(0 4px 6px rgba(34, 139, 34, 0.3))", // subtle green shadow
          }}
        >
          <Image
            src="/images/our-story.png"
            alt="SupaCare composting fieldwork"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Text Section on Right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-1 space-y-6 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">
          Born from Urgency. Built on Purpose.
        </h2>
        <p className="text-lg text-gray-800 max-w-xl mx-auto md:mx-0">
          SupaCare began where most others looked away — in the overlooked
          alleys, waste sites, and underserved communities. We saw not just
          problems, but possibilities: the opportunity to transform waste into
          dignity, data into carbon opportunity, and action into long-term
          climate solutions.
        </p>
        <p className="text-lg text-gray-800 max-w-xl mx-auto md:mx-0">
          From composting pilots to clean cooking access and digital waste
          tracking, our journey is rooted in the belief that small systems can
          spark systemic change. We're here to prove that local innovation can
          lead global transitions.
        </p>
      </motion.div>
    </section>
  );
}
