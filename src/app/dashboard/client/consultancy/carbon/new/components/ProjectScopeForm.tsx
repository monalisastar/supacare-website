'use client'

import React from 'react'
import { carbonServices, coreScopes } from '../../data/carbonServices'

interface Props {
  data: any
  onChange: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function ProjectScopeForm({ data, onChange, onNext, onBack }: Props) {
  // 🧠 Match selected category from Step 1
  const selected = carbonServices.find((item) =>
    item.category.toLowerCase().includes(data.type?.toLowerCase())
  )

  // ✅ Merge core + category-specific scopes
  const scopes = [...coreScopes, ...(selected?.scopes || [])]

  // 🧩 Handle checkbox selection
  const handleToggleScope = (scope: string) => {
    const updatedScopes = data.scopes?.includes(scope)
      ? data.scopes.filter((s: string) => s !== scope)
      : [...(data.scopes || []), scope]

    onChange({ ...data, scopes: updatedScopes })
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-green-700">Select Project Scopes</h2>
      <p className="text-sm text-gray-600">
        Choose one or more carbon services you’d like Supacare to provide for your
        <b> {data.type}</b> project.
      </p>

      {/* ✅ Scopes Grid */}
      {scopes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scopes.map((scope: string) => (
            <label
              key={scope}
              className={`border rounded-lg p-3 cursor-pointer transition flex items-start space-x-2 ${
                data.scopes?.includes(scope)
                  ? 'border-green-600 bg-green-50 shadow-sm'
                  : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <input
                type="checkbox"
                value={scope}
                checked={data.scopes?.includes(scope)}
                onChange={() => handleToggleScope(scope)}
                className="mt-1 accent-green-600"
              />
              <span>{scope}</span>
            </label>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500">
          No specific scopes available for this category yet.
        </p>
      )}

      {/* 🔘 Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!data.scopes?.length}
          className={`px-6 py-2 rounded-lg text-white transition ${
            data.scopes?.length
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
