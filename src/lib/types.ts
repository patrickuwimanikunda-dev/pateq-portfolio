/** Qualitative learning state — never fabricated, never a fake percentage. */
export type Status =
  | "LEARNING"
  | "BUILDING"
  | "EXPLORING"
  | "PLANNED"
  | "MASTERED"
  | "COMPLETED";

export interface JourneyStage {
  id: string;
  /** Short title, e.g. "C". */
  title: string;
  /** Phase grouping, e.g. "FOUNDATIONS". */
  phase: string;
  status: Status;
  /** What I am learning / doing at this stage. */
  what: string;
  /** Why this matters. */
  why: string;
  /** Why it comes at this point in the journey. */
  whyNow: string;
  /** What earlier knowledge it builds on. */
  buildsOn: string;
  /** What it enables later. */
  enables: string;
}

export interface WorldNode {
  id: string;
  label: string;
  sub: string;
  /** Tier/phase this node belongs to (drives layout bands). */
  phase: string;
  /** True when the node is a real project rather than a discipline. */
  kind?: "project";
  /** x/y in the shared coordinate space (assigned at build time). */
  x: number;
  y: number;
  status: Status;
  what: string;
  why: string;
  learning: string[];
  technologies: string[];
  connects: string[];
  leads: string;
  projects: string[];
}

export interface PipelineStage {
  id: string;
  title: string;
  tag: string;
  description: string;
  detail: string[];
  /** Small illustrative snippet shown alongside the stage. */
  sample: { lang: string; code: string };
}

export interface PhilosophyStage {
  id: string;
  title: string;
  prompt: string;
  body: string;
  keywords: string[];
}

export interface CaseStudySection {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
}

export interface CaseStudyFlow {
  flow: { label: string; detail?: string; items?: string[] }[];
}

export interface CaseStudy {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  state: Status;
  stateLabel: string;
  summary: string;
  sections: CaseStudySection[];
  flow: CaseStudyFlow;
}

export interface CProjectCategory {
  id: string;
  title: string;
  description: string;
  items: { name: string; status: Status; note: string }[];
}