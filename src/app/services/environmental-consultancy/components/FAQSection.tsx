"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "Do I need a NEMA EIA license for every project?",
    answer:
      "Not always. Projects that may significantly affect the environment require an Environmental Impact Assessment. We help determine if your project qualifies and support the process.",
  },
  {
    question: "How long does a typical audit or consultancy take?",
    answer:
      "Most small to mid-scale assessments take between 5 to 14 working days depending on complexity, site access, and data availability.",
  },
  {
    question: "Can you support schools or small community groups?",
    answer:
      "Absolutely. SupaCare has a strong track record working with schools, SMEs, and community-based organizations.",
  },
  {
    question: "Do you offer carbon advisory or GHG reporting?",
    answer:
      "Yes, we offer carbon footprint assessments, offset planning, and emissions reporting aligned with international standards.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="bg-[#e6f4ea] py-20 px-4"
      style={{
        backgroundImage:
          "url('/images/environmental consultancy/faq-background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="max-w-4xl mx-auto text-center text-[#2e3e30]">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-5 shadow-md cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold flex justify-between items-center">
                {faq.question}
                <span className="text-green-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </h3>
              {openIndex === index && (
                <p className="mt-3 text-sm text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
