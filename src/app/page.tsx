import HomeHero           from '@/components/home/HomeHero'
import CredentialBar      from '@/components/home/CredentialBar'
import WhoWeServe         from '@/components/home/WhoWeServe'
import TheProject         from '@/components/home/TheProject'
import OnTheGround        from '@/components/home/OnTheGround'
import CarbonSection      from '@/components/home/CarbonSection'
import CompostingRecycling from '@/components/home/CompostingRecycling'
import Community          from '@/components/home/Community'
import HomeCTA            from '@/components/home/HomeCTA'

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HomeHero />
      <CredentialBar />
      <WhoWeServe />
      <TheProject />
      <OnTheGround />
      <CarbonSection />
      <CompostingRecycling />
      <Community />
      <HomeCTA />
    </main>
  )
}
