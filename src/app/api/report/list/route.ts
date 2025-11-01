'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { ConsultancyStatus } from '@prisma/client'

/**
 * 📄 GET /api/reports/list
 * -------------------------------------------------
 * Returns all reports submitted by the logged-in consultant.
 * Supports both Consultancy & Carbon reports with optional
 * status filtering (?status=pending|approved|all).
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 🧩 Parse query params
    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get('status')?.toLowerCase() || 'all' // pending | approved | all

    // 🧠 Fetch all reports linked to this consultant
    const [consultancyReports, carbonReports] = await Promise.all([
      prisma.consultancyReport.findMany({
        where: {
          project: {
            consultantId: user.id,
            ...(statusParam !== 'all' && {
              status: statusParam.toUpperCase() as ConsultancyStatus,
            }),
          },
        },
        include: {
          project: {
            select: {
              id: true,
              title: true,
              category: true,
              status: true,
              client: { select: { name: true, email: true } },
            },
          },
        },
        orderBy: { uploadedAt: 'desc' },
      }),

      prisma.carbonReport.findMany({
        where: { project: { consultantId: user.id } },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              stage: true,
              client: { select: { name: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    // 🧮 Combine and tag reports
    const combined = [
      ...consultancyReports.map((r) => ({
        id: r.id,
        type: 'consultancy',
        title: r.title,
        description: r.description ?? null,
        fileUrl: r.fileUrl ?? null,
        uploadedAt: r.uploadedAt,
        project: r.project,
      })),
      ...carbonReports.map((r) => ({
        id: r.id,
        type: 'carbon',
        title: r.title,
        description: null,
        fileUrl: r.reportUrl ?? null,
        uploadedAt: r.createdAt,
        project: r.project,
      })),
    ]

    return NextResponse.json({
      success: true,
      count: combined.length,
      reports: combined,
    })
  } catch (error) {
    console.error('❌ Reports Fetch Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
