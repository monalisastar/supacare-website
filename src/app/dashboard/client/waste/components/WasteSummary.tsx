'use client'

import { Card } from '@/components/ui/card'

interface WasteSummaryProps {
  stats: {
    totalCollected: number
    wasteDiverted: number
    compostable: number
    recyclable: number
    residual: number
  }
}

export default function WasteSummary({ stats }: WasteSummaryProps) {
  const items = [
    { label: 'Total Waste Collected', value: `${stats.totalCollected} kg` },
    { label: 'Waste Diverted', value: `${stats.wasteDiverted} kg` },
    { label: 'Compostable Waste', value: `${stats.compostable} kg` },
    { label: 'Recyclable Waste', value: `${stats.recyclable} kg` },
    { label: 'Residual Waste', value: `${stats.residual} kg` },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
      {items.map((item) => (
        <Card key={item.label} className="p-6 text-center border-2 rounded-xl">
          <p className="text-green-700 font-semibold">{item.label}</p>
          <p className="text-2xl font-bold">{item.value}</p>
        </Card>
      ))}
    </div>
  )
}
