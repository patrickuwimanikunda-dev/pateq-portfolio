import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import StatusBadge from "@/components/ui/StatusBadge";
import { site } from "@/lib/site";

const quadrants = [
  {
    title: "WHAT I HAVE BUILT",
    accent: "text-ok",
    note: "Strict: only shipped, real work appears here.",
    items: [
      { name: "MediFlow Rwanda — healthcare flow system", status: "BUILDING" as const },
      { name: "SafeDriveRW / Guardex — ESP32 safety system", status: "BUILDING" as const },
    ],
  },
  {
    title: "WHAT I AM BUILDING",
    accent: "text-accent",
    note: "In progress right now.",
    items: [
      { name: "MediFlow core loop: ticketing → triage → queue", status: "BUILDING" as const },
      { name: "ESP32 sensing + safety-logic prototype", status: "BUILDING" as const },
      { name: "Systems labs: C — pointers, memory, structures", status: "LEARNING" as const },
    ],
  },
  {
    title: "WHAT I AM LEARNING",
    accent: "text-warn",
    note: "Active study — capability is growing, not claimed.",
    items: [
      { name: "C and the memory model", status: "LEARNING" as const },
      { name: "Linux and operating systems", status: "LEARNING" as const },
      { name: "Python", status: "LEARNING" as const },
      { name: "Computer architecture", status: "EXPLORING" as const },
      { name: "Networking and cybersecurity", status: "EXPLORING" as const },
    ],
  },
  {
    title: "WHAT I PLAN TO BUILD",
    accent: "text-muted",
    note: "Future work — never presented as done.",
    items: [
      { name: "Memory allocator & shell", status: "PLANNED" as const },
      { name: "Socket programs and networking tools", status: "PLANNED" as const },
      { name: "Key-value store & message queue", status: "PLANNED" as const },
      { name: "Model serving / inference pipelines", status: "PLANNED" as const },
      { name: "HPC / quant explorations", status: "PLANNED" as const },
    ],
  },
];

export default function Evidence({ className }: { className?: string }) {
  return (
    <Section
      id="evidence"
      className={className}
      kicker="09 // EVIDENCE"
      title="Proof of work — and honest separation of states"
      intro="GitHub, repos, write-ups, and experiments will land here as they exist. The separation between built, building, learning, and planned is strict: future goals never appear as accomplishments."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {quadrants.map((q, i) => (
          <Reveal key={q.title} delay={(i % 2) * 0.07}>
            <div className="flex h-full flex-col border hairline bg-panel/50 p-5">
              <p className={`font-mono text-[11px] tracking-[0.25em] ${q.accent}`}>{q.title}</p>
              <p className="mt-1.5 text-[12px] text-muted">{q.note}</p>
              <ul className="mt-4 space-y-2.5">
                {q.items.map((item) => (
                  <li key={item.name} className="flex items-start justify-between gap-3">
                    <span className="text-[13px] leading-snug text-fg/85">{item.name}</span>
                    <span className="shrink-0">
                      <StatusBadge status={item.status} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 border hairline bg-panel/60 px-6 py-4 font-mono text-sm text-fg/85 transition-colors hover:border-accent/50 hover:text-accent"
        >
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
          EXPLORE THE REPOSITORIES ON GITHUB →
        </a>
      </Reveal>
    </Section>
  );
}