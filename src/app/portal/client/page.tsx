import { createClient } from '@/lib/supabase/server'
import { Leaf, Award, BarChart3, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default async function ClientDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Clients see project-wide totals (they're the offset buyers / project stakeholders)
  const [
    { count: totalSurveys },
    { count: approvedSurveys },
    { data: creditRows },
    { data: periods },
  ] = await Promise.all([
    supabase.from('surveys').select('*', { count: 'exact', head: true }),
    supabase.from('surveys').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('surveys').select('carbon_credits_kg').eq('status', 'approved').not('carbon_credits_kg', 'is', null),
    supabase.from('monitoring_periods').select('label, is_active').order('start_date', { ascending: false }).limit(3),
  ])

  const totalKg = (creditRows ?? []).reduce((sum: number, r: any) => sum + (r.carbon_credits_kg ?? 0), 0)
  const totalTonnes = (totalKg / 1000).toFixed(3)

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Impact</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Gold Standard GS4GG Kenya — Waste Management Carbon Project
        </p>
      </div>

      {/* Impact KPIs */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Award,        label: 'Carbon Credits Issued',  value: `${totalTonnes} tCO₂e`,    color: 'green' },
          { icon: CheckCircle2, label: 'Surveys Approved',       value: approvedSurveys ?? 0,       color: 'blue'  },
          { icon: BarChart3,    label: 'Total Surveys Collected',value: totalSurveys ?? 0,          color: 'purple'},
          { icon: Leaf,         label: 'In Kilograms CO₂',       value: `${totalKg.toFixed(1)} kg`, color: 'amber' },
        ].map(({ icon: Icon, label, value, color }) => {
          const palette: Record<string, string> = {
            green: 'bg-green-50 text-green-600', blue: 'bg-blue-50 text-blue-600',
            purple: 'bg-purple-50 text-purple-600', amber: 'bg-amber-50 text-amber-600',
          }
          return (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${palette[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Project overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">About This Project</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Supacare Solutions is implementing a Gold Standard–certified waste management programme
          in Kenya (GS4GG methodology). Households participate in improved solid waste collection,
          reducing open burning and landfill methane. Each approved household survey generates
          verified carbon credits under the Gold Standard for the Global Goals framework.
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {(periods ?? []).map((p: any) => (
            <span
              key={p.label}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {p.label}{p.is_active ? ' ·  Active' : ''}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/portal/client/credits"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
        >
          <Award className="w-4 h-4" /> View Carbon Credits
        </Link>
        <Link
          href="/portal/client/reports"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <BarChart3 className="w-4 h-4" /> Download Reports
        </Link>
      </div>
    </div>
  )
}
