"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function VisionForward() {
  return (
    <section className="relative bg-green-50 py-20 px-6 md:px-20 overflow-hidden">
      {/* Abstract particles background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simple animated circles or leaves can be added here */}
          <circle cx="150" cy="100" r="40" fill="#A8D5BA" opacity="0.4" />
          <circle cx="400" cy="300" r="60" fill="#6BBF59" opacity="0.3" />
          <circle cx="650" cy="150" r="30" fill="#A8D5BA" opacity="0.5" />
          {/* Add more shapes or animate with CSS if desired */}
        </svg>
      </div>

      <motion.div
        className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Text content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            The Road Ahead
          </h2>
          <p className="text-green-900 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            At Supacare, we envision a future where sustainable waste management
            is accessible to every community across Kenya and beyond. We will
            expand clean cooking initiatives, develop carbon credit programs,
            and harness smart waste technology to transform how waste becomes a
            resource.
          </p>
          <p className="text-green-900 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            Our mission is to empower local innovators and leaders, building a
            resilient, circular economy that benefits people and planet alike.
            Together, we’re creating the blueprint for a greener, healthier
            tomorrow.
          </p>
        </div>

        {/* Optional visual or placeholder */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Image
            src="/images/vision-forward.png"
            alt="Futuristic eco innovation"
            width={400}
            height={300}
            className="rounded-3xl shadow-lg object-cover"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
