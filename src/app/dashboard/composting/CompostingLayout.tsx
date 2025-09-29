'use client'

import React, { ReactNode } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FaLeaf, FaChartBar, FaCogs } from "react-icons/fa"

interface CompostingLayoutProps {
  children: ReactNode
}

export default function CompostingLayout({ children }: CompostingLayoutProps) {
  const pathname = usePathname()

  const tabs = [
    { name: "Process", href: "/dashboard/composting/process", icon: <FaCogs /> },
    { name: "Training", href: "/dashboard/composting/training", icon: <FaLeaf /> },
    { name: "Reports", href: "/dashboard/composting/sales", icon: <FaChartBar /> },
  ]

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-lime-700 flex items-center gap-2">
            <FaLeaf className="text-lime-600" />
            Composting Services
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your composting journey — from training to live process tracking.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-lime-600 text-white rounded-lg shadow hover:bg-lime-700"
        >
          + Start New Batch
        </motion.button>
      </header>

      {/* Tabs / Quick Nav */}
      <nav className="flex gap-4 border-b border-gray-200 pb-2 text-gray-600 text-sm font-medium">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-2 px-3 py-1 rounded-md hover:bg-lime-50 ${
                isActive ? "text-lime-700 border-b-2 border-lime-600" : ""
              }`}
            >
              {tab.icon} {tab.name}
            </Link>
          )
        })}
      </nav>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow p-6 border border-gray-100"
      >
        {children}
      </motion.div>
    </div>
  )
}
