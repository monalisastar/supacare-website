// dashboard/composting/overview/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import CompostingLayout from '../CompostingLayout'
import { FaArrowLeft } from 'react-icons/fa'

export default function OverviewPage() {
  const router = useRouter()

  return (
    <CompostingLayout>
      {/* Return to Dashboard Button */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FaArrowLeft /> Return to Dashboard
        </button>
      </div>

      <h2 className="text-2xl font-semibold">Overview</h2>
      <p className="mt-2 text-gray-700">
        Welcome to our composting services. Here we provide an overview of all our offerings,
        processes, and benefits to your environment and soil.
      </p>
    </CompostingLayout>
  )
}
