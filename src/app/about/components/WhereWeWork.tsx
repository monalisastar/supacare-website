"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const pins = [
  { name: "Nairobi", top: "58%", left: "53%", description: "Urban waste tracking pilot" },
  { name: "Kiambu", top: "55%", left: "50%", description: "Composting projects" },
  { name: "Kirinyaga", top: "43%", left: "32%", description: "Composting project pilot" },
  { name: "Eldoret", top: "35%", left: "40%", description: "Composting pilot" },
];

const LeafPin = ({ active }: { active?: boolean }) => (
  <motion.svg
    width="22"
    height="30"
    viewBox="0 0 20 28"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ y: active ? -4 : 0, scale: active ? 1.2 : 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 12 }}
    className="drop-shadow-lg"
  >
    <path
      d="M10 0C14 4 14 10 10 14C6 10 6 4 10 0Z"
      fill={active ? "#F4B940" : "#ffffff"} // 🟨 Supacare yellow when active
      stroke="#0a0a0a"
      strokeWidth="0.5"
    />
  </motion.svg>
);

export default function WhereWeWork() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-[#4CAF50] via-[#43A047] to-[#2E7D32] text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-6 md:px-12">
        
        {/* 🟢 Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Local Roots, Expanding Reach
          </h2>
          <p className="text-lg mb-8 max-w-lg leading-relaxed opacity-90">
            Supacare operates in key Kenyan counties, tailoring sustainable waste
            management solutions that uplift communities and protect the planet.
          </p>
          <ul className="space-y-3 text-base">
            {pins.map(({ name, description }) => (
              <li key={name}>
                <strong className="text-[#F4B940]">{name}:</strong> {description}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 🗺️ Right Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative"
        >
          <div className="relative w-[480px] h-[640px] mx-auto">
            <Image
              src="/images/kenya-map.png"
              alt="Map of Kenya"
              fill
              className="object-contain rounded-lg shadow-2xl"
              priority
            />

            {/* 📍 Animated Pins */}
            {pins.map(({ name, top, left, description }) => (
              <button
                key={name}
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                className="absolute cursor-pointer"
                style={{ top, left, transform: "translate(-50%, -100%)" }}
              >
                <LeafPin active={hovered === name} />
                {hovered === name && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs rounded-md px-2 py-1 shadow-lg whitespace-nowrap"
                  >
                    {name}: {description}
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
