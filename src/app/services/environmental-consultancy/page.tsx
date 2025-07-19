import React from "react";
import HeroSection from "./components/Hero";
import ServicesOffered from "./components/ServicesOffered";
import WhyChooseSupaCare from "./components/WhyChooseSupaCare";
import ProcessSection from "./components/ProcessSection";
import ProjectGallery from "./components/ProjectGallery";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";

const EnvironmentalConsultancyPage = () => {
  return (
    <main>
      <HeroSection />
      <ServicesOffered />
      <WhyChooseSupaCare />
      <ProcessSection />
      <ProjectGallery />
      <FAQSection />
      <CTASection />
    </main>
  );
};

export default EnvironmentalConsultancyPage;
