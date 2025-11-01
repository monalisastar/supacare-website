'use client'

import React from 'react'
import { Leaf } from 'lucide-react'
import Link from 'next/link'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Leaf size={42} className="text-green-500 mb-3" />
      <h2 className="text-lg font-semibold text-green-700 mb-2">
        No Carbon Projects Yet
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        You haven’t initiated any carbon projects yet. Begin your sustainability
        journey by engaging Supacare consultants to help you design, validate,
        and register your carbon project for carbon credit generation.
      </p>
      <Link
        href="/dashboard/client/carbon/new" // ✅ fixed route
        className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition"
      >
        Request Carbon Project
      </Link>
    </div>
  )
}
