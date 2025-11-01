'use client'

import React from 'react'
import { MessageSquare, CalendarDays } from 'lucide-react'

export default function ActivityFeed({ projectId }: { projectId: string }) {
  // Later: fetch activities from `prisma.projectActivity.findMany({ where: { projectId } })`
  const activities: any[] = []

  return (
    <section className="bg-white rounded-xl border border-green-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-green-700 mb-4 flex items-center space-x-2">
        <MessageSquare size={18} className="text-green-600" />
        <span>Activity Log</span>
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No updates yet. Consultant progress and verification notes will appear
          here.
        </p>
      ) : (
        <ul className="space-y-4">
          {activities.map((a: any) => (
            <li
              key={a.id}
              className="border-l-4 border-green-500 pl-4 text-sm text-gray-700"
            >
              <div className="flex justify-between">
                <span>{a.message}</span>
                <span className="text-xs text-gray-400 flex items-center space-x-1">
                  <CalendarDays size={12} />
                  <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
