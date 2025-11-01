'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import ConsultancyCard from './ConsultancyCard'

interface ConsultancyListProps {
  consultancies: any[]
}

export default function ConsultancyList({ consultancies }: ConsultancyListProps) {
  const router = useRouter()

  // 🧠 Handle click to open a specific consultancy
  const handleView = (id: string) => {
    router.push(`/dashboard/client/consultancy/${id}`)
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-green-700">
        My Consultancy Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {consultancies.map((item) => (
          <div
            key={item.id}
            onClick={() => handleView(item.id)}
            className="cursor-pointer transition-transform hover:scale-[1.01]"
          >
            <ConsultancyCard consultancy={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
