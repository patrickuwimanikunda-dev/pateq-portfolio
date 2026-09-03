"use client";

import SubPage from "@/components/layout/SubPage";
import TechnicalWorld from "@/components/world/TechnicalWorld";

export default function SystemsPage() {
  return (
    <SubPage title="Systems" currentPath="/systems">
      <TechnicalWorld />
    </SubPage>
  );
}
