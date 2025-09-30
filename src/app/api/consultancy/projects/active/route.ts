import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import type { Project, Milestone, User } from "@prisma/client"

export async function GET(req: Request) {
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

    // 🔹 Query params
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "10", 10)
    const q = searchParams.get("q") || ""
    const sort = searchParams.get("sort") || "createdAt"
    const order = (searchParams.get("order") || "desc") as "asc" | "desc"

    const skip = (page - 1) * limit

    // 🔹 Role-based filter
    let where: Record<string, any> = { status: "ACTIVE" }

    if (user.role === "CLIENT") {
      where.clientId = user.id
    } else if (user.role === "CONSULTANT") {
      where.consultantId = user.id
    }
    // ADMIN → sees all ACTIVE projects

    // 🔹 Search filter
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ]
    }

    // 🔹 DB-level sorting (only for native fields)
    const validSortFields = ["title", "createdAt", "updatedAt"]
    const dbOrderBy =
      validSortFields.includes(sort) ? { [sort]: order } : { createdAt: "desc" }

    // 🔹 Fetch projects + count
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: dbOrderBy,
        include: {
          client: true,
          consultant: true,
          milestones: true,
        },
      }),
      prisma.project.count({ where }),
    ])

    // 🔹 Add milestone progress
    let projectsWithProgress = projects.map(
      (p: Project & { milestones: Milestone[]; client: User; consultant: User | null }) => {
        const totalMilestones = p.milestones.length
        const completed = p.milestones.filter((m) => m.status === "COMPLETED").length

        return {
          id: p.id,
          title: p.title,
          description: p.description,
          client: { id: p.client.id, name: p.client.name, email: p.client.email },
          consultant: p.consultant
            ? { id: p.consultant.id, name: p.consultant.name, email: p.consultant.email }
            : null,
          status: p.status,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          progress: totalMilestones > 0 ? Math.round((completed / totalMilestones) * 100) : 0,
        }
      }
    )

    // 🔹 In-memory sorting if sort=progress
    if (sort === "progress") {
      projectsWithProgress = projectsWithProgress.sort((a, b) => {
        return order === "asc" ? a.progress - b.progress : b.progress - a.progress
      })
    }

    return NextResponse.json({
      projects: projectsWithProgress,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      role: user.role,
    })
  } catch (error) {
    console.error("Active Projects API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch active projects" },
      { status: 500 }
    )
  }
}
