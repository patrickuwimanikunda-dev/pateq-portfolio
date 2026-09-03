"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSystem } from "@/context/SystemContext";
import type { AppId } from "@/context/SystemContext";
import { useTheme } from "@/context/ThemeContext";
import { appById, appImages, apps, dockApps, radialApps } from "@/components/desktop/apps";
import type { AppMeta } from "@/components/desktop/apps";
import RadialCore from "@/components/desktop/RadialCore";
import BrandMark from "@/components/ui/BrandMark";
import { site } from "@/lib/site";

const TOPBAR_H = 56;

/* ── Icon set (used as fallback glyphs) ───────────────────────── */

function Icon({ name, size = 15, className }: { name: string; size?: number; className?: string }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "user":
      return (<svg {...common}><circle cx="12" cy="8" r="3.4" /><path d="M5 20c1.6-3.4 4.2-5 7-5s5.4 1.6 7 5" /></svg>);
    case "folder":
      return (<svg {...common}><path d="M3.5 7.5h6l1.8 2.2h9.2v9.8a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5Z" /></svg>);
    case "route":
      return (<svg {...common}><circle cx="6" cy="19" r="2.4" /><circle cx="18" cy="5" r="2.4" /><path d="M8.4 19H14a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h6.6" /></svg>);
    case "chip":
      return (<svg {...common}><rect x="7" y="7" width="10" height="10" rx="1.6" /><path d="M12 2v5M12 17v5M2 12h5M17 12h5M7 2v5M7 17v5M17 2v5M17 17v5" /></svg>);
    case "compass":
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 5-5 2.2 2.2-5Z" /></svg>);
    case "loop":
      return (<svg {...common}><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 3v4h-4" /></svg>);
    case "cpu":
      return (<svg {...common}><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="10" y="10" width="4" height="4" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></svg>);
    case "layers":
      return (<svg {...common}><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /><path d="m3 17 9 5 9-5" opacity=".55" /></svg>);
    case "shield":
      return (<svg {...common}><path d="M12 3 5 5.8v5.4c0 4.4 3 8.4 7 9.8 4-1.4 7-5.4 7-9.8V5.8Z" /><path d="m9.2 12 2 2 3.6-4" /></svg>);
    case "spark":
      return (<svg {...common}><path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" /><path d="M19 15.5c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3Z" opacity=".7" /></svg>);
    case "check":
      return (<svg {...common}><rect x="4" y="3.5" width="16" height="17" rx="2.4" /><path d="m8.5 12 2.4 2.4 4.6-5" /></svg>);
    case "mail":
      return (<svg {...common}><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></svg>);
    case "term":
      return (<svg {...common}><rect x="3.5" y="4.5" width="17" height="15" rx="2.2" /><path d="m7 9.5 3 2.6-3 2.6M12.5 15h4.5" /></svg>);
    case "search":
      return (<svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>);
    case "sliders":
      return (<svg {...common}><path d="M4 8h10M18 8h2M4 16h2M10 16h10" /><circle cx="16" cy="8" r="2" /><circle cx="8" cy="16" r="2" /></svg>);
    case "home":
      return (<svg {...common}><path d="m4 11 8-7 8 7" /><path d="M6 9.5V20h12V9.5" /></svg>);
    case "close":
      return (<svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>);
    case "back":
      return (<svg {...common}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>);
    case "min":
      return (<svg {...common}><path d="M5 12h14" /></svg>);
    case "max":
      return (<svg {...common}><rect x="5" y="5" width="14" height="14" rx="2" /></svg>);
    case "restore":
      return (<svg {...common}><path d="M9 9V5.5A1.5 1.5 0 0 1 10.5 4H19a1.5 1.5 0 0 1 1.5 1.5V14A1.5 1.5 0 0 1 19 15.5H15.5" /><rect x="4" y="8.5" width="11" height="11" rx="1.5" /></svg>);
    case "sun":
      return (<svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" /></svg>);
    case "moon":
      return (<svg {...common}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg>);
    case "power":
      return (<svg {...common}><path d="M18.36 6.64A9 9 0 1 1 5.64 6.64" /><path d="M12 2v10" /></svg>);
    case "refresh":
      return (<svg {...common}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>);
    case "camera":
      return (<svg {...common}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" /></svg>);
    default:
      return (<svg {...common}><circle cx="12" cy="12" r="8" /></svg>);
  }
}

/** Real image when configured; glyph otherwise. */
function AppGlyph({ meta, size = 14 }: { meta: AppMeta; size?: number }) {
  const src = appImages[meta.id];
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className="object-cover"
        style={{ borderRadius: Math.max(3, size * 0.25) }}
      />
    );
  }
  return <Icon name={meta.icon} size={size} />;
}

/* ── Workspaces (Hyprland-style metaphor) ─────────────────────── */

const workspaces: { key: string; label: string; target: AppId | null; hotkey: string }[] = [
  { key: "home", label: "HOME", target: null, hotkey: "alt+1" },
  { key: "projects", label: "PROJECTS", target: "projects", hotkey: "alt+2" },
  { key: "journey", label: "JOURNEY", target: "journey", hotkey: "alt+3" },
  { key: "systems", label: "SYSTEMS", target: "systems", hotkey: "alt+4" },
  { key: "future", label: "FUTURE", target: "stack", hotkey: "alt+5" },
];

/* ── Settings helpers ─────────────────────────────────────────── */

const readSetting = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const writeSetting = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

/* ── Top bar (Caelestia-style) ────────────────────────────────── */

function TopBar({ onLauncher, onControl }: { onLauncher: () => void; onControl: () => void }) {
  const { activeApp, openApp, goHome } = useSystem();
  const { theme, toggleTheme } = useTheme();

  const workspaceActive = (target: AppId | null): boolean =>
    target === null ? activeApp === null : activeApp === target;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-edge/40 bg-bg/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-3 sm:px-5">
        {/* Brand */}
        <button
          type="button"
          onClick={goHome}
          aria-label="Return to the PATEQ desktop"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <BrandMark size={30} className="transition-transform group-hover:scale-105" />
          <span className="font-mono text-sm tracking-[0.3em] text-fg">{site.brand}</span>
        </button>

        {/* Workspace pills — Hyprland-style */}
        <nav aria-label="Workspaces" className="mx-auto hidden items-center gap-1 xl:flex">
          {workspaces.map((w) => {
            const active = workspaceActive(w.target);
            return (
              <button
                key={w.key}
                type="button"
                onClick={() => (w.target === null ? goHome() : openApp(w.target))}
                aria-current={active ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] transition-all duration-200 ${
                  active
                    ? "bg-accent/15 text-accent shadow-[0_0_16px_rgba(167,139,250,0.25)]"
                    : "text-muted hover:bg-panel/60 hover:text-fg"
                }`}
              >
                {w.label}
                {active && (
                  <span className="absolute -bottom-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:ml-0">
          {/* System status indicator */}
          <div className="mr-2 hidden items-center gap-1.5 sm:flex">
            <span className="status-blink h-1.5 w-1.5 rounded-full bg-ok" />
            <span className="font-mono text-[9px] tracking-[0.15em] text-ok/80">ONLINE</span>
          </div>

          <button
            type="button"
            onClick={onLauncher}
            aria-label="Open launcher"
            className="hidden h-8 items-center gap-2 rounded-full border border-edge/40 bg-panel/40 px-3 font-mono text-[10px] text-muted transition-colors hover:border-accent/40 hover:text-accent md:flex"
          >
            <Icon name="search" size={12} />
            <span className="tracking-[0.14em]">SEARCH</span>
            <kbd className="rounded border border-edge/30 px-1 text-[8px] text-muted/70">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={onLauncher}
            aria-label="Open launcher"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-edge/40 text-muted transition-colors hover:text-accent md:hidden"
          >
            <Icon name="search" size={14} />
          </button>
          <button
            type="button"
            onClick={onControl}
            aria-label="Open control center"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-edge/40 text-muted transition-colors hover:text-accent"
          >
            <Icon name="sliders" size={14} />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-edge/40 text-muted transition-colors hover:text-accent"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ── Dock (Caelestia-style) ───────────────────────────────────── */

function Dock() {
  const { activeApp, openApp, goHome } = useSystem();

  const activate = (id: AppId | null) => {
    if (id === null) goHome();
    else if (activeApp === id) goHome(); // toggle: click open app again → minimize to dock
    else openApp(id);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-2.5 sm:pb-3">
      <div className="pointer-events-auto glass-tight flex items-center gap-0.5 px-1.5 py-1.5 sm:px-2">
        <button
          type="button"
          onClick={() => activate(null)}
          aria-label="Desktop (home)"
          aria-current={activeApp === null ? "true" : undefined}
          title="Desktop"
          className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
            activeApp === null
              ? "bg-accent/15 text-accent shadow-[0_0_12px_rgba(167,139,250,0.2)]"
              : "text-muted hover:bg-panel/60 hover:text-fg"
          }`}
        >
          <Icon name="home" size={16} />
          {activeApp === null && (
            <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-accent" />
          )}
        </button>
        <span className="mx-1 h-5 w-px bg-edge/50" aria-hidden="true" />
        {dockApps.map((id) => {
          const m = appById(id);
          const active = activeApp === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => activate(id)}
              aria-label={`Open ${m.title}`}
              aria-current={active ? "true" : undefined}
              title={m.title}
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                active
                  ? "bg-accent/15 text-accent shadow-[0_0_12px_rgba(167,139,250,0.2)]"
                  : "text-muted hover:bg-panel/60 hover:text-fg hover:scale-110"
              }`}
            >
              <AppGlyph meta={m} size={18} />
              {active && (
                <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Toasts ───────────────────────────────────────────────────── */

function Toasts() {
  const { toasts, dismissToast } = useSystem();
  return (
    <div
      className="pointer-events-none fixed right-3 top-[4.2rem] z-[90] flex w-80 max-w-[calc(100vw-1.5rem)] flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: 24, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          className="glass-tight pointer-events-auto px-3.5 py-2.5"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-[11px] tracking-[0.12em] text-accent">{t.title}</p>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss notification"
              className="text-muted/70 transition-colors hover:text-fg"
            >
              <Icon name="close" size={11} />
            </button>
          </div>
          {t.body && <p className="mt-1 text-xs leading-snug text-fg/70">{t.body}</p>}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Launcher ─────────────────────────────────────────────────── */

function Launcher({ onClose }: { onClose: () => void }) {
  const { openApp, goHome, activeApp, notify } = useSystem();
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...apps.slice(0, 9)];
    return apps.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.kicker.toLowerCase().includes(q) ||
        a.blurb.toLowerCase().includes(q) ||
        a.keywords.toLowerCase().includes(q),
    );
  }, [query]);

  const launch = (id: AppId) => {
    const m = appById(id);
    openApp(id);
    notify(`Opened ${m.title}`, m.kicker);
    onClose();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[sel]) launch(results[sel].id);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[10vh] backdrop-blur-md" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.2, ease: [0.22, 0.8, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Application launcher"
        className="glass w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-edge/40 px-4 py-3">
          <Icon name="search" className="shrink-0 text-accent" />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKey}
            placeholder="Launch a view… (about, systems, terminal…)"
            aria-label="Launch a view"
            className="w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-muted/60"
          />
          <button type="button" onClick={onClose} aria-label="Close launcher" className="shrink-0 text-muted hover:text-fg">
            <Icon name="close" size={13} />
          </button>
        </div>

        {activeApp !== null && !query.trim() && (
          <button
            type="button"
            onClick={() => {
              goHome();
              onClose();
            }}
            className="flex w-full items-center gap-3 border-b border-edge/40 px-4 py-2.5 text-left transition-colors hover:bg-accent/10"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon name="home" size={13} />
            </span>
            <span>
              <span className="block font-mono text-sm text-fg">Desktop</span>
              <span className="block font-mono text-[10px] tracking-[0.15em] text-muted">RETURN TO THE ENVIRONMENT</span>
            </span>
          </button>
        )}

        <ul className="max-h-72 overflow-y-auto p-2">
          {results.map((a, i) => {
            const highlight = i === sel;
            return (
              <li key={a.id}>
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onClick={() => launch(a.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                    highlight ? "bg-accent/12 text-accent" : "hover:bg-panel/60"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-edge/40 ${
                      highlight ? "text-accent" : "text-muted"
                    }`}
                  >
                    <AppGlyph meta={a} size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-sm text-fg">{a.title}</span>
                    <span className="block truncate text-[11px] text-muted">
                      {a.kicker} — {a.blurb}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-xs text-muted">
              no view matches &quot;{query}&quot; — try systems, security, terminal
            </li>
          )}
        </ul>
        <div className="flex items-center justify-between border-t border-edge/40 px-4 py-2 font-mono text-[9px] tracking-[0.14em] text-muted/70">
          <span>↑↓ NAVIGATE · ENTER LAUNCH · ESC CLOSE</span>
          <span className="hidden sm:block">ALT+T TERMINAL · ALT+H HOME</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Control center (Caelestia-style) ──────────────────────────── */

function ControlCenter({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [motionMode, setMotionMode] = useState<"full" | "reduce">("full");
  const [atmos, setAtmos] = useState<"full" | "subtle">("full");
  const { notify, back } = useSystem();

  useEffect(() => {
    const id = window.setTimeout(() => {
      const m = readSetting("pateq:motion");
      const a = readSetting("pateq:atmos");
      if (m === "reduce" || m === "full") setMotionMode(m);
      if (a === "subtle" || a === "full") setAtmos(a);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", motionMode);
    writeSetting("pateq:motion", motionMode);
  }, [motionMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-atmos", atmos);
    writeSetting("pateq:atmos", atmos);
  }, [atmos]);

  const handleReboot = () => {
    notify("Rebooting", "Refreshing the environment…");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handlePoweroff = () => {
    notify("Shutting down", "Goodbye. The system will power off.");
    setTimeout(() => {
      document.documentElement.style.opacity = "0";
      document.documentElement.style.transition = "opacity 0.8s ease-out";
      setTimeout(() => {
        window.close();
        // Fallback: navigate to blank page if window.close doesn't work
        document.title = "PATEQ — System Offline";
      }, 800);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[80]" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, x: 12, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 12, scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.22, 0.8, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Control center"
        className="glass-tight absolute right-3 top-[4rem] max-h-[calc(100vh-5rem)] w-[19rem] max-w-[calc(100vw-1.5rem)] overflow-y-auto p-4 sm:right-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-edge/40 pb-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent">CONTROL CENTER</p>
          <button type="button" onClick={onClose} aria-label="Close control center" className="text-muted transition-colors hover:text-fg">
            <Icon name="close" size={12} />
          </button>
        </div>

        <section className="mt-3">
          <p className="font-mono text-[9px] tracking-[0.25em] text-muted">APPEARANCE</p>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {(["dark", "light"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => theme !== t && toggleTheme()}
                aria-pressed={theme === t}
                className={`rounded-lg border px-3 py-2 font-mono text-[11px] transition-colors ${
                  theme === t ? "border-accent/50 bg-accent/12 text-accent" : "border border-edge/40 text-muted hover:text-fg"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4">
          <p className="font-mono text-[9px] tracking-[0.25em] text-muted">MOTION</p>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {(["full", "reduce"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMotionMode(m);
                  notify("Motion", m === "reduce" ? "Reduced — animations minimised" : "Full — fluid transitions restored");
                }}
                aria-pressed={motionMode === m}
                className={`rounded-lg border px-3 py-2 font-mono text-[11px] transition-colors ${
                  motionMode === m ? "border-accent/50 bg-accent/12 text-accent" : "border border-edge/40 text-muted hover:text-fg"
                }`}
              >
                {m === "reduce" ? "REDUCED" : "FULL"}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4">
          <p className="font-mono text-[9px] tracking-[0.25em] text-muted">ATMOSPHERE</p>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {(["full", "subtle"] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAtmos(a)}
                aria-pressed={atmos === a}
                className={`rounded-lg border px-3 py-2 font-mono text-[11px] transition-colors ${
                  atmos === a ? "border-accent/50 bg-accent/12 text-accent" : "border border-edge/40 text-muted hover:text-fg"
                }`}
              >
                {a === "subtle" ? "MINIMAL" : "FULL"}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 border-t border-edge/40 pt-3">
          <p className="font-mono text-[9px] tracking-[0.25em] text-muted">NAVIGATION</p>
          <button
            type="button"
            onClick={() => {
              back();
              onClose();
            }}
            className="mt-1.5 flex w-full items-center gap-2 rounded-lg border border-edge/40 px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-muted transition-colors hover:text-accent"
          >
            <Icon name="back" size={12} /> BACK TO PREVIOUS VIEW
          </button>
        </section>

        <section className="mt-4 border-t border-edge/40 pt-3">
          <p className="font-mono text-[9px] tracking-[0.25em] text-muted">KEYBINDS</p>
          <ul className="mt-1.5 space-y-1 font-mono text-[10px] text-muted">
            <li><span className="text-fg/80">ALT+1–5</span> — workspaces (home, projects, journey, systems, future)</li>
            <li><span className="text-fg/80">ALT+T</span> — open terminal</li>
            <li><span className="text-fg/80">ALT+H</span> — back to desktop</li>
            <li><span className="text-fg/80">CTRL/CMD+K</span> — launcher</li>
            <li><span className="text-fg/80">ESC</span> — close overlay / window → desktop</li>
          </ul>
        </section>

        {/* Reboot and Poweroff */}
        <section className="mt-4 border-t border-edge/40 pt-3">
          <p className="font-mono text-[9px] tracking-[0.25em] text-muted">SYSTEM</p>
          <div className="mt-1.5 space-y-1.5">
            <button
              type="button"
              onClick={handleReboot}
              className="flex w-full items-center gap-2 rounded-lg border border-edge/40 px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-muted transition-all hover:border-warn/50 hover:bg-warn/10 hover:text-warn active:scale-[0.98]"
            >
              <Icon name="refresh" size={12} /> REBOOT ENVIRONMENT
            </button>
            <button
              type="button"
              onClick={handlePoweroff}
              className="flex w-full items-center gap-2 rounded-lg border border-edge/40 px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-muted transition-all hover:border-danger/50 hover:bg-danger/10 hover:text-danger active:scale-[0.98]"
            >
              <Icon name="power" size={12} /> POWER OFF
            </button>
          </div>
        </section>

        <p className="mt-4 border-t border-edge/40 pt-3 font-mono text-[9px] leading-relaxed tracking-[0.16em] text-muted/70">
          {site.brand} ENVIRONMENT v1.0
          <br />
          NO TELEMETRY · SETTINGS STAY IN YOUR BROWSER
        </p>
      </motion.div>
    </div>
  );
}

/* ── Desktop home ─────────────────────────────────────────────── */

function DesktopHome() {
  const { openApp } = useSystem();
  return (
    <div className="flex min-h-full flex-col items-center justify-center overflow-y-auto px-4 py-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center font-mono text-[10px] tracking-[0.3em] text-muted"
      >
        {site.role.toUpperCase()}
      </motion.p>

      <div className="hidden w-full sm:block">
        <RadialCore />
      </div>

      <div className="w-full max-w-md sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          {radialApps.map((id) => {
            const m = appById(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => openApp(id)}
                className="glass-tight flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:border-accent/40"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent">
                  <AppGlyph meta={m} size={13} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-mono text-[11px] text-fg">{m.title}</span>
                  <span className="block truncate font-mono text-[8px] tracking-[0.12em] text-muted">
                    {m.kicker}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 max-w-md px-4 text-center text-[13px] leading-relaxed text-muted">
        {site.name} — an engineer building from the machine upward. Everything on this
        desktop is a view of that journey. Open one from the core, the dock, or the
        launcher ({`⌘`}K).
      </p>
    </div>
  );
}

/* ── Floating window geometry helpers ─────────────────────────── */

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  max: boolean;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function defaultRect(id: AppId): Rect {
  const vw = typeof window === "undefined" ? 1200 : window.innerWidth;
  const vh = typeof window === "undefined" ? 800 : window.innerHeight;
  const availW = vw;
  const availH = vh - TOPBAR_H;

  const small = vw < 768;
  const terminal = id === "terminal";
  const w = small ? availW : Math.min(terminal ? 820 : 1080, availW * (terminal ? 0.8 : 0.92));
  const h = small ? availH : Math.min(terminal ? Math.min(620, availH - 40) : availH - 30, availH - 30);
  return {
    w,
    h,
    x: Math.max(8, Math.round((availW - w) / 2)),
    y: Math.max(8, Math.round((availH - h) / 2) + 6),
    max: small,
  };
}

/* ── Window frame (draggable, resizable, maximizable) ─────────── */

function AppWindow({ id }: { id: AppId }) {
  const { goHome } = useSystem();
  const reduce = useReducedMotion();
  const m = appById(id);
  const [rect, setRect] = useState<Rect>(() => defaultRect(id));
  const [drag, setDrag] = useState<{ mode: "move" | "resize"; sx: number; sy: number; r: Rect } | null>(null);

  const toggleMax = () => {
    setRect((r) => {
      if (!r.max) {
        return { ...r, max: true, w: window.innerWidth, h: window.innerHeight - TOPBAR_H, x: 0, y: 0 };
      }
      return defaultRect(id);
    });
  };

  const beginDrag = (mode: "move" | "resize") => (e: React.PointerEvent) => {
    if (rect.max || window.innerWidth < 768) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ mode, sx: e.clientX, sy: e.clientY, r: { ...rect } });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag || rect.max) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight - TOPBAR_H;
    if (drag.mode === "move") {
      const nx = drag.r.x + (e.clientX - drag.sx);
      const ny = drag.r.y + (e.clientY - drag.sy);
      setRect((r) => ({
        ...r,
        x: clamp(nx, 8, Math.max(8, vw - r.w - 8)),
        y: clamp(ny, 8, Math.max(8, vh - r.h - 8)),
      }));
    } else {
      const nw = clamp(drag.r.w + (e.clientX - drag.sx), 480, vw - 16);
      const nh = clamp(drag.r.h + (e.clientY - drag.sy), 360, vh - 16);
      setRect((r) => ({ ...r, w: nw, h: nh }));
    }
  };

  const endDrag = () => {
    setDrag(null);
  };

  const titleProps = {
    onPointerDown: beginDrag("move"),
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onDoubleClick: toggleMax,
    style: rect.max || window.innerWidth < 768 ? { cursor: "default" } : { cursor: "grab" },
  };

  return (
    <motion.div
      key={id}
      initial={reduce ? false : { opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 0.8, 0.3, 1] }}
      aria-label={`${m.title} window`}
      className="glass-window absolute flex flex-col overflow-hidden"
      style={
        rect.max
          ? { left: 6, top: 6, width: `calc(100% - 12px)`, height: `calc(100% - 12px)` }
          : { left: rect.x, top: rect.y, width: rect.w, height: rect.h }
      }
    >
      {/* Window chrome — Hyprland-style */}
      <div
        {...titleProps}
        className="flex select-none items-center gap-2.5 border-b border-edge/40 px-3 py-2.5"
        style={{ touchAction: "none" }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/12 text-accent">
          <AppGlyph meta={m} size={14} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-mono text-[13px] text-fg">{m.title}</p>
          <p className="hidden truncate font-mono text-[8.5px] tracking-[0.25em] text-muted sm:block">
            {m.kicker}
          </p>
        </div>
        {/* Responsive window controls */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goHome();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={`Minimize ${m.title} to dock`}
            title="Minimize"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-all duration-100 hover:bg-panel/60 hover:text-fg active:scale-90 active:bg-panel/80"
          >
            <Icon name="min" size={12} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMax();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={rect.max ? `Restore ${m.title}` : `Maximize ${m.title}`}
            title={rect.max ? "Restore" : "Maximize"}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-all duration-100 hover:bg-panel/60 hover:text-fg active:scale-90 active:bg-panel/80"
          >
            <Icon name={rect.max ? "restore" : "max"} size={11} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goHome();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={`Close ${m.title}`}
            title="Close"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-all duration-100 hover:bg-danger/20 hover:text-danger active:scale-90 active:bg-danger/30"
          >
            <Icon name="close" size={12} />
          </button>
        </div>
      </div>

      {/* body */}
      {m.fill ? (
        <div className="min-h-0 flex-1">{m.content}</div>
      ) : (
        <div className="window-body min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-10 pt-1 sm:px-5">
          {m.content}
        </div>
      )}

      {/* resize handle */}
      {!rect.max && window.innerWidth >= 768 && (
        <div
          onPointerDown={beginDrag("resize")}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-10 h-5 w-5 cursor-nwse-resize"
          style={{ touchAction: "none" }}
        />
      )}
    </motion.div>
  );
}

/* ── Shell (Caelestia desktop environment) ────────────────────── */

export default function PateqDesktop() {
  const { booted, activeApp, goHome, openApp } = useSystem();
  const [launcher, setLauncher] = useState(false);
  const [control, setControl] = useState(false);
  const reduce = useReducedMotion();

  // Global keybinds
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setLauncher((v) => !v);
        return;
      }

      if (e.altKey && !e.ctrlKey && !e.metaKey && !typing) {
        if (e.key === "1") { e.preventDefault(); goHome(); }
        else if (e.key === "2") { e.preventDefault(); openApp("projects"); }
        else if (e.key === "3") { e.preventDefault(); openApp("journey"); }
        else if (e.key === "4") { e.preventDefault(); openApp("systems"); }
        else if (e.key === "5") { e.preventDefault(); openApp("stack"); }
        else if (e.key.toLowerCase() === "h") { e.preventDefault(); goHome(); }
        else if (e.key.toLowerCase() === "t") { e.preventDefault(); openApp("terminal"); }
        return;
      }

      if (e.key === "Escape") {
        setLauncher(false);
        setControl(false);
        if (activeApp && !typing) goHome();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeApp, goHome, openApp]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-bg text-fg">
      {/* Caelestia atmospheric background with scanlines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {site.wallpaper ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.wallpaper}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/40 to-bg/85" />
          </>
        ) : (
          <>
            <div className={`bg-grid absolute inset-0 transition-opacity duration-500 ${activeApp ? "opacity-20" : "opacity-60"}`} />
            <div className="atmos-orb orb-drift left-[-8%] top-[-10%] h-[46vmax] w-[46vmax] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.34),transparent_65%)]" />
            <div className="atmos-orb orb-drift-2 bottom-[-16%] right-[-10%] h-[42vmax] w-[42vmax] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.28),transparent_65%)]" />
            <div className="atmos-orb orb-drift top-[32%] left-[38%] h-[34vmax] w-[34vmax] bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.12),transparent_65%)]" />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
              }}
            />
          </>
        )}
      </div>

      <TopBar onLauncher={() => setLauncher(true)} onControl={() => setControl(true)} />

      {/* content stage */}
      <main className="absolute inset-x-0 bottom-0 top-14">
        {/* blur + dim the desktop while a window is open */}
        <AnimatePresence>
          {activeApp && (
            <motion.div
              key="blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 backdrop-blur-md"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeApp ? (
            <AppWindow key={activeApp} id={activeApp} />
          ) : (
            <motion.div
              key="desktop"
              initial={booted ? { opacity: 0, scale: 0.97 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce || !booted ? 0 : 0.55, ease: "easeOut" }}
              className="h-full"
            >
              <DesktopHome />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Dock />
      <Toasts />

      <AnimatePresence>{launcher && <Launcher onClose={() => setLauncher(false)} />}</AnimatePresence>
      <AnimatePresence>{control && <ControlCenter onClose={() => setControl(false)} />}</AnimatePresence>

      {!activeApp && (
        <p className="pointer-events-none fixed bottom-4 right-4 z-30 hidden font-mono text-[9px] tracking-[0.3em] text-muted/50 md:block">
          {site.brand}://DESKTOP — SYSTEM ONLINE · NO TELEMETRY
        </p>
      )}
    </div>
  );
}
