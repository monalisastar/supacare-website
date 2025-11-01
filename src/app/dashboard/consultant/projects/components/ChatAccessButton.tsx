'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface ChatAccessButtonProps {
  projectId: string
  role?: 'consultant' | 'client' | 'admin'
  unreadCount?: number
  compact?: boolean
}

/**
 * 💬 ChatAccessButton
 * -------------------------------------------------
 * Reusable animated button that links to a project's
 * chat thread. Shows unread count and role-specific route.
 */
export default function ChatAccessButton({
  projectId,
  role = 'consultant',
  unreadCount = 0,
  compact = false,
}: ChatAccessButtonProps) {
  const href = `/dashboard/${role}/projects/${projectId}/chat`

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-block"
    >
      <Link href={href}>
        <Button
          variant={compact ? 'outline' : 'default'}
          size={compact ? 'icon' : 'sm'}
          className="flex items-center gap-2"
          title="Open Project Chat"
        >
          <MessageCircle className="w-4 h-4" />
          {!compact && <span>Chat</span>}
        </Button>
      </Link>

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
          {unreadCount}
        </span>
      )}
    </motion.div>
  )
}
