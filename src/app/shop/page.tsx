"use client";

import SEO from '@/components/SEO';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Script from 'next/script';
import ShopClient from './ShopClient';

export default function ShopPage() {
  return (
    <>
      {/* ✅ SEO for Supacare Shop */}
      <SEO
        title="Supacare Shop | Composting Products & Waste Solutions in Kenya"
        description="Shop composting machines, compost blends, and eco-friendly waste solutions from Supacare Solutions — Kenya’s trusted sustainability brand."
        url="https://www.supacaresolutions.com/shop"
        keywords={[
          'composting machines Kenya',
          'waste management equipment',
          'eco-friendly compost',
          'sustainable waste solutions',
          'Supacare Shop',
        ]}
        services={[
          {
            name: 'Composting Machines',
            description:
              'High-performance composting units for homes, institutions, and farms to convert organic waste into usable compost.',
            price: '45000',
            currency: 'KES',
            availability: 'https://schema.org/InStock',
          },
          {
            name: 'Organic Compost Blends',
            description:
              'Premium compost products enriched with nutrients for improved soil fertility and water retention.',
            price: '2000',
            currency: 'KES',
          },
          {
            name: 'Waste Sorting Bins',
            description:
              'Color-coded recycling bins for effective segregation of recyclable, organic, and general waste.',
            price: '3500',
            currency: 'KES',
          },
        ]}
        faqs={[
          {
            question: 'Can I order composting products online?',
            answer:
              'Yes, Supacare Shop allows online orders for composting machines, blends, and waste management equipment with delivery options across Kenya.',
          },
          {
            question: 'Do your composting machines work for small spaces?',
            answer:
              'Yes, we offer compact composting units ideal for small households, schools, and urban institutions.',
          },
          {
            question: 'Are Supacare compost products organic certified?',
            answer:
              'Yes, all compost blends are 100% organic and tested to meet sustainable farming standards.',
          },
        ]}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.supacaresolutions.com/' },
          { name: 'Shop', url: 'https://www.supacaresolutions.com/shop' },
        ]}
      />

      {/* Structured Data */}
      <Script id="shop-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
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
                  name: 'Shop',
                  item: 'https://www.supacaresolutions.com/shop',
                },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Can I order composting products online?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, Supacare Shop allows online orders for composting machines, blends, and waste management equipment with delivery options across Kenya.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do your composting machines work for small spaces?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, we offer compact composting units ideal for small households, schools, and urban institutions.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are Supacare compost products organic certified?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, all compost blends are 100% organic and tested to meet sustainable farming standards.',
                  },
                },
              ],
            },
            // Products for Google
            {
              '@type': 'Product',
              name: 'Composting Machines',
              image: 'https://www.supacaresolutions.com/images/products/compost-machine.webp',
              description:
                'High-performance composting units for homes, institutions, and farms to convert organic waste into usable compost.',
              brand: { '@type': 'Brand', name: 'Supacare Solutions' },
              offers: {
                '@type': 'Offer',
                priceCurrency: 'KES',
                price: '45000',
                availability: 'https://schema.org/InStock',
                url: 'https://www.supacaresolutions.com/shop',
              },
            },
            {
              '@type': 'Product',
              name: 'Organic Compost Blends',
              image: 'https://www.supacaresolutions.com/images/products/compost-blend.webp',
              description:
                'Premium compost products enriched with nutrients for improved soil fertility and water retention.',
              brand: { '@type': 'Brand', name: 'Supacare Solutions' },
              offers: {
                '@type': 'Offer',
                priceCurrency: 'KES',
                price: '2000',
                availability: 'https://schema.org/InStock',
                url: 'https://www.supacaresolutions.com/shop',
              },
            },
            {
              '@type': 'Product',
              name: 'Waste Sorting Bins',
              image: 'https://www.supacaresolutions.com/images/products/sorting-bins.webp',
              description:
                'Color-coded recycling bins for effective segregation of recyclable, organic, and general waste.',
              brand: { '@type': 'Brand', name: 'Supacare Solutions' },
              offers: {
                '@type': 'Offer',
                priceCurrency: 'KES',
                price: '3500',
                availability: 'https://schema.org/InStock',
                url: 'https://www.supacaresolutions.com/shop',
              },
            },
          ],
        })}
      </Script>

      {/* Page Content */}
      <ShopClient />
    </>
  );
}
