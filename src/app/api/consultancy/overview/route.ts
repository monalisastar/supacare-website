import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";

import type { Milestone, Project, User } from "@prisma/client"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Role-based filters
    let projectWhere: Record<string, any> = {}
    let paymentWhere: Record<string, any> = { serviceType: "CONSULTANCY", status: "SUCCEEDED" }

    if (user.role === "CLIENT") {
      projectWhere.clientId = user.id
      paymentWhere.userId = user.id
    } else if (user.role === "CONSULTANT") {
      projectWhere.consultantId = user.id
      paymentWhere.userId = user.id
    }

    const [active, completed, newProjects] = await Promise.all([
      prisma.project.count({ where: { ...projectWhere, status: "ACTIVE" } }),
      prisma.project.count({ where: { ...projectWhere, status: "COMPLETED" } }),
      prisma.project.count({ where: { ...projectWhere, status: "NEW" } }),
    ])

    const totalPayments = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: paymentWhere,
    })

    let clients = 0
    let consultants = 0
    if (user.role === "ADMIN") {
      clients = await prisma.user.count({ where: { role: "CLIENT" } })
      consultants = await prisma.user.count({ where: { role: "CONSULTANT" } })
    }

    const recentProjects = await prisma.project.findMany({
      where: projectWhere,
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { milestones: true, client: true, consultant: true },
    })

    // ✅ Strong typing with Project + Milestone + User
    const projectsWithProgress = recentProjects.map(
      (p: Project & { milestones: Milestone[]; client: User; consultant: User | null }) => {
        const total = p.milestones.length
        const completed = p.milestones.filter((m: Milestone) => m.status === "COMPLETED").length

        return {
          id: p.id,
          title: p.title,
          status: p.status,
          client: p.client.name,
          consultant: p.consultant?.name || null,
          progress: total > 0 ? Math.round((completed / total) * 100) : 0,
        }
      }
    )

    return NextResponse.json({
      stats: {
        projects: { active, completed, new: newProjects },
        payments: { total: totalPayments._sum.amount ?? 0 },
        users: { clients, consultants },
      },
      recentProjects: projectsWithProgress,
      role: user.role,
    })
  } catch (error) {
    console.error("Consultancy Overview API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch consultancy overview" },
      { status: 500 }
    )
  }
}
