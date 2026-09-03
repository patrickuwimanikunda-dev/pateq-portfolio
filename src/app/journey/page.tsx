"use client";

import SubPage from "@/components/layout/SubPage";
import Timeline from "@/components/timeline/Timeline";

export default function JourneyPage() {
  return (
    <SubPage title="Journey" currentPath="/journey">
      <Timeline />
    </SubPage>
  );
}
