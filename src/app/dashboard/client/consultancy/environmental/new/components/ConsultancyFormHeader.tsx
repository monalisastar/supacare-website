'use client'

import React from 'react'
import { Briefcase } from 'lucide-react'

export default function ConsultancyFormHeader({ step }: { step: number }) {
  const titles = [
    'Select Consultancy Type',
    'Enter Project / Company Details',
    'Review & Submit Request',
  ]

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
        <Briefcase size={22} className="text-green-600" />
        New Consultancy Request
      </h1>
      <p className="text-gray-600 text-sm">
        Step {step} of 3: {titles[step - 1]}
      </p>
    </div>
  )
}
