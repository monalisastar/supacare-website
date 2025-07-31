import Hero from './components/Hero';
import WhatIsCarbonAdvisory from './components/WhatIsCarbonAdvisory';
import OurServices from './components/OurServices';

import WhyChooseUs from './components/WhyChooseUs';
import ToolsStandards from './components/ToolsStandards';
import FAQ from './components/FAQ';
import CTA from './components/CTA';

export default function CarbonAdvisoryPage() {
  return (
    <main className="bg-white text-gray-900">
      <Hero />
      <WhatIsCarbonAdvisory />
      <OurServices />
   
      <WhyChooseUs />
      <ToolsStandards />
      <FAQ />
      <CTA />
    </main>
  );
}
