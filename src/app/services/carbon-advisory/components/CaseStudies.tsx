'use client';

import Image from 'next/image';

const caseStudies = [
  {
    title: 'Tree Planting Audit – Kiambu County',
    image: '/images/tree-planting-kiambu.png',
    description: 'We conducted a carbon baseline and project assessment for a community tree planting initiative in Kiambu.',
    result: 'Registered 3,000+ trees and estimated 250 tCO₂ in future offsets.',
  },
  {
    title: 'School Waste Sorting – Nairobi',
    image: '/images/school-waste-sorting.png',
    description: 'Helped a local school assess its waste emissions and implement a sorting + composting system.',
    result: 'Reduced landfill-bound waste by 18% in one term.',
  },
  {
    title: 'Urban Sanitation GHG Assessment – Nairobi',
    image: '/images/urban-sanitation-nairobi.png',
    description: 'Assessed emissions from informal dumpsites and provided climate-smart sanitation strategies.',
    result: 'Laid groundwork for a waste-to-carbon-offset model in peri-urban areas.',
  },
];

export default function CaseStudies() {
  return (
    <section className="py-20 bg-gray-50 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Our Impact in the Field
        </h2>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
          {caseStudies.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold text-green-800">{project.title}</h3>
                <p className="text-gray-700 mt-2 text-sm">{project.description}</p>
                <p className="mt-3 text-green-600 font-medium text-sm">{project.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
