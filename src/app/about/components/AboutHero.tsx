"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutHero() {
  const [navbarHeight, setNavbarHeight] = useState<number>(100); // default fallback

  useEffect(() => {
    const updateNavbarHeight = () => {
      const nav = document.querySelector("nav") as HTMLElement | null;
      if (nav) setNavbarHeight(nav.offsetHeight);
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  return (
    <section
      className="relative flex items-center justify-center text-center md:text-left overflow-hidden"
      style={{
        paddingTop: `${navbarHeight + 140}px`,
        paddingBottom: "160px",
        minHeight: "92vh",
      }}
    >
      {/* ✅ Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/about-hero.png"
          alt="Supacare community fieldwork"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/60 to-green-700/50" />
      </div>

      {/* ✅ Text Content */}
      <div className="relative z-10 max-w-3xl px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6 leading-tight">
          Transforming Waste into Wellness For Communities and Climate
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
          Supacare Solutions is transforming waste into wellness through
          community-powered programs, clean cooking, composting, and
          climate-smart practices across Kenya.
        </p>
        <a
          href="/projects"
          className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full transition backdrop-blur-sm shadow-md"
        >
          See Our Work
        </a>
      </div>
    </section>
  );
}
