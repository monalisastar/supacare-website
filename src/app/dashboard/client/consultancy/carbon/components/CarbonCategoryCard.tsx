'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface CarbonCategoryProps {
  category: string
  description: string
  services: string[]
}

export default function CarbonCategoryCard({
  category,
  description,
  services,
}: CarbonCategoryProps) {
  return (
    <Card className="bg-white border-green-100 hover:shadow-md transition rounded-xl">
      <CardHeader>
        <CardTitle className="text-green-700 text-lg">{category}</CardTitle>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardHeader>

      <CardContent className="mt-3 space-y-2">
        <ul className="text-sm text-gray-700 space-y-1">
          {services.slice(0, 3).map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>

        <Link
          href="/dashboard/client/consultancy/new"
          className="inline-flex items-center text-green-600 font-medium hover:text-green-800 mt-3"
        >
          Explore Full Category <ChevronRight size={16} className="ml-1" />
        </Link>
      </CardContent>
    </Card>
  )
}
