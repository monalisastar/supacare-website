'use client';
import Hero from './components/Hero';
import OurServices from './components/OurServices';
import WhoWeServe from './components/WhoWeServe';
import CompostingProcess from './components/CompostingProcess';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';

export default function CompostingPage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <OurServices />
      <WhoWeServe />
      <CompostingProcess />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
