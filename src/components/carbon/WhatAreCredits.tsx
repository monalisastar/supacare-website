import Image from 'next/image'

const facts = [
  {
    title: 'What is a carbon credit?',
    body: 'One carbon credit represents one tonne of CO₂-equivalent emissions avoided or removed. Buying a credit funds the activity that prevented the emission.',
  },
  {
    title: 'Why waste management?',
    body: 'Waste burned or dumped in open sites releases methane and CO₂. When that waste is properly managed instead, those emissions never happen — and the difference is measurable.',
  },
  {
    title: 'Why Gold Standard?',
    body: 'Gold Standard is the most rigorous carbon credit certification in the world. Credits issued under it are independently verified and permanently recorded on a public registry.',
  },
]

export default function WhatAreCredits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div>
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
            Carbon credits explained
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug mb-10">
            Real emissions avoided. Real credits issued.
          </h2>
          <div className="flex flex-col gap-8">
            {facts.map(({ title, body }) => (
              <div key={title} className="border-l-2 border-green-600 pl-5">
                <p className="font-semibold text-gray-900 mb-1.5">{title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/carbon-advisory/credit-documents.webp"
            alt="Carbon credit documentation"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-[#061209]/80 backdrop-blur-sm rounded-2xl px-5 py-4">
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-1">
              Gold Standard Registry
            </p>
            <p className="text-white text-sm leading-relaxed">
              All Supacare credits are listed on the Gold Standard registry — publicly traceable, independently verified.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
