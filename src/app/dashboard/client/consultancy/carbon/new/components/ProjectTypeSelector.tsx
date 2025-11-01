'use client'

import React from 'react'
import { Card } from '@/components/ui/card'

const types = [
  'Clean Cooking',
  'Renewable Energy',
  'Waste-to-Energy',
  'Forestry & Land Use',
  'Blue Carbon',
  'Industrial Process',
]

interface Props {
  value: string
  onSelect: (val: string) => void
}

export default function ProjectTypeSelector({ value, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {types.map((type) => (
        <Card
          key={type}
          onClick={() => onSelect(type)}
          className={`p-6 cursor-pointer text-center border-2 transition-all rounded-xl ${
            value === type
              ? 'border-green-600 bg-green-50 shadow-md'
              : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
          }`}
        >
          <p className="font-medium text-green-700">{type}</p>
        </Card>
      ))}
    </div>
  )
}
