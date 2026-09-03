import type { FlowDiagram as FlowDiagramData } from "@/lib/data/projects";

export default function FlowDiagram({ data }: { data: FlowDiagramData }) {
  return (
    <div aria-label="System architecture diagram">
      <ol className="space-y-0">
        {data.flow.map((stage, i) => (
          <li key={stage.label}>
            <div className="mx-auto flex max-w-xs items-center justify-center border border-accent/40 bg-accent/5 px-4 py-2.5">
              <div className="text-center">
                <p className="font-mono text-sm text-accent">{stage.label}</p>
                {stage.detail && (
                  <p className="mt-0.5 font-mono text-[10px] tracking-[0.15em] text-muted">
                    {stage.detail}
                  </p>
                )}
              </div>
            </div>

            {stage.items && (
              <div className="mt-0 flex justify-center">
                <div className="mt-2 grid w-full max-w-md gap-1.5 sm:grid-cols-2">
                  {stage.items.map((item) => (
                    <span
                      key={item}
                      className="border hairline bg-bg/70 px-3 py-1.5 text-center font-mono text-[11px] text-fg/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {i < data.flow.length - 1 && (
              <p className="py-1.5 text-center font-mono text-[11px] text-accent/60" aria-hidden="true">
                ↓
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}