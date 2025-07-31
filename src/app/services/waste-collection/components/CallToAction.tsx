'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="w-full bg-[#2b402e] py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto text-center text-white">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to schedule your waste pickup?
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Let Supacare handle it with professionalism, compliance, and care.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="bg-white text-[#2b402e] font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
          >
            Book Now
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-[#2b402e] transition"
          >
            Get Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
