'use client';

import SEO from '@/components/SEO';
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

      {/* ✅ Page Content */}
      <ShopClient />
    </>
  );
}
