'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { ConsultancyCategory } from '@prisma/client'

/**
 * 🧾 POST /api/client/consultancy
 * -------------------------------------------------
 * Creates a new Consultancy Project (Environmental or Carbon)
 * based on the user's selection and form data.
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      title,
      description,
      category,
      budgetEstimate,
      metadata,
    } = body

    // 🧠 Validate input
    if (!title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title or category' },
        { status: 400 }
      )
    }

    // 🧩 Fetch client user
    const client = await prisma.user.findUnique({
      where: { email: user.email },
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }

    // 🧮 Auto-generate reference code (e.g. CONS-EIA-2025-0001)
    const prefix =
      category === ConsultancyCategory.ENVIRONMENTAL
        ? 'CONS-EIA'
        : 'CONS-CARBON'
    const count = await prisma.consultancyProject.count({
      where: { category },
    })
    const referenceCode = `${prefix}-${new Date().getFullYear()}-${String(
      count + 1
    ).padStart(4, '0')}`

    // 🧾 Create new consultancy project
    const project = await prisma.consultancyProject.create({
      data: {
        title,
        description,
        category,
        budgetEstimate: budgetEstimate ? parseFloat(budgetEstimate) : null,
        clientId: client.id,
        referenceCode,
        metadata, // stores dynamic fields for either EIA or Carbon
      },
    })

    // 🧠 Log activity
    await prisma.activityLog.create({
      data: {
        userId: client.id,
        entity: 'ConsultancyProject',
        entityId: project.id,
        action: `Created ${category.toLowerCase()} consultancy request: ${referenceCode}`,
      },
    })

    return NextResponse.json(
      { success: true, project },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Consultancy API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

/**
 * 📦 GET /api/client/consultancy
 * -------------------------------------------------
 * Returns all consultancy requests for the logged-in client.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const client = await prisma.user.findUnique({
      where: { email: user.email },
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }

    const projects = await prisma.consultancyProject.findMany({
      where: { clientId: client.id },
      include: {
        consultant: {
          select: { name: true, email: true },
        },
        milestones: true,
        reports: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('❌ Consultancy Fetch Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
