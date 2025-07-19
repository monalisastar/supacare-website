'use client';

import { BookOpen, BarChart2, CheckCircle, Award, FlaskConical, Calculator } from 'lucide-react';

const tools = [
  {
    name: 'IPCC Guidelines',
    icon: <BookOpen className="h-8 w-8 text-green-600" />,
    description: 'Scientific basis for emission factors and GHG categories.',
  },
  {
    name: 'GHG Protocol',
    icon: <BarChart2 className="h-8 w-8 text-green-600" />,
    description: 'Standard for carbon accounting and reporting.',
  },
  {
    name: 'Verra (VCS)',
    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
    description: 'Registry for verified carbon credits and projects.',
  },
  {
    name: 'Gold Standard',
    icon: <Award className="h-8 w-8 text-green-600" />,
    description: 'Offsets with social & environmental co-benefits.',
  },
  {
    name: 'CDM Framework',
    icon: <FlaskConical className="h-8 w-8 text-green-600" />,
    description: 'UN-recognized carbon offset methodology.',
  },
  {
    name: 'Carbon Calculators',
    icon: <Calculator className="h-8 w-8 text-green-600" />,
    description: 'Tools to quantify emissions & track reductions.',
  },
];

export default function ToolsStandards() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Tools & Standards We Follow
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-start bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {tool.icon}
              <h3 className="text-lg font-semibold text-green-800 mt-4 mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-700">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
