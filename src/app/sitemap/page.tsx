"use client";

import { useTheme } from "../../context/ThemeContext";
import Reveal from "../../components/ui/Reveal";

const sections = [
  { label: "Home", path: "/", description: "Welcome — hero, stats, and quick links to everything.", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
  { label: "About", path: "/about", description: "Who I am, what drives me, and the questions I keep asking.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { label: "Projects", path: "/projects", description: "Case studies — what I built, why, and how it turned out.", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
  { label: "Journey", path: "/journey", description: "Timeline of career moves, pivots, and turning points.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Systems", path: "/systems", description: "Interactive map of my technical domains.", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" },
  { label: "Stack", path: "/stack", description: "Technical depth — tools, languages, and proficiency levels.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { label: "Contact", path: "/contact", description: "How to reach me — email, GitHub, LinkedIn, X.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default function SitemapPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      <nav className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--muted)] mb-4">
        <a href="/" className="hover:text-[var(--fg)] transition-colors">Home</a>
        <span>/</span>
        <span className="text-[var(--fg)]">Sitemap</span>
      </nav>

      <Reveal>
        <h1 className="text-3xl font-bold text-[var(--fg)] mb-2">Sitemap</h1>
        <p className="text-[var(--muted)] mb-10">Every section of this site, one click away.</p>
      </Reveal>

      <div className="space-y-3">
        {sections.map((s, i) => (
          <Reveal key={s.path} delay={i * 0.05}>
            <a
              href={s.path}
              className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-all group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)] mt-0.5 shrink-0">
                <path d={s.icon}/>
              </svg>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">{s.label}</div>
                <div className="text-xs text-[var(--muted)] mt-0.5">{s.description}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
