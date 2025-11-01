'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/**
 * 📤 POST /api/reports/upload
 * -------------------------------------------------
 * Handles file uploads for both Consultancy and Carbon projects.
 * Saves file to /public/uploads (or later, cloud) and creates a
 * corresponding Report record in Prisma.
 */
export async function POST(req: Request) {
  try {
    // 🔐 Authenticate the user
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (!user?.id || !user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 🧾 Extract form data
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const description = (formData.get('description') as string) || ''
    const projectId = formData.get('projectId') as string
    const type = formData.get('type') as 'consultancy' | 'carbon'

    if (!file || !projectId || !type) {
      return NextResponse.json(
        { error: 'Missing required fields (file, projectId, or type).' },
        { status: 400 }
      )
    }

    // 💾 Save file to /public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

    const safeName = file.name.replace(/\s+/g, '-')
    const fileName = `${Date.now()}-${safeName}`
    const filePath = path.join(uploadsDir, fileName)
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(filePath, buffer)

    const fileUrl = `/uploads/${fileName}`

    // 🧠 Create report record in Prisma
    if (type === 'consultancy') {
      await prisma.consultancyReport.create({
        data: {
          title: description || 'Consultancy Report',
          description: description || null,
          fileUrl,
          projectId,
        },
      })
    } else if (type === 'carbon') {
      await prisma.carbonReport.create({
        data: {
          title: description || 'Carbon Report',
          reportUrl: fileUrl,
          projectId,
          authorId: user.id, // ✅ use authorId instead of connect
        },
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid report type specified.' },
        { status: 400 }
      )
    }

    // 🪶 Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        entity: type === 'consultancy' ? 'ConsultancyReport' : 'CarbonReport',
        entityId: projectId,
        action: `Uploaded new ${type} report: ${file.name}`,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Report uploaded successfully.',
      fileUrl,
    })
  } catch (error) {
    console.error('❌ Report Upload Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
