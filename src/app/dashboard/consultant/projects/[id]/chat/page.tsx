'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { notFound } from 'next/navigation'
import ChatThread from './ChatThread'

/**
 * 💬 Project Chat Page (Consultant View)
 * -------------------------------------------------
 * Displays all messages tied to a Consultancy Project.
 * Uses real MessageThread + Message data from Prisma.
 */
export default async function ProjectChatPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound()

  // 🧠 Fetch or create message thread for this project
  let thread = await prisma.messageThread.findFirst({
    where: { projectId: params.id },
    include: {
      messages: {
        include: { sender: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  // 🧱 Create thread if it doesn’t exist
  if (!thread) {
    thread = await prisma.messageThread.create({
      data: {
        projectId: params.id,
      },
      include: {
        messages: {
          include: { sender: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    })
  }

  if (!thread) return notFound()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <ChatThread thread={thread} userId={session.user.id} />
    </div>
  )
}
