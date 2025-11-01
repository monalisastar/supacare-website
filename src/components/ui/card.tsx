'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * 🪴 UI Card Component (ShadCN-style)
 * -----------------------------------
 * Lightweight card wrapper used throughout the app.
 * - Keeps a consistent look & feel across dashboards and pages.
 * - Can be used for any box / container UI, not just metrics.
 */

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-2xl border bg-white text-gray-800 shadow-sm transition-all duration-200 hover:shadow-md',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4 border-b', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold text-green-700', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-4 border-t text-sm text-gray-600', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'
