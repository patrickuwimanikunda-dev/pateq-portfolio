/**
 * The portfolio's virtual filesystem — what `ls`, `cd`, and `cat`
 * operate on in the terminal. Everything the site says elsewhere is
 * also reachable here as plain files, plus a few notes that only
 * exist in the fs.
 */

export interface FsFile {
  type: "file";
  content: string[];
}

export interface FsDir {
  type: "dir";
  children: Record<string, FsEntry>;
}

export type FsEntry = FsFile | FsDir;

export const HOME = "/home/guest";

const file = (content: string): FsFile => ({
  type: "file",
  content: content.split("\n"),
});

const dir = (children: Record<string, FsEntry>): FsDir => ({ type: "dir", children });

export const createFs = (): FsDir =>
  dir({
    home: dir({
      guest: dir({
        "README.txt": file(`pateq — guest filesystem
You are browsing the site's data as real files. Everything here is
also rendered as sections further down the page; the fs just gives
you a quieter way to read it.

  cd ~/notes         notes on what I am learning right now
  cd ~/projects      the two products being built
  cat journey.txt    where this path is going
  open ai            full AI-layer briefing (opens on the page)
  open security      full security briefing (opens on the page)

This is a read-only guest session. Be curious.`),
        "journey.txt": file(`THE JOURNEY — one tree, many branches, as of today

  C ──────────────────────────── LEARNING (the root, current)
  Memory / pointers ──────────── LEARNING (current)
  Linux ──────────────────────── LEARNING (current)
  Operating systems ──────────── LEARNING (current)
  Computer architecture ──────── EXPLORING
  Networking ─────────────────── EXPLORING
  Cybersecurity ──────────────── EXPLORING
  Python / data / AI ─────────── LEARNING
  Rust ───────────────────────── EXPLORING
  Systems programming ────────── PLANNED
  Go / SQL / storage ─────────── PLANNED
  Distributed systems ────────── PLANNED
  GPU computing ──────────────── PLANNED
  AI infrastructure ──────────── PLANNED
  C++ ────────────────────────── PLANNED
  HPC / low-latency ──────────── PLANNED
  Quantitative engineering ───── PLANNED (convergence)

The order is deliberate: each layer is the foundation the next one
sits on. C is the root of the tree, not the whole tree — every
language is a tool that enters when its layer needs it.`),
        ".plan": file(`things on the bench right now:
  - finish the current C chapter (pointers & the memory model)
  - small shell implementation once process work lands
  - sockets the week I finish networking notes
  - then revisit medi-flow queue core with better eyes`),
        notes: dir({
          "c.txt": file(`C NOTES
Why C first: it is the layer where the abstractions stop. You write
close to what the machine does — addresses, frames, explicit memory.

Currently grinding through:
  - pointer arithmetic and array decay
  - stack vs heap lifetimes
  - struct layout, padding, alignment
  - reading crash output with gdb instead of guessing

Rule I repeat to myself: a segmentation fault is a question, not a
verdict. Where did the address come from? What owned that memory?`),
          "linux.txt": file(`LINUX NOTES
The environment I do everything in. Concepts stop being theory here.

  - processes, signals, exit codes
  - standard streams and pipelines
  - permissions and ownership
  - /proc, /sys — the kernel exposing itself

Habit that pays for itself: before asking why a program misbehaves,
ask what it was given. Environment, cwd, permissions, ulimits.`),
          "os.txt": file(`OPERATING SYSTEMS NOTES
The layer that manages everything else. Current reading list topics:

  - processes and threads, and what the scheduler actually juggles
  - virtual memory: why every process thinks it owns the machine
  - system calls as the only door between user and kernel
  - filesystems as abstractions over blocks
  - concurrency primitives and the races they exist to prevent`),
          "security.txt": file(`SECURITY NOTES (EXPLORING — labs only)
Security is not a subject I bolt on later; each layer below teaches
the failure mode above it.

  - memory corruption only makes sense once memory makes sense
  - network attacks only make sense once the network makes sense
  - trust boundaries only make sense once systems make sense

Practicing in controlled environments only: local labs, deliberately
broken toy programs, reading real incident write-ups. No machines I
do not own, no networks I am not invited to. That boundary is not a
rule I break for fun.`),
          "ai.txt": file(`AI NOTES
Most of AI's hard problems are systems problems wearing a model hat.

  a request → model → serving layer → GPU → kernel → network

The models get the papers. The infrastructure does the work:
scheduling GPUs, moving tensors, keeping latency down, staying up.

Today: Python, data work, ML concepts (LEARNING).
Next: serving and inference pipelines (PLANNED — and honest about it).
My C/OS/networking work now is the down payment on that.`),
        }),
        projects: dir({
          "mediflow.txt": file(`MediFlow Rwanda — healthcare flow management
Status: BUILDING

A system for patient movement in Rwandan hospitals:
smart ticketing, emergency triage scoring, queue management,
patient navigation, billing, disease tracking, analytics.

The invisible engineering is the interesting part: a queue is a
scheduling problem, triage is a prioritization policy, and a queue
jump is a race condition. Every healthcare feature hides a systems
lesson, which is exactly why I built this first.`),
          "guardex.txt": file(`SafeDriveRW / Guardex — vehicle safety system
Status: BUILDING

An ESP32-based road-safety prototype for Rwandan roads:
alcohol detection, speed monitoring, GPS, motion analysis.

Embedded work is systems work with the margin for error removed:
memory is tiny, power is scarce, the sensor feed is noisy, and a
missed deadline means a wrong decision. Good training for exactly
the kind of constraints infrastructure engineers live with.`),
        }),
      }),
    }),
    etc: dir({
      hostname: file("pateq"),
      "os-release": file(`NAME="pateq-os"
VERSION="1.0 (building-from-the-machine-upward)"
ID=pateq
HOME_URL="this page"`),
      motd: file(`Welcome to the pateq guest system.
Everything here is a layer. Everything below is worth learning.`),
    }),
    tmp: dir({}),
  });

/* ── Path helpers (pure; operate on segment arrays, root = []) ── */

export const joinPath = (segments: string[]): string =>
  segments.length === 0 ? "/" : `/${segments.join("/")}`;

export const basename = (segments: string[]): string =>
  segments.length === 0 ? "/" : segments[segments.length - 1];

export const parentSegments = (segments: string[]): string[] => segments.slice(0, -1);

/**
 * Resolve an input path (absolute, relative, ~, ., ..) against a cwd.
 * Returns null when the path walks above the root (clamped instead).
 */
export function resolve(cwd: string[], input: string): string[] {
  let raw: string[];
  if (input.startsWith("/")) {
    raw = input.split("/").filter(Boolean);
  } else if (input === "~" || input.startsWith("~/")) {
    raw = [...HOME.split("/").filter(Boolean), ...input.slice(2).split("/").filter(Boolean)];
  } else {
    raw = [...cwd, ...input.split("/").filter(Boolean)];
  }
  const out: string[] = [];
  for (const seg of raw) {
    if (seg === "." || seg === "") continue;
    if (seg === "..") {
      out.pop();
    } else {
      out.push(seg);
    }
  }
  return out;
}

/** Walk the tree from root along segments. */
export function lookup(root: FsDir, segments: string[]): FsEntry | undefined {
  let node: FsDir = root;
  for (let i = 0; i < segments.length; i++) {
    const entry: FsEntry | undefined = node.children[segments[i]];
    if (!entry) return undefined;
    if (i === segments.length - 1) return entry;
    if (entry.type !== "dir") return undefined;
    node = entry;
  }
  return node;
}
