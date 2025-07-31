'use client';

import { CheckCircle } from 'lucide-react';

const reasons = [
  {
    title: 'Local Expertise',
    description: 'We understand East African climate, regulations, and community needs.',
  },
  {
    title: 'SME & School-Friendly',
    description: 'Our pricing and approach fit small businesses and institutions.',
  },
  {
    title: 'Community-Based Impact',
    description: 'We develop field-based projects like clean cookstoves and tree planting.',
  },
  {
    title: 'Cross-Sector Experience',
    description: 'We operate in sanitation, waste, and climate — not just carbon.',
  },
  {
    title: 'Aligned with Global Standards',
    description: 'We follow IPCC, GHG Protocol, and Verra-approved methodologies.',
  },
  {
    title: 'Personalized Support',
    description: 'Get hands-on help instead of a generic PDF report.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Why Choose Supacare?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <CheckCircle className="text-green-600 mt-1" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-1">{reason.title}</h3>
                <p className="text-gray-700 text-sm">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
