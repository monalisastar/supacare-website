'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface MessagePreview {
  id: string
  name: string
  role?: 'client' | 'consultant' | 'partner' | 'admin'
  lastMessage: string
  timestamp: string
  unreadCount?: number
  avatarUrl?: string
  starred?: boolean
}

interface MessageListProps {
  messages: MessagePreview[]
  activeId?: string
  onSelect: (id: string) => void
  filter?: string
}

/**
 * 💬 Global MessageList
 * -------------------------------------------------
 * Shared chat sidebar used in all dashboards.
 * Displays user/project conversations with unread count & timestamps.
 */
export default function MessageList({
  messages,
  activeId,
  onSelect,
  filter = 'all',
}: MessageListProps) {
  // Apply filter dynamically
  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return msg.unreadCount && msg.unreadCount > 0
    if (filter === 'starred') return msg.starred
    return true // default: all
  })

  if (!filteredMessages.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        No conversations found.
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100 overflow-y-auto h-full bg-white rounded-lg border border-gray-100">
      {filteredMessages.map((msg) => (
        <div
          key={msg.id}
          onClick={() => onSelect(msg.id)}
          className={cn(
            'flex items-center gap-3 p-3 cursor-pointer transition-all hover:bg-green-50',
            activeId === msg.id && 'bg-green-100 shadow-sm'
          )}
        >
          {/* Avatar */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={msg.avatarUrl || '/images/default-avatar.png'}
              alt={msg.name}
              fill
              className="object-cover rounded-full border border-gray-200"
            />
            {msg.unreadCount && msg.unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {msg.unreadCount}
              </span>
            )}
          </div>

          {/* Message Preview */}
          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800 truncate">{msg.name}</p>
              <span className="text-xs text-gray-400">{msg.timestamp}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">
              {msg.lastMessage || 'No messages yet'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
