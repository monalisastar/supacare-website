import React from "react";
import HeroSection from "./components/Hero";
import ServicesOffered from "./components/ServicesOffered";
import WhyChooseSupaCare from "./components/WhyChooseSupaCare";

import ProcessFlowConsultancy from "./components/ProcessFlowConsultancy"; // ✅ import added
import ProjectGallery from "./components/ProjectGallery";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";

const EnvironmentalConsultancyPage = () => {
  return (
    <main className="bg-white text-gray-900">
      <HeroSection />
      <ServicesOffered />

      {/* ✅ Add Supacare’s Consultancy Process Flow here */}
      <ProcessFlowConsultancy />

      <WhyChooseSupaCare />
 
      <ProjectGallery />
      <FAQSection />
      <CTASection />
    </main>
  );
};

export default EnvironmentalConsultancyPage;
