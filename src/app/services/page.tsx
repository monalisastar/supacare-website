'use client'

import SEO from '@/components/SEO'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'

const defaultServices = [
  {
    title: 'Environmental Consultancy and Carbon Advisory',
    description:
      'Audits, cleanup support, and guidance on carbon reduction and market participation.',
    image: '/images/services/solution-cleanup-audit.webp',
    link: '/services/environmental-consultancy',
    label: 'Learn more about Environmental Consultancy and Carbon Advisory',
  },
  {
    title: 'Recycling & Composting',
    description: 'Practical recycling programs and compost site support.',
    image: '/images/services/composting-site.webp',
    link: '/services/recycling-composting',
    label: 'Learn more about Recycling and Composting Services',
  },
  {
    title: 'Smart Waste and Tracking',
    description: 'IoT-powered bin monitoring and waste data dashboards.',
    image: '/images/services/dashboardui.webp',
    link: '/services/smart-waste',
    label: 'Learn more about Smart Waste and Tracking Solutions',
  },
  {
    title: 'Waste Collection',
    description: 'Efficient domestic and industrial waste pickup solutions.',
    image: '/images/services/domestic-waste.webp',
    link: '/services/waste-collection',
    label: 'Learn more about Waste Collection Services',
  },
]

export default function ServicesPage() {
  const [services] = useState(defaultServices)
  const [offsetTop, setOffsetTop] = useState<number>(0)
  const heroRef = useRef<HTMLElement>(null)

  // ✅ Adjust hero spacing below navbar
  useEffect(() => {
    const updateSpacing = () => {
      const navbar = document.querySelector('[data-navbar]') as HTMLElement | null
      if (navbar) {
        const extraSpacing = 80
        setOffsetTop(navbar.offsetHeight + extraSpacing)
      }
    }
    updateSpacing()
    window.addEventListener('resize', updateSpacing)
    return () => window.removeEventListener('resize', updateSpacing)
  }, [])

  return (
    <>
      {/* ✅ SEO Component */}
      <SEO
        title="Our Environmental & Sustainability Services | Supacare Solutions"
        description="Explore Supacare’s eco-friendly waste management, recycling, and carbon advisory services built to help Kenya transition toward a sustainable future."
        url="https://www.supacaresolutions.com/services"
        keywords={[
          'Supacare services',
          'waste management Kenya',
          'carbon consultancy Nairobi',
          'sustainability solutions',
          'recycling and composting',
        ]}
        services={[
          {
            name: 'Environmental Consultancy & Carbon Advisory',
            description:
              'Strategic sustainability consulting, carbon audits, and offset program development for organizations in Kenya.',
            price: '25000',
            currency: 'KES',
            availability: 'https://schema.org/InStock',
          },
          {
            name: 'Recycling & Composting',
            description:
              'Community-based composting programs and recycling systems that convert waste into usable products.',
            price: '15000',
            currency: 'KES',
          },
          {
            name: 'Smart Waste Tracking',
            description:
              'IoT-powered waste monitoring and analytics dashboards to optimize collection and reduce landfill output.',
            price: '20000',
            currency: 'KES',
          },
          {
            name: 'Waste Collection',
            description:
              'Reliable waste pickup services for homes, institutions, and industries with eco-compliant disposal processes.',
            price: '10000',
            currency: 'KES',
          },
        ]}
      />

      {/* ✅ Breadcrumb + Service Structured Data */}
      <Script id="services-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.supacaresolutions.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": "https://www.supacaresolutions.com/services"
                }
              ]
            },
            ...defaultServices.map((s) => ({
              "@type": "Service",
              "name": s.title,
              "description": s.description,
              "provider": {
                "@type": "Organization",
                "name": "Supacare Solutions",
                "url": "https://www.supacaresolutions.com"
              },
              "areaServed": {
                "@type": "Place",
                "name": "Kenya"
              },
              "serviceType": "Environmental & Sustainability Services",
              "url": `https://www.supacaresolutions.com${s.link}`
            }))
          ]
        })}
      </Script>

      {/* ✅ Page Content */}
      <main className="min-h-screen bg-[#eaf5ec] text-gray-800">
        {/* Hero Section */}
        <section
          ref={heroRef}
          style={{ marginTop: offsetTop || '10rem' }}
          className="text-center px-6 pt-12 pb-16 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-green-800 mb-4"
          >
            Our Sustainability Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Supacare empowers sustainability through hands-on solutions and innovative technology.
          </motion.p>
        </section>

        {/* Services Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-20 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <Link href={service.link}>
                <div className="relative h-52 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-green-900">{service.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  <span className="inline-block mt-4 text-green-700 hover:underline">
                    Learn more →
                    <span className="sr-only"> — {service.label}</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="bg-green-700 text-white py-10 text-center">
          <h3 className="text-2xl font-semibold mb-2">Need a custom quote?</h3>
          <p className="mb-4">Talk to our sustainability experts for a tailored solution.</p>
          <Link href="/contact">
            <button className="bg-white text-green-800 px-6 py-2 rounded-full font-medium shadow hover:bg-gray-100 transition">
              Contact Us
            </button>
          </Link>
        </section>

        {/* 🔗 Internal Link Network */}
        <section className="bg-green-50 py-10 text-center text-gray-700">
          <p className="max-w-2xl mx-auto leading-relaxed">
            Learn more{' '}
            <Link href="/about" className="text-green-700 underline">
              about our mission
            </Link>
            , explore{' '}
            <Link href="/projects" className="text-green-700 underline">
              real-world impact projects
            </Link>
            , or shop our{' '}
            <Link href="/shop" className="text-green-700 underline">
              eco-friendly solutions
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  )
}
