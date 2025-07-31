"use client";

import Image from "next/image";
import { useState } from "react";

const pins = [
  { name: "Nairobi", top: "58%", left: "53%", description: "Urban waste tracking pilot" },
  { name: "Kiambu", top: "55%", left: "50%", description: "Composting projects" },
  { name: "Kirinyaga", top: "43%", left: "32%", description: "Composting project pilot " },
  { name: "Eldoret", top: "35%", left: "40%", description: "Composting pilot " },
];

const LeafPin = ({ color }: { color: string }) => (
  <svg
    width="20"
    height="28"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-md"
  >
    <path
      d="M10 0C14 4 14 10 10 14C6 10 6 4 10 0Z"
      fill={color}
      stroke="white"
      strokeWidth="1"
    />
  </svg>
);

export default function WhereWeWork() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-12">
      {/* Text side */}
      <div className="flex-1 max-w-lg text-center md:text-left">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Local Roots, Expanding Reach
        </h2>
        <p className="text-green-900 mb-6">
          Supacare operates in key Kenyan counties tailoring sustainable waste
          management solutions that improve local communities wellbeing and the environment.
        </p>
        <ul className="list-disc list-inside text-green-700 space-y-3">
          {pins.map(({ name, description }) => (
            <li key={name}>
              <strong>{name}:</strong> {description}
            </li>
          ))}
        </ul>
      </div>

      {/* Map side */}
      <div className="flex-1 max-w-md relative">
        <Image
          src="/images/kenya-map.png"
          alt="Map of Kenya"
          width={400}
          height={600}
          className="block w-full"
          priority
        />

        {pins.map(({ name, top, left, description }) => (
          <button
            key={name}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
            className="absolute cursor-pointer"
            style={{ top, left, transform: "translate(-50%, -100%)" }}
            aria-describedby={`tooltip-${name}`}
            aria-label={name}
          >
            <LeafPin color="#4B7A4B" />
            {hovered === name && (
              <div
                id={`tooltip-${name}`}
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-green-800 text-white text-xs rounded-md p-1 whitespace-nowrap shadow-lg pointer-events-none select-none"
              >
                {name}: {description}
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
