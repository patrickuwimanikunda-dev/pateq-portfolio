"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import StatusBadge from "@/components/ui/StatusBadge";
import { journeyStages } from "@/lib/data/journey";

export default function Timeline({ className }: { className?: string }) {
  const [openId, setOpenId] = useState<string | null>(journeyStages[0].id);

  return (
    <Section
      id="timeline"
      className={className}
      kicker="07 // JOURNEY"
      title="A long-term path, not a technology list"
      intro="Each stage explains what I am learning, why it matters, why it comes at this point, what it builds on, and what it unlocks later. Click a stage to expand it. Progression — not inventory — is the point."
    >
      <Reveal>
        <ol className="relative" aria-label="Engineering journey timeline">
          <span aria-hidden="true" className="absolute bottom-6 left-[7px] top-2 w-px bg-edge" />
          {journeyStages.map((stage, i) => {
            const isOpen = openId === stage.id;
            return (
              <li key={stage.id} className="relative pl-9 sm:pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-2.5 h-[15px] w-[15px] rounded-full border ${
                    isOpen
                      ? "border-accent bg-accent/15 shadow-[0_0_10px_rgba(125,211,252,0.5)]"
                      : "border-edge bg-bg"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : stage.id)}
                  aria-expanded={isOpen}
                  className="w-full border hairline bg-panel/50 px-4 py-3 text-left transition-colors hover:border-accent/40"
                >
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                      {String(i + 1).padStart(2, "0")} · {stage.phase}
                    </span>
                    <span className="font-mono text-sm text-fg">{stage.title}</span>
                    <StatusBadge status={stage.status} />
                    <span
                      className={`ml-auto font-mono text-xs text-accent transition-transform ${
                        isOpen ? "rotate-90" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ▸
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="border-x border-b hairline bg-bg/50 px-4 py-4 sm:px-5">
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.25em] text-accent">
                          WHAT I AM LEARNING
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg/85">{stage.what}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                          WHY IT MATTERS
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg/75">{stage.why}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                          WHY IT COMES NOW
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg/75">{stage.whyNow}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                          BUILDS ON
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg/75">{stage.buildsOn}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                          ENABLES LATER
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg/75">{stage.enables}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}