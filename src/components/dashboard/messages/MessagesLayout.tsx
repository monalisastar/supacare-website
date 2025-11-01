'use client'

import { useState, useEffect } from 'react'
import MessageFilters from '@/components/dashboard/messages/Filters'
import MessageList from '@/components/dashboard/messages/MessageList'
import MessageThread from '@/components/dashboard/messages/MessageThread'
import MessageInput from '@/components/dashboard/messages/MessageInput'

interface MessagesLayoutProps {
  currentUserId: string
  currentUserName: string
  initialMessages: {
    id: string
    name: string
    lastMessage: string
    timestamp: string
    unreadCount?: number
    avatarUrl?: string
    starred?: boolean
  }[]
  role?: 'client' | 'consultant' | 'partner' | 'admin'
}

/**
 * 💬 Global Messages Layout (Live Data)
 * -------------------------------------------------
 * Pulls messages from backend API and sends in real-time.
 * Shared across all dashboards.
 */
export default function MessagesLayout({
  currentUserId,
  currentUserName,
  initialMessages,
  role = 'consultant',
}: MessagesLayoutProps) {
  const [filter, setFilter] = useState('all')
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // 🔄 Fetch messages for selected thread
  const fetchMessages = async (threadId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/get?threadId=${threadId}`)
      const data = await res.json()
      setChatMessages(data || [])
    } catch (err) {
      console.error('Failed to fetch messages:', err)
    } finally {
      setLoading(false)
    }
  }

  // 💬 Send message to API
  const handleSend = async (msg: string) => {
    if (!activeChatId || !msg.trim()) return
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: activeChatId, content: msg }),
      })
      const data = await res.json()

      if (data?.message) {
        setChatMessages((prev) => [...prev, data.message])
      }
    } catch (err) {
      console.error('Error sending message:', err)
    }
  }

  // 🧭 Select a conversation
  const handleSelectChat = (id: string) => {
    setActiveChatId(id)
    fetchMessages(id)
  }

  // ♻️ Optional: auto-refresh every 10s
  useEffect(() => {
    if (!activeChatId) return
    const interval = setInterval(() => fetchMessages(activeChatId), 10000)
    return () => clearInterval(interval)
  }, [activeChatId])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
      {/* 🧭 Left Sidebar */}
      <div className="col-span-1 flex flex-col border rounded-lg bg-white">
        <MessageFilters
          active={filter}
          onChange={setFilter}
          showRoleFilters={role === 'admin'}
        />
        <MessageList
          messages={initialMessages}
          activeId={activeChatId || ''}
          onSelect={handleSelectChat}
          filter={filter}
        />
      </div>

      {/* 💬 Right Chat Window */}
      <div className="col-span-2 flex flex-col border rounded-lg bg-white">
        {activeChatId ? (
          <>
            <MessageThread
              messages={chatMessages}
              currentUserId={currentUserId}
              projectName="Supacare Sustainability Project"
              participant={
                initialMessages.find((m) => m.id === activeChatId)?.name ||
                'Conversation'
              }
              loading={loading}
            />
            <MessageInput
              onSend={handleSend}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Select a conversation to start messaging.
          </div>
        )}
      </div>
    </div>
  )
}
