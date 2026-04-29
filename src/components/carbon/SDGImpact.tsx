import Image from 'next/image'

const sdgs = [
  { num: 'SDG 3',  title: 'Good Health',          body: 'Less open burning means cleaner air for families living near waste sites.',         color: 'border-green-500' },
  { num: 'SDG 11', title: 'Sustainable Cities',   body: 'Organised waste systems make urban and peri-urban areas more liveable.',            color: 'border-blue-500'  },
  { num: 'SDG 13', title: 'Climate Action',        body: 'Every verified credit is a tonne of emissions that never reached the atmosphere.',  color: 'border-yellow-500' },
  { num: 'SDG 15', title: 'Life on Land',          body: 'Keeping waste off land protects soil, water, and local ecosystems.',               color: 'border-emerald-500' },
]

export default function SDGImpact() {
  return (
    <section className="py-24 bg-[#061209]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-xs uppercase tracking-widest text-green-400 font-medium mb-4">
              Sustainable Development Goals
            </p>
            <h2 className="text-4xl font-semibold text-white leading-snug mb-6">
              One project. Four SDGs.
            </h2>
            <p className="text-white/50 leading-relaxed mb-10">
              Supacare credits don't just offset emissions — they fund waste
              infrastructure that benefits communities directly and contributes
              to Kenya's national climate commitments.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sdgs.map(({ num, title, body, color }) => (
                <div
                  key={num}
                  className={`p-5 rounded-2xl bg-white/5 border border-white/10 border-l-4 ${color} flex flex-col gap-2`}
                >
                  <span className="text-green-400 text-xs font-bold tracking-wider">{num}</span>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <Image
              src="/images/carbon-advisory/mrv-support.webp"
              alt="MRV and verification process"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
