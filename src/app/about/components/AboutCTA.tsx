"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <motion.section
      className="bg-green-700 py-16 px-6 md:px-20 text-center rounded-3xl mx-6 md:mx-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to partner or learn more?
      </h2>
      <p className="text-green-200 max-w-xl mx-auto mb-8">
        Join us in transforming waste management and building a greener future.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-md mx-auto">
        <Link
          href="/contact"
          className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-100 transition"
        >
          Contact Us
        </Link>
        <Link
          href="/projects"
          className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-green-700 transition"
        >
          See Our Work
        </Link>
      </div>
    </motion.section>
  );
}
