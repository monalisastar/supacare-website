'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import CartProvider from '@/lib/CartContext'
import SessionProviderWrapper from '@/app/providers/SessionProviderWrapper'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviderWrapper>
      <CartProvider>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </CartProvider>
    </SessionProviderWrapper>
  )
}
