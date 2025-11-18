import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import NavbarFooterLayout from "./NavbarFooterLayout"
import CartProvider from "@/lib/CartContext" // ✅ fixed: default import
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton"
import Script from "next/script"
import ClientHydration from "@/components/ClientHydration"

// ✅ Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// ✅ Metadata
export const metadata: Metadata = {
  title: "Supacare Solutions",
  description:
    "Supacare Solutions provides innovative and eco-friendly waste management and sustainability consulting services across Kenya.",
  keywords: [
    "waste management",
    "sustainable waste management",
    "smart waste tracking",
    "recycling solutions",
    "composting in Kenya",
    "organic waste recycling",
    "eco-friendly waste solutions",
    "waste collection and disposal",
    "biodegradable waste treatment",
    "carbon advisory",
    "carbon footprint reduction",
    "carbon credits Kenya",
    "carbon consultancy",
    "carbon offset projects",
    "climate action initiatives",
    "greenhouse gas reduction",
    "climate change mitigation",
    "environmental sustainability",
    "sustainability consulting",
    "environmental consultancy Kenya",
    "ESG consulting",
    "environmental impact assessment",
    "corporate sustainability strategy",
    "sustainable business solutions",
    "zero waste management",
    "renewable energy transition",
    "eco innovation services",
    "sustainable urban development",
    "waste to fertilizer",
    "circular economy Kenya",
    "sustainable farming practices",
    "organic compost production",
    "community recycling programs",
    "regenerative farming",
    "Supacare Solutions",
    "environmental company Kenya",
    "green technology Kenya",
    "sustainability company in Africa",
    "eco-friendly company Nairobi",
    "smart city waste management",
    "green earth initiatives Kenya",
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
}

// ✅ Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1b4332",
}

// ✅ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Performance Preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.supacaresolutions.com" />

        {/* ✅ Preloads */}
        <link
          rel="preload"
          as="video"
          href="/videos/hero-video.webm"
          type="video/webm"
        />
        <link rel="preload" as="image" href="/images/for-communities.webp" />

        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="kMRdgtlcdkEqVOSaEjTSTKmtn6jnbkthgFEAP93YJ7E"
        />

        {/* ✅ Structured Data (JSON-LD Schemas) */}
        <Script
          id="schemas"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // 🔹 Organization Schema
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Supacare Solutions",
                url: "https://www.supacaresolutions.com",
                logo: "https://www.supacaresolutions.com/images/supalogo.png",
                description:
                  "Supacare Solutions is an environmental and sustainability company in Kenya focused on smart waste management, composting, and carbon consultancy.",
                foundingDate: "2022",
                founders: [{ "@type": "Person", name: "Virginia Njeri" }],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+254-720-096680",
                  contactType: "Customer Support",
                  areaServed: "KE",
                  availableLanguage: ["English", "Swahili"],
                },
                sameAs: [
                  "https://www.facebook.com/supacaresolutions",
                  "https://www.instagram.com/supacaresolutions",
                  "https://www.linkedin.com/company/supacare-solutions",
                  "https://twitter.com/supacaresol",
                ],
              },
              // 🔹 Local Business Schema
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "Supacare Solutions",
                image: "https://www.supacaresolutions.com/images/supalogo.png",
                telephone: "+254-720-096680",
                email: "info@supacaresolutions.com",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Laki Gardens, Ruiru",
                  addressLocality: "Ruiru",
                  addressRegion: "Kiambu County",
                  postalCode: "00900",
                  addressCountry: "KE",
                },
                openingHours: "Mo-Fr 08:00-17:00",
                url: "https://www.supacaresolutions.com",
              },
              // 🔹 WebPage Schema
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Supacare Solutions",
                url: "https://www.supacaresolutions.com",
                description:
                  "Supacare Solutions provides innovative and eco-friendly waste management, recycling, and carbon consultancy services across Kenya.",
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  url: "https://www.supacaresolutions.com",
                },
              },
              // 🔹 WebSite Schema (enables sitelinks)
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Supacare Solutions",
                url: "https://www.supacaresolutions.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://www.supacaresolutions.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />

        {/* ✅ Breadcrumb auto initializer for Google sitelinks */}
        <Script id="breadcrumb-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.supacaresolutions.com",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Main",
                "item": "https://www.supacaresolutions.com",
              },
            ],
          })}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-transparent`}
      >
        {/* ✅ Client Hydration */}
        <ClientHydration />

        {/* ✅ Single Global Cart Provider */}
        <CartProvider>
          <NavbarFooterLayout>{children}</NavbarFooterLayout>
          <FloatingWhatsAppButton />
        </CartProvider>

        {/* ✅ Lazy-load safeguard */}
        <Script id="lazy-init" strategy="afterInteractive">
          {`
            document.addEventListener("DOMContentLoaded", () => {
              document.querySelectorAll("img:not([loading='eager'])").forEach(img => {
                img.loading = "lazy";
                img.decoding = "async";
              });
              document.querySelectorAll("video:not([preload])").forEach(v => {
                v.preload = "metadata";
              });
            });
          `}
        </Script>

        {/* ✅ Google Analytics (replace G-XXXXXXX) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  )
}
