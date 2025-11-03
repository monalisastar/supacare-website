'use client'

import SEO from '@/components/SEO'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Script from 'next/script'

import Hero from './components/Hero'
import About from './components/About'
import JobList from './components/JobList'
import HowToApply from './components/HowToApply'
import Benefits from './components/Benefits'
import Contact from './components/Contact'

export default function CareersPage() {
  return (
    <>
      {/* ✅ SEO for Careers Page */}
      <SEO
        title="Careers at Supacare Solutions | Join Our Sustainability Mission"
        description="Join Supacare Solutions — a leading environmental company in Kenya. Explore career opportunities in waste management, carbon consultancy, sustainability, and community engagement."
        url="https://www.supacaresolutions.com/careers"
        keywords={[
          'Supacare careers',
          'environmental jobs Kenya',
          'waste management jobs',
          'sustainability careers',
          'carbon consultancy jobs',
          'green jobs Kenya',
        ]}
        faqs={[
          {
            question: 'How can I apply for a job at Supacare?',
            answer:
              'You can apply directly through our careers page by filling out the online application form or emailing your CV to hr@supacaresolutions.com.',
          },
          {
            question: 'Does Supacare offer internships?',
            answer:
              'Yes, we periodically offer internship opportunities for students and graduates passionate about sustainability and climate action.',
          },
          {
            question: 'What kind of roles are available?',
            answer:
              'We regularly recruit for roles in waste management operations, sustainability consulting, project management, and community development.',
          },
        ]}
      />

      {/* ✅ Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.supacaresolutions.com/' },
          { name: 'Careers', url: 'https://www.supacaresolutions.com/careers' },
        ]}
      />

      {/* ✅ Structured Data for Jobs + FAQs */}
      <Script id="careers-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            // 🔹 Breadcrumb Schema
            {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': 'Home',
                  'item': 'https://www.supacaresolutions.com',
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': 'Careers',
                  'item': 'https://www.supacaresolutions.com/careers',
                },
              ],
            },
            // 🔹 FAQ Schema
            {
              '@type': 'FAQPage',
              'mainEntity': [
                {
                  '@type': 'Question',
                  'name': 'How can I apply for a job at Supacare?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text':
                      'You can apply directly through our careers page by filling out the online application form or emailing your CV to hr@supacaresolutions.com.',
                  },
                },
                {
                  '@type': 'Question',
                  'name': 'Does Supacare offer internships?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text':
                      'Yes, we periodically offer internship opportunities for students and graduates passionate about sustainability and climate action.',
                  },
                },
                {
                  '@type': 'Question',
                  'name': 'What kind of roles are available?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text':
                      'We regularly recruit for roles in waste management operations, sustainability consulting, project management, and community development.',
                  },
                },
              ],
            },
            // 🔹 Example JobPosting Schemas (replace or extend dynamically later)
            {
              '@type': 'JobPosting',
              'title': 'Environmental Project Officer',
              'description':
                'Lead sustainability initiatives, manage community recycling projects, and support environmental impact reporting.',
              'datePosted': '2025-11-01',
              'employmentType': 'Full-time',
              'hiringOrganization': {
                '@type': 'Organization',
                'name': 'Supacare Solutions',
                'sameAs': 'https://www.supacaresolutions.com',
                'logo': 'https://www.supacaresolutions.com/images/supalogo.png',
              },
              'jobLocation': {
                '@type': 'Place',
                'address': {
                  '@type': 'PostalAddress',
                  'streetAddress': 'Ngong Lane Plaza, Ngong Road',
                  'addressLocality': 'Nairobi',
                  'addressRegion': 'Nairobi County',
                  'postalCode': '00100',
                  'addressCountry': 'KE',
                },
              },
              'baseSalary': {
                '@type': 'MonetaryAmount',
                'currency': 'KES',
                'value': {
                  '@type': 'QuantitativeValue',
                  'value': 80000,
                  'unitText': 'MONTH',
                },
              },
              'validThrough': '2025-12-31',
            },
            {
              '@type': 'JobPosting',
              'title': 'Carbon Data Analyst (Intern)',
              'description':
                'Assist in GHG data collection, carbon credit monitoring, and sustainability reporting.',
              'datePosted': '2025-11-01',
              'employmentType': 'Internship',
              'hiringOrganization': {
                '@type': 'Organization',
                'name': 'Supacare Solutions',
                'sameAs': 'https://www.supacaresolutions.com',
                'logo': 'https://www.supacaresolutions.com/images/supalogo.png',
              },
              'jobLocation': {
                '@type': 'Place',
                'address': {
                  '@type': 'PostalAddress',
                  'streetAddress': 'Ngong Lane Plaza, Ngong Road',
                  'addressLocality': 'Nairobi',
                  'addressRegion': 'Nairobi County',
                  'postalCode': '00100',
                  'addressCountry': 'KE',
                },
              },
              'baseSalary': {
                '@type': 'MonetaryAmount',
                'currency': 'KES',
                'value': {
                  '@type': 'QuantitativeValue',
                  'value': 20000,
                  'unitText': 'MONTH',
                },
              },
              'validThrough': '2025-12-31',
            },
          ],
        })}
      </Script>

      {/* ✅ Page Layout */}
      <main
        style={{
          background: 'linear-gradient(135deg, #d0e7d6 0%, #a3c4a0 100%)',
          minHeight: '100vh',
        }}
        className="text-green-900"
      >
        <Hero />
        <About />
        <JobList />
        <HowToApply />
        <Benefits />
        <Contact />
      </main>
    </>
  )
}
