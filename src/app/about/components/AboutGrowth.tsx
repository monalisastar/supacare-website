"use client";

import Image from "next/image";

export default function AboutGrowth() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between overflow-hidden bg-[#E9FCE9]">
      {/* 🟩 LEFT SIDE — Angled Image */}
      <div className="relative w-full md:w-1/2 h-[70vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0 -skew-x-[12deg] origin-left overflow-hidden">
          <Image
            src="/images/services/domestic-waste.webp"
            alt="Supacare waste management operations"
            fill
            priority
            className="object-cover object-center scale-110"
          />
        </div>

        {/* 🟨 Supacare Yellow Accent Strip */}
        <div className="absolute top-0 left-0 h-full w-[80px] bg-[#F4B940] -skew-x-[12deg] shadow-xl hidden md:block" />
      </div>

      {/* 🟢 RIGHT SIDE — Text Content */}
      <div className="w-full md:w-1/2 px-8 md:px-20 py-20 md:py-28 text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4 leading-tight">
          Growth with Purpose
        </h2>
        <div className="w-20 h-[3px] bg-[#F4B940] mb-6" />

        <div className="text-lg text-gray-700 leading-relaxed text-justify space-y-5">
          <p>
            Supacare Solutions continues to expand its impact by driving
            sustainable innovation in Kenya’s waste and carbon sectors. Our team
            integrates circular economy practices, empowering communities while
            reducing environmental degradation.
          </p>

          <p>
            Through a collaborative model rooted in transparency and integrity,
            we’ve partnered with local governments, schools, and environmental
            organizations to turn waste into new opportunities — from compost
            and clean cooking to climate-smart technologies.
          </p>

          <p>
            This purpose-driven culture defines who we are: people working
            together for cleaner cities, greener jobs, and a resilient planet
            for generations to come.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="/projects"
            className="inline-block bg-[#F4B940] hover:bg-[#e0a82f] text-green-900 font-semibold px-8 py-3 rounded-full transition shadow-md"
          >
            Discover Our Projects
          </a>
        </div>
      </div>
    </section>
  );
}
