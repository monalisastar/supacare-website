'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import {
  ClipboardCheck,
  Leaf,
  Factory,
  Droplets,
  Building2,
  Recycle,
  Flame,
  Wind,
  Globe2,
} from 'lucide-react'

/**
 * 🧠 Two broad categories (Environmental | Carbon)
 * Each with subtypes for easier user understanding.
 */

const consultancyTypes = [
  {
    category: 'Environmental',
    options: [
      {
        name: 'Environmental Impact Assessment (EIA)',
        icon: <Leaf size={18} className="text-green-600" />,
        desc: 'Detailed evaluation of project impacts and mitigation planning.',
      },
      {
        name: 'Environmental Audit (EA)',
        icon: <ClipboardCheck size={18} className="text-green-600" />,
        desc: 'Independent examination of environmental compliance and performance.',
      },
      {
        name: 'ESG & Sustainability Advisory',
        icon: <Building2 size={18} className="text-green-600" />,
        desc: 'Corporate ESG reporting, sustainability strategy, and compliance.',
      },
      {
        name: 'Waste Management Consultancy',
        icon: <Recycle size={18} className="text-green-600" />,
        desc: 'Designing efficient waste segregation, recycling, and disposal systems.',
      },
      {
        name: 'Water & Sanitation Consultancy',
        icon: <Droplets size={18} className="text-green-600" />,
        desc: 'Sustainable water usage and sanitation system design and assessment.',
      },
      {
        name: 'Industrial Pollution & Energy Audit',
        icon: <Factory size={18} className="text-green-600" />,
        desc: 'Assessing emissions, energy efficiency, and compliance in industries.',
      },
    ],
  },
  {
    category: 'Carbon',
    options: [
      {
        name: 'Carbon Project Design & Registration',
        icon: <Globe2 size={18} className="text-green-600" />,
        desc: 'Developing and registering carbon offset or removal projects.',
      },
      {
        name: 'Baseline & Monitoring Studies',
        icon: <Flame size={18} className="text-green-600" />,
        desc: 'Conducting baseline surveys, data collection, and MRV setup.',
      },
      {
        name: 'Clean Cooking & Energy Transition',
        icon: <Wind size={18} className="text-green-600" />,
        desc: 'Project design for clean cooking, LPG, and renewable energy initiatives.',
      },
    ],
  },
]

interface ConsultancyTypeSelectorProps {
  value: string
  onSelect: (val: string) => void
}

/**
 * 🧩 Step 1: Consultancy Type Selection
 * -------------------------------------------------
 * Allows the client to pick either Environmental or Carbon category.
 */
export default function ConsultancyTypeSelector({
  value,
  onSelect,
}: ConsultancyTypeSelectorProps) {
  return (
    <div className="space-y-8">
      {consultancyTypes.map((group) => (
        <div key={group.category}>
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            {group.category} Consultancy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {group.options.map((type) => (
              <Card
                key={type.name}
                onClick={() => onSelect(group.category)} // ✅ Only store broad category
                className={`p-5 cursor-pointer border-2 transition-all rounded-xl hover:shadow-md ${
                  value === group.category
                    ? 'border-green-600 bg-green-50 shadow-sm'
                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {type.icon}
                  <div>
                    <p className="font-semibold text-green-700">{type.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
