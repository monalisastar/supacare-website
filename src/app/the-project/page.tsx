import ProjectHero    from '@/components/the-project/ProjectHero'
import HowItWorks    from '@/components/the-project/HowItWorks'
import WhoWeServe    from '@/components/the-project/WhoWeServe'
import Methodology   from '@/components/the-project/Methodology'
import ProjectImpact from '@/components/the-project/ProjectImpact'
import HomeCTA       from '@/components/home/HomeCTA'

export const metadata = {
  title: 'The Project | Supacare Solutions',
  description: 'How Supacare partners with communities across Kenya to divert solid waste, create livelihoods, and generate verified climate impact.',
}

export default function TheProjectPage() {
  return (
    <main className="overflow-x-hidden">
      <ProjectHero />
      <HowItWorks />
      <WhoWeServe />
      <Methodology />
      <ProjectImpact />
      <HomeCTA />
    </main>
  )
}
