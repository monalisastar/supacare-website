"use client";

import SEO from "@/components/SEO";
import React from "react";
import ProjectsHero from "./components/ProjectsHero";
import ProjectList from "./components/ProjectList"; // Handles modal internally

const ProjectsPage = () => {
  return (
    <>
      {/* ✅ SEO for Projects Page */}
      <SEO
        title="Our Sustainability Projects | Supacare Solutions"
        description="Explore Supacare’s real-world sustainability projects — from composting programs and recycling initiatives to carbon reduction partnerships across Kenya."
        url="https://www.supacaresolutions.com/projects"
        keywords={[
          "Supacare projects",
          "sustainability projects Kenya",
          "waste management initiatives",
          "carbon reduction programs",
          "community recycling Kenya",
          "environmental impact projects",
        ]}
        services={[
          {
            name: "Composting and Recycling Projects",
            description:
              "Community-driven composting and recycling programs that promote circular economy principles across Kenya.",
          },
          {
            name: "Carbon Offset Partnerships",
            description:
              "Collaborative carbon reduction projects designed to help organizations achieve sustainability goals.",
          },
          {
            name: "Cleanup and Waste Education",
            description:
              "Public awareness and cleanup initiatives aimed at reducing waste and improving environmental literacy.",
          },
        ]}
        faqs={[
          {
            question: "What types of projects does Supacare undertake?",
            answer:
              "Supacare implements sustainability projects including composting, recycling, cleanup campaigns, and carbon offset initiatives.",
          },
          {
            question: "Can organizations partner with Supacare on projects?",
            answer:
              "Yes, Supacare welcomes partnerships with NGOs, corporates, and local governments to scale sustainable impact projects.",
          },
          {
            question: "Where are Supacare’s projects located?",
            answer:
              "Our sustainability projects are based in Nairobi and other key counties across Kenya, focusing on waste reduction and climate action.",
          },
        ]}
      />

      {/* ✅ Page Content */}
      <main className="bg-white text-gray-900">
        <ProjectsHero />
        <ProjectList />
      </main>
    </>
  );
};

export default ProjectsPage;
