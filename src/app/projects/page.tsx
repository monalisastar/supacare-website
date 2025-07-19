"use client";

import React from "react";
import ProjectsHero from "./components/ProjectsHero";
import ProjectList from "./components/ProjectList"; // Handles modal internally

const ProjectsPage = () => {
  return (
    <main className="bg-white text-gray-900">
      <ProjectsHero />
      <ProjectList />
   
    </main>
  );
};

export default ProjectsPage;
