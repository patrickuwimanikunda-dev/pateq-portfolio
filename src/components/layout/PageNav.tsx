"use client";

export const pages = [
  { label: "Home", path: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
  { label: "About", path: "/about", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { label: "Projects", path: "/projects", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
  { label: "Journey", path: "/journey", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Systems", path: "/systems", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" },
  { label: "Stack", path: "/stack", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { label: "Contact", path: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export function Breadcrumbs({ currentPage }: { currentPage: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--muted)] mt-24 mb-4 px-6">
      <a href="/" className="hover:text-[var(--fg)] transition-colors">Home</a>
      <span>/</span>
      <span className="text-[var(--fg)]">{currentPage}</span>
    </nav>
  );
}

export function PrevNext({ currentPath }: { currentPath: string }) {
  const idx = pages.findIndex((p) => p.path === currentPath);
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;

  return (
    <div className="flex justify-between items-center mt-16 mb-12">
      {prev ? (
        <a href={prev.path} className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="M15 19l-7-7 7-7"/></svg>
          {prev.label}
        </a>
      ) : <div />}
      {next ? (
        <a href={next.path} className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors group">
          {next.label}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M9 5l7 7-7 7"/></svg>
        </a>
      ) : <div />}
    </div>
  );
}
