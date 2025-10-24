"use client";

import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

export default function ContactPage() {
  return (
    <>
      {/* ✅ SEO + Contact Schema */}
      <SEO
        title="Contact Supacare Solutions | Waste Management & Sustainability Experts"
        description="Get in touch with Supacare Solutions for expert support in waste management, carbon advisory, composting, and sustainability consulting across Kenya."
        url="https://www.supacaresolutions.com/contact"
        keywords={[
          "Supacare contact",
          "waste management Kenya",
          "carbon advisory Kenya",
          "composting solutions Kenya",
          "clean cooking contact",
          "Supacare phone number",
          "Supacare sustainability consultancy",
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Supacare Solutions",
          url: "https://www.supacaresolutions.com",
          logo: "https://www.supacaresolutions.com/images/supalogo.png",
          sameAs: [
            "https://www.facebook.com/supacaresolutions",
            "https://www.linkedin.com/company/supacare-solutions",
            "https://www.instagram.com/supacaresolutions",
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+254700123456",
              contactType: "Customer Support",
              areaServed: "KE",
              availableLanguage: ["English", "Swahili"],
            },
            {
              "@type": "ContactPoint",
              email: "info@supacaresolutions.com",
              contactType: "Sales & Inquiries",
              areaServed: "KE",
              availableLanguage: ["English", "Swahili"],
            },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ngong Lane Plaza, Ngong Road",
            addressLocality: "Nairobi",
            addressRegion: "Nairobi County",
            postalCode: "00100",
            addressCountry: "KE",
          },
        }}
      />

      {/* ✅ Page Layout */}
      <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 md:px-12 pt-28">
        {/* ↑ pt-28 pushes content below navbar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 md:p-16 flex flex-col md:flex-row gap-10"
        >
          <ContactForm />
          <ContactInfo />
        </motion.div>
      </main>
    </>
  );
}
