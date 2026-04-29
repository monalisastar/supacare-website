import CarbonHero    from '@/components/carbon/CarbonHero'
import WhatAreCredits from '@/components/carbon/WhatAreCredits'
import SDGImpact      from '@/components/carbon/SDGImpact'
import BuyCredits     from '@/components/carbon/BuyCredits'

export const metadata = {
  title: 'Carbon Credits | Supacare Solutions',
  description: 'Every tonne of waste Supacare diverts from dumpsites and burning becomes a verified Gold Standard carbon credit. Learn how and enquire about purchasing.',
}

export default function CarbonPage() {
  return (
    <main className="overflow-x-hidden">
      <CarbonHero />
      <WhatAreCredits />
      <SDGImpact />
      <BuyCredits />
    </main>
  )
}
