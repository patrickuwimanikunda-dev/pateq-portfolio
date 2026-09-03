"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BrandMark from "@/components/ui/BrandMark";
import { site } from "@/lib/site";

function Spinner({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-edge/60">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function BootScreen({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion();
  const lines = site.bootLines;
  const onEnterCalled = useRef(false);

  const [done, setDone] = useState<number[]>([]);
  const [cur, setCur] = useState(0);
  const [word, setWord] = useState(0);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  // MAIN BOOT TIMER — single setTimeout chain, no closures, no refs
  useEffect(() => {
    if (reduce) return;

    let line = 0;
    let w = 0;
    let id: ReturnType<typeof setTimeout>;

    function step() {
      if (line >= lines.length) {
        setFinished(true);
        setProgress(100);
        // Enter immediately
        id = setTimeout(() => {
          if (!onEnterCalled.current) {
            onEnterCalled.current = true;
            onEnter();
          }
        }, 200);
        return;
      }

      const words = lines[line].split(" ");
      w++;

      if (w > words.length) {
        // Line done
        setDone((d) => [...d, line]);
        line++;
        w = 0;
        setCur(line);
        setWord(0);
        setProgress(Math.round((line / lines.length) * 100));
        id = setTimeout(step, 50);
      } else {
        setWord(w);
        setProgress(Math.round(((line + w / words.length) / lines.length) * 100));
        id = setTimeout(step, 30);
      }
    }

    id = setTimeout(step, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  // Reduced motion: instant enter
  useEffect(() => {
    if (reduce && !onEnterCalled.current) {
      onEnterCalled.current = true;
      onEnter();
    }
  }, [reduce, onEnter]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      aria-label={`${site.brand} system initialization`}
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="atmos-orb left-[15%] top-[10%] h-[50vmax] w-[50vmax] bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.15),transparent_65%)]" />
        <div className="atmos-orb bottom-[-10%] right-[10%] h-[45vmax] w-[45vmax] bg-[radial-gradient(circle_at_center,rgba(142,162,255,0.12),transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }} />
      </div>

      <div className="relative w-full max-w-lg px-6">
        {/* Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="scale-100 opacity-100">
            <BrandMark size={88} squared className="glow-accent" />
          </div>
          <p className="mt-4 font-mono text-2xl tracking-[0.5em] text-fg">{site.brand}</p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-muted">{site.role}</p>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <ProgressBar progress={progress} />
        </div>

        {/* Boot log */}
        <div className="glass-tight mt-6 overflow-hidden px-5 py-4">
          <div className="mb-3 flex items-center gap-2 border-b border-edge/40 pb-3">
            <span className="h-2 w-2 rounded-full bg-danger/80" />
            <span className="h-2 w-2 rounded-full bg-warn/80" />
            <span className="h-2 w-2 rounded-full bg-ok/80" />
            <span className="ml-2 font-mono text-[9px] tracking-[0.2em] text-muted/60">pateq-init — boot sequence</span>
          </div>

          <div className="space-y-1.5 font-mono text-[12px]">
            {lines.map((line, i) => {
              const isDone = done.includes(i);
              const isCur = i === cur && !isDone && !finished;
              const words = line.split(" ");
              const show = isDone ? words.length : isCur ? word : 0;

              return (
                <div key={i} className="flex items-start gap-3 py-0.5">
                  <span className={`mt-px shrink-0 ${isDone ? "text-ok" : isCur ? "text-accent" : "text-muted/20"}`}>
                    {isDone ? <span className="text-[10px]">✓</span> : isCur ? <Spinner /> : <span className="text-[10px]">○</span>}
                  </span>
                  <span className={`min-h-[18px] ${isDone ? "text-fg/80" : isCur ? "text-fg/70" : "text-fg/0"}`}>
                    {isDone ? line : isCur ? (
                      <span>
                        {words.slice(0, show).join(" ")}
                        {show < words.length && <span className="ml-0.5 inline-block h-[14px] w-[7px] animate-pulse bg-accent/80 align-middle" />}
                      </span>
                    ) : null}
                  </span>
                  {isDone && <span className="ml-auto shrink-0 text-[9px] text-muted/50">{Math.floor(Math.random() * 40 + 8)}ms</span>}
                </div>
              );
            })}
          </div>

          {finished && (
            <div className="mt-3 border-t border-edge/40 pt-3">
              <p className="text-[10px] text-ok">[ OK ] entering environment</p>
            </div>
          )}
        </div>

        <p className="mt-6 text-center font-mono text-[9px] tracking-[0.25em] text-muted/40">
          {site.brand}://INIT — v1.0 · NO TELEMETRY
        </p>
      </div>
    </motion.div>
  );
}
