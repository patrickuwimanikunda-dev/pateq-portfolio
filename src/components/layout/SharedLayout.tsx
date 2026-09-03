"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BrandMark from "@/components/ui/BrandMark";
import { useTheme } from "@/context/ThemeContext";
import { site } from "@/lib/site";
import TerminalView from "@/components/terminal/Terminal";
import EmailModal from "@/components/ui/EmailModal";

const nav = [
  { href: "/about", label: "About", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { href: "/projects", label: "Projects", icon: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
  { href: "/journey", label: "Journey", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { href: "/systems", label: "Systems", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" },
  { href: "/stack", label: "Stack", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { href: "/contact", label: "Contact", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
];

const bottomNav = [
  { href: "/", label: "Home", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { href: "/about", label: "About", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { href: "/projects", label: "Work", icon: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
  { href: "/contact", label: "Contact", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
];


/* ── Navbar ─────────────────────────────────────────────────── */

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface/50 backdrop-blur-xl shadow-md"
          : "bg-transparent"
      }`}>
        <div className={`mx-auto flex items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-10 ${
          scrolled
            ? "h-16 max-w-7xl rounded-b-2xl border-x border-b border-accent/20 shadow-lg shadow-accent/5"
            : "h-24 max-w-6xl border-b border-edge/10"
        }`}>
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <BrandMark size={scrolled ? 28 : 36} className="transition-all duration-300" />
            <span className={`font-sans font-bold tracking-tight text-fg transition-all duration-300 ${
              scrolled ? "text-base" : "text-xl"
            }`}>{site.brand}</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-1.5 lg:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                  isActive(n.href)
                    ? "text-accent"
                    : "text-muted hover:text-fg hover:bg-accent/10"
                }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={n.icon} />
                </svg>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button type="button" onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-accent/10 hover:text-accent">
              {theme === "dark" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg>
              )}
            </button>

            <a href={site.links.github} target="_blank" rel="noopener noreferrer"
              className="hidden px-4 py-2.5 text-sm font-semibold text-muted transition-colors duration-150 hover:text-fg hover:bg-accent/10 rounded-lg md:inline-block">
              GitHub
            </a>

            <Link href="/contact" className="hidden rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 sm:inline-block">
              Contact
            </Link>

            <button type="button" onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-accent/10 hover:text-accent lg:hidden">
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-3 top-[6rem] w-56 rounded-xl border border-accent/20 bg-surface p-2 shadow-xl sm:right-5">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-150 ${
                  isActive(n.href)
                    ? "text-accent"
                    : "text-muted hover:text-fg hover:bg-accent/10"
                }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={n.icon} />
                </svg>
                {n.label}
              </Link>
            ))}
            <div className="my-2 border-t border-edge/20" />
            <a href={site.links.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-fg hover:bg-panel/40">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Mobile bottom nav ──────────────────────────────────────── */

function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-accent/15 bg-surface/95 backdrop-blur-xl lg:hidden">
      <nav className="flex items-center justify-around px-2 py-2.5">
        {bottomNav.map((n) => (
          <Link key={n.href} href={n.href}
            className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors duration-150 ${
              pathname === n.href ? "text-accent" : "text-muted"
            }`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={n.icon} />
            </svg>
            <span className="text-[11px] font-semibold">{n.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

/* ── Scroll to top ──────────────────────────────────────────── */

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-edge/30 bg-surface/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-panel hover:text-accent sm:bottom-6 sm:right-6">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
    </button>
  );
}

/* ── Terminal toggle ─────────────────────────────────────────── */

function TerminalToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close terminal" : "Open terminal"}
        className={`fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 sm:bottom-8 sm:right-6 ${
          open
            ? "border-accent/40 bg-accent text-white shadow-accent/30 rotate-0"
            : "border-edge/30 bg-surface/90 text-muted hover:border-accent/40 hover:bg-panel hover:text-accent"
        }`}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        )}
      </button>

      <div
        className={`fixed inset-x-0 bottom-0 z-30 transition-all duration-500 ease-out ${
          open
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-4 sm:px-6 sm:pb-24">
          <div className="overflow-hidden rounded-t-2xl border border-b-0 border-edge/30 shadow-2xl shadow-black/30">
            <div className="h-[350px] sm:h-[420px]">
              <TerminalView />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */

function Footer() {
  const [emailOpen, setEmailOpen] = useState(false);

  return (
    <>
      <EmailModal open={emailOpen} onClose={() => setEmailOpen(false)} />
      <footer className="border-t border-edge/20 bg-surface/30 py-8 px-5 pb-20 sm:pb-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:gap-5">
          <BrandMark size={28} />
          <p className="text-sm font-medium text-fg">{site.name}</p>
          <p className="text-xs text-muted/50">{site.role}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted/50 sm:gap-5">
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">GitHub</a>
            {site.links.linkedin && <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>}
            {site.links.email && (
              <button onClick={() => setEmailOpen(true)} className="transition-colors hover:text-accent cursor-pointer">
                Email
              </button>
            )}
          </div>
          <p className="text-[11px] text-muted/30">No telemetry · No trackers · Built from the machine upward</p>
        </div>
      </footer>
    </>
  );
}

/* ── Shared Layout ──────────────────────────────────────────── */

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Grid background — visible in center, fades at edges */}
      <div
        className="bg-grid pointer-events-none fixed inset-0 z-0"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>

      <ScrollToTop />
      <TerminalToggle />
      <MobileBottomNav />
    </div>
  );
}
