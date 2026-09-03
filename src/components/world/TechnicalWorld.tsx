"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import StatusBadge from "@/components/ui/StatusBadge";
import { nodeById, phaseOrder, worldEdges, worldNodes, WORLD_H, WORLD_W } from "@/lib/data/technicalWorld";
import { useSystem } from "@/context/SystemContext";

const statusDot: Record<string, string> = {
  LEARNING: "bg-accent",
  BUILDING: "bg-ok",
  EXPLORING: "bg-warn",
  PLANNED: "bg-muted",
  MASTERED: "bg-accent-2",
  COMPLETED: "bg-accent-2",
};

function edgePath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  return `M ${x1} ${y1} C ${x1 + dx * 0.45} ${y1}, ${x2 - dx * 0.45} ${y2}, ${x2} ${y2}`;
}



/** Horizontal bands derived from each tier's node spread. */
function usePhaseBands() {
  return useMemo(() => {
    const bands: { phase: string; top: number; bottom: number }[] = [];
    for (const phase of phaseOrder) {
      const nodes = worldNodes.filter((n) => n.phase === phase);
      if (nodes.length === 0) continue;
      const ys = nodes.map((n) => n.y);
      bands.push({ phase, top: Math.min(...ys) - 72, bottom: Math.max(...ys) + 72 });
    }
    return bands;
  }, []);
}

const convergences = [
  {
    from: "LINUX + NETWORKING + SYSTEMS + SECURITY",
    to: "DISTRIBUTED INFRASTRUCTURE",
  },
  {
    from: "PYTHON + SYSTEMS + GPUS + DISTRIBUTED",
    to: "AI INFRASTRUCTURE",
  },
  {
    from: "C++ + MATH + ALGORITHMS + HPC + SYSTEMS",
    to: "QUANTITATIVE ENGINEERING",
  },
];

const liveProjects = [
  {
    name: "MediFlow Rwanda",
    sub: "Healthcare flow management — data, systems thinking, external integrations",
  },
  {
    name: "SafeDriveRW / Guardex",
    sub: "Embedded ESP32 vehicle safety — real C/C++ firmware practice on hardware",
  },
];

export default function TechnicalWorld({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState("c");
  const reduce = useReducedMotion();
  const { openApp } = useSystem();
  const selected = nodeById(selectedId);
  const bands = usePhaseBands();

  const edges = useMemo(
    () =>
      worldEdges.map(([from, to]) => {
        const a = nodeById(from);
        const b = nodeById(to);
        return { from: a.id, to: b.id, d: edgePath(a.x, a.y, b.x, b.y) };
      }),
    [],
  );

  return (
    <Section
      id="world"
      className={className}
      kicker="01 // MY TECHNICAL WORLD"
      title="One journey. Many tracks. One direction."
      intro="C is the root of this tree — not the whole tree. Each language enters when the engineering problem needs it, each layer is the foundation of the next, and the paths converge toward distributed infrastructure, AI infrastructure, and quantitative engineering. Select a node to inspect it."
    >
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* ── Diagram (desktop) ─────────────────────────────── */}
        <div className="hidden lg:block">
          <Reveal>
            <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-muted">
              SELECT A NODE · {worldNodes.length} LAYERS · {worldEdges.length} CONNECTIONS ·{" "}
              {phaseOrder.length} TIERS · <span className="text-accent">open ai</span> /{" "}
              <span className="text-accent">open security</span> IN THE TERMINAL
            </p>
            <div
              className="relative border hairline bg-bg/60"
              style={{ aspectRatio: `${WORLD_W}/${WORLD_H}` }}
            >
              {/* phase bands */}
              {bands.map((b) => (
                <div
                  key={b.phase}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 border-y hairline bg-panel/20"
                  style={{ top: `${(b.top / WORLD_H) * 100}%`, height: `${((b.bottom - b.top) / WORLD_H) * 100}%` }}
                >
                  <span className="absolute left-2 top-1.5 font-mono text-[8px] tracking-[0.28em] text-muted/70">
                    {b.phase}
                  </span>
                </div>
              ))}

              {/* connections */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {edges.map((e, i) => (
                  <g key={`${e.from}-${e.to}`}>
                    <path
                      d={e.d}
                      fill="none"
                      style={{ stroke: "var(--edge-soft)" }}
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    {!reduce && (
                      <circle r="2.6" style={{ fill: "var(--accent-core)" }}>
                        <animateMotion
                          dur={`${2.6 + (i % 3) * 0.6}s`}
                          repeatCount="indefinite"
                          path={e.d}
                          keyPoints="0;1"
                          keyTimes="0;1"
                          calcMode="linear"
                        />
                      </circle>
                    )}
                  </g>
                ))}
              </svg>

              {/* nodes */}
              {worldNodes.map((n) => {
                const active = n.id === selectedId;
                const isProject = n.kind === "project";
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setSelectedId(n.id)}
                    aria-pressed={active}
                    aria-label={`${n.label} — ${n.sub}`}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1.5 text-center transition-all duration-200 ${
                      active
                        ? "z-10 border border-accent/70 bg-accent/10 shadow-[0_0_24px_rgba(125,211,252,0.25)]"
                        : "border hairline bg-bg/85 hover:border-accent/40 hover:bg-panel"
                    } ${isProject ? "border-dashed" : ""}`}
                    style={{
                      left: `${(n.x / WORLD_W) * 100}%`,
                      top: `${(n.y / WORLD_H) * 100}%`,
                      width: "11.5rem",
                    }}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <span
                        className={`h-1 w-1 rounded-full ${statusDot[n.status] ?? "bg-muted"}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`font-mono text-[11px] tracking-[0.08em] ${
                          active ? "text-accent" : "text-fg/85"
                        }`}
                      >
                        {n.label}
                      </span>
                    </span>
                    <span className="mt-0.5 block font-mono text-[8.5px] tracking-[0.1em] text-muted">
                      {n.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* ── Detail panel ──────────────────────────────────── */}
        <div aria-live="polite">
          <Reveal delay={0.1}>
            <div className="border hairline bg-panel/70 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 border-b hairline pb-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
                    {selected.kind === "project" ? "PROJECT" : "LAYER"} · {selected.phase}
                  </p>
                  <h3 className="mt-1 font-mono text-lg font-medium text-fg">{selected.label}</h3>
                  <p className="mt-0.5 font-mono text-[11px] text-muted">{selected.sub}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                    WHAT IT IS
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-fg/85">{selected.what}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                    WHY IT MATTERS
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-fg/85">{selected.why}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                    WHAT I AM LEARNING
                  </dt>
                  <dd className="mt-1.5">
                    <ul className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
                      {selected.learning.map((l) => (
                        <li key={l} className="flex gap-2 leading-relaxed text-fg/80">
                          <span className="text-accent" aria-hidden="true">
                            ·
                          </span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                    TECHNOLOGIES
                  </dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {selected.technologies.map((t) => (
                      <span
                        key={t}
                        className="border hairline px-2 py-0.5 font-mono text-[11px] text-fg/75"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
                {selected.connects.length > 0 && (
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                      CONNECTS TO
                    </dt>
                    <dd className="mt-1.5 flex flex-wrap gap-1.5">
                      {selected.connects.map((id) => {
                        const c = nodeById(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setSelectedId(id)}
                            className="border border-accent/30 px-2 py-0.5 font-mono text-[11px] text-accent transition-colors hover:bg-accent/10"
                          >
                            {c.label} →
                          </button>
                        );
                      })}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                    WHERE IT LEADS
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-fg/85">{selected.leads}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-muted">
                    ROADMAP ROLE
                  </dt>
                  <dd className="mt-1.5">
                    <p className="text-sm leading-relaxed text-muted">
                      Part of the living roadmap — when this layer advances, its status changes
                      here first and the projects that prove it land in the PROJECTS section.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Convergence strip ───────────────────────────────── */}
      <Reveal delay={0.05}>
        <div className="mt-12 border hairline bg-panel/40 p-5 sm:p-6">
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
            WHERE THE PATHS CONVERGE
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {convergences.map((c) => (
              <div key={c.to} className="border hairline bg-bg/40 p-3.5">
                <p className="font-mono text-[9px] leading-relaxed tracking-[0.12em] text-muted">
                  {c.from}
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-fg">→ {c.to}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted">
            ONE PATH, ONE DESTINATION: THE ENGINEER WHO CAN READ EVERY LAYER. C IS THE ROOT,
            NOT THE WHOLE TREE.
          </p>
        </div>
      </Reveal>

      {/* ── Mobile grouped list ─────────────────────────────── */}
      <div className="mt-10 space-y-8 lg:hidden">
        <p className="font-mono text-[10px] tracking-[0.25em] text-muted">
          THE JOURNEY AS A SYSTEM · TAP A LAYER
        </p>
        {phaseOrder.map((phase) => {
          const nodes = worldNodes.filter((n) => n.phase === phase);
          if (nodes.length === 0) return null;
          return (
            <div key={phase}>
              <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-accent/80">
                {phase}
              </p>
              <ul className="border hairline bg-bg/60">
                {nodes.map((n, i) => {
                  const active = n.id === selectedId;
                  return (
                    <li key={n.id} className="border-b hairline last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setSelectedId(n.id)}
                        aria-pressed={active}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                          active ? "bg-accent/10" : "hover:bg-panel"
                        }`}
                      >
                        <span className="w-6 shrink-0 font-mono text-[10px] text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            statusDot[n.status] ?? "bg-muted"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block font-mono text-xs ${
                              active ? "text-accent" : "text-fg/85"
                            }`}
                          >
                            {n.label}
                          </span>
                          <span className="block truncate font-mono text-[10px] text-muted">
                            {n.sub}
                          </span>
                        </span>
                        <span className="shrink-0 font-mono text-[9px] tracking-[0.15em] text-muted">
                          {n.status}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ── Live projects on the map ────────────────────────── */}
      <Reveal delay={0.1}>
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
              BUILDING NOW — PROJECTS LIVE ON THIS MAP
            </p>
            <p className="font-mono text-[10px] text-muted">
              each project is a node: it exercises layers above and unlocks layers below
            </p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {liveProjects.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => openApp("projects")}
                className="group flex items-start justify-between gap-4 border hairline bg-panel/60 p-5 text-left transition-colors hover:border-accent/50"
              >
                <div>
                  <p className="font-mono text-sm text-fg group-hover:text-accent">{p.name}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.sub}</p>
                </div>
                <span className="shrink-0">
                  <StatusBadge status="BUILDING" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
