// src/app/team/page.tsx

import TeamSection from './components/TeamSection';

export const metadata = {
  title: 'Meet the Team | SupaCare Solutions',
  description: 'Learn about the visionary leaders and experts driving sustainable waste management at SupaCare Solutions.',
  keywords: ['SupaCare', 'Team', 'Sustainability', 'Waste Management', 'Leadership'],
  openGraph: {
    title: 'Meet the Team | SupaCare Solutions',
    description: 'Learn about the visionary leaders and experts driving sustainable waste management at SupaCare Solutions.',
    url: 'https://yourdomain.com/team',
    siteName: 'SupaCare Solutions',
    images: [
      {
        url: '/images/team/team-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SupaCare Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function TeamPage() {
  return (
    <main className="bg-green-50 min-h-screen">
      <TeamSection />
    </main>
  );
}
