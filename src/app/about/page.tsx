import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import CoreValues from "./components/CoreValues";
import WhereWeWork from "./components/WhereWeWork";
import WhyWasteMatters from "./components/WhyWasteMatters";
import ImpactSnapshot from "./components/ImpactSnapshot";
import VisionForward from "./components/VisionForward";
import AboutCTA from "./components/AboutCTA";

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-20">
      <AboutHero />
      <OurStory />
      <CoreValues />
      <WhereWeWork />
      <WhyWasteMatters />
      <ImpactSnapshot />
      <VisionForward />
      <AboutCTA />
    </main>
  );
}
