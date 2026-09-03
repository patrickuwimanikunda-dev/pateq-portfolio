import type { Status } from "@/lib/types";

const styles: Record<Status, { text: string; dot: string; border: string }> = {
  LEARNING: { text: "text-accent", dot: "bg-accent", border: "border-accent/30" },
  BUILDING: { text: "text-ok", dot: "bg-ok", border: "border-ok/30" },
  EXPLORING: { text: "text-warn", dot: "bg-warn", border: "border-warn/30" },
  PLANNED: { text: "text-muted", dot: "bg-muted", border: "border-muted/30" },
  MASTERED: { text: "text-accent-2", dot: "bg-accent-2", border: "border-accent-2/30" },
  COMPLETED: { text: "text-accent-2", dot: "bg-accent-2", border: "border-accent-2/30" },
};

export default function StatusBadge({ status }: { status: Status }) {
  const s = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] ${s.border} ${s.text}`}
    >
      <span className={`h-1 w-1 rounded-full ${s.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}