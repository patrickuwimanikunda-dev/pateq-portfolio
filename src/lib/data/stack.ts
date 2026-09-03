import type { Status } from "@/lib/types";

export interface StackCategory {
  id: string;
  title: string;
  description: string;
  items: { name: string; status: Status }[];
}

/**
 * Statuses reflect actual progress — qualitative, never fake percentages.
 * Adjust these honestly as the journey advances.
 */
export const stackCategories: StackCategory[] = [
  {
    id: "foundations",
    title: "Computing Foundations",
    description: "The language and machine model everything else stands on.",
    items: [
      { name: "C", status: "LEARNING" },
      { name: "Memory & Pointers", status: "LEARNING" },
      { name: "Data Structures", status: "LEARNING" },
      { name: "Algorithms", status: "LEARNING" },
      { name: "Computer Architecture", status: "EXPLORING" },
    ],
  },
  {
    id: "systems",
    title: "Systems",
    description: "Linux and the operating system layer underneath every program.",
    items: [
      { name: "Linux", status: "LEARNING" },
      { name: "Processes & Threads", status: "LEARNING" },
      { name: "System Calls", status: "EXPLORING" },
      { name: "Filesystems", status: "EXPLORING" },
      { name: "Virtual Memory", status: "EXPLORING" },
      { name: "Concurrency", status: "PLANNED" },
    ],
  },
  {
    id: "networking",
    title: "Networking",
    description: "What actually travels between machines.",
    items: [
      { name: "TCP/IP", status: "EXPLORING" },
      { name: "DNS", status: "EXPLORING" },
      { name: "HTTP / HTTPS", status: "EXPLORING" },
      { name: "Sockets", status: "EXPLORING" },
      { name: "Routing", status: "PLANNED" },
      { name: "Network Security", status: "PLANNED" },
    ],
  },
  {
    id: "security",
    title: "Cybersecurity",
    description: "How systems fail, and how to make them hard to break.",
    items: [
      { name: "Secure Programming", status: "EXPLORING" },
      { name: "Authentication", status: "EXPLORING" },
      { name: "OS Security", status: "PLANNED" },
      { name: "Vulnerability Analysis", status: "PLANNED" },
      { name: "Defensive Security", status: "PLANNED" },
    ],
  },
  {
    id: "modern",
    title: "Modern Systems & Data",
    description: "Tools that enter when their layer of the stack needs them — never collected for their own sake.",
    items: [
      { name: "Rust", status: "EXPLORING" },
      { name: "Go", status: "PLANNED" },
      { name: "SQL & Storage", status: "PLANNED" },
      { name: "Distributed Systems", status: "PLANNED" },
    ],
  },
  {
    id: "ai",
    title: "AI / ML",
    description: "Python, models, and the infrastructure that runs them.",
    items: [
      { name: "Python", status: "LEARNING" },
      { name: "Machine Learning", status: "PLANNED" },
      { name: "Model Serving", status: "PLANNED" },
      { name: "Inference", status: "PLANNED" },
      { name: "AI Infrastructure", status: "PLANNED" },
      { name: "GPU Computing", status: "PLANNED" },
    ],
  },
  {
    id: "performance",
    title: "Performance Engineering",
    description: "Making software fast — the layer where C++ earns its place.",
    items: [
      { name: "C++", status: "PLANNED" },
      { name: "Profiling", status: "PLANNED" },
      { name: "Optimization", status: "PLANNED" },
      { name: "Parallel Computing", status: "PLANNED" },
      { name: "HPC", status: "PLANNED" },
    ],
  },
  {
    id: "quant",
    title: "Quantitative Engineering",
    description: "Long-term exploration: numbers, speed, and correctness under pressure.",
    items: [
      { name: "Quantitative Engineering", status: "PLANNED" },
      { name: "Numerical Computing", status: "PLANNED" },
      { name: "Low-Latency Systems", status: "PLANNED" },
      { name: "Financial Algorithms", status: "PLANNED" },
      { name: "Statistics", status: "PLANNED" },
    ],
  },
];