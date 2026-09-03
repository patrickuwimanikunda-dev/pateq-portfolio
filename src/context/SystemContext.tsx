"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/** Apps available inside the PATEQ desktop environment. */
export type AppId =
  | "about"
  | "projects"
  | "journey"
  | "systems"
  | "why"
  | "philosophy"
  | "hood"
  | "stack"
  | "security"
  | "ai"
  | "evidence"
  | "contact"
  | "terminal";

export interface Toast {
  id: number;
  title: string;
  body?: string;
}

interface SystemState {
  /** Whether the boot sequence has finished and the system is 'online'. */
  booted: boolean;
  dismissBoot: () => void;
  /** The app window currently open (null = desktop / home). */
  activeApp: AppId | null;
  openApp: (id: AppId) => void;
  goHome: () => void;
  /** Stack of recent apps, for back-navigation within the shell. */
  back(): void;
  toasts: Toast[];
  notify: (title: string, body?: string) => void;
  dismissToast: (id: number) => void;
}

const SystemContext = createContext<SystemState>({
  booted: false,
  dismissBoot: () => {},
  activeApp: null,
  openApp: () => {},
  goHome: () => {},
  back: () => {},
  toasts: [],
  notify: () => {},
  dismissToast: () => {},
});

export function SystemProvider({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [history, setHistory] = useState<AppId[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const dismissBoot = useCallback(() => {
    setBooted(true);
    try {
      sessionStorage.setItem("pateq:booted", "1");
    } catch {
      /* private mode — non-fatal */
    }
  }, []);

  // Remember past visits so the boot sequence does not repeat.
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem("pateq:booted") === "1") {
          setBooted(true);
        }
      } catch {
        /* ignore */
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const openApp = useCallback((id: AppId) => {
    setHistory((h) => {
      if (h[h.length - 1] === id) return h;
      return [...h.slice(-8), id];
    });
    setActiveApp(id);
    window.scrollTo({ top: 0 });
  }, []);

  const goHome = useCallback(() => {
    setActiveApp(null);
  }, []);

  const back = useCallback(() => {
    if (history.length <= 1) {
      setHistory([]);
      setActiveApp(null);
      return;
    }
    const next = history.slice(0, -1);
    setHistory(next);
    setActiveApp(next[next.length - 1]);
  }, [history]);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const notify = useCallback((title: string, body?: string) => {
    toastId.current += 1;
    const id = toastId.current;
    setToasts((t) => [...t.slice(-3), { id, title, body }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  return (
    <SystemContext.Provider
      value={{
        booted,
        dismissBoot,
        activeApp,
        openApp,
        goHome,
        back,
        toasts,
        notify,
        dismissToast,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  return useContext(SystemContext);
}
