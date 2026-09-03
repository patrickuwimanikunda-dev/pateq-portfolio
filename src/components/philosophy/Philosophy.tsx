"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { philosophyStages } from "@/lib/data/philosophy";

export default function Philosophy({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState(philosophyStages[0].id);
  const active = philosophyStages.find((s) => s.id === activeId) ?? philosophyStages[0];
  const activeIdx = philosophyStages.findIndex((s) => s.id === activeId);

  return (
    <Section
      id="philosophy"
      className={className}
      kicker="03 // ENGINEERING PHILOSOPHY"
      title="How I actually work on a problem"
      intro="Not a résumé list of habits — the actual loop. I learn by understanding, building, breaking, debugging, and measuring. Select a stage."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* ── Stage list ─────────────────────────────────────── */}
        <Reveal>
          <ol className="relative" aria-label="Engineering process stages">
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-[7px] top-4 w-px bg-edge"
            />
            {philosophyStages.map((stage, i) => {
              const isActive = stage.id === activeId;
              return (
                <li key={stage.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveId(stage.id)}
                    aria-pressed={isActive}
                    className={`group flex w-full items-center gap-4 py-2.5 text-left transition-colors ${
                      isActive ? "text-accent" : "text-fg/70 hover:text-fg"
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isActive
                          ? "border-accent bg-accent/15 shadow-[0_0_10px_rgba(125,211,252,0.5)]"
                          : "border-edge bg-bg group-hover:border-accent/50"
                      }`}
                      aria-hidden="true"
                    >
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </span>
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-sm tracking-[0.12em]">
                        {stage.title.toUpperCase()}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
            It is a loop, not a ladder — every <span className="text-accent">MASTER</span>{" "}
            eventually returns to{" "}
            <span className="text-accent">QUESTION</span> on the next problem.
          </p>
        </Reveal>

        {/* ── Detail ─────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div
            aria-live="polite"
            className="flex h-full flex-col border hairline bg-panel/70 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between border-b hairline pb-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
                STAGE {String(activeIdx + 1).padStart(2, "0")}/08
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-mono text-xl font-medium text-fg">
              {active.title.toUpperCase()}
            </h3>
            <p className="mt-2 font-mono text-xs tracking-[0.1em] text-accent/90">
              {active.prompt}
            </p>
            <p className="mt-5 leading-relaxed text-fg/85">{active.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {active.keywords.map((k) => (
                <span
                  key={k}
                  className="border hairline px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] text-muted"
                >
                  #{k}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}