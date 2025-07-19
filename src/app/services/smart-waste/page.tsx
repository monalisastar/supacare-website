import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import DashboardPreview from './components/DashboardPreview'
import TargetClients from './components/TargetClients'
import CaseStudy from './components/CaseStudy'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'

export default function SmartWastePage() {
  return (
    <main
      className="flex flex-col items-center justify-center"
  
    >
      <Hero />
      <HowItWorks />
      <Benefits />
      <DashboardPreview />
      <TargetClients />
      <CaseStudy />
      <Testimonials />
      <CallToAction />
    </main>
  )
}
