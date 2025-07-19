"use client";

import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-20 py-16 bg-green-50">
      {/* Leafy vertical accent strip aligned with navbar height */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-0 left-0 w-24 bg-gradient-to-b from-green-700 to-green-800 rounded-tr-xl rounded-br-xl shadow-lg z-0"
        style={{
          height: "80px", // approximate navbar height
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 0% 100%, 30% 70%, 50% 50%, 30% 30%)",
        }}
      />

      {/* Leafy vertical accent strip extending along hero's left side below navbar */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-[80px] left-0 w-24 h-[calc(100%_-_80px)] bg-gradient-to-b from-green-600 to-green-700 shadow-lg z-0"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 0% 100%, 30% 70%, 50% 50%, 30% 30%)",
        }}
      />

      {/* Text Section */}
      <div className="relative flex-1 space-y-6 text-center md:text-left z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">
          Making Waste Work for People & Planet
        </h1>
        <p className="text-lg text-green-900 max-w-xl mx-auto md:mx-0">
          SupaCare Solutions is transforming waste into wellness through community-powered programs,
          clean cooking, composting, and climate-smart practices across Kenya.
        </p>
        <a
          href="/projects"
          className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full transition"
        >
          See Our Work
        </a>
      </div>

      {/* Image Section */}
      <div className="relative flex-1 w-full max-w-md z-10">
        <div className="w-full h-96 overflow-hidden rounded-[40%_60%_60%_40%/60%_40%_60%_40%] shadow-lg">
          <Image
            src="/images/about-hero.png"
            alt="SupaCare community fieldwork"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
