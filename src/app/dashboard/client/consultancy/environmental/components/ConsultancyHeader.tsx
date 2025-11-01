'use client'

import React from 'react'
import { Briefcase, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ConsultancyHeader() {
  const router = useRouter()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Briefcase className="text-green-600" size={22} />
        <h1 className="text-2xl font-bold text-green-700">
          My Consultancy Requests
        </h1>
      </div>

      {/* Right Section */}
      <button
        onClick={() => router.push('/dashboard/client/consultancy/new')}
        className="mt-4 sm:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
      >
        <Plus size={18} />
        Request New Consultancy
      </button>
    </div>
  )
}
