import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * 📨 GET /api/messages/get
 * Query params: ?threadId=xyz
 * Fetch all messages within a thread (sorted oldest → newest)
 */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const threadId = searchParams.get('threadId')
  if (!threadId) return NextResponse.json({ error: 'Missing threadId' }, { status: 400 })

  const messages = await prisma.message.findMany({
    where: { threadId },
    include: { sender: true },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(messages)
}
