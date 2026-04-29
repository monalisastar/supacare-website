import Link from 'next/link'
import { ArrowRight, Building2, Globe, Leaf } from 'lucide-react'

const buyers = [
  {
    icon: Building2,
    title: 'Corporates',
    body: 'Companies with net-zero targets looking for high-quality, community-rooted African credits to offset residual emissions.',
  },
  {
    icon: Globe,
    title: 'Institutions',
    body: 'Universities, NGOs, and public bodies seeking transparent, verifiable carbon offsets with a clear local impact story.',
  },
  {
    icon: Leaf,
    title: 'Impact investors',
    body: 'Funds and investors wanting to support climate projects that generate both financial returns and measurable social outcomes.',
  },
]

export default function BuyCredits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
            Who buys our credits
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug mb-4">
            Built for organisations that take climate seriously.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Our credits come with a community impact story, full MRV documentation,
            and Gold Standard verification — exactly what serious buyers require.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {buyers.map(({ icon: Icon, title, body }) => (
            <div key={title} className="p-8 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">{title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enquiry CTA block */}
        <div className="bg-[#061209] rounded-3xl px-10 py-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="text-3xl font-semibold text-white mb-3">
              Interested in our credits?
            </h3>
            <p className="text-white/50 max-w-lg leading-relaxed">
              We're currently in the implementation phase. Get in touch to
              register your interest and be first in line when credits become available.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors text-sm"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
