import Image from 'next/image'

const partners = [
  { label: 'Households',    image: '/images/domestic-waste.webp',      body: 'Families across estates and residential areas separating waste at source.' },
  { label: 'Schools',       image: '/images/schools.webp',              body: 'Educational institutions building a culture of responsible waste disposal.' },
  { label: 'Hotels',        image: '/images/commercial-waste.webp',     body: 'Hospitality businesses diverting food and packaging waste from landfill.' },
  { label: 'Markets',       image: '/images/market.webp',               body: 'Traders and market vendors managing organic and mixed waste responsibly.' },
  { label: 'Institutions',  image: '/images/institutional-waste.webp',  body: 'Offices, hospitals, and public facilities handling waste at scale.' },
  { label: 'Estates',       image: '/images/greenviewestate.webp',      body: 'Gated communities and apartment complexes with organised collection.' },
]

export default function WhoWeServe() {
  return (
    <section className="py-24 bg-[#061209]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
            Who we serve
          </p>
          <h2 className="text-4xl font-semibold text-white leading-snug max-w-xl">
            Every type of waste generator. One programme.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map(({ label, image, body }) => (
            <div key={label} className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-default">
              <Image
                src={image}
                alt={label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-white font-semibold text-lg mb-1">{label}</p>
                <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
