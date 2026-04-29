import Image from 'next/image'

export default function ProjectImpact() {
  return (
    <section className="py-24 bg-[#061209]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
              Community impact
            </p>
            <h2 className="text-4xl font-semibold text-white leading-snug mb-6">
              Better for the people doing the work.
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
              The collectors in our programme earn real income from waste that
              used to be thrown away. Schools gain a sense of environmental
              ownership. Families breathe cleaner air.
            </p>
            <p className="text-white/50 leading-relaxed">
              As the project grows, so does its reach. More routes, more
              collectors, more communities pulling waste out of the environment
              and putting value back in.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <Image
              src="/images/communityfirst.webp"
              alt="Community engagement"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Wide team banner */}
        <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '21/7' }}>
          <Image
            src="/images/team-supacare.webp"
            alt="The Supacare team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061209]/85 via-[#061209]/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 lg:px-16">
            <div>
              <p className="text-white font-semibold text-2xl mb-2">On the ground every day.</p>
              <p className="text-white/55 text-sm max-w-xs leading-relaxed">
                Our team operates across every county we serve, building relationships one community at a time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
