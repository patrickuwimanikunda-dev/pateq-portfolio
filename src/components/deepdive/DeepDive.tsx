import StatusBadge from "@/components/ui/StatusBadge";
import type { DeepDiveData } from "@/lib/data/deepdive";

/**
 * Body renderer for the AI and Security briefings. Used inside the
 * desktop's ai/security windows — chrome (title bar, close) is owned by
 * the window itself.
 */
export default function DeepDiveBody({ page }: { page: DeepDiveData }) {
  return (
    <div>
      <p className="max-w-2xl leading-relaxed text-fg/85">{page.intro}</p>

      {/* status chips */}
      <ul className="flex flex-wrap gap-2" aria-label="Current status">
        {page.statuses.map((s) => (
          <li key={s.label} className="glass-tight flex items-center gap-2 px-3 py-1.5">
            <span className="font-mono text-[11px] text-fg/80">{s.label}</span>
            <StatusBadge status={s.status} />
          </li>
        ))}
      </ul>

      {/* blocks */}
      <div className="mt-8 space-y-8">
        {page.blocks.map((block) => (
          <section key={block.label} className="border-t hairline-strip pt-6" aria-label={block.label}>
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted">
              {block.label.toUpperCase()}
            </p>
            <div className="mt-4 space-y-3">
              {block.body.map((para) => (
                <p key={para} className="leading-relaxed text-fg/85">
                  {para}
                </p>
              ))}
            </div>

            {block.points && (
              <ul className="mt-4 space-y-2">
                {block.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-fg/80">
                    <span className="text-accent" aria-hidden="true">
                      ·
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            {block.lines && (
              <ul className="mt-4 glass-tight font-mono text-[12.5px] leading-relaxed">
                {block.lines.map((line) => {
                  const [left, right] = line.split(/\s{2,}/);
                  return (
                    <li
                      key={line}
                      className="flex flex-col gap-1 border-b hairline-strip px-4 py-2.5 last:border-b-0 sm:flex-row sm:gap-4"
                    >
                      <span className="w-28 shrink-0 text-accent">{left}</span>
                      <span className="text-fg/75">{right}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="mt-8 border-t hairline-strip pt-5 font-mono text-[11px] leading-relaxed tracking-[0.12em] text-muted">
        {page.footer}
      </p>
    </div>
  );
}
