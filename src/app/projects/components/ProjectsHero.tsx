"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ProjectsHero = () => {
  return (
    <section className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/projects-hero.png"
        alt="SupaCare Projects Hero"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Warm Green Overlay */}
      <div className="absolute inset-0 bg-[#3b7e3b]/50 z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Our Impact Projects
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-green-100 font-light">
          Explore how SupaCare is changing lives through sustainability, clean energy, and carbon action across Kenya.
        </p>
      </motion.div>
    </section>
  );
};

export default ProjectsHero;
