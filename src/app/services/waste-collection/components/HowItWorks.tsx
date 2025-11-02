'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    title: 'Request Pickup',
    desc: 'Client schedules collection via phone or web form.',
    img: '/images/waste-collection/supatruck.webp',
  },
  {
    title: 'Sorting & Documentation',
    desc: 'On-site sorting and issuing of waste manifests.',
    img: '/images/waste-collection/workerssorting-waste.webp',
  },
  {
    title: 'Waste Transportation',
    desc: 'Licensed vehicles transport waste to approved facilities.',
    img: '/images/waste-collection/waste-transportation.webp',
  },
];

export default function HowItWorks() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    drag: true,
    defaultAnimation: {
      duration: 1000, // Smooth 1 second transition
      easing: (t) => t, // Linear easing
    },
    slides: {
      perView: 1,
      spacing: 10,
    },
  });

  // Auto-slide every 45 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (slider.current) {
        slider.current.next();
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2b402e] mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A seamless process designed to ensure your waste is handled safely, responsibly, and professionally.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div ref={sliderRef} className="keen-slider">
          {steps.map((step, index) => (
            <div
              key={index}
              className="keen-slider__slide flex flex-col items-center"
            >
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-md mb-6">
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#2b402e] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center max-w-md">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 flex justify-between items-center z-10">
          <button
            onClick={() => slider.current?.prev()}
            className="bg-[#2b402e] text-white p-2 rounded-full shadow hover:bg-[#3d5b41] transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => slider.current?.next()}
            className="bg-[#2b402e] text-white p-2 rounded-full shadow hover:bg-[#3d5b41] transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
