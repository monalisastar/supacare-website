'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Loader2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  createdAt: string
  role?: 'client' | 'consultant' | 'partner'
}

interface MessageThreadProps {
  messages: Message[]
  currentUserId: string
  projectName?: string
  participant?: string
  loading?: boolean
}

/**
 * 💬 Global MessageThread
 * -------------------------------------------------
 * Displays real-time conversation between two parties.
 * Used across all dashboards.
 */
export default function MessageThread({
  messages,
  currentUserId,
  projectName,
  participant,
  loading = false,
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // 🔁 Smooth auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-sm bg-gray-50 rounded-lg">
        <Loader2 className="animate-spin w-6 h-6 text-green-600 mb-2" />
        Loading messages...
      </div>
    )
  }

  if (!messages?.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-sm bg-gray-50 rounded-lg">
        No messages yet. Start the conversation.
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200">
      {/* 🧭 Header */}
      <div className="p-3 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
        <div>
          <p className="font-semibold text-gray-800">
            {projectName || 'Conversation'}
          </p>
          {participant && (
            <p className="text-xs text-gray-500">With {participant}</p>
          )}
        </div>
      </div>

      {/* 💬 Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50"
      >
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUserId
          return (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2',
                isMine ? 'justify-end' : 'justify-start'
              )}
            >
              {/* Avatar for other participant */}
              {!isMine && (
                <Avatar className="w-8 h-8 border border-gray-200">
                  <div className="flex items-center justify-center w-full h-full text-xs font-semibold text-gray-600">
                    {msg.senderName.charAt(0).toUpperCase()}
                  </div>
                </Avatar>
              )}

              {/* Message bubble */}
              <div
                className={cn(
                  'max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm',
                  isMine
                    ? 'bg-green-600 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                )}
              >
                <p className="whitespace-pre-line break-words">{msg.content}</p>
                <span className="block text-[10px] text-gray-400 text-right mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
