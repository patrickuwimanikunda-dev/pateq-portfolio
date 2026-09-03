"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { appById, radialApps } from "@/components/desktop/apps";
import { useSystem } from "@/context/SystemContext";
import type { AppId } from "@/context/SystemContext";
import BrandMark from "@/components/ui/BrandMark";

const NODE_RADIUS = 32; // % of half-size where nodes orbit

export default function RadialCore() {
  const { openApp, notify } = useSystem();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<AppId | null>(null);
  const meta = hovered ? appById(hovered) : null;

  const angleFor = (i: number) => (-90 + (360 / radialApps.length) * i) * (Math.PI / 180);

  return (
    <div className="relative mx-auto w-full max-w-[min(92vw,600px)]" aria-label="System core navigation">
      <div className="relative aspect-square">
        {/* Caelestia decorative rings */}
        <div aria-hidden="true" className="absolute inset-0">
          {/* Outer ring — static */}
          <div className="absolute inset-0 rounded-full border border-edge/50 opacity-70" />
          {/* Second ring — slow spin */}
          <div className="absolute inset-[7%] rounded-full border border-dashed border-accent/20 opacity-60 core-spin" />
          {/* Third ring — static with accent glow */}
          <div className="absolute inset-[14%] rounded-full border border-edge/40 opacity-50" />
          {/* Inner ring — reverse spin */}
          <div className="absolute inset-[22%] rounded-full border border-dashed border-accent/15 opacity-50 core-spin-reverse" />
          {/* Core glow */}
          <div className="absolute inset-[35%] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.08),transparent_70%)]" />
        </div>

        {/* Node orbit ring — subtle guide */}
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute rounded-full border border-dotted border-edge/30"
            style={{
              left: `${50 - NODE_RADIUS}%`,
              top: `${50 - NODE_RADIUS}%`,
              width: `${NODE_RADIUS * 2}%`,
              height: `${NODE_RADIUS * 2}%`,
            }}
          />
        </div>

        {/* node anchor ticks (on the node orbit) */}
        <div aria-hidden="true" className="absolute inset-0">
          {radialApps.map((id, i) => {
            const a = angleFor(i);
            const x = 50 + Math.cos(a) * NODE_RADIUS;
            const y = 50 + Math.sin(a) * NODE_RADIUS;
            return (
              <span
                key={id}
                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60 shadow-[0_0_8px_rgba(167,139,250,0.4)]"
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            );
          })}
        </div>

        {/* orbit nodes — Caelestia glass pills */}
        {radialApps.map((id, i) => {
          const a = angleFor(i);
          const x = 50 + Math.cos(a) * NODE_RADIUS;
          const y = 50 + Math.sin(a) * NODE_RADIUS;
          const active = hovered === id;
          const m = appById(id);
          return (
            <button
              key={id}
              type="button"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(id)}
              onBlur={() => setHovered(null)}
              onClick={() => {
                openApp(id);
                notify(`Opened ${m.title}`, m.kicker);
              }}
              aria-label={`Open ${m.title} — ${m.blurb}`}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] transition-all duration-200 ${
                active
                  ? "scale-110 border border-accent/60 bg-accent/15 text-accent shadow-[0_0_28px_rgba(167,139,250,0.4)]"
                  : "glass-tight text-fg/75 hover:border-accent/40 hover:text-fg hover:scale-105"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-accent/80" aria-hidden="true" />
              {m.title.toUpperCase()}
            </button>
          );
        })}

        {/* center core — Caelestia brand mark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={reduce ? false : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <BrandMark size={88} squared className="glow-accent" />
            <p className="mt-3 font-mono text-lg tracking-[0.45em] text-fg">PATEQ</p>
            <p className="mt-1 font-mono text-[9px] tracking-[0.3em] text-muted">
              SYSTEM CORE · v1.0
            </p>
          </motion.div>
        </div>
      </div>

      {/* contextual readout */}
      <div aria-live="polite" className="mx-auto -mt-2 h-16 max-w-md text-center">
        {meta ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-accent">{meta.kicker}</p>
            <p className="mt-1 text-sm leading-snug text-fg/85">{meta.blurb}</p>
          </motion.div>
        ) : (
          <p className="px-6 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-muted">
            SELECT A NODE TO OPEN A VIEW
            <br />
            <span className="text-muted/60">hover to inspect · click to enter · ⌘K for launcher</span>
          </p>
        )}
      </div>
    </div>
  );
}
