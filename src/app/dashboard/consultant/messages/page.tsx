'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import MessagesLayout from '@/components/dashboard/messages/MessagesLayout'
import { redirect } from 'next/navigation'

/**
 * 💬 Consultant Messages Page (Live Data)
 * -------------------------------------------------
 * Displays actual client conversation threads for the logged-in consultant.
 * Pulls data via Prisma — no mock data used.
 */

export default async function ConsultantMessagesPage() {
  // 🔐 Get session securely
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user || user.role !== 'CONSULTANT') {
    redirect('/login')
  }

  // 🧩 Fetch message threads (conversation list)
  const threads = await prisma.messageThread.findMany({
    where: { consultantId: user.id },
    include: {
      client: true,
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1, // last message preview
      },
    },
    orderBy: { updatedAt: 'desc' },
  })

  // 🧮 Transform for MessagesLayout
  const messages = threads.map((t) => ({
    id: t.id,
    name: t.client?.name || 'Unnamed Client',
    lastMessage: t.messages[0]?.content || 'No messages yet',
    timestamp: t.messages[0]?.createdAt
      ? new Date(t.messages[0].createdAt).toLocaleString('en-KE', {
          hour: '2-digit',
          minute: '2-digit',
          day: 'numeric',
          month: 'short',
        })
      : '',
    unreadCount: t.messages.filter(
      (m) => !m.read && m.senderId !== user.id
    ).length,
    avatarUrl: t.client?.avatarUrl || '/images/default-avatar.png',
  }))

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* 🧭 Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Messages & Client Conversations
        </h1>
        <p className="text-sm text-gray-500">
          Communicate directly with clients assigned to your consultancy projects.
        </p>
      </div>

      {/* 💬 Global Messaging Layout (no mock data) */}
      <MessagesLayout
        currentUserId={user.id}
        currentUserName={user.name || 'Consultant'}
        initialMessages={messages}
        role="consultant"
      />
    </main>
  )
}
