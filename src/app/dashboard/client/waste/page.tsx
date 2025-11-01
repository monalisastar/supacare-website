'use server'

import WasteSummary from './components/WasteSummary'
import PickupSchedule from './components/PickupSchedule'
import WasteAnalytics from './components/WasteAnalytics'
import CompostOrders from './components/CompostOrders'
import ImpactTracker from './components/ImpactTracker'
import WasteReports from './components/WasteReports'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function WastePage() {
  const session = await getServerSession(authOptions)
  const clientId = session?.user?.id

  // 🧩 Fetch data concurrently
  const [pickups, compostOrders, sustainabilityMetric] = clientId
    ? await Promise.all([
        prisma.wastePickup.findMany({ where: { clientId } }),
        prisma.compostSale.findMany({ where: { clientId } }),
        prisma.sustainabilityMetric.findFirst({ where: { clientId } }).catch(() => null),
      ])
    : [[], [], null]

  // 🧮 Normalize pickups into `Pickup[]`
  const normalizedPickups = pickups.map((p) => ({
    id: p.id,
    type: p.wasteType,
    weight: p.weightKg,
    pickupDate: p.date.toISOString(),
    status: 'COMPLETED', // or dynamic if you track it
  }))

  // 🧮 Normalize compost sales into `Order[]`
  const normalizedOrders = compostOrders.map((c) => ({
    id: c.id,
    quantityKg: c.volumeKg,
    status: 'DELIVERED', // or PENDING/COMPLETED dynamically
    deliveryDate: c.date.toISOString(),
    createdAt: c.date.toISOString(),
  }))

  const safeStats = {
    totalCollected: Number(sustainabilityMetric?.wasteDiverted ?? 0),
    wasteDiverted: Number(sustainabilityMetric?.wasteDiverted ?? 0),
    compostable: Number(sustainabilityMetric?.compostProduced ?? 0),
    recyclable: 0,
    residual: 0,
    co2eAvoided: Number(sustainabilityMetric?.co2Reduced ?? 0),
  }

  return (
    <main className="space-y-10 p-6">
      <WasteSummary stats={safeStats} />
      <PickupSchedule pickups={normalizedPickups} />
      <WasteAnalytics pickups={normalizedPickups} />
      <CompostOrders orders={normalizedOrders} />
      <ImpactTracker stats={safeStats} />
      {clientId && <WasteReports userId={clientId} />}
    </main>
  )
}
