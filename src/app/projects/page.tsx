'use client'

import React from 'react'
import SEO from '@/components/SEO'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import Script from 'next/script'
import ProjectsHero from './components/ProjectsHero'
import ProjectList from './components/ProjectList'

const ProjectsPage = () => {
  return (
    <>
      {/* ✅ SEO for Projects Page */}
      <SEO
        title="Our Sustainability Projects | Supacare Solutions"
        description="Explore Supacare’s real-world sustainability projects — from composting programs and recycling initiatives to carbon reduction partnerships across Kenya."
        url="https://www.supacaresolutions.com/projects"
        keywords={[
          'Supacare projects',
          'sustainability projects Kenya',
          'waste management initiatives',
          'carbon reduction programs',
          'community recycling Kenya',
          'environmental impact projects',
        ]}
        services={[
          {
            name: 'Composting and Recycling Projects',
            description:
              'Community-driven composting and recycling programs that promote circular economy principles across Kenya.',
          },
          {
            name: 'Carbon Offset Partnerships',
            description:
              'Collaborative carbon reduction projects designed to help organizations achieve sustainability goals.',
          },
          {
            name: 'Cleanup and Waste Education',
            description:
              'Public awareness and cleanup initiatives aimed at reducing waste and improving environmental literacy.',
          },
        ]}
        faqs={[
          {
            question: 'What types of projects does Supacare undertake?',
            answer:
              'Supacare implements sustainability projects including composting, recycling, cleanup campaigns, and carbon offset initiatives.',
          },
          {
            question: 'Can organizations partner with Supacare on projects?',
            answer:
              'Yes, Supacare welcomes partnerships with NGOs, corporates, and local governments to scale sustainable impact projects.',
          },
          {
            question: 'Where are Supacare’s projects located?',
            answer:
              'Our sustainability projects are based in Nairobi and other key counties across Kenya, focusing on waste reduction and climate action.',
          },
        ]}
      />

      {/* ✅ Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.supacaresolutions.com/' },
          { name: 'Projects', url: 'https://www.supacaresolutions.com/projects' },
        ]}
      />

      {/* ✅ Structured Data (JSON-LD) */}
      <Script id="projects-schema" type="application/ld+json">
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
                  name: 'Projects',
                  item: 'https://www.supacaresolutions.com/projects',
                },
              ],
            },
            // 🔹 FAQ Schema
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What types of projects does Supacare undertake?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Supacare implements sustainability projects including composting, recycling, cleanup campaigns, and carbon offset initiatives.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can organizations partner with Supacare on projects?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, Supacare welcomes partnerships with NGOs, corporates, and local governments to scale sustainable impact projects.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Where are Supacare’s projects located?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our sustainability projects are based in Nairobi and other key counties across Kenya, focusing on waste reduction and climate action.',
                  },
                },
              ],
            },
            // 🔹 Project Summaries (as Service type for visibility)
            {
              '@type': 'Service',
              name: 'Composting and Recycling Projects',
              description:
                'Community-driven composting and recycling programs that promote circular economy principles across Kenya.',
              provider: {
                '@type': 'Organization',
                name: 'Supacare Solutions',
                url: 'https://www.supacaresolutions.com',
              },
              areaServed: { '@type': 'Place', name: 'Kenya' },
              serviceType: 'Environmental Sustainability Projects',
              url: 'https://www.supacaresolutions.com/projects',
            },
            {
              '@type': 'Service',
              name: 'Carbon Offset Partnerships',
              description:
                'Collaborative carbon reduction projects designed to help organizations achieve sustainability goals.',
              provider: {
                '@type': 'Organization',
                name: 'Supacare Solutions',
                url: 'https://www.supacaresolutions.com',
              },
              areaServed: { '@type': 'Place', name: 'Kenya' },
              serviceType: 'Carbon Reduction Projects',
              url: 'https://www.supacaresolutions.com/projects',
            },
            {
              '@type': 'Service',
              name: 'Cleanup and Waste Education',
              description:
                'Public awareness and cleanup initiatives aimed at reducing waste and improving environmental literacy.',
              provider: {
                '@type': 'Organization',
                name: 'Supacare Solutions',
                url: 'https://www.supacaresolutions.com',
              },
              areaServed: { '@type': 'Place', name: 'Kenya' },
              serviceType: 'Community Environmental Projects',
              url: 'https://www.supacaresolutions.com/projects',
            },
          ],
        })}
      </Script>

      {/* ✅ Page Content */}
      <main className="bg-white text-gray-900">
        <ProjectsHero />
        <ProjectList />
      </main>
    </>
  )
}

export default ProjectsPage
