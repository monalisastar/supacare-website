"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";

export default function NavbarFooterLayout({ children }: { children: React.ReactNode }) {
  const [offsetTop, setOffsetTop] = useState(112); // fallback height

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("[data-navbar]");
    if (navbar) {
      setOffsetTop(navbar.offsetHeight);
      const ro = new ResizeObserver(() => {
        setOffsetTop(navbar.offsetHeight);
      });
      ro.observe(navbar);
      return () => ro.disconnect();
    }
  }, []);

  return (
    <SessionProviderWrapper>
      <Navbar />
      <main style={{ marginTop: offsetTop, transition: "margin-top 0.2s ease-in-out" }}>
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </SessionProviderWrapper>
  );
}
