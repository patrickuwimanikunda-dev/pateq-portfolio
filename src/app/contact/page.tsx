"use client";

import { useState } from "react";
import Reveal from "../../components/ui/Reveal";
import EmailModal from "../../components/ui/EmailModal";
import { site } from "../../lib/site";

export default function ContactPage() {
  const [emailOpen, setEmailOpen] = useState(false);

  return (
    <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
      <EmailModal open={emailOpen} onClose={() => setEmailOpen(false)} />

      <Reveal>
        <span className="text-[13px] font-medium text-[var(--accent)] uppercase tracking-wider">
          Get in touch
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-6">
          Let&apos;s connect
        </h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-2xl">
          Whether it&apos;s about systems engineering, AI infrastructure, or just a conversation about tech — reach out.
        </p>
      </Reveal>

      {/* Social links */}
      <Reveal delay={0.1}>
        <div className="mt-10 space-y-3">
          {site.links.email && (
            <button
              onClick={() => setEmailOpen(true)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-all duration-200 group cursor-pointer text-left"
            >
              <div className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--fg)]">Email</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </button>
          )}
          {site.links.linkedin && (
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-all duration-200 group"
            >
              <div className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--fg)]">LinkedIn</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
