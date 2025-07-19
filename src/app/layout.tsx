import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // ✅ Import Footer
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupaCare Solutions - Sustainable Waste Management in Kenya",
  description:
    "SupaCare Solutions provides innovative and eco-friendly waste management and sustainability consulting services across Kenya.",
  keywords: [
    "waste management",
    "sustainability",
    "Kenya",
    "eco-friendly solutions",
    "carbon advisory",
    "composting",
    "recycling",
  ],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "SupaCare Solutions",
    description:
      "Innovative and eco-friendly waste management and sustainability consulting services across Kenya.",
    url: "https://www.supacare.example",
    siteName: "SupaCare Solutions",
    images: [
      {
        url: "https://www.supacare.example/og-image.png",
        width: 1200,
        height: 630,
        alt: "SupaCare Solutions Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SupaCare Solutions",
    description:
      "Innovative and eco-friendly waste management and sustainability consulting services across Kenya.",
    images: ["https://www.supacare.example/twitter-image.png"],
    site: "@supacare",
    creator: "@supacare",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer /> {/* ✅ Global Footer added here */}
      </body>
    </html>
  );
}
