'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ClientImpactOverview from './components/ClientImpactOverview'
import ClientOperationsOverview from './components/ClientOperationsOverview'
import ClientProjectsOverview from './components/ClientProjectsOverview'
import ClientBillingOverview from './components/ClientBillingOverview'
import ClientShop from './components/ProductList'

// 🧠 Dashboard Overview Page
export default function ClientDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{
    impact: any | null
    operations: any | null
    projects: any | null
    billing: any | null
  }>({
    impact: null,
    operations: null,
    projects: null,
    billing: null,
  })

  // ✅ Simulated data loading (replace with Prisma fetch)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with actual API route: /api/dashboard/client-overview
        const res = await fetch('/api/dashboard/client-overview')
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch (err) {
        console.error('Error loading client overview:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-500">
        Loading your dashboard...
      </div>
    )
  }

  return (
    <main className="flex flex-col gap-10 p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-y-auto">
      {/* 🌿 Section: Impact Overview */}
      {data?.impact && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ClientImpactOverview data={data.impact} />
        </motion.section>
      )}

      {/* ⚙️ Section: Operations */}
      {data?.operations && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ClientOperationsOverview data={data.operations} />
        </motion.section>
      )}

      {/* 💼 Section: Projects */}
      {data?.projects && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ClientProjectsOverview data={data.projects} />
        </motion.section>
      )}

      {/* 💳 Section: Billing */}
      {data?.billing && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ClientBillingOverview data={data.billing} />
        </motion.section>
      )}

      {/* 🛒 Section: Shop */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ClientShop />
      </motion.section>
    </main>
  )
}
