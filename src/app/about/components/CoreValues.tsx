"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RotateCw, Users, Globe, Hammer } from "lucide-react";

const values = [
  {
    title: "Innovation",
    description:
      "We use smart technologies and circular practices to make waste valuable.",
    icon: RotateCw,
    color: "text-green-400",
    image: "/images/innovations.png",
  },
  {
    title: "Community First",
    description:
      "We prioritize people by designing waste solutions that uplift, protect, and empower every community we serve.",
    icon: Users,
    color: "text-green-400",
    image: "/images/for-communities.webp",
  },
  {
    title: "Sustainability",
    description:
      "Every step we take considers long-term environmental impact.",
    icon: Globe,
    color: "text-green-400",
    image: "/images/sustainable.png",
  },
  {
    title: "Practical Action",
    description:
      "We work on the ground with scalable, real-world tools.",
    icon: Hammer,
    color: "text-green-400",
    image: "/images/practicalaction.png",
  },
];

export default function CoreValues() {
  return (
    <section
      id="core-values"
      className="relative bg-green-50 px-6 md:px-20 pb-20 -mt-24 z-10"
      // ✅ Negative top margin pulls this section up
    >
      {/* ✅ Title left-aligned, paragraph centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-left">
          What Drives Us
        </h2>
        <p className="text-green-900 mt-4 max-w-xl mx-auto text-center">
          These values shape every Supacare decision — from where we place a bin
          to how we shape tomorrow’s communities.
        </p>
      </motion.div>

      {/* ✅ Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {values.map(({ title, description, icon: Icon, color, image }) => (
          <motion.div
            key={title}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Background Image */}
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center brightness-75 group-hover:brightness-100 transition-all duration-500"
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-all" />

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
              <Icon className={`w-10 h-10 mb-4 ${color}`} />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-white/90">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
