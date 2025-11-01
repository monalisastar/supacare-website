'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BarChart3, Leaf, Recycle, Wrench, Briefcase } from 'lucide-react'

/**
 * 🧭 DashboardSummary (Global)
 * ----------------------------
 * Closing section of any dashboard view.
 * Summarizes Supacare’s sustainability impact and provides
 * role-specific messages + next-step CTAs.
 *
 * Roles supported: CLIENT | CONSULTANT | PARTNER | ADMIN
 * Default = CLIENT
 */

type Role = 'CLIENT' | 'CONSULTANT' | 'PARTNER' | 'ADMIN'

export default function DashboardSummary({
  role = 'CLIENT',
  summaryData = {},
}: {
  role?: Role
  summaryData?: Record<string, number>
}) {
  const {
    co2Reduced = 0,
    compostProduced = 0,
    totalRevenue = 0,
    totalProjects = 0,
  } = summaryData

  // 🧩 Dynamic message per user role
  const summaryMessage =
    role === 'ADMIN'
      ? `Supacare’s sustainability ecosystem continues to expand — overseeing ${totalProjects} active projects, reducing ${co2Reduced.toFixed(
          1
        )} tons of CO₂, and generating ${compostProduced.toFixed(
          1
        )} kg of compost across all clients and partners.`
      : role === 'CONSULTANT'
      ? `You’re empowering businesses through data-driven environmental consultancy. Keep advancing compliance checks, EIA reviews, and sustainability reports to scale Supacare’s impact.`
      : role === 'PARTNER'
      ? `Your operational efficiency helps convert collected waste into measurable environmental value — keeping cities cleaner and supporting Supacare’s green logistics network.`
      : `Your organization’s actions through Supacare are driving measurable sustainability — reducing ${co2Reduced.toFixed(
          1
        )} tons of CO₂ and generating ${compostProduced.toFixed(
          1
        )} kg of compost. Continue taking climate-smart action through our consultancy and waste programs.`

  // 🧭 Role-specific CTA
  const ctaText =
    role === 'ADMIN'
      ? 'Open Platform Analytics'
      : role === 'CONSULTANT'
      ? 'View My Consultancy Dashboard'
      : role === 'PARTNER'
      ? 'View Waste Collection Summary'
      : 'Request New Consultancy Service'

  const ctaHref =
    role === 'ADMIN'
      ? '/dashboard/analytics'
      : role === 'CONSULTANT'
      ? '/dashboard/consultancy'
      : role === 'PARTNER'
      ? '/dashboard/waste'
      : '/dashboard/consultancy'

  return (
    <section className="mt-10">
      <Card className="bg-gradient-to-r from-green-50 via-white to-emerald-50 border-green-100 shadow-sm rounded-2xl">
        <CardContent className="p-6 space-y-5">
          {/* 🌿 Summary Message */}
          <p className="text-gray-700 leading-relaxed text-[15px]">
            {summaryMessage}
          </p>

          {/* 🚀 CTA Button */}
          <a
            href={ctaHref}
            className="inline-flex items-center space-x-2 text-green-700 font-medium hover:text-green-900 transition"
          >
            <span>{ctaText}</span>
            <ArrowRight size={18} />
          </a>

          {/* ✨ Decorative Icons */}
          <div className="flex space-x-4 mt-4 text-green-600 opacity-70">
            <Leaf size={20} />
            <Recycle size={20} />
            <BarChart3 size={20} />
            <Wrench size={20} />
            <Briefcase size={20} />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
