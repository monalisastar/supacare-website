'use client';

export default function WhatIsCarbonAdvisory() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-700">
          What is Carbon Advisory?
        </h2>
        <p className="text-lg md:text-xl mb-6 text-gray-700 leading-relaxed">
          Carbon Advisory is a specialized service that guides organizations toward climate responsibility and sustainability. 
          It focuses on helping clients measure, reduce, and compensate for their carbon emissions through science-based strategies.
        </p>

        <div className="grid gap-6 text-left text-gray-700 md:grid-cols-2 mt-10">
          <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-xl font-semibold text-green-800 mb-2">1. Carbon Footprint Assessment</h3>
            <p>
              We calculate your greenhouse gas emissions across operations, transport, energy, and supply chains to establish a reliable baseline.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-xl font-semibold text-green-800 mb-2">2. Emission Reduction Strategies</h3>
            <p>
              Our team designs tailored reduction plans—switching to renewable energy, improving efficiency, and minimizing waste.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-xl font-semibold text-green-800 mb-2">3. Carbon Offset Guidance</h3>
            <p>
              We help you invest in verified carbon offset projects (like reforestation or clean cookstoves) to balance unavoidable emissions.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-xl font-semibold text-green-800 mb-2">4. Certification & Reporting</h3>
            <p>
              From ISO to GHG Protocol to CDP and ESG, we support climate disclosures, certification, and long-term compliance.
            </p>
          </div>
        </div>

        <p className="text-md md:text-lg text-gray-600 mt-10 max-w-3xl mx-auto">
          Whether you're a business, school, factory, or community group—our carbon advisory ensures you're not just ticking boxes, but leading boldly toward a low-carbon future.
        </p>
      </div>
    </section>
  );
}
