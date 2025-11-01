import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * 💬 POST /api/messages/send
 * Body: { threadId, content }
 * Adds a new message to a conversation.
 */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { threadId, content } = await req.json()
  if (!threadId || !content)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  // 🧱 Create new message
  const message = await prisma.message.create({
    data: {
      threadId,
      senderId: user.id,
      content,
    },
  })

  // 🕓 Update thread timestamp (for sorting)
  await prisma.messageThread.update({
    where: { id: threadId },
    data: { updatedAt: new Date() },
  })

  return NextResponse.json({ success: true, message })
}
