'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

interface ChatMessage {
  id: string
  senderId: string
  content: string
  sender?: { name?: string }
}

interface ChatThreadProps {
  thread: {
    id: string
    messages?: ChatMessage[]
  }
  userId: string
}

/**
 * 🧩 ChatThread Component
 * -------------------------------------------------
 * Client-side renderer for chat messages in a project thread.
 * Uses optimistic updates and real-time-safe structure.
 */
export default function ChatThread({ thread, userId }: ChatThreadProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(thread.messages || [])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId: thread.id,
          senderId: userId,
          content: message,
        }),
      })

      if (!res.ok) throw new Error('Failed to send')

      const newMsg: ChatMessage = await res.json()
      setMessages((prev: ChatMessage[]) => [...prev, newMsg]) // ✅ fixed type
      setMessage('')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Project Chat
        </h2>
        <p className="text-sm text-gray-500">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Messages List */}
      <Card className="flex-1 p-4 overflow-y-auto space-y-3 bg-white dark:bg-gray-800 border border-gray-200 shadow-sm">
        {messages.map((msg) => {
          const isUser = msg.senderId === userId
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`max-w-[80%] p-3 rounded-lg ${
                isUser
                  ? 'ml-auto bg-green-100 dark:bg-green-900 text-right'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <p className="text-sm text-gray-800 dark:text-gray-100">
                {msg.content}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {msg.sender?.name || 'User'}
              </p>
            </motion.div>
          )
        })}
      </Card>

      {/* Input Field */}
      <div className="flex gap-2 mt-4">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} disabled={loading}>
          <Send className="w-4 h-4 mr-1" />
          Send
        </Button>
      </div>
    </div>
  )
}
