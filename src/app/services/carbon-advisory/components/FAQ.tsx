'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'What is the difference between a carbon footprint and a carbon credit?',
    answer:
      'A carbon footprint measures your emissions. A carbon credit represents 1 tonne of CO₂ reduced or avoided — used to offset your footprint.',
  },
  {
    question: 'Can small schools or SMEs benefit from carbon advisory?',
    answer:
      'Absolutely. Our services are tailored to smaller institutions and offer affordable, practical support.',
  },
  {
    question: 'Do I need to register with Verra or Gold Standard to get started?',
    answer:
      'No — we help you assess first. Registration comes later if your project qualifies.',
  },
  {
    question: 'How long does a carbon audit take?',
    answer:
      'Typically 1–2 weeks for schools or SMEs, depending on data availability and complexity.',
  },
  {
    question: 'What kind of projects qualify for carbon credits?',
    answer:
      'Tree planting, clean cooking, renewable energy, and improved waste management may all qualify.',
  },
  {
    question: 'Can Supacare help with climate training or compliance?',
    answer:
      'Yes. We offer ESG workshops, policy guidance, and tailored climate education for organizations.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white via-green-50 to-white text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold text-green-700 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="border border-green-100 bg-white/60 backdrop-blur-md rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => toggleFAQ(idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-800">{faq.question}</h3>
                {openIndex === idx ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-gray-700">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
