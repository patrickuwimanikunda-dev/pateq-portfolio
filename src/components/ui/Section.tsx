import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

interface SectionProps {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, kicker, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-24 sm:py-28 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-accent">{kicker}</p>
          <h2
            id={`${id}-title`}
            className="mt-3 font-mono text-2xl font-medium tracking-tight text-fg sm:text-3xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{intro}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}