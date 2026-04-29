import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const points = [
  'Waste is weighed at point of collection by trained field agents',
  'Data is captured on mobile devices and synced to our MRV platform',
  'Emission factors follow the GS4GG methodology for solid waste diversion',
  'Independent auditors verify the data before credits are issued',
  'Credits are listed on the Gold Standard registry — traceable and permanent',
]

export default function Methodology() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Image side */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/mrv-support.webp"
            alt="MRV and data collection"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-[#061209]/80 backdrop-blur-sm rounded-2xl px-5 py-4">
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-1">Methodology</p>
            <p className="text-white text-sm leading-relaxed">
              GS4GG — Gold Standard for the Global Goals. Solid waste diversion from open burning and dumping.
            </p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
            How we measure
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug mb-6">
            Every tonne counted. Every credit verified.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Rigorous measurement is what separates a real carbon credit from a
            promise. Our MRV system tracks waste from collection to registry — so
            buyers and partners know exactly what they're funding.
          </p>
          <ul className="flex flex-col gap-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
