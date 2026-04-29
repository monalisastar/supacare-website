import Image from 'next/image'
import { Home, School, Hotel, ShoppingBag, Building2, Factory } from 'lucide-react'

const PARTICIPANTS = [
  {
    label: 'Households',
    icon:  Home,
    img:   '/images/domestic-waste.webp',
    desc:  'Residential families enrolled in regular, scheduled collection routes',
  },
  {
    label: 'Schools',
    icon:  School,
    img:   '/images/schools.webp',
    desc:  'Educational institutions reducing and segregating waste on campus',
  },
  {
    label: 'Hotels & Hospitality',
    icon:  Hotel,
    img:   '/images/waste-collection/commercial-waste.webp',
    desc:  'Hotels and lodges managing food, packaging, and organic waste streams',
  },
  {
    label: 'Markets',
    icon:  ShoppingBag,
    img:   '/images/market.webp',
    desc:  'Open-air and covered markets with high-volume organic waste output',
  },
  {
    label: 'Institutions',
    icon:  Building2,
    img:   '/images/institutional-waste.webp',
    desc:  'Government offices, hospitals, and NGOs with compliance needs',
  },
  {
    label: 'Industrial Sites',
    icon:  Factory,
    img:   '/images/e-waste.webp',
    desc:  'Factories and manufacturing sites with specialised waste categories',
  },
]

export default function WhoWeServe() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
            Who we serve
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 max-w-xl leading-snug">
            From households to industrial sites — we collect it all
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PARTICIPANTS.map(p => (
            <div
              key={p.label}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200 cursor-default"
            >
              <Image
                src={p.img}
                alt={p.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <p.icon className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm">{p.label}</span>
                </div>
                <p className="text-white/60 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
