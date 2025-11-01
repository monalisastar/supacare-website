'use client'

import ClientCard from './ClientCard'

interface ClientListProps {
  clients: any[]
  statusFilter?: 'all' | 'active' | 'completed'
}

/**
 * 🧾 ClientList Component
 * -------------------------------------------------
 * Renders a grid of <ClientCard /> components.
 * Filters clients by their project status (active/completed/all).
 */
export default function ClientList({
  clients,
  statusFilter = 'all',
}: ClientListProps) {
  // 🧮 Apply filters
  const filtered = clients.filter((client) => {
    if (statusFilter === 'active') return client.status === 'ACTIVE'
    if (statusFilter === 'completed') return client.status === 'COMPLETED'
    return true // 'all'
  })

  // 🪣 Empty state
  if (!filtered.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No clients found matching your filters.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filtered.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  )
}
