import AboutHero   from '@/components/about/AboutHero'
import OurStory    from '@/components/about/OurStory'
import OurValues   from '@/components/about/OurValues'
import WhereWeWork from '@/components/about/WhereWeWork'
import TheTeam     from '@/components/about/TheTeam'
import HomeCTA     from '@/components/home/HomeCTA'

export const metadata = {
  title: 'About | Supacare Solutions',
  description: 'Supacare is a Kenyan company building the partnerships and systems to keep solid waste out of the environment — and turning the result into verified climate impact.',
}

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <AboutHero />
      <OurStory />
      <OurValues />
      <WhereWeWork />
      <TheTeam />
      <HomeCTA />
    </main>
  )
}
