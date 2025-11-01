'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { MilestoneStatus } from '@prisma/client'

/**
 * 📦 GET /api/consultant/milestones?projectId=xxx
 * -------------------------------------------------
 * Returns milestones for a specific consultancy project.
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    const milestones = await prisma.consultancyMilestone.findMany({
      where: { projectId },
      orderBy: { dueDate: 'asc' },
    })

    return NextResponse.json({ milestones })
  } catch (error) {
    console.error('❌ Milestones Fetch Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * 🧭 PATCH /api/consultant/milestones
 * -------------------------------------------------
 * Allows consultant to update milestone status (PENDING → IN_PROGRESS → COMPLETED).
 */
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { milestoneId, newStatus } = body

    if (!milestoneId || !newStatus) {
      return NextResponse.json(
        { error: 'Milestone ID and new status are required' },
        { status: 400 }
      )
    }

    // ✅ Type-cast newStatus to enum safely
    const status = newStatus as MilestoneStatus

    const updated = await prisma.consultancyMilestone.update({
      where: { id: milestoneId },
      data: { status, updatedAt: new Date() },
    })

    // 🪵 Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        entity: 'Milestone',
        entityId: milestoneId,
        action: `Consultant changed milestone ${milestoneId} to ${status}`,
      },
    })

    return NextResponse.json({ success: true, milestone: updated })
  } catch (error) {
    console.error('❌ Milestone Update Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * ➕ POST /api/consultant/milestones
 * -------------------------------------------------
 * Allows adding a new milestone (future admin feature).
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { projectId, title, amount, dueDate, description } = body

    if (!projectId || !title || !amount) {
      return NextResponse.json(
        { error: 'Project ID, title, and amount are required' },
        { status: 400 }
      )
    }

    const milestone = await prisma.consultancyMilestone.create({
      data: {
        projectId,
        title,
        amount: parseFloat(amount),
        description: description || undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status: MilestoneStatus.PENDING,
      },
    })

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        entity: 'Milestone',
        entityId: milestone.id,
        action: `Created milestone '${title}' for project ${projectId}`,
      },
    })

    return NextResponse.json({ success: true, milestone })
  } catch (error) {
    console.error('❌ Milestone Creation Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
