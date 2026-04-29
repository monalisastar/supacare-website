import Image from 'next/image'

export default function AboutHero() {
  return (
    <section className="relative min-h-[75vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero.webp"
          alt="Supacare team in the field"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061209] via-[#061209]/60 to-[#061209]/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-16">
        <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
          About Supacare
        </p>
        <h1 className="text-4xl lg:text-6xl font-semibold text-white leading-tight max-w-3xl mb-5 tracking-tight">
          A Kenyan company built around one problem.
        </h1>
        <p className="text-white/55 text-lg max-w-xl leading-relaxed">
          Too much waste ends up burned or dumped. We are building the
          partnerships and systems to change that — and turning the result
          into verified climate impact.
        </p>
      </div>
    </section>
  )
}
