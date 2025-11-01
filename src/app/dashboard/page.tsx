// src/app/dashboard/page.tsx
'use server'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserRole } from '@prisma/client'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const role = (session?.user?.role as UserRole) || UserRole.CLIENT

  switch (role) {
    case UserRole.CONSULTANT:
      redirect('/dashboard/consultant')
    case UserRole.PARTNER:
      redirect('/dashboard/partner')
    case UserRole.ADMIN:
      redirect('/dashboard/admin')
    default:
      redirect('/dashboard/client')
  }
}
