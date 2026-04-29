import Image from 'next/image'

export default function ProjectHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/workerssorting-waste.webp"
          alt="Supacare project operations"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061209] via-[#061209]/60 to-[#061209]/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-16">
        <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
          The Project
        </p>
        <h1 className="text-4xl lg:text-6xl font-semibold text-white leading-tight max-w-2xl mb-5 tracking-tight">
          How Supacare works.
        </h1>
        <p className="text-white/55 text-lg max-w-xl leading-relaxed">
          We bring together communities, collection partners, and climate
          finance to keep Kenya's waste out of dumpsites and burning piles.
        </p>
      </div>
    </section>
  )
}
