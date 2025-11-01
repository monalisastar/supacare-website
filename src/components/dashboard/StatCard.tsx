'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

/**
 * 💎 StatCard (Global)
 * --------------------
 * Reusable across all dashboards (Client, Consultant, Partner, Admin)
 * Displays a single KPI or metric with an icon, title, and value.
 *
 * Features:
 * - Soft glassmorphism background
 * - Hover animation
 * - Responsive grid support
 */

export default function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
}) {
  return (
    <Card className="shadow-sm border-green-100 hover:shadow-md hover:border-green-200 transition-all bg-white/80 backdrop-blur-sm rounded-xl">
      <CardContent className="flex items-center space-x-4 p-5">
        {/* Icon Bubble */}
        <div className="p-3 bg-green-100 rounded-full flex items-center justify-center">
          {icon}
        </div>

        {/* Text Content */}
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-xl font-semibold text-green-700">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
