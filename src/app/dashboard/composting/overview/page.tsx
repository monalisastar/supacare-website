'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CompostingLayout from '../CompostingLayout'
import { FaArrowLeft, FaSeedling, FaIndustry, FaShoppingCart, FaChalkboardTeacher, FaTractor } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function OverviewPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  // Fetch counts for stats cards
  const { data: machines } = useSWR('/api/composting/machines', fetcher)
  const { data: processes } = useSWR('/api/composting/processes', fetcher)
  const { data: sales } = useSWR('/api/composting/sales', fetcher)
  const { data: trainings } = useSWR('/api/composting/training', fetcher)
  const { data: agriculture } = useSWR('/api/composting/agriculture', fetcher)

  // Fetch recent activity (latest 3 per category)
  const { data: recentMachines } = useSWR('/api/composting/machines?limit=3', fetcher)
  const { data: recentSales } = useSWR('/api/composting/sales?limit=3', fetcher)
  const { data: recentTrainings } = useSWR('/api/composting/training?limit=3', fetcher)

  return (
    <CompostingLayout>
      {/* Header with back button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FaArrowLeft /> Back
        </button>
        <h1 className="text-2xl font-semibold">Composting Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={<FaSeedling />} label="Agriculture" count={agriculture?.length || 0} />
        <StatCard icon={<FaIndustry />} label="Machines" count={machines?.length || 0} />
        <StatCard icon={<FaShoppingCart />} label="Sales" count={sales?.length || 0} />
        <StatCard icon={<FaChalkboardTeacher />} label="Trainings" count={trainings?.length || 0} />
        <StatCard icon={<FaTractor />} label="Processes" count={processes?.length || 0} />
      </div>

      {/* Recent Activity */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {isAdmin ? (
            <RecentActivityAdmin
              machines={recentMachines}
              sales={recentSales}
              trainings={recentTrainings}
            />
          ) : (
            <RecentActivityClient
              sales={recentSales}
              trainings={recentTrainings}
            />
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <QuickAction label="Machines" icon={<FaIndustry />} path="/dashboard/composting/machines" />
          <QuickAction label="Processes" icon={<FaTractor />} path="/dashboard/composting/processes" />
          <QuickAction label="Sales" icon={<FaShoppingCart />} path="/dashboard/composting/sales" />
          <QuickAction label="Training" icon={<FaChalkboardTeacher />} path="/dashboard/composting/training" />
          <QuickAction label="Agriculture" icon={<FaSeedling />} path="/dashboard/composting/agriculture" />
        </div>
      </section>
    </CompostingLayout>
  )
}

// ── StatCard ──
function StatCard({ icon, label, count }: { icon: React.ReactNode; label: string; count: number }) {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center text-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-3xl text-green-600 mb-2">{icon}</div>
      <div className="font-semibold text-gray-700">{label}</div>
      <div className="text-xl font-bold">{count}</div>
    </motion.div>
  )
}

// ── Recent Activity for Admin ──
function RecentActivityAdmin({ machines, sales, trainings }: { machines?: any[]; sales?: any[]; trainings?: any[] }) {
  return (
    <ul className="space-y-1">
      {machines?.map((m, i) => (
        <li key={`m-${i}`} className="p-2 bg-gray-50 rounded shadow-sm">Machine: {m.name}</li>
      ))}
      {sales?.map((s, i) => (
        <li key={`s-${i}`} className="p-2 bg-gray-50 rounded shadow-sm">Sale: #{s.id}</li>
      ))}
      {trainings?.map((t, i) => (
        <li key={`t-${i}`} className="p-2 bg-gray-50 rounded shadow-sm">Training: {t.title}</li>
      ))}
    </ul>
  )
}

// ── Recent Activity for Client ──
function RecentActivityClient({ sales, trainings }: { sales?: any[]; trainings?: any[] }) {
  return (
    <ul className="space-y-1">
      {sales?.map((s, i) => (
        <li key={`s-${i}`} className="p-2 bg-gray-50 rounded shadow-sm">Your Sale: #{s.id}</li>
      ))}
      {trainings?.map((t, i) => (
        <li key={`t-${i}`} className="p-2 bg-gray-50 rounded shadow-sm">Joined Training: {t.title}</li>
      ))}
    </ul>
  )
}

// ── QuickAction Button ──
function QuickAction({ label, icon, path }: { label: string; icon: React.ReactNode; path: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(path)}
      className="flex flex-col items-center justify-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
    >
      <div className="text-2xl">{icon}</div>
      <div className="font-semibold">{label}</div>
    </button>
  )
}
