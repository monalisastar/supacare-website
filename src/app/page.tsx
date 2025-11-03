'use client'

import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { motion } from 'framer-motion'

import Navbar from '@/components/Navbar'
import Hero from '../components/Hero'
import SustainabilityActions from '../components/SustainabilityActions'
import OurFocusAreas from '../components/OurFocusAreas'
import About from '../components/About'
import WhySupaCare from '../components/WhySupaCare'
import Projects from '../components/Projects'
import GetInTouch from '../components/GetInTouch'
import Partners from '@/components/Partners'
import ImpactSection from '../components/ImpactSection'

export default function HomePage() {
  return (
    <main role="main" className="bg-white text-gray-900 overflow-x-hidden">
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Supacare Solutions | Smart Waste Management & Sustainability Consulting in Kenya</title>
        <meta
          name="description"
          content="Supacare Solutions is Kenya’s leading sustainability company offering waste management, composting, and carbon consultancy services for a greener future."
        />
        <meta
          name="keywords"
          content="waste management Kenya, composting, carbon consultancy, sustainability consulting, eco innovation, recycling Nairobi"
        />
        <link rel="canonical" href="https://www.supacaresolutions.com" />

        {/* ✅ Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Supacare Solutions | Smart Waste Management & Sustainability Consulting" />
        <meta
          property="og:description"
          content="Supacare Solutions offers eco-friendly waste management, composting, and carbon consultancy services in Kenya."
        />
        <meta property="og:url" content="https://www.supacaresolutions.com" />
        <meta property="og:image" content="https://www.supacaresolutions.com/images/supalogo.png" />
        <meta property="og:site_name" content="Supacare Solutions" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Supacare Solutions | Sustainability & Waste Management" />
        <meta
          name="twitter:description"
          content="Eco-innovation company in Kenya offering smart waste management, composting, and carbon consultancy for a greener future."
        />
        <meta name="twitter:image" content="https://www.supacaresolutions.com/images/supalogo.png" />
        <meta name="twitter:site" content="@Supacare" />
        <meta name="twitter:creator" content="@Supacare" />
      </Head>

      {/* ✅ Structured Data */}
      <Script id="homepage-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            // 🔹 Organization Schema
            {
              '@type': 'Organization',
              name: 'Supacare Solutions',
              url: 'https://www.supacaresolutions.com',
              logo: 'https://www.supacaresolutions.com/images/supalogo.png',
              sameAs: [
                'https://www.facebook.com/supacaresolutions',
                'https://www.linkedin.com/company/supacare-solutions',
                'https://www.instagram.com/supacaresolutions',
                'https://twitter.com/Supacare',
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+254-720-096680',
                  contactType: 'Customer Support',
                  areaServed: 'KE',
                  availableLanguage: ['English', 'Swahili'],
                },
              ],
            },
            // 🔹 WebSite Schema (enables Sitelinks)
            {
              '@type': 'WebSite',
              name: 'Supacare Solutions',
              url: 'https://www.supacaresolutions.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.supacaresolutions.com/?s={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            },
            // 🔹 Breadcrumb Schema
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.supacaresolutions.com',
                },
              ],
            },
            // 🔹 Service Schemas
            {
              '@type': 'Service',
              name: 'Waste Management & Composting',
              description:
                'Eco-friendly waste collection, segregation, and compost production services for communities and organizations.',
              provider: {
                '@type': 'Organization',
                name: 'Supacare Solutions',
              },
              areaServed: { '@type': 'Place', name: 'Kenya' },
              serviceType: 'Environmental Services',
            },
            {
              '@type': 'Service',
              name: 'Carbon Consultancy & Sustainability Advisory',
              description:
                'Carbon audits, sustainability reporting, and climate action planning for businesses and institutions.',
              provider: {
                '@type': 'Organization',
                name: 'Supacare Solutions',
              },
              areaServed: { '@type': 'Place', name: 'Kenya' },
              serviceType: 'Sustainability Consulting',
            },
            // 🔹 FAQ Schema (optional homepage FAQs)
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What services does Supacare offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      'Supacare Solutions provides waste management, composting, carbon consultancy, and sustainability advisory services across Kenya.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Where is Supacare Solutions located?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text:
                      'Supacare Solutions is based in Nairobi, Kenya, serving clients nationwide in waste management and sustainability projects.',
                  },
                },
              ],
            },
          ],
        })}
      </Script>

      {/* 🟩 Navbar */}
      <Navbar />

      {/* 🌍 Hero Section */}
      <section id="hero" aria-label="Hero section - Supacare Solutions introduction">
        <Hero />
      </section>

      {/* ♻️ Sustainability + Focus Areas */}
      <div className="relative bg-gradient-to-b from-white via-green-50 to-white">
        <section id="actions" aria-label="Sustainability Actions">
          <SustainabilityActions />
        </section>

        <motion.section
          id="about"
          aria-label="About Supacare Solutions"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12"
        >
          <About />
        </motion.section>

        <motion.section
          id="focus-areas"
          aria-label="Our Focus Areas"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 -mt-2"
        >
          <OurFocusAreas />
        </motion.section>
      </div>

      {/* 🏗️ Projects */}
      <motion.section
        id="projects"
        aria-label="Featured Environmental Projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 md:py-16"
      >
        <Projects />
      </motion.section>

      {/* 💚 Why Supacare */}
      <motion.section
        id="why-supacare"
        aria-label="Why Choose Supacare Solutions"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-gray-100"
      >
        <WhySupaCare />
      </motion.section>

      {/* 🤝 Partners */}
      <Partners />

      {/* 🌱 Impact */}
      <motion.section
        id="impact"
        aria-label="Our Environmental Impact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-white"
      >
        <ImpactSection />
      </motion.section>

      {/* 📞 Contact */}
      <motion.section
        id="get-in-touch"
        aria-label="Get in Touch with Supacare"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 md:py-16 bg-green-50"
      >
        <GetInTouch />
      </motion.section>
    </main>
  )
}
