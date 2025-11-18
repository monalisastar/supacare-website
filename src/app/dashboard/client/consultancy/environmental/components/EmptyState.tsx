'use client'

import React from 'react'
import { Leaf } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function EmptyState() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      {/* Icon */}
      <div className="bg-green-50 p-4 rounded-full">
        <Leaf size={36} className="text-green-600" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-green-700">
        No Consultancy Requests Yet
      </h2>

      {/* Description */}
      <p className="text-gray-600 max-w-md">
        You haven’t initiated any consultancy requests yet. Begin your sustainability journey 
        by engaging Supacare’s experts for Environmental Impact Assessments (EIA), ESG audits, 
        compliance reviews, and other advisory services.
      </p>

      
    </div>
  )
}
