import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="Supacare waste management operations across Kenya"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061209] via-[#061209]/65 to-[#061209]/15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-24 pt-40">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/12 border border-green-500/25 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-green-300 text-sm font-medium tracking-wide">
            Gold Standard · Kenya
          </span>
        </div>

        <h1 className="text-5xl lg:text-[68px] font-semibold text-white leading-[1.06] max-w-3xl mb-6 tracking-tight">
          Turning Kenya's waste into real climate impact.
        </h1>

        <p className="text-lg text-white/55 max-w-xl leading-relaxed mb-10">
          We partner with households, schools, hotels, and markets across
          Kenya to divert solid waste from burning and dumping. Communities
          get cleaner. The planet benefits. And every tonne creates a carbon credit.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="#the-project"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-700 hover:bg-green-600 text-white rounded-xl font-medium transition-colors text-sm"
          >
            See how it works <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#carbon"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-white/45 text-white/75 hover:text-white rounded-xl font-medium transition-colors text-sm"
          >
            Carbon credits
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 opacity-30">
        <div className="w-px h-10 bg-white" />
        <span className="text-white text-[10px] tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>
  )
}
