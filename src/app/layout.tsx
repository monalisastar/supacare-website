import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarFooterLayout from "./NavbarFooterLayout";
import { CartProvider } from "@/context/CartContext";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import Script from "next/script";

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
    // Core Focus
    "waste management",
    "sustainable waste management",
    "smart waste tracking",
    "recycling solutions",
    "composting in Kenya",
    "organic waste recycling",
    "eco-friendly waste solutions",
    "waste collection and disposal",
    "biodegradable waste treatment",

    // Sustainability & Carbon
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

    // Corporate & Industrial
    "environmental consultancy Kenya",
    "ESG consulting",
    "environmental impact assessment",
    "corporate sustainability strategy",
    "sustainable business solutions",
    "zero waste management",
    "renewable energy transition",
    "eco innovation services",
    "sustainable urban development",

    // Community & Agriculture
    "waste to fertilizer",
    "circular economy Kenya",
    "sustainable farming practices",
    "organic compost production",
    "community recycling programs",
    "regenerative farming",

    // Location & Brand
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

        {/* ✅ Structured Data for Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Supacare Solutions",
              url: "https://www.supacaresolutions.com",
              logo: "https://www.supacaresolutions.com/images/supalogo.png",
              description:
                "Supacare Solutions is an environmental and sustainability company in Kenya focused on smart waste management, composting, and carbon consultancy.",
              foundingDate: "2022",
              founders: [
                {
                  "@type": "Person",
                  name: "Virginia Njeri",
                },
              ],
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
                "https://www.linkedin.com/company/supacaresolutions",
                "https://twitter.com/supacaresol",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "KE",
                addressLocality: "Nairobi",
                streetAddress: "2224 Kimathi Street",
              },
            }),
          }}
        />

        {/* ✅ Structured Data for Website */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />

        {/* ✅ Structured Data for WebPage */}
        <Script
          id="webpage-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Supacare Solutions - Sustainable Waste Management in Kenya",
              url: "https://www.supacaresolutions.com",
              description:
                "Supacare Solutions provides innovative and eco-friendly waste management, recycling, and carbon consultancy services across Kenya.",
              inLanguage: "en",
              isPartOf: {
                "@type": "WebSite",
                url: "https://www.supacaresolutions.com",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-transparent`}
      >
        <CartProvider>
          <NavbarFooterLayout>{children}</NavbarFooterLayout>
          <FloatingWhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
