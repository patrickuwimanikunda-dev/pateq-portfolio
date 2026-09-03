import type { PhilosophyStage } from "@/lib/types";

/** The engineering process — how I actually work through problems. */
export const philosophyStages: PhilosophyStage[] = [
  {
    id: "question",
    title: "Question",
    prompt: "Before implementing something, ask.",
    body: "What problem am I actually solving? What exactly is happening? Which layer is responsible? What assumptions am I making? The quality of the question determines the quality of everything after it.",
    keywords: ["problem", "layer", "assumptions"],
  },
  {
    id: "understand",
    title: "Understand",
    prompt: "Learn the underlying mechanism.",
    body: "No cargo-culting. If I am going to use or build something, I read how it works underneath — the manual, the source, the datasheet. Understanding is what turns copying into capability.",
    keywords: ["read", "mechanism", "source"],
  },
  {
    id: "build",
    title: "Build",
    prompt: "Turn understanding into working software.",
    body: "Understanding without output evaporates. Building forces the gaps in my understanding into the open — code does not care what I think I know.",
    keywords: ["output", "working", "experiment"],
  },
  {
    id: "break",
    title: "Break",
    prompt: "Test assumptions deliberately.",
    body: "Push the thing until it fails — inputs at the edges, concurrency, resource limits. Finding where it breaks finds where I was wrong, which is more valuable than confirming where I was right.",
    keywords: ["edge cases", "failure", "limits"],
  },
  {
    id: "debug",
    title: "Debug",
    prompt: "Find the actual cause instead of randomly changing code.",
    body: "Reproduce, isolate, hypothesize, verify. Every bug is a claim about the system; the fix is only valid once the claim is evidence-based. Random changes are gambling with my own ignorance.",
    keywords: ["reproduce", "hypothesis", "evidence"],
  },
  {
    id: "measure",
    title: "Measure",
    prompt: "Use evidence.",
    body: "If it matters, it can be measured — time, memory, latency, throughput. Opinions are cheap; numbers from a real run are data. Measure before and after, and the improvement becomes real.",
    keywords: ["profiling", "benchmarks", "data"],
  },
  {
    id: "improve",
    title: "Improve",
    prompt: "Optimize the design, not just the code.",
    body: "Once it works and is measured, make it better — architecture, structure, performance. Improvement is a loop, not an endpoint: each pass reveals the next constraint.",
    keywords: ["optimize", "refactor", "iterate"],
  },
  {
    id: "master",
    title: "Master",
    prompt: "Be able to explain and reproduce it independently.",
    body: "If I cannot explain it simply or rebuild it from a blank page, I have not mastered it — I have memorized it. Mastery is the difference between using a tool and owning it.",
    keywords: ["explain", "reproduce", "ownership"],
  },
];