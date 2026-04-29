import Image from 'next/image'

export default function Community() {
  return (
    <section className="py-24 bg-[#061209]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
              Community first
            </p>
            <h2 className="text-4xl font-semibold text-white leading-snug mb-6">
              Cleaner neighbourhoods. Better livelihoods.
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
              The people collecting waste in our programme earn income from it.
              Schools learn why it matters. Families breathe cleaner air.
            </p>
            <p className="text-white/50 leading-relaxed">
              As the project grows, the benefit grows with it. More routes,
              more collectors, more communities.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <Image
              src="/images/communityfirst.webp"
              alt="Community engagement and partnership"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '21/7' }}>
          <Image
            src="/images/team-supacare.webp"
            alt="The Supacare team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061209]/80 via-[#061209]/30 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 lg:px-16">
            <div>
              <p className="text-white font-semibold text-2xl mb-2">The Supacare team</p>
              <p className="text-white/55 text-sm max-w-xs leading-relaxed">
                On the ground every day, in every county we serve.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
