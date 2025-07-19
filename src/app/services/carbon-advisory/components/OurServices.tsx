'use client';

import Image from 'next/image';

const services = [
  {
    title: 'Carbon Footprint Assessment',
    image: '/images/carbon-advisory/carbon-definition.webp',
    description: 'Measure baseline emissions for schools, SMEs, and events.',
  },
  {
    title: 'Emission Reduction Planning',
    image: '/images/carbon-advisory/reduction-plan.webp',
    description: 'Create practical roadmaps to reduce carbon output.',
  },
  {
    title: 'Carbon Project Development',
    image: '/images/tree-planting-kiambu.png',
    description: 'Design and register community carbon projects like tree planting and clean cookstoves.',
  },
  {
    title: 'Carbon Credit Registration',
    image: '/images/carbon-advisory/credit-documents.webp',
    description: 'Support in registering with Verra, Gold Standard & others.',
  },
  {
    title: 'MRV Support (Monitoring, Reporting, Verification)',
    image: '/images/carbon-advisory/mrv-support.webp',
    description: 'Help you track, report, and verify climate impact.',
  },
  {
    title: 'Climate Training & ESG',
    image: '/images/carbon-advisory/climate-training.webp',
    description: 'Build internal capacity on climate, ESG, and compliance.',
  },
];

export default function OurServices() {
  return (
    <section className="py-20 bg-gray-100 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Our Carbon Advisory Services
        </h2>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
            >
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">{service.title}</h3>
              <p className="text-gray-700 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
