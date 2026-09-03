import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const layers = [
  { name: "Application", desc: "what the user sees" },
  { name: "Framework", desc: "conventions on top of a runtime" },
  { name: "Runtime", desc: "managed execution" },
  { name: "Operating System", desc: "processes, files, devices, scheduling" },
  { name: "Kernel", desc: "syscalls, drivers, memory management" },
  { name: "CPU / Memory", desc: "registers, caches, RAM, execution" },
  { name: "Hardware", desc: "the silicon itself" },
];

const benefits = [
  "Performance",
  "Reliability",
  "Security",
  "Concurrency",
  "Networking",
  "Scalability",
  "Infrastructure",
  "Debugging",
];

export default function WhyThisPath({ className }: { className?: string }) {
  return (
    <Section
      id="why"
      className={className}
      kicker="02 // WHY THIS PATH"
      title="I want to understand what's underneath the abstractions"
      intro="Most modern software is a tower of abstractions — and every layer is someone's engineering. I don't want to reject that tower; I want to be able to walk down it whenever a question needs answering."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* ── Animated abstraction stack ─────────────────────── */}
        <Reveal>
          <div className="border hairline bg-panel/60 p-6 sm:p-8">
            <p className="mb-5 font-mono text-[10px] tracking-[0.3em] text-muted">
              THE STACK — A REQUEST TRAVELS DOWN, A RESULT TRAVELS UP
            </p>
            <ol className="relative space-y-2" aria-label="The abstraction stack, from application to hardware">
              {layers.map((layer, i) => (
                <li key={layer.name}>
                  <div
                    className="wave-layer flex items-center justify-between gap-4 border hairline bg-bg/70 px-4 py-3"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-sm text-fg">{layer.name}</span>
                    </div>
                    <span className="hidden font-mono text-[10px] text-muted sm:block">
                      {layer.desc}
                    </span>
                  </div>
                  {i < layers.length - 1 && (
                    <p className="py-1 text-center font-mono text-[10px] text-accent/50" aria-hidden="true">
                      ↓
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* ── Philosophy copy ────────────────────────────────── */}
        <div>
          <Reveal delay={0.05}>
            <p className="leading-relaxed text-fg/85">
              When I use a framework, a runtime, or an API, I want to know what it is built on.
              Understanding the lower layers is not academic — it is the difference between
              guessing and knowing when things break.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 border-l-2 border-accent/60 pl-5">
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted">FIELD NOTE</p>
              <p className="mt-2 text-sm italic leading-relaxed text-accent">
                When a fix works and I don&apos;t know why, I count it as unpaid work — the bug
                is still there, I just got lucky. Down-stack knowledge is how I stop being
                lucky. Security and performance problems are exactly this, with higher stakes.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              Walking down the stack is how I reason about the things that actually decide
              whether software is good:
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-5 flex flex-wrap gap-2">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="border hairline px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-fg/80"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-[15px] leading-relaxed text-fg/85">
              Abstraction is how humans manage complexity — I am not against it. I am against
              treating it as magic. The goal is to be fluent enough at every layer that no
              boundary in the stack is a black box, and no bug report has to end in
              &quot;it works, don&apos;t ask why.&quot;
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}