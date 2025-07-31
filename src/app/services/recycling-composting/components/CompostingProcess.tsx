'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const steps = [
  { title: '1. Waste Collection', description: 'Organic waste is collected from homes, estates, schools, and markets.' },
  { title: '2. Pre-processing & Sorting', description: 'Materials are sorted, shredded, and mixed to optimize composting.' },
  { title: '3. Composting Phase', description: 'Waste undergoes controlled aerobic decomposition for 14–21 days.' },
  { title: '4. Curing & Screening', description: 'Compost is matured, screened, and tested for quality.' },
  { title: '5. Compost Packaging', description: 'Ready compost is packed for resale or redistributed to communities.' },
];

export default function CompostingProcess() {
  return (
    <section className="px-4 py-16" style={{ backgroundColor: '#e5f7eb' }}>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Our Composting Process</h2>
        <p className="mt-2 text-gray-600">
          From waste collection to nutrient-rich compost — here’s how Supacare makes it happen.
        </p>
      </div>

      <div className="relative w-full h-80 md:h-[500px] rounded-xl overflow-hidden max-w-6xl mx-auto mb-12">
        <Image
          src="/images/recycling and composting/composting process.jpg"
          alt="Composting in action"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-green-700 font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
