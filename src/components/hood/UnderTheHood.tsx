"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { pipelineStages } from "@/lib/data/pipeline";

export default function UnderTheHood({ className }: { className?: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = pipelineStages[activeIdx];

  return (
    <Section
      id="hood"
      className={className}
      kicker="05 // UNDER THE HOOD"
      title="From source code to a running program"
      intro="This is the journey I care about most: what actually happens between the code I write and the machine executing it. Each stage is clickable — this pipeline is the foundation story of everything else on this site."
    >
      {/* ── Pipeline chain ───────────────────────────────────── */}
      <Reveal>
        <div
          className="scrollbar-none overflow-x-auto pb-3"
          role="tablist"
          aria-label="Execution pipeline stages"
        >
          <ol className="flex min-w-max items-stretch gap-1.5">
            {pipelineStages.map((stage, i) => {
              const isActive = i === activeIdx;
              return (
                <li key={stage.id} className="flex items-center">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="pipeline-detail"
                    onClick={() => setActiveIdx(i)}
                    className={`w-36 shrink-0 border px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? "border-accent/70 bg-accent/10"
                        : "hairline bg-bg/70 hover:border-accent/40 hover:bg-panel"
                    }`}
                  >
                    <span className="block font-mono text-[9px] tracking-[0.2em] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-0.5 block font-mono text-[11px] leading-tight tracking-[0.05em] ${
                        isActive ? "text-accent" : "text-fg/85"
                      }`}
                    >
                      {stage.title}
                    </span>
                  </button>
                  {i < pipelineStages.length - 1 && (
                    <span className="px-1 font-mono text-xs text-accent/50" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* progress */}
        <div className="mt-1 h-px w-full bg-edge" aria-hidden="true">
          <div
            className="h-px bg-accent/70 transition-all duration-300"
            style={{ width: `${((activeIdx + 1) / pipelineStages.length) * 100}%` }}
          />
        </div>
      </Reveal>

      {/* ── Stage detail ─────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <div
          id="pipeline-detail"
          role="tabpanel"
          aria-live="polite"
          className="mt-6 grid gap-6 border hairline bg-panel/70 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr]"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
              STAGE {String(activeIdx + 1).padStart(2, "0")}/{String(pipelineStages.length).padStart(2, "0")}{" "}
              · {active.tag}
            </p>
            <h3 className="mt-2 font-mono text-lg font-medium text-fg">{active.title}</h3>
            <p className="mt-3 leading-relaxed text-fg/85">{active.description}</p>
            <ul className="mt-4 space-y-1.5">
              {active.detail.map((d) => (
                <li key={d} className="flex gap-2 text-sm leading-relaxed text-fg/75">
                  <span className="text-accent" aria-hidden="true">
                    ·
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.25em] text-muted">ILLUSTRATION</p>
            <pre className="overflow-x-auto border hairline bg-bg p-4 font-mono text-xs leading-relaxed text-fg/85">
              <code>{active.sample.code}</code>
            </pre>
            <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted">
              # {active.sample.lang} — illustrative, not a real session
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}