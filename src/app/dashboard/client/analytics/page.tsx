'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Card } from '@/components/ui/card'

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) {
    return (
      <main className="p-10 text-center text-red-600">
        Session not found — please log in again.
      </main>
    )
  }

  // 🧮 Fetch sustainability + project stats in parallel
  const [metrics, carbonProjects, consultancyProjects] = await Promise.all([
    prisma.sustainabilityMetric.findMany({ where: { clientId: userId } }),
    prisma.carbonProject.findMany({ where: { clientId: userId } }),
    prisma.consultancyProject.findMany({ where: { clientId: userId } }),
  ])

  // ♻️ Aggregate sustainability metrics
  const totalCO2Reduced = metrics.reduce((sum, m) => sum + (m.co2Reduced || 0), 0)
  const totalWasteDiverted = metrics.reduce((sum, m) => sum + (m.wasteDiverted || 0), 0)
  const totalCompost = metrics.reduce((sum, m) => sum + (m.compostProduced || 0), 0)
  const totalTrees = metrics.reduce((sum, m) => sum + (m.treesPlanted || 0), 0)

  const totalCarbonProjects = carbonProjects.length
  const totalConsultancy = consultancyProjects.length

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-green-700">
        Sustainability Analytics Overview
      </h1>

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="p-6 bg-green-50 border-green-100 rounded-xl">
          <p className="text-sm text-gray-700">CO₂ Reduced</p>
          <p className="text-3xl font-bold text-green-700">
            {totalCO2Reduced.toFixed(2)} tons
          </p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-100 rounded-xl">
          <p className="text-sm text-gray-700">Waste Diverted</p>
          <p className="text-3xl font-bold text-green-700">
            {totalWasteDiverted.toFixed(1)} kg
          </p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-100 rounded-xl">
          <p className="text-sm text-gray-700">Compost Produced</p>
          <p className="text-3xl font-bold text-green-700">
            {totalCompost.toFixed(1)} kg
          </p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-100 rounded-xl">
          <p className="text-sm text-gray-700">Trees Planted</p>
          <p className="text-3xl font-bold text-green-700">{totalTrees}</p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-100 rounded-xl">
          <p className="text-sm text-gray-700">Carbon Projects</p>
          <p className="text-3xl font-bold text-green-700">
            {totalCarbonProjects}
          </p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-100 rounded-xl">
          <p className="text-sm text-gray-700">Consultancy Projects</p>
          <p className="text-3xl font-bold text-green-700">
            {totalConsultancy}
          </p>
        </Card>
      </section>

      <p className="text-gray-600 text-sm mt-8">
        📊 These analytics summarize your sustainability performance across
        Supacare services — including CO₂ reduction, waste diversion, composting,
        and project engagements.
      </p>
    </main>
  )
}
