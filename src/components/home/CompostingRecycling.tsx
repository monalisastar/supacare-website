import Image from 'next/image'

const PROCESSES = [
  { label: 'In-vessel composting', img: '/images/Supacare In-Vessel ad grit.webp'                 },
  { label: 'Solar drying',         img: '/images/Solar Dryer.webp'                                 },
  { label: 'Biomass production',   img: '/images/recycling and composting/biomass production.webp' },
  { label: 'Certified compost',    img: '/images/recycling and composting/supacare-compost.webp'   },
]

export default function CompostingRecycling() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div>
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
            Beyond collection
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug mb-6">
            Waste that leaves our trucks doesn't go to landfill
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Organic waste is composted through our in-vessel and solar-drying
            systems, producing compost for farms and nurseries. Dry recyclables
            are sorted and sent to accredited partners. Nothing is wasted.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {PROCESSES.map(item => (
              <div
                key={item.label}
                className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 group"
              >
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 flex items-end p-3">
                  <span className="text-white text-xs font-medium leading-tight">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
          <Image
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80&fit=crop"
            alt="Composting and recycling operations"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  )
}
