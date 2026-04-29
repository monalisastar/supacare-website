import Image from 'next/image'

const counties = ['Nairobi', 'Kiambu', 'Kirinyaga', 'Eldoret']

export default function WhereWeWork() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div>
          <p className="text-xs uppercase tracking-widest text-green-700 font-medium mb-4">
            Where we work
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 leading-snug mb-6">
            Active across Kenya. Growing.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            We operate in multiple counties across Kenya, working with urban and
            peri-urban communities where waste infrastructure gaps are largest.
            Each new county adds routes, partners, and tonnes to the programme.
          </p>
          <div className="flex flex-wrap gap-3">
            {counties.map((county) => (
              <span
                key={county}
                className="px-4 py-2 rounded-full border border-green-200 bg-green-50 text-green-800 text-sm font-medium"
              >
                {county}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium">
              + more expanding
            </span>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-50 flex items-center justify-center p-8">
          <Image
            src="/images/kenya-map.webp"
            alt="Kenya map showing Supacare operations"
            fill
            className="object-contain p-6"
          />
        </div>

      </div>
    </section>
  )
}
