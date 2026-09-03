import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import StatusBadge from "@/components/ui/StatusBadge";
import { stackCategories } from "@/lib/data/stack";

export default function TechnicalStack({ className }: { className?: string }) {
  return (
    <Section
      id="stack"
      className={className}
      kicker="06 // TECHNICAL DEPTH"
      title="What I am learning, and where"
      intro="Qualitative by design. These states mean something real — LEARNING (actively studying), EXPLORING (early hands-on), PLANNED (next, not started), MASTERED (only with real evidence) — and no fake percentages. They will change as the journey advances."
    >
      <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-muted">
        <span>LEGEND</span>
        <span className="text-accent">● LEARNING</span>
        <span className="text-warn">● EXPLORING</span>
        <span className="text-muted">● PLANNED</span>
        <span className="text-accent-2">● MASTERED</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackCategories.map((cat, i) => (
          <Reveal key={cat.id} delay={(i % 3) * 0.06}>
            <div className="flex h-full flex-col border hairline bg-panel/50 p-5">
              <h3 className="font-mono text-sm text-fg">{cat.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{cat.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <StatusBadge status={item.status} />
                    <span className="font-mono text-xs text-fg/85">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}