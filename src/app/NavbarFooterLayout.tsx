"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "react-hot-toast"
import SessionProviderWrapper from "./providers/SessionProviderWrapper"
import { usePathname } from "next/navigation"
import CartWidget from "@/components/CartWidget"

export default function NavbarFooterLayout({ children }: { children: React.ReactNode }) {
  const [offsetTop, setOffsetTop] = useState(0)
  const pathname = usePathname()

  // 🧠 Dynamically adjust layout padding based on navbar height
  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("[data-navbar]")
    if (navbar) {
      setOffsetTop(navbar.offsetHeight)
      const ro = new ResizeObserver(() => setOffsetTop(navbar.offsetHeight))
      ro.observe(navbar)
      return () => ro.disconnect()
    }
  }, [])

  // 🚫 Hide Navbar, Footer & CartWidget inside dashboard pages
  const isDashboard = pathname?.startsWith("/dashboard")

  return (
    <SessionProviderWrapper>
      {/* ✅ Navbar (visible only on public pages) */}
      {!isDashboard && <Navbar />}

      {/* ✅ Main container */}
      <div className="flex flex-col min-h-screen w-full">
        <main
          className="flex-1 w-full"
          style={{
            marginTop: offsetTop,
            transition: "margin-top 0.25s ease-in-out",
            backgroundColor: "transparent",
          }}
        >
          {children}
        </main>

        {/* ✅ Footer (hidden in dashboard) */}
        {!isDashboard && <Footer />}
      </div>

      {/* 🛒 Floating Cart Widget (hidden in dashboard) */}
      {!isDashboard && <CartWidget />}

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
