'use client'

import React from 'react'
import {
  Briefcase,
  FileCheck,
  ClipboardList,
  Users,
  DollarSign,
  BarChart3,
  Target,
  Wrench,
  Leaf,
  CheckCircle2,
  FileText,
  Award, // ✅ Replaces FileCertificate
} from 'lucide-react'
import StatCard from './StatCard'

/**
 * 💼 ProjectsOverview (Global)
 * ----------------------------
 * Displays consultancy or project-related KPIs per user role.
 * - Safe defaults (0)
 * - Role-aware for CLIENT, CONSULTANT, PARTNER, ADMIN
 */

type Role = 'CLIENT' | 'CONSULTANT' | 'PARTNER' | 'ADMIN'

interface ProjectsOverviewProps {
  role?: Role
  data?: Record<string, number>
}

interface StatCardData {
  icon: React.ReactNode
  title: string
  value: string
}

export default function ProjectsOverview({
  role = 'CLIENT',
  data = {},
}: ProjectsOverviewProps) {
  const base = {
    consultancyRequests: 0,
    consultancyInProgress: 0,
    reportsDelivered: 0,
    certificatesIssued: 0,
    activeClients: 0,
    totalRevenue: 0,
    projectMilestones: 0,
    totalProjects: 0,
    ...data,
  }

  const formatCurrency = (num: number) => `$${num.toFixed(2)}`

  const roleCards: Record<Role, StatCardData[]> = {
    /* ===============================
       🧍 CLIENT DASHBOARD VIEW
    =============================== */
    CLIENT: [
      {
        icon: <Briefcase className="text-green-700" />,
        title: 'Consultancy Requests Made',
        value: base.consultancyRequests.toString(),
      },
      {
        icon: <ClipboardList className="text-emerald-700" />,
        title: 'Requests In Progress',
        value: base.consultancyInProgress.toString(),
      },
      {
        icon: <FileCheck className="text-lime-700" />,
        title: 'Reports Delivered',
        value: base.reportsDelivered.toString(),
      },
      {
        icon: <Award className="text-green-700" />, // ✅ changed from FileCertificate
        title: 'Certificates Issued',
        value: base.certificatesIssued.toString(),
      },
    ],

    /* ===============================
       👩‍🔬 CONSULTANT DASHBOARD VIEW
    =============================== */
    CONSULTANT: [
      {
        icon: <ClipboardList className="text-green-700" />,
        title: 'Projects Assigned',
        value: base.consultancyInProgress.toString(),
      },
      {
        icon: <Target className="text-emerald-700" />,
        title: 'Milestones Completed',
        value: base.projectMilestones.toString(),
      },
      {
        icon: <FileText className="text-lime-700" />,
        title: 'Reports Submitted',
        value: base.reportsDelivered.toString(),
      },
      {
        icon: <Users className="text-green-700" />,
        title: 'Clients Served',
        value: base.activeClients.toString(),
      },
    ],

    /* ===============================
       🚛 PARTNER DASHBOARD VIEW
    =============================== */
    PARTNER: [
      {
        icon: <Wrench className="text-green-700" />,
        title: 'Projects Supported',
        value: base.totalProjects.toString(),
      },
      {
        icon: <Leaf className="text-emerald-700" />,
        title: 'Carbon Operations Assisted',
        value: base.projectMilestones.toString(),
      },
      {
        icon: <DollarSign className="text-lime-700" />,
        title: 'Revenue from Projects',
        value: formatCurrency(base.totalRevenue),
      },
    ],

    /* ===============================
       🧑‍💼 ADMIN DASHBOARD VIEW
    =============================== */
    ADMIN: [
      {
        icon: <Briefcase className="text-green-700" />,
        title: 'Total Consultancy Projects',
        value: base.totalProjects.toString(),
      },
      {
        icon: <Users className="text-emerald-700" />,
        title: 'Active Consultants',
        value: base.activeClients.toString(),
      },
      {
        icon: <BarChart3 className="text-lime-700" />,
        title: 'Projects In Progress',
        value: base.consultancyInProgress.toString(),
      },
      {
        icon: <CheckCircle2 className="text-green-700" />,
        title: 'Reports & Certificates Issued',
        value: (base.reportsDelivered + base.certificatesIssued).toString(),
      },
    ],
  }

  const sectionTitles: Record<Role, string> = {
    CLIENT: 'My Consultancy Services',
    CONSULTANT: 'My Project Assignments',
    PARTNER: 'Project Support & Revenue',
    ADMIN: 'Consultancy Projects Overview',
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
