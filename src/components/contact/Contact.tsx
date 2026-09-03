import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export default function Contact({ className }: { className?: string }) {
  return (
    <Section
      id="contact"
      className={className}
      kicker="10 // CONTACT"
      title="Let's talk systems"
      intro="If you build systems, infrastructure, security, or AI tooling — or if you just want to talk about what happens underneath the abstraction — reach out. No forms, no trackers: just direct channels."
    >
      <Reveal>
        <div className="border hairline bg-panel/60 p-8 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-sm text-fg">
              Open to conversations about{" "}
              <span className="text-accent">systems engineering</span>,{" "}
              <span className="text-accent">AI infrastructure</span>, and{" "}
              <span className="text-accent">high-performance computing</span>.
            </p>
            <span className="font-mono text-[10px] tracking-[0.25em] text-ok">
              ● STATUS: AVAILABLE FOR CONVERSATION
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-accent/40 bg-accent/5 px-6 py-3 font-mono text-xs tracking-[0.2em] text-accent transition-colors hover:bg-accent/15"
            >
              GITHUB
            </a>
            {site.links.email ? (
              <a
                href={`mailto:${site.links.email}`}
                className="inline-flex items-center gap-2 border hairline px-6 py-3 font-mono text-xs tracking-[0.2em] text-fg/80 transition-colors hover:border-accent/40 hover:text-accent"
              >
                EMAIL
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 border hairline px-6 py-3 font-mono text-xs tracking-[0.2em] text-muted/70">
                EMAIL — COMING SOON
              </span>
            )}
            {site.links.linkedin && (
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border hairline px-6 py-3 font-mono text-xs tracking-[0.2em] text-fg/80 transition-colors hover:border-accent/40 hover:text-accent"
              >
                LINKEDIN
              </a>
            )}
          </div>

          <p className="mt-8 border-t hairline pt-5 font-mono text-[11px] leading-relaxed text-muted">
            PREFER THE TERMINAL? OPEN THE <span className="text-accent">&gt;_ TERMINAL</span>{" "}
            IN THE BOTTOM-LEFT CORNER AND TYPE <span className="text-fg">open contact</span>.
            <br />
            {site.location && <>BASED IN {site.location.toUpperCase()}. </>}
            NO TRACKERS, NO ANALYTICS, NOTHING PHONES HOME — A SITE ABOUT SECURITY SHOULD{" "}
            PRACTICE WHAT IT PREACHES.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}