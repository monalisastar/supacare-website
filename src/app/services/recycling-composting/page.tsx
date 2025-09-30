'use client';

import Hero from './components/Hero';
import OurServices from './components/OurServices';

// Educational & specialized service components
import CompostingExplained from './components/CompostingExplained';
import BulkCompost from './components/BulkCompost';
import BiomassSupply from './components/BiomassSupply';
import MuckHeapRemoval from './components/MuckHeapRemoval';
import ADGritRecycling from './components/ADGritRecycling';

import CompostingProcess from './components/CompostingProcess';
import WhoWeServe from './components/WhoWeServe';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';

export default function CompostingPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Educational Section */}
      <CompostingExplained />

      {/* Core Services */}
      <OurServices />

      {/* Specialized Services */}
      <BulkCompost />
      <CompostingProcess />
      <BiomassSupply />
      <MuckHeapRemoval />
      <ADGritRecycling />

      {/* Who We Serve */}
      <WhoWeServe />

      {/* Testimonials */}
      <Testimonials />

      {/* Final Call To Action */}
      <FinalCTA />
    </main>
  );
}
