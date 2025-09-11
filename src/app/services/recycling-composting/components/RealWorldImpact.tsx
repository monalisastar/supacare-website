'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Hardcoded slides
const slides = [
  {
    img: '/images/recycling and composting/compost-use.webp',
    caption: 'Transforming kitchen waste into valuable compost for greener gardens.',
  },
  {
    img: '/images/recycling and composting/waste-sorting-collection.webp',
    caption: 'Sorted waste streams improve recycling and reduce landfill loads.',
  },
  {
    img: '/images/recycling and composting/composting-site.webp',
    caption: 'Large-scale composting sites turn organic waste into natural fertilizer.',
  },
];

export default function RealWorldImpact() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % slides.length);
  const prev = () => setIndex((index - 1 + slides.length) % slides.length);
  const goToSlide = (i: number) => setIndex(i);

  // Auto-rotate every 45s
  useEffect(() => {
    const timer = setInterval(next, 45000);
    return () => clearInterval(timer);
  }, [index]);

  const { img, caption } = slides[index];

  return (
    <section className="w-full py-10 px-4 md:px-16 bg-[#f5fdf4]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src={img}
            alt="Impact"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-auto"
            priority={index === 0}
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Real-World Impact</h2>
          <p className="text-lg text-gray-700 min-h-[80px]">{caption}</p>

          <div className="mt-6 flex justify-center md:justify-start space-x-4">
            <button onClick={prev} className="bg-green-700 text-white px-4 py-2 rounded">‹</button>
            <button onClick={next} className="bg-green-700 text-white px-4 py-2 rounded">›</button>
          </div>

          <div className="mt-4 flex justify-center md:justify-start space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-green-700' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
