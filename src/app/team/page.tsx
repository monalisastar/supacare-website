// src/app/team/page.tsx

import TeamSection from './components/TeamSection';

export const metadata = {
  title: 'Meet the Team | Supacare Solutions',
  description: 'Learn about the visionary leaders and experts driving sustainable waste management at Supacare Solutions.',
  keywords: ['Supacare', 'Team', 'Sustainability', 'Waste Management', 'Leadership'],
  openGraph: {
    title: 'Meet the Team | Supacare Solutions',
    description: 'Learn about the visionary leaders and experts driving sustainable waste management at Supacare Solutions.',
    url: 'https://yourdomain.com/team',
    siteName: 'Supacare Solutions',
    images: [
      {
        url: '/images/team/team-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Supacare Team',
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
