import AboutHero from "./components/AboutHero";

import FocusAreas from "./components/focusareas"; // ✅ Added import
import CoreValues from "./components/CoreValues";
import WhereWeWork from "./components/WhereWeWork";
import WhyWasteMatters from "./components/WhyWasteMatters";

import VisionForward from "./components/VisionForward";
import AboutCTA from "./components/AboutCTA";
import OurStory from "./components/OurStory";

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-20">
      <AboutHero />
     <FocusAreas /> {/* ✅ Added section here */}
      <OurStory />
      <CoreValues />
      <WhereWeWork />
      <WhyWasteMatters />
      <VisionForward />
      <AboutCTA />
    </main>
  );
}
