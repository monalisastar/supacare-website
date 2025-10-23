import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarFooterLayout from "./NavbarFooterLayout";
import { CartProvider } from "@/context/CartContext";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton"; // ✅ Floating WhatsApp Button

// ✅ Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata
export const metadata: Metadata = {
  title: "Supacare Solutions - Sustainable Waste Management in Kenya",
  description:
    "Supacare Solutions provides innovative and eco-friendly waste management and sustainability consulting services across Kenya.",
  keywords: [
    "waste management",
    "sustainability",
    "Kenya",
    "eco-friendly solutions",
    "carbon advisory",
    "composting",
    "recycling",
  ],
  openGraph: {
    title: "Supacare Solutions",
    description:
      "Innovative and eco-friendly waste management and sustainability consulting services across Kenya.",
    url: "https://www.supacaresolutions.com",
    siteName: "Supacare Solutions",
    images: [
      {
        url: "https://www.supacaresolutions.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Supacare Solutions Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supacare Solutions",
    description:
      "Innovative and eco-friendly waste management and sustainability consulting services across Kenya.",
    images: ["https://www.supacaresolutions.com/twitter-image.png"],
    site: "@Supacare",
    creator: "@Supacare",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

// ✅ Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// ✅ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="kMRdgtlcdkEqVOSaEjTSTKmtn6jnbkthgFEAP93YJ7E"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-transparent`}
      >
        <CartProvider>
          <NavbarFooterLayout>{children}</NavbarFooterLayout>

          {/* ✅ Floating WhatsApp button stays visible globally */}
          <FloatingWhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
