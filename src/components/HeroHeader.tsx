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
          src="/hero.png" // ✅ must start with a leading slash
          alt="Hero Banner"
          fill
          style={{ objectFit: 'cover' }}
          priority={true} // optional, ensures fast loading
        />
        <div className="absolute inset-0 bg-green-900/20"></div> {/* subtle overlay */}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
        Supacare Insights
      </h1>
      <p className="text-white text-lg">
        Stories, strategies, and solutions for sustainable living
      </p>
    </section>
  );
}
