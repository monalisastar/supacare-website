'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { ConsultancyStatus } from '@prisma/client'

/**
 * 📦 GET /api/consultant/projects
 * -------------------------------------------------
 * Returns all consultancy and carbon projects
 * assigned to the logged-in consultant.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 🧠 Fetch both Consultancy and Carbon projects in parallel
    const [consultancyProjects, carbonProjects] = await Promise.all([
      prisma.consultancyProject.findMany({
        where: { consultantId: user.id },
        include: {
          client: { select: { name: true, email: true } },
          milestones: true,
          reports: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.carbonProject.findMany({
        where: { consultantId: user.id },
        include: {
          client: { select: { name: true, email: true } },
          uploads: true,
          ledger: true,
          reports: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return NextResponse.json({ consultancyProjects, carbonProjects })
  } catch (error) {
    console.error('❌ Consultant Projects Fetch Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * 🧾 PATCH /api/consultant/projects
 * -------------------------------------------------
 * Allows consultant to update project status or cost.
 */
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { projectId, status, totalCost } = body

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    // 🧩 Update only allowed fields
    const project = await prisma.consultancyProject.update({
      where: { id: projectId, consultantId: user.id },
      data: {
        ...(status && { status: status as ConsultancyStatus }),
        ...(totalCost && { totalCost: parseFloat(totalCost) }),
        updatedAt: new Date(),
      },
    })

    // 🪵 Log the change
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        entity: 'ConsultancyProject',
        entityId: project.id,
        action: `Consultant updated project ${
          project.referenceCode || project.id
        } → ${status || 'UNCHANGED'}`,
      },
    })

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('❌ Consultant Project Update Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
