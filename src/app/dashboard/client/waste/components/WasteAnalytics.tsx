'use client'

import React, { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'
import { BarChart3, PieChart as PieIcon } from 'lucide-react'
import { format } from 'date-fns'

type Pickup = {
  id: string
  type: string
  weight: number
  pickupDate: string
  status: string
}

const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0']

export default function WasteAnalytics({ pickups }: { pickups: Pickup[] }) {
  // 🧮 Calculate total weight per type for pie chart
  const compositionData = useMemo(() => {
    const result: Record<string, number> = {}
    pickups.forEach((p) => {
      result[p.type] = (result[p.type] || 0) + p.weight
    })
    return Object.entries(result).map(([name, value]) => ({ name, value }))
  }, [pickups])

  // 📈 Monthly waste trend (sum by month)
  const monthlyTrend = useMemo(() => {
    const result: Record<string, number> = {}
    pickups.forEach((p) => {
      const month = format(new Date(p.pickupDate), 'MMM yyyy')
      result[month] = (result[month] || 0) + p.weight
    })
    return Object.entries(result).map(([month, value]) => ({ month, value }))
  }, [pickups])

  const totalWaste = pickups.reduce((sum, p) => sum + p.weight, 0)
  const diversionRate =
    totalWaste > 0
      ? (
          (compositionData.find((d) => d.name.toLowerCase().includes('compost'))?.value || 0) /
          totalWaste
        ).toFixed(2)
      : '0'

  return (
    <section className="space-y-8">
      <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-green-600" /> Waste Analytics
      </h2>

      {/* 🔹 Waste Composition (Pie Chart) */}
      <Card className="p-6 border-2 border-green-100 shadow-sm">
        <h3 className="font-medium text-green-700 mb-4 flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-green-600" /> Waste Composition
        </h3>
        {compositionData.length > 0 ? (
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={compositionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {compositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500 italic">No data available for composition yet.</p>
        )}
      </Card>

      {/* 🔹 Monthly Waste Trend (Line Chart) */}
      <Card className="p-6 border-2 border-green-100 shadow-sm">
        <h3 className="font-medium text-green-700 mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-green-600" /> Monthly Waste Trends
        </h3>
        {monthlyTrend.length > 0 ? (
          <div className="w-full h-72">
            <ResponsiveContainer>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500 italic">No pickup data available for trends yet.</p>
        )}
      </Card>

      {/* 💡 Insight Box */}
      <Card className="p-6 border border-green-100 bg-green-50 rounded-xl text-green-800">
        <p className="font-medium">
          💡 You’ve generated a total of <strong>{totalWaste.toFixed(2)} kg</strong> of waste so
          far, with an estimated <strong>{parseFloat(diversionRate) * 100 || 0}%</strong> diverted
          towards composting and recycling.
        </p>
      </Card>
    </section>
  )
}
