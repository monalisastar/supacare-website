import Image from 'next/image'
import { Leaf } from 'lucide-react'

export default function TheProject() {
  return (
    <section id="the-project" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/Supacaretruck.webp"
            alt="Supacare operations"
            fill
            className="object-cover"
          />
          <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-black/55 backdrop-blur-sm rounded-full border border-white/15">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-white text-xs font-medium">Active across Kenya</span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
            What we do
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug mb-6">
            We partner. We measure. We create impact.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            Supacare partners with households, schools, hotels, markets, and
            estates across Kenya. Waste that would have been burned or dumped
            gets properly managed through our network of collection partners.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Every diversion is measured, verified, and turned into carbon
            credits on the Gold Standard registry, attracting climate finance
            that keeps the programme running and growing.
          </p>
        </div>

      </div>
    </section>
  )
}
