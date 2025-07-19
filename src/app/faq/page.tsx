'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What services does supaCare Solutions offer?",
        a: "We specialize in waste management, carbon advisory, clean cooking technologies, and sustainability consulting.",
      },
      {
        q: "How can I request a service?",
        a: "You can contact us via phone, email, or fill out the inquiry form on our Contact page.",
      },
      {
        q: "Where is supaCare Solutions located?",
        a: "Our main office is in Nairobi, Kenya, but we serve multiple counties including Kisumu and Kiambu.",
      },
    ],
  },
  {
    category: "Waste Management",
    questions: [
      {
        q: "Do you offer IoT-based waste tracking?",
        a: "Yes, we pilot IoT-enabled bins to optimize waste collection and routing for efficiency and environmental benefit.",
      },
      {
        q: "How do you handle waste disposal safely?",
        a: "We use environmentally friendly methods adhering to Kenya’s environmental regulations and best practices to ensure safety and sustainability.",
      },
    ],
  },
  {
    category: "Carbon Advisory & Clean Cooking",
    questions: [
      {
        q: "How do your carbon advisory services work?",
        a: "We provide assessments, carbon footprint calculations, and advice to reduce emissions through clean technologies and behavior change.",
      },
      {
        q: "What are E-Jikos and how do they help?",
        a: "E-Jikos are efficient electric cooking solutions that reduce reliance on charcoal and wood, cutting carbon emissions and indoor pollution.",
      },
    ],
  },
  {
    category: "Support & Pricing",
    questions: [
      {
        q: "How is pricing determined?",
        a: "Pricing depends on the scope and scale of the project; we offer customized quotes after an initial assessment.",
      },
      {
        q: "What support options do you provide?",
        a: "We provide phone, email, and on-site support depending on client needs and contracts.",
      },
    ],
  },
];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [activeIndexes, setActiveIndexes] = useState<Record<string, number | null>>({});

  const filteredFaqs = faqs
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(({ q, a }) =>
        q.toLowerCase().includes(search.toLowerCase()) || a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(cat => cat.questions.length > 0);

  function toggleQuestion(category: string, index: number) {
    setActiveIndexes(prev => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  }

  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #f9faf9 0%, #c3e0c8 100%)',
        minHeight: '100vh',
        paddingTop: '6rem', // Push content below navbar
      }}
      className="max-w-5xl mx-auto p-6 sm:p-10"
    >
      <h1 className="text-5xl font-extrabold mb-10 text-green-800 tracking-tight">Frequently Asked Questions</h1>

      <input
        type="search"
        aria-label="Search FAQs"
        placeholder="Search questions..."
        className="w-full p-4 mb-12 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filteredFaqs.length === 0 && (
        <p className="text-center text-gray-500 my-16 text-lg">
          No FAQs found matching your query.
        </p>
      )}

      {filteredFaqs.map(({ category, questions }) => (
        <section key={category} className="mb-14">
          <h2 className="text-3xl font-semibold mb-6 text-green-700 border-b border-green-200 pb-2">{category}</h2>

          <div className="space-y-3">
            {questions.map(({ q, a }, idx) => {
              const isActive = activeIndexes[category] === idx;
              return (
                <div
                  key={idx}
                  className="border border-green-200 rounded-lg overflow-hidden shadow-sm bg-green-50"
                >
                  <button
                    onClick={() => toggleQuestion(category, idx)}
                    aria-expanded={isActive}
                    aria-controls={`${category}-faq-panel-${idx}`}
                    id={`${category}-faq-header-${idx}`}
                    className="flex justify-between items-center w-full p-4 text-left text-green-900 font-medium hover:bg-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  >
                    <span>{q}</span>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        id={`${category}-faq-panel-${idx}`}
                        role="region"
                        aria-labelledby={`${category}-faq-header-${idx}`}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { height: 'auto', opacity: 1 },
                          collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="px-4 pb-4 text-green-900"
                        style={{ overflow: 'hidden' }}
                      >
                        <p>{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mt-20 text-center p-8 bg-green-100 rounded-lg border border-green-300">
        <h3 className="text-2xl font-semibold mb-4 text-green-800">Need more help?</h3>
        <p className="mb-6 text-green-700">If you can’t find the answer you’re looking for, please get in touch with us.</p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400"
        >
          Contact Support
        </a>
      </section>
    </main>
  );
}
