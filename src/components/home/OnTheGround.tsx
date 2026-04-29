import Image from 'next/image'

const CAPTIONS = [
  {
    title: 'Waste sorting',
    body:  'Trained field teams sort and weigh collected waste at designated points along each collection route.',
  },
  {
    title: 'Data collection',
    body:  'Field agents record participant-level data tied to every collection, building a rigorous audit trail.',
  },
  {
    title: 'Processing',
    body:  'Organic waste goes to composting; recyclables are directed to accredited facilities. Nothing is wasted.',
  },
]

export default function OnTheGround() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-3">
            On the ground
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 max-w-lg leading-snug">
            Real operations, real communities
          </h2>
        </div>

        {/* Asymmetric photo grid */}
        <div className="grid grid-cols-12 grid-rows-2 gap-4" style={{ height: 560 }}>

          {/* Large left */}
          <div className="col-span-7 row-span-2 relative rounded-2xl overflow-hidden">
            <Image
              src="/images/waste-collection/workerssorting-waste.webp"
              alt="Supacare workers sorting collected waste"
              fill
              className="object-cover"
            />
          </div>

          {/* Top right */}
          <div className="col-span-5 row-span-1 relative rounded-2xl overflow-hidden">
            <Image
              src="/images/supacareagentwithtablet.webp"
              alt="Supacare field agent recording data"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom right */}
          <div className="col-span-5 row-span-1 relative rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80&fit=crop"
              alt="Waste composting and processing"
              fill
              className="object-cover"
            />
          </div>

        </div>

        {/* Captions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {CAPTIONS.map(c => (
            <div key={c.title}>
              <p className="font-semibold text-gray-800 mb-2">{c.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
