"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import BrandMark from "@/components/ui/BrandMark";
import { site } from "@/lib/site";

const questions = [
  "What is happening?",
  "Why is it happening?",
  "Where is it happening?",
  "How does it work?",
  "Which layer is responsible?",
  "What is underneath the abstraction?",
  "How does software interact with memory?",
  "How does software interact with the CPU?",
  "How does the OS manage it?",
  "How does the network transport it?",
  "How can it be made secure?",
  "How can it be made faster?",
  "How can it scale?",
];

export default function About({ className }: { className?: string }) {
  const hasPhoto = Boolean(site.photo);

  return (
    <section id="about" className={`py-24 sm:py-28 ${className ?? ""}`}>
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <span className="text-[13px] font-medium text-[var(--accent)] uppercase tracking-wider">
            About
          </span>
          <h1 className="mt-3 text-3xl font-bold text-[var(--fg)] sm:text-4xl">
            The story, honestly told
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Not a corporate biography. Just where I am, how I got here, and why I am going where I am going.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          {/* Portrait */}
          <Reveal>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--bg)]">
                {hasPhoto ? (
                  <Image
                    src={site.photo}
                    alt={`Portrait of ${site.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 92vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <BrandMark size={64} className="mb-4 opacity-30" variant="dragon" />
                    <p className="px-8 text-center text-[13px] text-[var(--muted)]">
                      PORTRAIT SLOT
                    </p>
                    <p className="mt-2 text-[11px] text-[var(--muted)]/60">
                      Set photo in src/lib/site.ts
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between border-b border-[var(--border)] pb-3">
                  <span className="text-[var(--muted)]">NAME</span>
                  <span className="font-medium text-[var(--fg)]">{site.name}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-3">
                  <span className="text-[var(--muted)]">BASED IN</span>
                  <span className="font-medium text-[var(--fg)]">{site.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">CAREER PATH</span>
                  <span className="font-medium text-right text-[var(--accent)]">SYSTEMS → AI INFRA → HPC</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <div>
            <Reveal delay={0.05}>
              <p className="leading-relaxed text-[var(--fg)]/80">
                I build for problems I can see around me — hospital flow and road safety in
                Rwanda. MediFlow Rwanda and SafeDriveRW started from those. While working on
                them I kept hitting the same wall: I could use the tools fine, but when
                something broke I couldn&apos;t see why. That wall is why I started this path.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 leading-relaxed text-[var(--fg)]/80">
                So I chose the route most people skip: learn the machine before the framework.
                C, memory, computer architecture. Linux, operating systems, networking,
                security. Systems programming and distributed systems after that — and only
                then the layers on top: Python, AI, and the infrastructure that actually runs
                AI at scale.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                I keep the states honest — LEARNING today, EXPLORING next, PLANNED further
                out. None of that is fake humility; I&apos;ve read enough inflated portfolios to know the
                cost of one. When a milestone is real, this site will say so.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                Most of my practice is small and undramatic: C and Linux labs late at night,
                Python for data experiments on the side, man pages when I should be asleep,
                and breaking my own tiny programs on purpose so I learn to read a crash
                instead of guessing at it. The terminal in the corner of this site is a small
                real filesystem — poke around it. That is the kind of environment I like
                working in.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-8 text-[13px] font-medium text-[var(--accent)] uppercase tracking-wider">
                Questions that drive me
              </p>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {questions.map((q) => (
                  <li key={q} className="flex gap-2 text-sm leading-relaxed text-[var(--fg)]/70">
                    <span className="text-[var(--accent)] shrink-0">?</span>
                    {q}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
