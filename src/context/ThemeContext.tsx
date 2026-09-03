"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "pateq:theme";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeState>({
  theme: "dark",
  toggleTheme: () => {},
});

/**
 * Set the theme before first paint. Inlined in <body> so there is no
 * flash of the wrong theme: reads localStorage, falls back to dark.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t="dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start dark; corrected on mount from the attribute the inline script set.
  const [theme, setTheme] = useState<Theme>("dark");

  // Sync React state with the attribute the inline script set (after paint,
  // so the initial render always matches the server HTML).
  useEffect(() => {
    const id = window.setTimeout(() => {
      const current = document.documentElement.getAttribute("data-theme");
      if (current === "light" || current === "dark") setTheme(current);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — non-fatal */
    }
    setTheme(next);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
