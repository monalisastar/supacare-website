import { Leaf, Globe2 } from 'lucide-react'

const SDGs = [
  { num: '3',  label: 'Good health'           },
  { num: '11', label: 'Sustainable cities'     },
  { num: '12', label: 'Responsible consumption'},
  { num: '13', label: 'Climate action'         },
  { num: '15', label: 'Life on land'           },
]

export default function CredentialBar() {
  return (
    <section className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-5">

        <div className="flex items-center gap-3">
          <Leaf className="w-4 h-4 text-green-700" />
          <span className="text-sm font-medium text-gray-700">Gold Standard</span>
          <span className="text-gray-300">·</span>
          <Globe2 className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">Kenya</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
            Contributing to SDGs
          </span>
          {SDGs.map(s => (
            <div
              key={s.num}
              className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full"
            >
              <span className="text-[11px] font-bold text-green-700">{s.num}</span>
              <span className="text-[11px] text-green-600">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
