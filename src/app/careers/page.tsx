// src/app/careers/page.tsx
import Hero from './components/Hero';
import About from './components/About';
import JobList from './components/JobList';
import HowToApply from './components/HowToApply';
import Benefits from './components/Benefits';
import Contact from './components/Contact';

export default function CareersPage() {
  return (
    <main
      style={{
        background: 'linear-gradient(135deg, #d0e7d6 0%, #a3c4a0 100%)',
        minHeight: '100vh',
      }}
      className="text-green-900"
    >
      <Hero />
      <About />
      <JobList />
      <HowToApply />
      <Benefits />
      <Contact />
    </main>
  );
}
