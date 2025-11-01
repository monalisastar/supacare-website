'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * 🧑‍💻 Avatar Component
 * -------------------------------------------------
 * A simple, reusable avatar used across dashboards and chat.
 * - Supports images or fallback initials
 * - Matches Supacare’s green/neutral color theme
 */
export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-base',
  }

  return (
    <div
      {...props}
      className={cn(
        'relative rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200',
        sizes[size],
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold text-gray-700">
          {fallback?.charAt(0).toUpperCase() || '?'}
        </span>
      )}
    </div>
  )
}
