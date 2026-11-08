"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Tabs = { home: ReactNode; projects: ReactNode; about: ReactNode };

export default function HomeTabs(tabs: Tabs) {
  const tab = useSearchParams().get("tab");
  const selected = (tab && tab in tabs ? tab : "home") as keyof Tabs;
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selected}
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
        transition={{ duration: reduceMotion ? 0 : 0.12, ease: "easeOut" }}
      >
        {tabs[selected]}
      </motion.div>
    </AnimatePresence>
  );
}
