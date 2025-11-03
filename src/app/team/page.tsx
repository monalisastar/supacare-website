'use client'

import SEO from '@/components/SEO'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Script from 'next/script'
import TeamSection from './components/TeamSection'

export default function TeamPage() {
  return (
    <>
      {/* ✅ SEO Configuration */}
      <SEO
        title="Meet the Team | Supacare Solutions"
        description="Learn about the visionary leaders and experts driving sustainable waste management and environmental innovation at Supacare Solutions."
        url="https://www.supacaresolutions.com/team"
        keywords={[
          'Supacare team',
          'Supacare Solutions staff',
          'environmental experts Kenya',
          'waste management professionals',
          'sustainability leaders',
        ]}
      />

      {/* ✅ Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.supacaresolutions.com/' },
          { name: 'Team', url: 'https://www.supacaresolutions.com/team' },
        ]}
      />

      {/* ✅ Structured Data (JSON-LD) */}
      <Script id="team-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
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
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Team',
                  item: 'https://www.supacaresolutions.com/team',
                },
              ],
            },
            // 🔹 Organization Schema
            {
              '@type': 'Organization',
              name: 'Supacare Solutions',
              url: 'https://www.supacaresolutions.com',
              logo: 'https://www.supacaresolutions.com/images/supalogo.png',
              description:
                'Supacare Solutions is a sustainability company specializing in waste management, recycling, and carbon consultancy across Kenya.',
              sameAs: [
                'https://www.facebook.com/supacaresolutions',
                'https://www.linkedin.com/company/supacare-solutions',
                'https://www.instagram.com/supacaresolutions',
              ],
            },
            // 🔹 Team / Person Schema — replace with your actual members
            {
              '@type': 'Person',
              name: 'Virginia Njeri',
              jobTitle: 'Founder & Managing Director',
              worksFor: {
                '@type': 'Organization',
                name: 'Supacare Solutions',
              },
              image:
                'https://www.supacaresolutions.com/images/team/virginia-njeri.webp',
              sameAs: [
                'https://www.linkedin.com/in/virginia-njeri',
                'https://www.supacaresolutions.com',
              ],
            },
            {
              '@type': 'Person',
              name: 'Brian Njau Njata',
              jobTitle: 'Director, Carbon & Sustainability Strategy',
              worksFor: {
                '@type': 'Organization',
                name: 'Supacare Solutions',
              },
              image:
                'https://www.supacaresolutions.com/images/team/brian-njau.webp',
              sameAs: [
                'https://www.linkedin.com/in/brian-njau-njata',
                'https://www.supacaresolutions.com',
              ],
            },
          ],
        })}
      </Script>

      {/* ✅ Page Layout */}
      <main className="bg-green-50 min-h-screen">
        <TeamSection />
      </main>
    </>
  )
}
