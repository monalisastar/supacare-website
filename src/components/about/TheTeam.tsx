import Image from 'next/image'

const team = [
  {
    name: 'Brian',
    role: 'CEO',
    image: '/images/brian.webp',
  },
  {
    name: 'Virginia Njata',
    role: 'Senior Environmental Consultant',
    image: '/images/virginia.webp',
  },
  {
    name: 'Trizer',
    role: 'Environmental Associate & Enumerator',
    image: '/images/trizer.webp',
  },
]

export default function TheTeam() {
  return (
    <section className="py-24 bg-[#061209]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
            The team
          </p>
          <h2 className="text-4xl font-semibold text-white leading-snug max-w-xl">
            On the ground every day.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {team.map(({ name, role, image }) => (
            <div key={name} className="group">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold">{name}</p>
                  <p className="text-white/55 text-sm">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full team banner */}
        <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '21/7' }}>
          <Image
            src="/images/team-supacare.webp"
            alt="The full Supacare team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061209]/80 via-[#061209]/30 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 lg:px-16">
            <div>
              <p className="text-white font-semibold text-2xl mb-2">
                Built by people who care about Kenya.
              </p>
              <p className="text-white/55 text-sm max-w-xs leading-relaxed">
                Our team spans field operations, data, partnerships, and climate science.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
