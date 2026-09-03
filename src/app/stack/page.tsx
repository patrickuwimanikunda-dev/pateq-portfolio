"use client";

import SubPage from "@/components/layout/SubPage";
import TechnicalStack from "@/components/stack/TechnicalStack";

export default function StackPage() {
  return (
    <SubPage title="Stack" currentPath="/stack">
      <TechnicalStack />
    </SubPage>
  );
}
