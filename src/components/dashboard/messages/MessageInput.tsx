'use client'

import { useState } from 'react'
import { Send, Paperclip, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MessageInputProps {
  threadId?: string
  currentUserId?: string
  currentUserName?: string
  onMessageSent?: (newMessage: any) => void
  onSend?: (message: string) => void // ✅ added support for simple callback
  disabled?: boolean
}

/**
 * 💬 Global MessageInput (Futuristic WhatsApp Style)
 * -------------------------------------------------
 * Shared chat composer across all dashboards.
 * Fixed to the bottom, rounded, and slightly elevated.
 * Includes emoji + attachment placeholders for visual depth.
 */
export default function MessageInput({
  threadId,
  currentUserId = 'unknown',
  currentUserName = 'User',
  onMessageSent,
  onSend, // ✅ added
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!message.trim() || !threadId) return
    setSending(true)

    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId,
          content: message.trim(),
        }),
      })

      const data = await res.json()
      if (data?.message) {
        onMessageSent?.(data.message)
        onSend?.(message.trim()) // ✅ trigger optional parent handler
        setMessage('')
      } else {
        console.error('Send failed:', data?.error)
      }
    } catch (err) {
      console.error('Error sending message:', err)
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-transparent backdrop-blur-sm">
      <div className="mx-4 mb-4 flex items-end gap-3 bg-white border border-gray-200 rounded-2xl shadow-lg p-3">
        {/* Emoji Icon */}
        <Smile className="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-600 transition" />

        {/* Text Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          disabled={disabled || sending}
          className={cn(
            'flex-1 resize-none rounded-lg border-none bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500',
            (disabled || sending) && 'opacity-50 cursor-not-allowed'
          )}
        />

        {/* Attachment Icon */}
        <Paperclip className="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-600 transition rotate-45" />

        {/* Send Button */}
        <Button
          onClick={handleSend}
          size="icon"
          disabled={!message.trim() || sending || disabled}
          className={cn(
            'rounded-full bg-green-600 hover:bg-green-700 text-white shadow-md transition-all',
            (disabled || sending) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
