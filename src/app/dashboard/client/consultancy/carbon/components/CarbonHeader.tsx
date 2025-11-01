'use client'

import React from 'react'
import { Leaf, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function CarbonHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-green-700 flex items-center space-x-2">
        <Leaf size={22} className="text-green-600" />
        <span>My Carbon Projects</span>
      </h1>

      <Link
        href="/dashboard/client/carbon/new" // ✅ Correct carbon project creation route
        className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        <PlusCircle size={18} className="mr-2" /> Request New Project
      </Link>
    </div>
  )
}
