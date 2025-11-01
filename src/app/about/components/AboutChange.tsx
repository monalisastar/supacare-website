"use client";

import Image from "next/image";

export default function AboutChange() {
  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between overflow-hidden bg-gradient-to-r from-green-50 via-yellow-50 to-white"
      style={{
        marginTop: "-5px", // ✅ connects seamlessly with hero
        paddingTop: "0px",
      }}
    >
      {/* 🟨 Yellow-Green Accent Strip */}
      <div className="absolute left-0 top-0 h-full w-[12px] bg-[#F4B940] hidden md:block" />

      {/* 🟩 LEFT SIDE — Text Content */}
      <div className="relative w-full md:w-1/2 px-8 md:px-16 lg:px-24 py-20 md:py-28 text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-6 leading-tight">
          Leading Sustainable Change Across Kenya
        </h2>

        <div className="space-y-6 text-justify">
          <p className="text-lg text-gray-700 leading-relaxed">
            Since our founding, Supacare Solutions has worked hand-in-hand with
            communities to deliver climate-smart solutions that turn everyday
            waste into lasting wellness. From composting and clean cooking to
            carbon offset projects and education, we empower people to protect
            both their livelihoods and the planet.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Our vision is a Kenya where waste management is not a challenge but
            an opportunity — driving circular economies, clean air, and climate
            resilience in every county.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="/projects"
            className="inline-block bg-[#F4B940] hover:bg-[#e0a82f] text-green-900 font-semibold px-8 py-3 rounded-full transition shadow-md"
          >
            Explore Our Impact
          </a>
        </div>
      </div>

      {/* 🟩 RIGHT SIDE — Image */}
      <div className="w-full md:w-1/2 relative h-[60vh] md:h-[90vh] -mt-[4px]">
        <Image
          src="/images/for-communities.webp"
          alt="Supacare community sustainability"
          fill
          className="object-cover object-center"
        />

        {/* Soft gradient overlay to merge with text background */}
        <div className="absolute inset-0 bg-gradient-to-l from-white/30 via-transparent to-transparent" />
      </div>
    </section>
  );
}
