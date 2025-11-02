import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * 🔍 GET /api/client/carbon/[id]
 * ----------------------------------------
 * Fetch detailed info for a single carbon project
 * belonging to the logged-in client or consultant.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized — please log in.' },
        { status: 401 }
      )
    }

    const { id } = params

    // 🧭 Fetch Carbon Project + relations
    const project = await prisma.carbonProject.findUnique({
      where: { id },
      include: {
        client: { select: { name: true, email: true } },
        consultant: { select: { name: true, email: true } },
        uploads: {
          select: { id: true, fileUrl: true, description: true, uploadedAt: true },
          orderBy: { uploadedAt: 'desc' },
        },
        ledger: {
          select: { id: true, credits: true, tokenized: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
        },
        reports: {
          select: { id: true, title: true, reportUrl: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 })
    }

    // ✅ Ensure only owner or consultant can view
    if (project.clientId !== userId && project.consultantId !== userId) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 })
    }

    // 🧩 Return JSON-safe data
    const serialized = {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      uploads: project.uploads.map((u) => ({
        ...u,
        uploadedAt: u.uploadedAt.toISOString(),
      })),
      ledger: project.ledger.map((l) => ({
        ...l,
        createdAt: l.createdAt.toISOString(),
      })),
      reports: project.reports.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
      })),
    }

    return NextResponse.json(serialized)
  } catch (err) {
    console.error('❌ Error fetching carbon project:', err)
    return NextResponse.json(
      { message: 'Server error — please try again later.' },
      { status: 500 }
    )
  }
}
