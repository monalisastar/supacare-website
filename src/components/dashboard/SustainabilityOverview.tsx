'use client'

import React from 'react'
import {
  Leaf,
  Recycle,
  Factory,
  Wrench,
  Briefcase,
  FileCheck,
  Users,
  Truck,
  DollarSign,
  Activity,
  Settings,
  ShoppingBag,
} from 'lucide-react'
import StatCard from './StatCard'

/**
 * 🌍 SustainabilityOverview (Global Component)
 * --------------------------------------------
 * Shared across all dashboards (Client, Consultant, Partner, Admin)
 * Displays sustainability, operational, and business metrics.
 *
 * All values default to zero to avoid crashes before real data loads.
 */

type Role = 'CLIENT' | 'CONSULTANT' | 'PARTNER' | 'ADMIN'

export default function SustainabilityOverview({
  role = 'CLIENT',
  metrics = {},
}: {
  role?: Role
  metrics?: Record<string, number>
}) {
  // 🧭 Default safe values (prevent undefined errors)
  const base = {
    co2Reduced: 0,
    wasteDiverted: 0,
    compostProduced: 0,
    activeMachines: 0,
    ordersMade: 0,
    deliveriesCompleted: 0,
    paymentsMade: 0,
    assignedProjects: 0,
    reportsSubmitted: 0,
    milestonesCompleted: 0,
    clientsServed: 0,
    pickupsCompleted: 0,
    totalWeightCollected: 0,
    machinesServiced: 0,
    compostSales: 0,
    totalUsers: 0,
    totalPayments: 0,
    totalProjects: 0,
    machinesOnline: 0,
    ...metrics,
  }

  let cards: { icon: React.ReactNode; title: string; value: string }[] = []

  switch (role) {
    /* ===============================
       🧍 CLIENT DASHBOARD VIEW
    =============================== */
    case 'CLIENT':
      cards = [
        // 🌿 Environmental Impact
        {
          icon: <Leaf className="text-green-600" />,
          title: 'CO₂ Reduced',
          value: `${base.co2Reduced.toFixed(1)} tons`,
        },
        {
          icon: <Recycle className="text-emerald-600" />,
          title: 'Waste Diverted',
          value: `${base.wasteDiverted.toFixed(1)} kg`,
        },
        {
          icon: <Factory className="text-lime-600" />,
          title: 'Compost Produced',
          value: `${base.compostProduced.toFixed(1)} kg`,
        },
        // ⚙️ Operations
        {
          icon: <Wrench className="text-green-700" />,
          title: 'Active Machines',
          value: base.activeMachines.toString(),
        },
        {
          icon: <Briefcase className="text-green-700" />,
          title: 'Consultancy Requests',
          value: base.assignedProjects.toString(),
        },
        // 🛒 Commerce & Transactions
        {
          icon: <ShoppingBag className="text-green-600" />,
          title: 'Orders Made',
          value: base.ordersMade.toString(),
        },
        {
          icon: <Truck className="text-emerald-600" />,
          title: 'Deliveries Received',
          value: base.deliveriesCompleted.toString(),
        },
        {
          icon: <DollarSign className="text-lime-600" />,
          title: 'Payments Made',
          value: base.paymentsMade.toString(),
        },
      ]
      break

    /* ===============================
       👩‍🔬 CONSULTANT DASHBOARD VIEW
    =============================== */
    case 'CONSULTANT':
      cards = [
        {
          icon: <Briefcase className="text-green-600" />,
          title: 'Assigned Projects',
          value: base.assignedProjects.toString(),
        },
        {
          icon: <FileCheck className="text-emerald-600" />,
          title: 'Reports Submitted',
          value: base.reportsSubmitted.toString(),
        },
        {
          icon: <Activity className="text-lime-600" />,
          title: 'Milestones Completed',
          value: base.milestonesCompleted.toString(),
        },
        {
          icon: <Users className="text-green-700" />,
          title: 'Clients Served',
          value: base.clientsServed.toString(),
        },
      ]
      break

    /* ===============================
       🚛 PARTNER DASHBOARD VIEW
    =============================== */
    case 'PARTNER':
      cards = [
        {
          icon: <Truck className="text-green-600" />,
          title: 'Pickups Completed',
          value: base.pickupsCompleted.toString(),
        },
        {
          icon: <Recycle className="text-emerald-600" />,
          title: 'Total Waste Collected',
          value: `${base.totalWeightCollected.toFixed(1)} kg`,
        },
        {
          icon: <Wrench className="text-lime-600" />,
          title: 'Machines Serviced',
          value: base.machinesServiced.toString(),
        },
        {
          icon: <DollarSign className="text-green-700" />,
          title: 'Compost Sales',
          value: base.compostSales.toString(),
        },
      ]
      break

    /* ===============================
       🧑‍💼 ADMIN DASHBOARD VIEW
    =============================== */
    case 'ADMIN':
      cards = [
        {
          icon: <Users className="text-green-600" />,
          title: 'Total Users',
          value: base.totalUsers.toString(),
        },
        {
          icon: <DollarSign className="text-emerald-600" />,
          title: 'Total Payments',
          value: base.totalPayments.toString(),
        },
        {
          icon: <Briefcase className="text-lime-600" />,
          title: 'Active Projects',
          value: base.totalProjects.toString(),
        },
        {
          icon: <Settings className="text-green-700" />,
          title: 'Machines Online',
          value: base.machinesOnline.toString(),
        },
      ]
      break
  }

  return (
    <section className="space-y-4">
      {/* Dynamic section title */}
      <h2 className="text-2xl font-semibold text-green-700">
        {role === 'ADMIN'
          ? 'Platform Overview'
          : role === 'CONSULTANT'
          ? 'Consultancy Performance'
          : role === 'PARTNER'
          ? 'Partner Operations'
          : 'My Sustainability Overview'}
      </h2>

      {/* Responsive grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <StatCard key={i} icon={c.icon} title={c.title} value={c.value} />
        ))}
      </div>
    </section>
  )
}
