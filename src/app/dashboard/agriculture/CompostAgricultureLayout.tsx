// src/app/dashboard/compost-agriculture/CompostAgricultureLayout.tsx
'use client'

import { ReactNode } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface CompostAgricultureLayoutProps {
  children: ReactNode
}

export default function CompostAgricultureLayout({ children }: CompostAgricultureLayoutProps) {
  const router = useRouter()

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header with title and return to main dashboard */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-700">Compost for Agriculture</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FaArrowLeft /> Return to Dashboard
        </button>
      </div>

      <div className="border-b border-green-200" />

      {/* Page content */}
      {children}
    </div>
  )
}
