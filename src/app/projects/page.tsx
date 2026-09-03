"use client";

import SubPage from "@/components/layout/SubPage";
import ProjectsSection from "@/components/projects/ProjectsSection";

export default function ProjectsPage() {
  return (
    <SubPage title="Projects" currentPath="/projects">
      <ProjectsSection />
    </SubPage>
  );
}
