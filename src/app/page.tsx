"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Typewriter from "@/components/ui/Typewriter";
import { site } from "@/lib/site";

const stats = [
  { value: "2+", label: "Projects Built" },
  { value: "5+", label: "Technologies" },
  { value: "3", label: "Career Tracks" },
  { value: "100%", label: "Honest States" },
];

const quickLinks = [
  { href: "/about", label: "About", desc: "Who I am and why I build", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { href: "/projects", label: "Projects", desc: "What I have built and building", icon: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
  { href: "/journey", label: "Journey", desc: "The long-term path", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { href: "/systems", label: "Systems", desc: "My technical world", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" },
  { href: "/stack", label: "Stack", desc: "Technical depth and future", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { href: "/contact", label: "Contact", desc: "Let's talk systems", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 pt-10 pb-16 sm:min-h-[85vh] sm:px-6">
        <div className="absolute inset-0">
          <div className="absolute left-[-20%] top-[-30%] h-[80vmax] w-[80vmax] animate-pulse bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06),transparent_70%)]" style={{ animationDuration: "10s" }} />
          <div className="absolute bottom-[-30%] right-[-15%] h-[60vmax] w-[60vmax] animate-pulse bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_70%)]" style={{ animationDuration: "14s", animationDelay: "3s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Reveal delay={0.1}>
            <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {site.name}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 text-base font-medium text-accent sm:mt-5 sm:text-lg md:text-xl">
              <Typewriter
                phrases={[
                  "Systems Engineering",
                  "AI Infrastructure",
                  "Cybersecurity",
                  "HPC",
                  "Quantitative Engineering",
                ]}
                typingSpeed={70}
                deletingSpeed={35}
                pauseAfterType={2200}
                pauseAfterDelete={300}
              />
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
              {site.direction}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 sm:px-7 sm:py-3">
                View my work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-edge/40 px-5 py-2.5 text-sm font-semibold text-fg transition-all duration-200 hover:border-accent/40 hover:bg-panel/30 sm:px-7 sm:py-3">
                Get in touch
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-muted/60 sm:mt-14 sm:gap-6 sm:text-sm">
              <span>{site.location}</span>
              <span className="hidden h-1 w-1 rounded-full bg-edge sm:block" />
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">GitHub</a>
              {site.links.linkedin && (
                <>
                  <span className="hidden h-1 w-1 rounded-full bg-edge sm:block" />
                  <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
                </>
              )}
              {site.links.email && (
                <>
                  <span className="hidden h-1 w-1 rounded-full bg-edge sm:block" />
                  <a href={`mailto:${site.links.email}`} className="transition-colors hover:text-accent">Email</a>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-edge/20 bg-surface/30">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-1 py-6 px-4 sm:py-8">
                <span className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">{s.value}</span>
                <span className="text-[11px] font-medium text-muted sm:text-xs">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-center text-xs font-medium tracking-widest text-accent">EXPLORE</p>
            <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-fg sm:text-3xl">Where do you want to go?</h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted">Each section is a deep look at a different part of the journey.</p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link, i) => (
              <Reveal key={link.href} delay={i * 0.08}>
                <Link href={link.href}
                  className="group flex items-start gap-4 rounded-xl border border-edge/30 bg-panel/30 p-5 transition-all duration-200 hover:border-accent/40 hover:bg-panel/50 hover:shadow-lg hover:shadow-accent/5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={link.icon} />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-fg group-hover:text-accent">{link.label}</p>
                    <p className="mt-0.5 text-xs text-muted">{link.desc}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto mt-1 shrink-0 text-muted/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
