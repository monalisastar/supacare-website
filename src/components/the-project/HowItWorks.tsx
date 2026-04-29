import Image from 'next/image'

const steps = [
  {
    num: '01',
    title: 'Partner',
    body: 'We sign up households, schools, hotels, markets, and estates. Each partner commits to separating and handing over their waste instead of burning or dumping it.',
    image: '/images/estatemanager.webp',
  },
  {
    num: '02',
    title: 'Collect',
    body: 'Our network of local collection partners picks up waste on a regular schedule. Nothing goes to a dumpsite or open fire.',
    image: '/images/Supacaretruck.webp',
  },
  {
    num: '03',
    title: 'Measure',
    body: 'Every tonne collected is weighed, logged, and verified by our field agents using mobile data tools. The data feeds directly into our MRV system.',
    image: '/images/supacareagentwithtablet.webp',
  },
  {
    num: '04',
    title: 'Credit',
    body: 'Verified diversion is submitted to the Gold Standard registry. Each approved tonne becomes a carbon credit that funds the programme and keeps it growing.',
    image: '/images/credit-documents.webp',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
            How it works
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug max-w-xl">
            Four steps. Real impact.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="group relative rounded-3xl overflow-hidden bg-gray-50 flex flex-col">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
              </div>
              <div className="px-8 pb-8 pt-4 flex flex-col gap-3">
                <span className="text-5xl font-bold text-green-100 leading-none select-none">
                  {step.num}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 -mt-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
