'use client'

import React from 'react'
import {
  Wrench,
  Truck,
  Recycle,
  PackageCheck,
  ClipboardCheck,
  MapPin,
  Activity,
  Settings,
  Briefcase,
  DollarSign,
  FileCheck,
  FileText,
} from 'lucide-react'
import StatCard from './StatCard'

/**
 * ⚙️ OperationsSnapshot (Global)
 * ------------------------------
 * Displays real-time operational metrics per role.
 * Complements SustainabilityOverview and ProjectsOverview.
 * Works for CLIENT, CONSULTANT, PARTNER, and ADMIN dashboards.
 */

type Role = 'CLIENT' | 'CONSULTANT' | 'PARTNER' | 'ADMIN'

interface OperationsSnapshotProps {
  role?: Role
  data?: Record<string, number>
}

interface StatCardData {
  icon: React.ReactNode
  title: string
  value: string
}

export default function OperationsSnapshot({
  role = 'CLIENT',
  data = {},
}: OperationsSnapshotProps) {
  // ✅ Safe defaults to prevent undefined issues
  const base = {
    pickupsCompleted: 0,
    compostOrders: 0,
    deliveriesReceived: 0,
    machinesActive: 0,
    serviceRequests: 0,
    milestonesActive: 0,
    reportsDue: 0,
    reportsSubmitted: 0,
    binsCollected: 0,
    routesCovered: 0,
    totalRevenue: 0,
    ...data,
  }

  const formatCurrency = (num: number) => `$${num.toFixed(2)}`

  // ✅ Role-based operational views
  const roleCards: Record<Role, StatCardData[]> = {
    /* ===============================
       🧍 CLIENT DASHBOARD VIEW
    =============================== */
    CLIENT: [
      {
        icon: <Truck className="text-green-700" />,
        title: 'Waste Pickups Completed',
        value: base.pickupsCompleted.toString(),
      },
      {
        icon: <Recycle className="text-emerald-700" />,
        title: 'Compost Orders Made',
        value: base.compostOrders.toString(),
      },
      {
        icon: <PackageCheck className="text-lime-700" />,
        title: 'Deliveries Received',
        value: base.deliveriesReceived.toString(),
      },
      {
        icon: <Wrench className="text-green-700" />,
        title: 'Machines Active',
        value: base.machinesActive.toString(),
      },
    ],

    /* ===============================
       👩‍🔬 CONSULTANT DASHBOARD VIEW
    =============================== */
    CONSULTANT: [
      {
        icon: <ClipboardCheck className="text-green-700" />,
        title: 'Active Milestones',
        value: base.milestonesActive.toString(),
      },
      {
        icon: <FileText className="text-emerald-700" />,
        title: 'Reports Pending',
        value: base.reportsDue.toString(),
      },
      {
        icon: <FileCheck className="text-lime-700" />,
        title: 'Reports Submitted',
        value: base.reportsSubmitted.toString(),
      },
      {
        icon: <Briefcase className="text-green-700" />,
        title: 'Active Service Requests',
        value: base.serviceRequests.toString(),
      },
    ],

    /* ===============================
       🚛 PARTNER DASHBOARD VIEW
    =============================== */
    PARTNER: [
      {
        icon: <Truck className="text-green-700" />,
        title: 'Bins Collected',
        value: base.binsCollected.toString(),
      },
      {
        icon: <MapPin className="text-emerald-700" />,
        title: 'Routes Covered',
        value: base.routesCovered.toString(),
      },
      {
        icon: <Wrench className="text-lime-700" />,
        title: 'Machines Serviced',
        value: base.machinesActive.toString(),
      },
      {
        icon: <DollarSign className="text-green-700" />,
        title: 'Revenue Generated',
        value: formatCurrency(base.totalRevenue),
      },
    ],

    /* ===============================
       🧑‍💼 ADMIN DASHBOARD VIEW
    =============================== */
    ADMIN: [
      {
        icon: <Settings className="text-green-700" />,
        title: 'Machines Online',
        value: base.machinesActive.toString(),
      },
      {
        icon: <Truck className="text-emerald-700" />,
        title: 'Active Routes',
        value: base.routesCovered.toString(),
      },
      {
        icon: <Activity className="text-lime-700" />,
        title: 'Service Requests Logged',
        value: base.serviceRequests.toString(),
      },
      {
        icon: <DollarSign className="text-green-700" />,
        title: 'Total Revenue',
        value: formatCurrency(base.totalRevenue),
      },
    ],
  }

  // ✅ Section titles per role
  const sectionTitles: Record<Role, string> = {
    CLIENT: 'My Waste & Operations',
    CONSULTANT: 'Active Consultancy Operations',
    PARTNER: 'Partner Logistics & Performance',
    ADMIN: 'Operational Overview',
  }

  const cards = roleCards[role]

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-green-700">
        {sectionTitles[role]}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <StatCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>
    </section>
  )
}
