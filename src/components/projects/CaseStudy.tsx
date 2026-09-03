"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CaseStudy as CaseStudyData } from "@/lib/types";
import StatusBadge from "@/components/ui/StatusBadge";
import FlowDiagram from "@/components/projects/FlowDiagram";
import type { FlowDiagram as FlowDiagramData } from "@/lib/data/projects";

interface Props {
  study: CaseStudyData | null;
  flow?: FlowDiagramData;
  onClose: () => void;
}

export default function CaseStudy({ study, flow, onClose }: Props) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!study) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [study, onClose]);

  return (
    <AnimatePresence>
      {study && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${study.title} case study`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="my-auto w-full max-w-3xl border hairline bg-panel shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b hairline bg-panel/95 px-6 py-4 backdrop-blur">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
                  CASE STUDY {study.index}
                </p>
                <h3 className="mt-1 font-mono text-xl font-medium text-fg">{study.title}</h3>
                <p className="mt-0.5 font-mono text-[11px] text-muted">{study.tagline}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={study.state} />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="text-xl leading-none text-muted transition-colors hover:text-fg"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-6 py-6">
              <p className="leading-relaxed text-fg/85">{study.summary}</p>
              <p className="mt-2 font-mono text-[11px] text-warn">{study.stateLabel}</p>

              {flow && (
                <div className="mt-8 border hairline bg-bg/50 p-5">
                  <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-muted">
                    ARCHITECTURE
                  </p>
                  <FlowDiagram data={flow} />
                </div>
              )}

              <div className="mt-8 space-y-6">
                {study.sections.map((s) => (
                  <article key={s.id} className="border-l-2 border-edge pl-4">
                    <h4 className="font-mono text-[11px] tracking-[0.2em] text-accent">
                      {s.title.toUpperCase()}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-fg/85">{s.body}</p>
                    {s.bullets && (
                      <ul className="mt-2.5 space-y-1.5">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm leading-relaxed text-fg/75">
                            <span className="text-accent" aria-hidden="true">
                              ·
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}