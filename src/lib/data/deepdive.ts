export type DeepDiveKey = "ai" | "security";

export interface DeepDiveStatus {
  label: string;
  status: "LEARNING" | "EXPLORING" | "PLANNED" | "BUILDING";
}

export interface DeepDiveBlock {
  /** Short mono index/label, e.g. "01 // TODAY". */
  label: string;
  body: string[];
  points?: string[];
  lines?: string[];
}

export interface DeepDiveData {
  key: DeepDiveKey;
  kicker: string;
  title: string;
  intro: string;
  statuses: DeepDiveStatus[];
  blocks: DeepDiveBlock[];
  footer: string;
}

export const deepDivePages: Record<DeepDiveKey, DeepDiveData> = {
  ai: {
    key: "ai",
    kicker: "AI.LAYER // DEEP DIVE",
    title: "The stack under intelligence",
    intro:
      "Everyone talks about the model. The model is a few gigabytes of numbers sitting behind infrastructure that has to stay up, stay fast, and not leak what it shouldn't. This page is that layer as I understand it today — and what I am actually doing to get there.",
    statuses: [
      { label: "Python / ML foundations", status: "LEARNING" },
      { label: "Data work (NumPy-style)", status: "LEARNING" },
      { label: "Model serving / inference", status: "PLANNED" },
      { label: "GPU & distributed inference", status: "PLANNED" },
    ],
    blocks: [
      {
        label: "01 // TODAY — what I am doing now",
        body: [
          "The honest version: I am at the bottom of the AI stack, not the top. Python and ML foundations are LEARNING; serving, GPU work, and distributed inference are PLANNED. What I do today is build the base so that layer is not magic when I arrive.",
        ],
        points: [
          "Python fundamentals — readable, testable programs, not just notebooks",
          "NumPy-style data work: arrays, shapes, and where the math actually lives",
          "ML concepts: the statistics and optimization under the models",
          "Calling into C from Python (ctypes) to feel the language boundary myself",
        ],
      },
      {
        label: "02 // THE AI STACK, as a systems problem",
        body: [
          "A model does not run by itself. Between a user's request and the answer sit real systems with real failure modes. Reading top-down, every layer below is someone's engineering:",
        ],
        lines: [
          "model        — weights plus the code that executes them",
          "serving      — request → batch → response, inside a latency budget",
          "GPU kernels  — linear algebra turned into parallel instructions",
          "drivers/OS   — memory, scheduling, isolation of the accelerator",
          "network      — moving the data in and the answers out",
        ],
      },
      {
        label: "03 // WHY BOTTOM-UP",
        body: [
          "If I only learned the frameworks I would be able to train models and unable to say why they are slow, why they are unsafe to expose, or how to run them for other people. My C, OS, and networking work right now is the down payment on that layer. When I get there I want to arrive already able to read the systems underneath.",
        ],
      },
      {
        label: "04 // THE SECURITY VIEW (exploring)",
        body: [
          "AI products are security products whether their teams admit it or not. The attack surface is new, but the failure classes are old:",
        ],
        points: [
          "Prompt injection — the input is untrusted code for a prompt interpreter",
          "Model theft through API probing",
          "Poisoned training data and supply-chain compromise",
          "RAG pipelines leaking documents they were never meant to share",
          "Shared GPU hosts blurring the isolation boundaries we rely on",
        ],
      },
      {
        label: "05 // WHERE THIS LEADS (stated as future)",
        body: [
          "Serving small models end to end. Benchmarking time-to-first-token and throughput. Observability for inference. Distributed inference as the problems grow. From there the path continues toward HPC and quantitative engineering — same discipline, higher stakes.",
        ],
      },
    ],
    footer:
      "Status discipline: foundations are LEARNING, the infrastructure layer is PLANNED. Nothing here claims finished work.",
  },

  security: {
    key: "security",
    kicker: "SEC.LAYER // DEEP DIVE",
    title: "Security is a property of understanding the stack",
    intro:
      "Not a badge. I am EXPLORING security the way I explore everything else — from the failure modes up, in controlled environments, with a hard line on what I will and won't touch.",
    statuses: [
      { label: "Secure C foundations", status: "EXPLORING" },
      { label: "OS & network security", status: "EXPLORING" },
      { label: "Auth / app security", status: "PLANNED" },
      { label: "AI system security", status: "PLANNED" },
    ],
    blocks: [
      {
        label: "01 // THE CORE CLAIM",
        body: [
          "Attackers exploit the mechanisms the foundations describe. Every layer of my journey teaches the failure mode of the layer above it, which is why security sits in the middle of the path instead of at the end of it.",
        ],
        points: [
          "Memory corruption only makes sense once memory makes sense",
          "Injection and sniffing only make sense once the network makes sense",
          "Privilege escalation only makes sense once the OS makes sense",
          "Trust boundaries only make sense once distributed systems make sense",
          "Side channels only make sense once hardware makes sense",
        ],
      },
      {
        label: "02 // THE FAILURE MAP (by layer, exploring)",
        body: ["The map I keep in my head, layer by layer:"],
        lines: [
          "memory     — overflow, use-after-free, time-of-check vs time-of-use",
          "operating  — permissions, privilege, signal races",
          "network    — sniffing, spoofing, man-in-the-middle",
          "app/API    — authentication vs authorization, injection, SSRF, secrets",
          "infra      — container escape, config drift, the service nobody patched",
          "supply     — the dependency you never actually read",
        ],
      },
      {
        label: "03 // DEFENSIVE POSTURE",
        body: [
          "Habits I practice even in toy code, so they are reflexes before they matter:",
        ],
        points: [
          "Least privilege — give a process exactly what it needs, nothing else",
          "Fail closed — when unsure, deny; do not guess open",
          "Treat every input as hostile until proven otherwise",
          "Secrets never live in code, repos, or client bundles",
          "Measure and log — you cannot defend what you cannot see",
          "Update, patch, and re-read the code you depend on",
        ],
      },
      {
        label: "04 // ETHICS & BOUNDARY (non-negotiable)",
        body: [
          "Labs, deliberately broken toy programs, CTFs, and incident write-ups — nothing else. I don't test systems I don't own or lack written permission for. No exceptions because I find it interesting; that is exactly when discipline matters most.",
        ],
      },
    ],
    footer:
      "State: EXPLORING, foundations first. This page will grow as the capability does — and only then.",
  },
};

export const deepDiveByKey = (key: DeepDiveKey): DeepDiveData => deepDivePages[key];
