import Hero from './components/Hero';
import Overview from './components/Overview';
import ServiceTypesGrid from './components/ServiceTypesGrid';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';

export default function WasteCollectionPage() {
  return (
    <main className="bg-white">
      <Hero />
      <Overview />
      <ServiceTypesGrid />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
