'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Waste Collection',
    description:
      'We collect food and garden waste from estates, schools, markets, and institutions—sorted and processed for composting.',
    image: '/images/recycling and composting/Supacaretruck.png',
    link: '/services/collection',
  },
  {
    title: 'Onsite Composting Machines',
    description:
      'Install compact, odor-free composting units at your property for efficient and sustainable waste management.',
    image: '/images/recycling and composting/Supacarehomewastecompostingmachine.png',
    link: '/services/machines',
  },
  {
    title: 'Compost Sales',
    description:
      'Get Supacare’s organic compost—ideal for gardens, landscaping, and farm enrichment. Available in bulk or bags.',
    image: '/images/recycling and composting/compost-use.png',
    link: '/services/compost',
  },
  {
    title: 'Training & Setup Support',
    description:
      'We provide hands-on training and site setup to ensure your team, school, or community composts correctly.',
    image: '/images/recycling and composting/training.png',
    link: '/services/training',
  },
];

export default function OurServices() {
  return (
    <section className="px-4 py-16" style={{ backgroundColor: '#e5f7eb' }}>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">Our Composting Services</h2>
        <p className="mt-2 text-gray-600">
          Supacare offers end-to-end solutions for sustainable waste management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={service.link}>
              <div className="bg-gray-50 rounded-lg shadow hover:shadow-md transition p-4 cursor-pointer h-full flex flex-col">
                <div className="relative w-full h-48 rounded overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-green-700">{service.title}</h3>
                <p className="mt-2 text-gray-600 text-sm flex-grow">{service.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

