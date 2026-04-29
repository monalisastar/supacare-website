import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CarbonSection() {
  return (
    <section id="carbon" className="relative py-28 bg-[#061209] overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src="/images/carbon-advisory/carbon-hero.webp"
          alt=""
          fill
          className="object-cover opacity-15"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <div>
          <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
            Carbon credits
          </p>
          <h2 className="text-4xl font-semibold text-white leading-snug mb-6">
            Every tonne of waste we divert becomes a Gold Standard carbon credit.
          </h2>
          <p className="text-white/50 leading-relaxed mb-10">
            Waste that stops burning stops polluting. We quantify that and
            list the credits on the Gold Standard registry. Corporates and
            institutions buying our credits fund cleaner communities in Kenya
            and verified climate impact.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-700 hover:bg-green-600 text-white rounded-xl font-medium transition-colors text-sm"
          >
            Enquire about credits <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Visual SDG block */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { num: 'SDG 3',  title: 'Good health',             body: 'Less burning means cleaner air for families.' },
            { num: 'SDG 11', title: 'Sustainable cities',      body: 'Organised waste makes towns liveable.'        },
            { num: 'SDG 13', title: 'Climate action',          body: 'Every credit is a verified emission avoided.' },
            { num: 'SDG 15', title: 'Life on land',            body: 'Less waste dumped, more land protected.'      },
          ].map(s => (
            <div
              key={s.num}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2"
            >
              <span className="text-green-400 text-xs font-bold tracking-wider">{s.num}</span>
              <p className="text-white text-sm font-medium">{s.title}</p>
              <p className="text-white/40 text-xs leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
