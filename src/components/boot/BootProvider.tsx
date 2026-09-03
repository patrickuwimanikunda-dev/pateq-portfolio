"use client";

import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "@/components/boot/BootScreen";
import { useSystem } from "@/context/SystemContext";

export default function BootProvider({ children }: { children: ReactNode }) {
  const { dismissBoot } = useSystem();
  const [showBoot, setShowBoot] = useState(true);

  const enter = useCallback(() => {
    dismissBoot();
    setShowBoot(false);
  }, [dismissBoot]);

  return (
    <>
      <AnimatePresence>{showBoot && <BootScreen onEnter={enter} />}</AnimatePresence>
      {children}
    </>
  );
}