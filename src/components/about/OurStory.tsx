import Image from 'next/image'

export default function OurStory() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/our-story.webp"
            alt="How Supacare started"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
            Our story
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug mb-6">
            We saw a problem. We built a solution.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            Supacare was founded in Kenya with a clear focus: keep solid waste
            out of the environment. Across the country, households, schools, and
            businesses were generating waste that had nowhere structured to go —
            so it was burned, dumped, or left to pile up.
          </p>
          <p className="text-gray-500 leading-relaxed mb-4">
            We started building a network. Partnering with communities,
            connecting them to collection routes, and putting in the systems
            needed to track and verify every tonne diverted.
          </p>
          <p className="text-gray-500 leading-relaxed">
            That measurement work opened a second door: carbon credits. Waste
            diverted is emissions avoided. Verified emissions avoided are credits
            on the Gold Standard registry. Credits attract climate finance. And
            climate finance keeps the programme growing.
          </p>
        </div>

      </div>
    </section>
  )
}
