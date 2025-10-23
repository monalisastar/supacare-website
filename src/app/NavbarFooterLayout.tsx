"use client";

import { useEffect, useState } from "react";
import Navbar from '@/components/Navbar'

import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import { usePathname } from "next/navigation";

export default function NavbarFooterLayout({ children }: { children: React.ReactNode }) {
  const [offsetTop, setOffsetTop] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("[data-navbar]");
    if (navbar) {
      setOffsetTop(navbar.offsetHeight);
      const ro = new ResizeObserver(() => setOffsetTop(navbar.offsetHeight));
      ro.observe(navbar);
      return () => ro.disconnect();
    }
  }, []);

  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <SessionProviderWrapper>
      {/* ✅ Navbar (only once, not duplicated) */}
      {!isDashboard && <Navbar />}

      {/* ✅ Transparent section under navbar */}
      <main
        style={{
          marginTop: offsetTop,
          transition: "margin-top 0.2s ease-in-out",
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </main>

      {!isDashboard && <Footer />}

      <Toaster position="top-right" />
    </SessionProviderWrapper>
  );
}
