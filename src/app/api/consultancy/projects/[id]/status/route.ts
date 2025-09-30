import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import type { ProjectStatus } from "@prisma/client"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // Get project
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { client: true, consultant: true },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Only Admins and assigned Consultants can change status
    if (
      user.role !== "ADMIN" &&
      !(user.role === "CONSULTANT" && project.consultantId === user.id)
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const newStatus = body.status as ProjectStatus

    // Validate transition
    const validTransitions: Record<ProjectStatus, ProjectStatus[]> = {
      NEW: ["ACTIVE"],
      ACTIVE: ["COMPLETED"],
      COMPLETED: [], // final state
    }

    if (!validTransitions[project.status].includes(newStatus)) {
      return NextResponse.json(
        { error: `Invalid status transition from ${project.status} → ${newStatus}` },
        { status: 400 }
      )
    }

    // Update project
    const updated = await prisma.project.update({
      where: { id: project.id },
      data: { status: newStatus },
    })

    // TODO: notify client/consultant (email, in-app, etc.)
    // e.g., sendNotification(project.client.email, `Project moved to ${newStatus}`)

    return NextResponse.json({
      message: `Project status updated to ${newStatus}`,
      project: updated,
    })
  } catch (error) {
    console.error("Project Status Update Error:", error)
    return NextResponse.json(
      { error: "Failed to update project status" },
      { status: 500 }
    )
  }
}
