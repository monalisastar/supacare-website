import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomeCTA() {
  return (
    <section className="relative py-28 bg-green-800 overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src="/images/forest-bg.webp"
          alt=""
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">

        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold text-white leading-snug mb-4">
            Want to offset with real, community-rooted impact?
          </h2>
          <p className="text-white/60 leading-relaxed">
            Talk to us about Kenya's waste management carbon credits.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 flex-shrink-0 w-full lg:w-auto">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-800 rounded-xl font-semibold hover:bg-green-50 transition-colors text-sm"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/portal"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white rounded-xl font-medium hover:border-white/50 transition-colors text-sm"
          >
            Partner portal
          </Link>
        </div>

      </div>
    </section>
  )
}
