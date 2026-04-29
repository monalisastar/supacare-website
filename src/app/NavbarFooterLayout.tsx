"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "react-hot-toast"
import SessionProviderWrapper from "./providers/SessionProviderWrapper"
import { usePathname } from "next/navigation"


export default function NavbarFooterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()


  const isDashboard = pathname?.startsWith("/dashboard")
  const isPortal    = pathname?.startsWith("/portal") || pathname?.startsWith("/auth")

  return (
    <SessionProviderWrapper>
  
      {!isDashboard && !isPortal && <Navbar />}

    
      <div className="flex flex-col min-h-screen w-full">
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* ✅ Footer (hidden in dashboard) */}
        {!isDashboard && !isPortal && <Footer />}
      </div>

     

      {/* 🔍 Hidden SEO Links for site indexing */}
      <div style={{ display: "none" }}>
        <a href="/about">About Us</a>
        <a href="/services/environmental-consultancy">Environmental Consultancy</a>
        <a href="/shop">Shop</a>
        <a href="/contact">Contact Us</a>
      </div>

      {/* ✅ Global Toast notifications */}
      <Toaster position="top-right" />
    </SessionProviderWrapper>
  )
}