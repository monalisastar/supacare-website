import Image from 'next/image';
import Link from 'next/link';

export default function CarbonFootprintPage() {
  return (
    <main className="text-gray-900">

      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 -z-10 min-h-[600px] md:min-h-[700px]">
          <Image
            src="/images/hero-carbon-footprint.png"
            alt="Earth with Carbon Footprint"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Uncomment this overlay after confirming image loads */}
          {/* <div className="absolute inset-0 bg-green-900 bg-opacity-60"></div> */}
        </div>

        <div className="max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Carbon Footprint Assessment & Reduction
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Measure, understand, and reduce your carbon emissions with Supacare’s expert assessment and tailored sustainability strategies.
          </p>
          <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 transition rounded-md px-8 py-4 text-lg font-semibold shadow-lg drop-shadow-md">
            Request a Consultation
          </Link>
        </div>
      </section>

      {/* Overview Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">What is Carbon Footprint?</h2>
          <p className="text-gray-700 mb-4">
            Carbon footprint refers to the total greenhouse gas emissions caused directly or indirectly by an individual, organization, event, or product. It’s measured in units of carbon dioxide equivalents (CO₂e).
          </p>
          <p className="text-gray-700">
            Understanding your carbon footprint is essential to take effective actions toward climate change mitigation and sustainability.
          </p>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-80">
          <Image
            src="/images/overview-infographic.png"
            alt="Carbon Footprint Overview Infographic"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Reducing Your Carbon Footprint Matters</h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            {/* Benefit 1 */}
            <div className="max-w-xs bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative w-20 h-20 mb-4">
                <Image
                  src="/images/benefit-cost-savings.png"
                  alt="Cost Savings Icon"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="font-semibold text-xl mb-2">Cost Savings</h3>
              <p className="text-gray-700 text-center">
                Reduce energy and resource consumption to lower operational costs and improve efficiency.
              </p>
            </div>
            {/* Benefit 2 */}
            <div className="max-w-xs bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative w-20 h-20 mb-4">
                <Image
                  src="/images/benefit-compliance.png"
                  alt="Compliance Icon"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="font-semibold text-xl mb-2">Regulatory Compliance</h3>
              <p className="text-gray-700 text-center">
                Stay ahead of environmental regulations and avoid penalties by adhering to carbon standards.
              </p>
            </div>
            {/* Benefit 3 */}
            <div className="max-w-xs bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="relative w-20 h-20 mb-4">
                <Image
                  src="/images/benefit-environmental.png"
                  alt="Environmental Impact Icon"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="font-semibold text-xl mb-2">Environmental Impact</h3>
              <p className="text-gray-700 text-center">
                Contribute positively to the environment by reducing greenhouse gas emissions and conserving resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Assessment Process</h2>
        <div className="flex flex-col md:flex-row justify-between gap-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="relative w-20 h-20 mb-4">
              <Image
                src="/images/process-step-1.png"
                alt="Data Collection Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h3 className="font-semibold text-xl mb-2">Data Collection</h3>
            <p className="text-gray-700">
              We gather detailed data on energy use, transportation, waste, and other emission sources.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="relative w-20 h-20 mb-4">
              <Image
                src="/images/process-step-2.png"
                alt="Calculation Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h3 className="font-semibold text-xl mb-2">Calculation & Analysis</h3>
            <p className="text-gray-700">
              Using verified methodologies, we calculate your total carbon footprint and analyze key contributors.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="relative w-20 h-20 mb-4">
              <Image
                src="/images/process-step-3.png"
                alt="Strategy Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h3 className="font-semibold text-xl mb-2">Reduction Strategy</h3>
            <p className="text-gray-700">
              We develop tailored strategies to help you reduce emissions and improve sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Tools & Technology Section */}
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Our Tools & Standards</h2>
          <div className="flex justify-center gap-16 items-center flex-wrap">
            <div className="relative w-32 h-20">
              <Image
                src="/images/tool-ipcc.png"
                alt="IPCC Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative w-32 h-20">
              <Image
                src="/images/tool-calculator.png"
                alt="Carbon Calculator Icon"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Case Study 1 */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <div className="relative w-full h-64">
              <Image
                src="/images/case-study-1.png"
                alt="Case Study 1"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-semibold text-xl mb-2">Community Solar Project</h3>
              <p className="text-gray-700">
                Supacare partnered with a local community to implement solar panels, reducing electricity emissions by 40%.
              </p>
            </div>
          </div>
          {/* Case Study 2 */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <div className="relative w-full h-64">
              <Image
                src="/images/case-study-2.png"
                alt="Case Study 2"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-semibold text-xl mb-2">Waste Management Revamp</h3>
              <p className="text-gray-700">
                Improved waste segregation and recycling processes helped cut emissions and landfill waste significantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-20 px-6 flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('/images/cta-background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>
        <div className="relative max-w-3xl">
          <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
            Ready to take control of your carbon footprint?
          </h2>
          <p className="text-lg mb-8 drop-shadow-md">
            Contact Supacare today for a personalized consultation and start your sustainability journey.
          </p>
          <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 transition rounded-md px-10 py-4 text-xl font-semibold shadow-lg drop-shadow-md">
            Request a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
