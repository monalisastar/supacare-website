'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma' // ✅ FIXED import
import MessagesLayout from '@/components/dashboard/messages/MessagesLayout'
import { redirect } from 'next/navigation'

/**
 * 💬 Client Messages Page (Live Data)
 * -------------------------------------------------
 * Displays real consultant conversation threads
 * for the logged-in client.
 */

export default async function ClientMessagesPage() {
  // 🔐 Get current user session
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user || user.role !== 'CLIENT') {
    redirect('/login')
  }

  // 🧩 Fetch message threads for this client
  const threads = await prisma.messageThread.findMany({
    where: { clientId: user.id },
    include: {
      consultant: true,
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1, // preview last message
      },
    },
    orderBy: { updatedAt: 'desc' },
  })

  // 🧮 Transform for MessagesLayout
  const messages = threads.map((t: any) => ({
    id: t.id,
    name: t.consultant?.name || 'Assigned Consultant',
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
      (m: any) => !m.read && m.senderId !== user.id
    ).length,
    avatarUrl: t.consultant?.avatarUrl || '/images/default-avatar.png',
  }))

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* 🧭 Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Messages & Consultant Conversations
        </h1>
        <p className="text-sm text-gray-500">
          Chat with consultants assigned to your active or completed projects.
        </p>
      </div>

      {/* 💬 Global Messaging Layout */}
      <MessagesLayout
        currentUserId={user.id}
        currentUserName={user.name || 'Client'}
        initialMessages={messages}
        role="client"
      />
    </main>
  )
}
