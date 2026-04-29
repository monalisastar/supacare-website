const values = [
  {
    title: 'Community first',
    body: 'The people in our programme — collectors, households, estate managers — are partners, not just participants. The programme works for them.',
  },
  {
    title: 'Rigorous measurement',
    body: 'We do not estimate. Every tonne is weighed, logged, and audited. That rigour is what makes the carbon credits worth anything.',
  },
  {
    title: 'Transparency',
    body: 'Our data sits on a public registry. Partners, buyers, and communities can see exactly what has been diverted and verified.',
  },
  {
    title: 'Long-term thinking',
    body: 'Quick wins do not fix broken waste systems. We are building infrastructure and habits that last — one county at a time.',
  },
]

export default function OurValues() {
  return (
    <section className="py-24 bg-[#061209]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-16 max-w-xl">
          <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
            What drives us
          </p>
          <h2 className="text-4xl font-semibold text-white leading-snug">
            The values we operate by.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map(({ title, body }) => (
            <div
              key={title}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3"
            >
              <div className="w-8 h-0.5 bg-green-500" />
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
