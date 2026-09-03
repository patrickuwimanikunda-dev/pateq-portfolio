"use client";

import { useEffect, useRef, useState } from "react";
import { useSystem } from "@/context/SystemContext";
import type { AppId } from "@/context/SystemContext";
import {
  createFs,
  HOME,
  lookup,
  resolve,
  joinPath,
  basename,
  parentSegments,
} from "@/lib/data/fs";
import type { FsDir } from "@/lib/data/fs";
import { MAN, bannerLines, helpCommand } from "@/lib/data/terminal";
import type { TermKind, TermLine } from "@/lib/data/terminal";

const USER = "guest";
const HOST = "pateq";

const kindClass: Record<TermKind, string> = {
  in: "text-[#00ff41]",
  out: "text-[#c8c8c8]",
  err: "text-[#ff5555]",
  ok: "text-[#50fa7b]",
  accent: "text-[#a78bfa]",
  muted: "text-[#6272a4]",
};

const shortPath = (segments: string[]): string => {
  const full = joinPath(segments);
  return full === HOME ? "~" : full.startsWith(`${HOME}/`) ? `~${full.slice(HOME.length)}` : full;
};

const errName = (input: string): string => input || ".";

let savedSession: { cwd: string[]; lines: TermLine[]; history: string[] } | undefined;

export default function TerminalView() {
  const { openApp, goHome } = useSystem();
  const [fs] = useState<FsDir>(() => createFs());

  const [cwd, setCwd] = useState<string[]>(() => savedSession?.cwd ?? resolve([], HOME));
  const [lines, setLines] = useState<TermLine[]>(() => savedSession?.lines ?? bannerLines());
  const [history, setHistory] = useState<string[]>(() => savedSession?.history ?? []);
  const [input, setInput] = useState("");
  const [histIdx, setHistIdx] = useState(-1);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { savedSession = { cwd, lines, history }; }, [cwd, lines, history]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const print = (out: TermLine[]) => setLines((prev) => [...prev, ...out]);

  const outError = (msg: string): TermLine[] => [{ text: msg, kind: "err" }];

  const lsListing = (dir: FsDir, all: boolean, long: boolean): TermLine[] => {
    const names = Object.keys(dir.children).filter((n) => all || !n.startsWith(".")).sort((a, b) => a.localeCompare(b));
    const out: TermLine[] = [];
    for (const name of names) {
      const e = dir.children[name];
      const display = e.type === "dir" ? `${name}/` : name;
      if (!long) { out.push({ text: display, kind: e.type === "dir" ? "accent" : "out" }); continue; }
      const perm = e.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
      const size = e.type === "dir" ? Object.keys(e.children).length : e.content.length;
      out.push({ text: `${perm}  ${USER} ${USER}  ${String(size).padStart(4)}  ${display}`, kind: e.type === "dir" ? "accent" : "out" });
    }
    return out;
  };

  const catFiles = (targets: string[]): TermLine[] => {
    if (targets.length === 0) return outError("usage: cat <file> [file ...]");
    const out: TermLine[] = [];
    for (const t of targets) {
      const segs = resolve(cwd, t);
      const entry = lookup(fs, segs);
      if (!entry) { out.push({ text: `cat: ${errName(t)}: No such file or directory`, kind: "err" }); }
      else if (entry.type === "dir") { out.push({ text: `cat: ${errName(t)}: Is a directory`, kind: "err" }); }
      else { out.push(...entry.content.map((c) => ({ text: c, kind: "out" as TermKind }))); }
    }
    return out;
  };

  const treeListing = (dir: FsDir, prefix: string, depth: number, cap: { n: number }): TermLine[] => {
    const out: TermLine[] = [];
    const names = Object.keys(dir.children).sort((a, b) => a.localeCompare(b));
    names.forEach((name, i) => {
      if (cap.n <= 0) return;
      cap.n -= 1;
      const e = dir.children[name];
      const last = i === names.length - 1;
      const branch = last ? "└── " : "├── ";
      const display = e.type === "dir" ? `${name}/` : name;
      out.push({ text: `${prefix}${branch}${display}`, kind: e.type === "dir" ? "accent" : "out" });
      if (e.type === "dir" && depth < 3) {
        out.push(...treeListing(e, `${prefix}${last ? "    " : "│   "}`, depth + 1, cap));
      }
    });
    return out;
  };

  const openRoutes: Record<string, AppId | null> = {
    hero: null, desktop: null, home: null, about: "about", projects: "projects",
    "why this path": "why", why: "why", philosophy: "philosophy", journey: "journey",
    timeline: "journey", world: "systems", systems: "systems", stack: "stack",
    "under the hood": "hood", hood: "hood", ai: "ai", security: "security",
    evidence: "evidence", contact: "contact", terminal: "terminal",
  };

  const runCommand = (raw: string, cmd: string, args: string[]): TermLine[] | "clear" | "exit" => {
    switch (cmd) {
      case "help": return helpCommand();
      case "man": {
        if (!args[0]) return outError("usage: man <command>");
        const doc = MAN[args[0]];
        if (!doc) return outError(`No manual entry for ${args[0]}`);
        return [{ text: "NAME", kind: "muted" }, { text: `    ${args[0]} — ${doc.help}`, kind: "out" }, { text: "USAGE", kind: "muted" }, { text: `    ${doc.usage}`, kind: "out" }];
      }
      case "pwd": return [{ text: joinPath(cwd), kind: "out" }];
      case "ls": {
        const flags = args.filter((a) => a.startsWith("-") && a !== "-");
        const rest = args.filter((a) => !a.startsWith("-") || a === "-");
        const all = flags.some((f) => f.includes("a"));
        const long = flags.some((f) => f.includes("l"));
        const target = rest[0] ?? ".";
        const segs = resolve(cwd, target);
        const entry = lookup(fs, segs);
        if (!entry) return outError(`ls: cannot access '${target}': No such file or directory`);
        if (entry.type === "file") return [{ text: basename(segs), kind: "out" }];
        const listing = lsListing(entry, all, long);
        if (target !== "." && target !== joinPath(cwd)) listing.unshift({ text: `${shortPath(segs)}:`, kind: "accent" });
        return listing;
      }
      case "cd": {
        if (args.length > 1) return outError("usage: cd <dir>");
        if (args[0] === "-") return outError("cd: OLDPWD not tracked in this shell");
        if (!args[0]) { setCwd(resolve([], HOME)); return []; }
        const segs = resolve(cwd, args[0]);
        const entry = lookup(fs, segs);
        if (!entry) return outError(`cd: ${errName(args[0])}: No such file or directory`);
        if (entry.type !== "dir") return outError(`cd: ${errName(args[0])}: Not a directory`);
        setCwd(segs); return [];
      }
      case "cat": return catFiles(args);
      case "tree": {
        const target = args[0] ?? ".";
        const segs = resolve(cwd, target);
        const entry = lookup(fs, segs);
        if (!entry) return outError(`tree: ${target}: No such file or directory`);
        if (entry.type === "file") return [{ text: basename(segs), kind: "out" }];
        const cap = { n: 90 };
        const out = treeListing(entry, "", 0, cap);
        if (out.length === 0) out.push({ text: "(empty)", kind: "muted" });
        return out;
      }
      case "echo": return [{ text: args.map((a) => a.length >= 2 && (a.startsWith('"') || a.startsWith("'")) && a[0] === a[a.length - 1] ? a.slice(1, -1) : a).join(" "), kind: "out" }];
      case "whoami": return [{ text: USER, kind: "out" }];
      case "uname": {
        if (args.includes("-a")) return [{ text: `Linux ${HOST} 6.1.0-pateq #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`, kind: "out" }];
        return [{ text: "Linux", kind: "out" }];
      }
      case "date": return [{ text: new Date().toLocaleString(), kind: "out" }];
      case "history": {
        const n = args[0] ? parseInt(args[0], 10) : history.length;
        if (Number.isNaN(n)) return outError("history: numeric argument required");
        const slice = history.slice(-Math.max(1, Math.min(n, history.length)));
        return slice.map((h, i) => ({ text: `${String(history.length - slice.length + i + 1).padStart(4)}  ${h}`, kind: "out" }));
      }
      case "clear": return "clear";
      case "exit": { goHome(); return []; }
      case "open": {
        if (!args[0]) return outError("usage: open <ai|security|terminal|…> — try 'open ai'");
        const target = openRoutes[args[0]];
        if (target !== undefined) {
          if (target === null) { goHome(); return [{ text: "[ OK ] returning to the desktop", kind: "ok" }]; }
          if (target === "terminal") return outError("you are already in the terminal");
          openApp(target); return [{ text: `[ OK ] opening ${target}/ view`, kind: "ok" }];
        }
        const segs = resolve(cwd, args[0]);
        const entry = lookup(fs, segs);
        if (!entry) return outError(`open: cannot open '${args[0]}': No such file or directory`);
        if (entry.type === "dir") return outError(`open: '${args[0]}' is a directory — try 'cd'`);
        return [{ text: `[ OK ] opening ${shortPath(segs)}`, kind: "ok" }, ...entry.content.map((c) => ({ text: c, kind: "out" as TermKind }))];
      }
      default: return outError(`bash: ${cmd}: command not found — type 'help'`);
    }
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    setLines((prev) => [...prev, { text: `${USER}@${HOST}:${shortPath(cwd)}$ ${raw}`, kind: "in" }]);
    if (trimmed) setHistory((h) => [...h.slice(-99), trimmed]);
    setHistIdx(-1);
    const tokens = trimmed.split(/\s+/).filter(Boolean);
    const cmd = tokens[0] ?? "";
    const args = tokens.slice(1);
    if (!cmd) return;
    const result = runCommand(trimmed, cmd, args);
    if (result === "clear") { setLines([]); return; }
    if (result === "exit") return;
    if (result.length) print(result);
  };

  const complete = () => {
    const tokens = input.split(/\s+/);
    if (tokens.length <= 1) {
      const prefix = tokens[0] ?? "";
      const matches = Object.keys(MAN).filter((c) => c.startsWith(prefix));
      if (matches.length === 1) setInput(matches[0]);
      return;
    }
    const cmd = tokens[0];
    if (!["cd", "cat", "ls", "tree", "open", "man"].includes(cmd)) return;
    const prefix = tokens[tokens.length - 1];
    if (prefix.endsWith("/")) return;
    const segs = resolve(cwd, prefix);
    const dirSegs = parentSegments(segs);
    const dir = lookup(fs, dirSegs);
    if (!dir || dir.type !== "dir") return;
    const head = basename(segs);
    const matches = Object.keys(dir.children).filter((n) => n.startsWith(head)).sort();
    if (matches.length !== 1) return;
    const m = matches[0];
    const suffix = dir.children[m].type === "dir" ? "/" : " ";
    const base = prefix.slice(0, prefix.length - head.length);
    tokens[tokens.length - 1] = base + m + suffix;
    setInput(tokens.join(" "));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length) { const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1); setHistIdx(idx); setInput(history[idx]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx !== -1) { const idx = histIdx + 1; if (idx >= history.length) { setHistIdx(-1); setInput(""); } else { setHistIdx(idx); setInput(history[idx]); } }
    } else if (e.key === "Tab") { e.preventDefault(); complete(); }
    else if (e.key === "Escape") { setInput(""); }
  };

  const prompt = `${USER}@${HOST}:${shortPath(cwd)}$`;

  return (
    <div
      className="flex h-full min-h-0 flex-col bg-[#0a0a14]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header — real terminal title bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-[#1e1e2e] bg-[#11111b] px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_4px_rgba(255,95,86,0.4)]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_4px_rgba(255,189,46,0.4)]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_4px_rgba(39,201,63,0.4)]" />
        <span className="ml-4 font-mono text-[11px] text-[#585b70]">
          guest@pateq — {shortPath(cwd)} — bash
        </span>
        <span className="ml-auto font-mono text-[9px] text-[#45475a]">
          {lines.length} lines
        </span>
      </div>

      {/* Terminal body — scrollable output */}
      <div
        ref={bodyRef}
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 font-mono text-[13px] leading-[1.6] sm:px-5"
      >
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap ${kindClass[l.kind]}`}>
            {l.text}
          </div>
        ))}

        {/* Current input line — rendered inline like a real terminal */}
        <div className="flex whitespace-pre">
          <span className="text-[#50fa7b]">{prompt}</span>
          <span className="relative">
            <span className="text-[#f8f8f2]">{input}</span>
            {/* Block cursor */}
            <span className="inline-block h-[16px] w-[8px] animate-pulse bg-[#f8f8f2] align-middle" style={{ animationDuration: "1s" }} />
          </span>
        </div>
      </div>

      {/* Hidden input for keyboard capture */}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        className="absolute -left-[9999px] -top-[9999px] opacity-0"
        aria-label="Terminal input"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        autoFocus
      />

      {/* Status bar — like a real terminal */}
      <div className="flex shrink-0 items-center justify-between border-t border-[#1e1e2e] bg-[#11111b] px-4 py-1 font-mono text-[9px] text-[#45475a]">
        <span>bash</span>
        <span>{USER}@{HOST}</span>
        <span>UTF-8</span>
        <span className="text-[#50fa7b]">●</span>
        <span>LF</span>
      </div>
    </div>
  );
}
