"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import StatusBadge from "@/components/ui/StatusBadge";
import CaseStudy from "@/components/projects/CaseStudy";
import { caseStudies, cProjectCategories } from "@/lib/data/projects";
import type { CaseStudy as CaseStudyData } from "@/lib/types";
import type { FlowDiagram as FlowDiagramData } from "@/lib/data/projects";

const statusText: Record<string, string> = {
  LEARNING: "text-accent",
  BUILDING: "text-ok",
  EXPLORING: "text-warn",
  COMPLETED: "text-accent-2",
  PLANNED: "text-muted",
  MASTERED: "text-accent-2",
};

export default function ProjectsSection({ className }: { className?: string }) {
  const [open, setOpen] = useState<{ study: CaseStudyData; flow: FlowDiagramData } | null>(null);

  return (
    <Section
      id="projects"
      className={className}
      kicker="04 // PROJECTS"
      title="Built, building, and planned"
      intro="Only real work. Nothing here is inflated — no invented users, deployments, or metrics. Every project states its actual state, and future work is clearly labeled as future work."
    >
      {/* ── Case studies ─────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug} delay={i * 0.08}>
            <button
              type="button"
              onClick={() => setOpen({ study, flow: study.flow })}
              className="group flex h-full w-full flex-col border hairline bg-panel/60 p-6 text-left transition-colors hover:border-accent/50"
              aria-label={`Open case study: ${study.title}`}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
                  CASE STUDY {study.index}
                </p>
                <StatusBadge status={study.state} />
              </div>
              <h3 className="mt-3 font-mono text-lg font-medium text-fg">{study.title}</h3>
              <p className="mt-0.5 font-mono text-[11px] text-muted">{study.tagline}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-fg/75">{study.summary}</p>
              <p className="mt-4 font-mono text-[11px] text-warn">{study.stateLabel}</p>
              <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-accent transition-transform group-hover:translate-x-0.5">
                OPEN CASE STUDY →
              </p>
            </button>
          </Reveal>
        ))}
      </div>

      {/* ── Growing C / Systems section ──────────────────────── */}
      <div className="mt-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-accent">GROWING SECTION</p>
          <h3 className="mt-2 font-mono text-xl font-medium text-fg sm:text-2xl">
            Experiments — systems practice, catalogued by roadmap layer
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            As I progress through the journey, real experiments land here — each one tagged
            with the roadmap layer it exercises. Planned work is labeled{" "}
            <span className="text-muted">PLANNED</span> or{" "}
            <span className="text-warn">EXPLORING</span> — it appears so the shape of the
            roadmap is visible, never as completed achievement.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cProjectCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col border hairline bg-panel/50 p-5">
                <h4 className="font-mono text-sm text-fg">{cat.title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{cat.description}</p>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-start justify-between gap-3">
                      <span className="text-[13px] leading-snug text-fg/80">{item.name}</span>
                      <span
                        className={`shrink-0 font-mono text-[9px] tracking-[0.15em] ${
                          statusText[item.status] ?? "text-muted"
                        }`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <CaseStudy
        study={open?.study ?? null}
        flow={open?.flow}
        onClose={() => setOpen(null)}
      />
    </Section>
  );
}