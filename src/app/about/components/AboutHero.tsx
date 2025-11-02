"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutHero() {
  const [offsetTop, setOffsetTop] = useState<number>(0);

  useEffect(() => {
    const updateOffset = () => {
      const navbars = document.querySelectorAll("nav, header, .navbar, .top-nav");
      let totalHeight = 0;
      navbars.forEach((nav) => {
        const el = nav as HTMLElement;
        totalHeight += el.offsetHeight || 0;
      });
      setOffsetTop(totalHeight);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <section
      className="relative flex items-center justify-end overflow-hidden"
      style={{
        paddingTop: `${offsetTop}px`,
        minHeight: "90vh",
        marginBottom: "-5px", // ✅ visually joins next section like a river flow
      }}
    >
      {/* 🟩 Full Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/about-hero.webp"
          alt="Supacare community fieldwork"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-green-900/80 via-green-800/60 to-transparent" />
      </div>

      {/* 🟢 Right-side Text */}
      <div className="relative z-10 max-w-3xl px-8 md:px-20 text-right">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          About Supacare Solutions
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl ml-auto text-justify">
          Transforming waste into wellness through community-powered programs,
          composting, clean cooking, and climate-smart innovations across Kenya.
        </p>
        <a
          href="/projects"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition backdrop-blur-sm shadow-md"
        >
          See Our Work
        </a>
      </div>

      {/* 🟢 Decorative Green Shape */}
      <div className="absolute right-0 top-0 h-full w-[160px] md:w-[240px] bg-green-600 transform -skew-x-[25deg] origin-right shadow-lg" />
      <div className="absolute right-0 top-0 h-full w-[100px] bg-gradient-to-l from-green-600/60 to-transparent" />

      {/* 🌈 Optional bottom fade for soft blend into next section */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-lime-50/90" />
    </section>
  );
}
