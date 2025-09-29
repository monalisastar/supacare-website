'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroHeader() {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  return (
    <section
      className="relative max-w-7xl mx-auto text-center mb-10 transition-all"
      style={{ paddingTop: navHeight + 40 }}
    >
      {/* Hero background image */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          src="/hero.png"
          alt="Hero Banner"
          fill
          style={{ objectFit: 'cover' }}
          priority={true}
        />
        <div className="absolute inset-0 bg-white/60"></div> 
        {/* ⬆️ Changed overlay to light (white/60) so dark text stands out */}
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-black drop-shadow-md mb-2">
        Supacare Insights
      </h1>
      <p className="text-black/90 text-lg font-medium drop-shadow-sm">
        Stories, strategies, and solutions for sustainable living
      </p>
    </section>
  );
}
