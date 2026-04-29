import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CarbonHero() {
  return (
    <section className="relative min-h-[75vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/carbon-advisory/carbon-hero.webp"
          alt="Carbon credits and climate impact"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061209] via-[#061209]/65 to-[#061209]/25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/12 border border-green-500/25 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-green-300 text-sm font-medium tracking-wide">
            Gold Standard · GS4GG
          </span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-semibold text-white leading-tight max-w-3xl mb-5 tracking-tight">
          Waste diverted.<br />Credits created.<br />Climate wins.
        </h1>
        <p className="text-white/55 text-lg max-w-xl leading-relaxed mb-10">
          Every tonne of solid waste we keep out of dumpsites and
          burning piles becomes a verified carbon credit on the Gold Standard registry.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-700 hover:bg-green-600 text-white rounded-xl font-medium transition-colors text-sm"
        >
          Enquire about credits <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
