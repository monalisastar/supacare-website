'use client'

import React from 'react'
import { Leaf } from 'lucide-react'

export default function ProjectFormHeader({ step }: { step: number }) {
  const titles = [
    'Select Project Type',
    'Enter Project Details',
    'Select Carbon Scope',
    'Review & Submit',
  ]

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
        <Leaf size={22} className="text-green-600" />
        New Carbon Project
      </h1>
      <p className="text-gray-600 text-sm">
        Step {step} of 4: {titles[step - 1]}
      </p>
    </div>
  )
}
