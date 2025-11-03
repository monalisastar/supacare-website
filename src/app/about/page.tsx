'use client'

import SEO from '@/components/SEO'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Script from 'next/script'

import AboutHero from './components/AboutHero'
import AboutChange from './components/AboutChange'
import AboutGrowth from './components/AboutGrowth'
import WhereWeWork from './components/WhereWeWork'
import MeetSupacare from './components/MeetSupacare'
import VisionForward from './components/VisionForward'
import AboutCTA from './components/AboutCTA'

export default function AboutPage() {
  return (
    <>
      {/* ✅ SEO Configuration */}
      <SEO
        title="About Supacare Solutions | Sustainable Waste Management in Kenya"
        description="Learn about Supacare Solutions — Kenya’s leading provider of sustainable waste management, recycling, and carbon consultancy services."
        url="https://www.supacaresolutions.com/about"
        keywords={[
          'About Supacare',
          'Supacare Solutions Kenya',
          'Waste management company Nairobi',
          'Carbon consultancy Africa',
          'Sustainability Kenya',
        ]}
        faqs={[
          {
            question: 'What is Supacare Solutions?',
            answer:
              'Supacare Solutions is an environmental and sustainability company in Kenya offering waste management, recycling, and carbon consultancy services.',
          },
          {
            question: 'When was Supacare Solutions founded?',
            answer:
              'Supacare Solutions was founded in 2022 with the goal of promoting a circular economy and reducing environmental pollution through practical, scalable solutions.',
          },
          {
            question: 'What is Supacare’s mission?',
            answer:
              'Our mission is to enable sustainable communities by providing innovative waste and carbon solutions that protect the environment for future generations.',
          },
        ]}
      />

      {/* ✅ Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.supacaresolutions.com/' },
          { name: 'About Us', url: 'https://www.supacaresolutions.com/about' },
        ]}
      />

      {/* ✅ Structured Data (JSON-LD) */}
      <Script id="about-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.supacaresolutions.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'About Us',
                  item: 'https://www.supacaresolutions.com/about',
                },
              ],
            },
            {
              '@type': 'FAQPage',
              'mainEntity': [
                {
                  '@type': 'Question',
                  name: 'What is Supacare Solutions?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Supacare Solutions is an environmental and sustainability company in Kenya offering waste management, recycling, and carbon consultancy services.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'When was Supacare Solutions founded?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Supacare Solutions was founded in 2022 with the goal of promoting a circular economy and reducing environmental pollution through practical, scalable solutions.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is Supacare’s mission?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our mission is to enable sustainable communities by providing innovative waste and carbon solutions that protect the environment for future generations.',
                  },
                },
              ],
            },
          ],
        })}
      </Script>

      {/* ✅ Page Layout */}
      <main className="flex flex-col gap-0">
        {/* 🟩 Hero Section */}
        <AboutHero />

        {/* 🌿 AboutChange Section — smooth top transition */}
        <div className="-mt-8">
          <AboutChange />
        </div>

        {/* 🏗️ Growth Section — continues brand story */}
        <div className="-mt-2">
          <AboutGrowth />
        </div>

        {/* 🌱 Location & Team Sections */}
        <WhereWeWork />
        <MeetSupacare />

        {/* 💚 Impact & Vision */}
        <VisionForward />

        {/* 🟨 Call to Action */}
        <AboutCTA />
      </main>
    </>
  )
}
