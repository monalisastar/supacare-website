// src/app/layout.tsx
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
        {/* ✅ Preloads for performance */}
        <link
          rel="preload"
          as="video"
          href="/videos/hero-video.webm"
          type="video/webm"
        />
        <link rel="preload" as="image" href="/images/for-communities.webp" />

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
              address: {
                "@type": "PostalAddress",
                addressCountry: "KE",
                addressRegion: "Kiambu County",
                addressLocality: "Ruiru",
                streetAddress: "Laki Gardens, Ruiru, Kenya",
                postalCode: "00900",
              },
            }),
          }}
        />

        {/* ✅ Logo Schema */}
        <Script
          id="logo-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Supacare Solutions",
              url: "https://www.supacaresolutions.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.supacaresolutions.com/images/supalogo.png",
                width: 400,
                height: 180,
              },
              sameAs: [
                "https://www.facebook.com/supacaresolutions",
                "https://www.instagram.com/supacaresolutions",
                "https://www.linkedin.com/company/supacare-solutions",
                "https://twitter.com/supacaresol",
              ],
            }),
          }}
        />

        {/* ✅ Local Business Schema */}
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
              sameAs: [
                "https://www.facebook.com/supacaresolutions",
                "https://www.instagram.com/supacaresolutions",
                "https://www.linkedin.com/company/supacare-solutions",
              ],
            }),
          }}
        />

        {/* ✅ Website Schema */}
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

        {/* ✅ WebPage Schema */}
        <Script
          id="webpage-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />

        {/* ✅ Breadcrumb Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.supacaresolutions.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "About Us",
                  item: "https://www.supacaresolutions.com/about",
                },
              ],
            }),
          }}
        />

        {/* ✅ Services / Offerings Schema */}
        <Script
          id="services-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Environmental & Sustainability Services",
              provider: {
                "@type": "Organization",
                name: "Supacare Solutions",
                url: "https://www.supacaresolutions.com",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Supacare Core Services",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Waste Management & Recycling",
                    itemListElement: [
                      {
                        "@type": "Service",
                        name: "Smart Waste Tracking",
                        description:
                          "IoT-enabled waste bins and optimized collection routes for urban efficiency.",
                      },
                      {
                        "@type": "Service",
                        name: "Recycling & Material Recovery",
                        description:
                          "Sorting and recycling of plastic, glass, and organic materials to reduce landfill waste.",
                      },
                    ],
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Carbon Consultancy & Advisory",
                    itemListElement: [
                      {
                        "@type": "Service",
                        name: "Carbon Project Development",
                        description:
                          "Design and registration of carbon offset projects for businesses and communities.",
                      },
                      {
                        "@type": "Service",
                        name: "Carbon Footprint Analysis",
                        description:
                          "Assessment and reporting of greenhouse gas emissions for organizations and municipalities.",
                      },
                    ],
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Composting & Regenerative Farming Solutions",
                    itemListElement: [
                      {
                        "@type": "Service",
                        name: "Organic Compost Production",
                        description:
                          "Conversion of organic waste into high-quality compost for agricultural use.",
                      },
                      {
                        "@type": "Service",
                        name: "Community Composting Programs",
                        description:
                          "Training and infrastructure setup for community-based waste-to-fertilizer projects.",
                      },
                    ],
                  },
                ],
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
