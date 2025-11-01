'use client';

import SEO from '@/components/SEO';
import Hero from './components/Hero';
import OurServices from './components/OurServices';
import CompostingExplained from './components/CompostingExplained';
import BulkCompost from './components/BulkCompost';
import BiomassSupply from './components/BiomassSupply';
import MuckHeapRemoval from './components/MuckHeapRemoval';
import ADGritRecycling from './components/ADGritRecycling';
import CompostingProcess from './components/CompostingProcess';
import WhoWeServe from './components/WhoWeServe';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';

// ✅ Import your new ProcessFlowWaste component
import ProcessFlowWaste from './components/ProcessFlowWaste';

export default function CompostingPage() {
  return (
    <>
      {/* ✅ SEO for Composting Services */}
      <SEO
        title="Recycling & Composting Services in Kenya | Supacare Solutions"
        description="Supacare Solutions provides recycling and composting services that turn organic waste into usable fertilizer and reduce landfill pollution across Kenya."
        url="https://www.supacaresolutions.com/services/recycling-composting"
        keywords={[
          'composting services Kenya',
          'organic waste recycling',
          'recycling companies Nairobi',
          'sustainable waste management Kenya',
          'biomass supply',
          'bulk compost',
        ]}
        services={[
          {
            name: 'Composting & Organic Waste Recycling',
            description:
              'We transform organic waste into nutrient-rich compost for agriculture and landscaping.',
            price: '15000',
            currency: 'KES',
            availability: 'https://schema.org/InStock',
          },
          {
            name: 'Bulk Compost Supply',
            description:
              'Affordable bulk compost for farms, institutions, and municipal use, sourced from eco-certified facilities.',
            price: '20000',
            currency: 'KES',
          },
          {
            name: 'Biomass & Green Waste Recycling',
            description:
              'Processing of biomass and agricultural residues for renewable energy and soil enrichment.',
            price: '18000',
            currency: 'KES',
          },
        ]}
        faqs={[
          {
            question: 'What types of compost does Supacare offer?',
            answer:
              'We produce high-quality organic compost suitable for farms, gardens, and landscaping projects.',
          },
          {
            question: 'Do you collect organic waste from clients?',
            answer:
              'Yes. Supacare offers pickup and processing services for organic and green waste from homes and institutions.',
          },
          {
            question: 'Is Supacare’s compost environmentally certified?',
            answer:
              'Our composting process follows strict environmental standards and supports sustainable agriculture practices.',
          },
        ]}
      />

      {/* ✅ Page Content */}
      <main className="flex flex-col">
        <Hero />
        <CompostingExplained />
        <OurServices />

        {/* 🟢 Add the process flow right here */}
        <ProcessFlowWaste />

        <BulkCompost />

        <CompostingProcess />
        <BiomassSupply />
        <MuckHeapRemoval />
        <ADGritRecycling />
        <WhoWeServe />
        <Testimonials />
        <FinalCTA />
      </main>
    </>
  );
}
