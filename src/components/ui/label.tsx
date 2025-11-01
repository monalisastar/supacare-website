'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * 🏷️ Label Component
 * --------------------------
 * A simple, accessible, reusable label component for form fields.
 * Works perfectly with Input, Select, and Textarea components.
 */

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium text-green-800 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
)

Label.displayName = 'Label'

export { Label }
