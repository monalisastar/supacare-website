import React from "react";
import HeroSection from "./components/Hero";
import ServicesOffered from "./components/ServicesOffered";
import WhyChooseSupaCare from "./components/WhyChooseSupaCare";
import ProcessFlowConsultancy from "./components/ProcessFlowConsultancy";
import ProjectGallery from "./components/ProjectGallery";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";

// 🧩 Import the shared breadcrumb schema component
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const EnvironmentalConsultancyPage = () => {
  return (
    <>
      {/* ✅ Breadcrumb Schema for Google */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.supacaresolutions.com/" },
          { name: "Services", url: "https://www.supacaresolutions.com/services" },
          {
            name: "Environmental Consultancy",
            url: "https://www.supacaresolutions.com/services/environmental-consultancy",
          },
        ]}
      />

      {/* ✅ Page Content */}
      <main className="bg-white text-gray-900">
        <HeroSection />
        <ServicesOffered />
        <ProcessFlowConsultancy />
        <WhyChooseSupaCare />
        <ProjectGallery />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
};

export default EnvironmentalConsultancyPage;
