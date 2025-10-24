import SEO from "@/components/SEO";
import AboutHero from "./components/AboutHero";
import FocusAreas from "./components/focusareas";
import CoreValues from "./components/CoreValues";
import WhereWeWork from "./components/WhereWeWork";
import WhyWasteMatters from "./components/WhyWasteMatters";
import VisionForward from "./components/VisionForward";
import AboutCTA from "./components/AboutCTA";
import OurStory from "./components/OurStory";

export default function AboutPage() {
  return (
    <>
      {/* ✅ Reusable SEO for About Page */}
      <SEO
        title="About Supacare Solutions | Sustainable Waste Management in Kenya"
        description="Learn about Supacare Solutions — Kenya’s leading provider of sustainable waste management, recycling, and carbon consultancy services."
        url="https://www.supacaresolutions.com/about"
        keywords={[
          "About Supacare",
          "Supacare Solutions Kenya",
          "Waste management company Nairobi",
          "Carbon consultancy Africa",
          "Sustainability Kenya",
        ]}
        faqs={[
          {
            question: "What is Supacare Solutions?",
            answer:
              "Supacare Solutions is an environmental and sustainability company in Kenya offering waste management, recycling, and carbon consultancy services.",
          },
          {
            question: "When was Supacare Solutions founded?",
            answer:
              "Supacare Solutions was founded in 2022 with the goal of promoting a circular economy and reducing environmental pollution through practical, scalable solutions.",
          },
          {
            question: "What is Supacare’s mission?",
            answer:
              "Our mission is to enable sustainable communities by providing innovative waste and carbon solutions that protect the environment for future generations.",
          },
        ]}
      />

      {/* ✅ Page Content */}
      <main className="flex flex-col gap-20">
        <AboutHero />
        <FocusAreas />
        <OurStory />
        <CoreValues />
        <WhereWeWork />
        <WhyWasteMatters />
        <VisionForward />
        <AboutCTA />
      </main>
    </>
  );
}
