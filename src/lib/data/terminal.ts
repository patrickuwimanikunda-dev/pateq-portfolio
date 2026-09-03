import { site } from "@/lib/site";

/** Kinds of terminal output lines (drives colour). */
export type TermKind = "in" | "out" | "err" | "ok" | "accent" | "muted";

export interface TermLine {
  text: string;
  kind: TermKind;
}

export interface CommandDoc {
  usage: string;
  help: string;
}

/** man-page style docs for every builtin. */
export const MAN: Record<string, CommandDoc> = {
  help: { usage: "help", help: "List available commands." },
  man: { usage: "man <command>", help: "Show the manual page for a command." },
  ls: { usage: "ls [-a] [-l] [dir]", help: "List directory contents. -a shows hidden files, -l shows a long listing." },
  cd: { usage: "cd <dir>", help: "Change directory. Supports . .. ~ / and relative paths." },
  pwd: { usage: "pwd", help: "Print the current working directory." },
  cat: { usage: "cat <file> [file...]", help: "Print file contents to the screen." },
  tree: { usage: "tree [dir]", help: "Show the directory tree below a path." },
  echo: { usage: "echo [text]", help: "Print text back to the terminal." },
  whoami: { usage: "whoami", help: "Print the current user (a guest, here)." },
  uname: { usage: "uname [-a]", help: "Print system information." },
  date: { usage: "date", help: "Print the current date and time." },
  history: { usage: "history [n]", help: "Show recent command history." },
  clear: { usage: "clear", help: "Clear the terminal screen." },
  exit: { usage: "exit", help: "Close the terminal." },
  open: {
    usage: "open <ai|security|about|…>",
    help: "Open a view in the PATEQ environment: 'open ai' and 'open security' open their briefings; section names (projects, journey, systems...) open their views; 'open hero' returns to the desktop.",
  },
};

/** Where each `open` target goes. */
export interface OpenTarget {
  id: string;
  kind: "overlay" | "section";
  label: string;
}

export const openTargets: OpenTarget[] = [
  { id: "ai", kind: "overlay", label: "AI layer briefing" },
  { id: "security", kind: "overlay", label: "Security briefing" },
  { id: "hero", kind: "section", label: "top of the page" },
  { id: "world", kind: "section", label: "My Technical World" },
  { id: "why", kind: "section", label: "Why this path" },
  { id: "philosophy", kind: "section", label: "Engineering Philosophy" },
  { id: "projects", kind: "section", label: "Projects" },
  { id: "hood", kind: "section", label: "Under the Hood" },
  { id: "stack", kind: "section", label: "Technical Stack" },
  { id: "timeline", kind: "section", label: "Journey timeline" },
  { id: "about", kind: "section", label: "About" },
  { id: "evidence", kind: "section", label: "Evidence" },
  { id: "contact", kind: "section", label: "Contact" },
];

export const openTargetById = (id: string): OpenTarget | undefined =>
  openTargets.find((t) => t.id === id);

/** First-run lines shown when the terminal opens. */
export const bannerLines = (): TermLine[] => [
  { text: "", kind: "muted" },
  { text: `  ██████╗   █████╗  ███████╗ ███████╗ ███████╗`, kind: "accent" },
  { text: `  ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔════╝ ██╔════╝`, kind: "accent" },
  { text: `  ██████╔╝ ███████║ ███████╗ ██████╗  ██║  ██║`, kind: "accent" },
  { text: `  ██╔═══╝  ██╔══██║ ╚════██║ ██╔═══╝  ██║ ███║`, kind: "accent" },
  { text: `  ██║      ██║  ██║ ███████║ ███████╗ ███████║`, kind: "accent" },
  { text: `  ╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚══════╝ ╚═════╝`, kind: "accent" },
  { text: "", kind: "muted" },
  { text: `  ${site.brand} guest shell v1.0 — ${site.role}`, kind: "muted" },
  { text: `  ${site.location} · ${site.direction.split("—")[0].trim()}`, kind: "muted" },
  { text: "", kind: "muted" },
  { text: "  type 'help' for commands · 'ls' to explore · 'open ai' for deep dives", kind: "muted" },
  { text: "", kind: "muted" },
];

export const helpCommand = (): TermLine[] => [
  { text: "Available commands:", kind: "accent" },
  { text: "", kind: "muted" },
  { text: "  navigation   cd  ls  pwd  tree", kind: "out" },
  { text: "  files        cat  echo", kind: "out" },
  { text: "  system       whoami  uname  date  history  clear  exit", kind: "out" },
  { text: "  explore      open <ai|security|section>   man <command>", kind: "out" },
  { text: "", kind: "muted" },
  { text: "Everything on this page is a file here. cd ~/notes to read", kind: "muted" },
  { text: "what I am studying right now, and 'open ai' for the AI briefing.", kind: "muted" },
];
