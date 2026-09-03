import type { ReactNode } from "react";
import type { AppId } from "@/context/SystemContext";
import About from "@/components/about/About";
import TechnicalWorld from "@/components/world/TechnicalWorld";
import WhyThisPath from "@/components/why/WhyThisPath";
import Philosophy from "@/components/philosophy/Philosophy";
import ProjectsSection from "@/components/projects/ProjectsSection";
import UnderTheHood from "@/components/hood/UnderTheHood";
import TechnicalStack from "@/components/stack/TechnicalStack";
import Timeline from "@/components/timeline/Timeline";
import Evidence from "@/components/evidence/Evidence";
import Contact from "@/components/contact/Contact";
import DeepDiveBody from "@/components/deepdive/DeepDive";
import TerminalView from "@/components/terminal/Terminal";
import { deepDivePages } from "@/lib/data/deepdive";

export interface AppMeta {
  id: AppId;
  title: string;
  kicker: string;
  blurb: string;
  icon: string;
  keywords: string;
  /** Renders inside the window without the standard content padding. */
  fill?: boolean;
  content: ReactNode;
}

/**
 * Real icon images via links — optional. Paste hosted image URLs here
 * (one per app) and the dock, launcher, and window chrome will show the
 * image instead of the drawn glyph. Leave empty to keep the glyphs.
 */
export const appImages: Partial<Record<AppId, string>> = {
  // about:     "https://example.com/about.png",
  // projects:  "https://example.com/projects.png",
  // terminal:  "https://example.com/terminal.png",
};

const sections: AppMeta[] = [
  {
    id: "about",
    title: "About",
    kicker: "WHO I AM",
    blurb: "The story, honestly told — where I am and why I am going where I am going.",
    icon: "user",
    keywords: "about story profile biography patrick",
    content: <About />,
  },
  {
    id: "projects",
    title: "Projects",
    kicker: "WHAT I HAVE BUILT",
    blurb: "MediFlow Rwanda and SafeDriveRW / Guardex — real work, honest states.",
    icon: "folder",
    keywords: "projects mediflow safedrive guardex case studies build",
    content: <ProjectsSection />,
  },
  {
    id: "journey",
    title: "Journey",
    kicker: "THE LONG-TERM PATH",
    blurb: "The engineering journey, stage by stage — what each step builds on and unlocks.",
    icon: "route",
    keywords: "journey timeline roadmap path stages learning",
    content: <Timeline />,
  },
  {
    id: "systems",
    title: "Systems",
    kicker: "MY TECHNICAL WORLD",
    blurb: "The engineering world as one interconnected system — layers, tools, convergence.",
    icon: "chip",
    keywords: "systems world map nodes c linux architecture journey graph",
    content: <TechnicalWorld />,
  },
  {
    id: "why",
    title: "Why this path",
    kicker: "BENEATH THE ABSTRACTIONS",
    blurb: "Why I study the stack from the bottom up instead of learning frameworks first.",
    icon: "compass",
    keywords: "why path abstractions stack foundations philosophy reasons",
    content: <WhyThisPath />,
  },
  {
    id: "philosophy",
    title: "Philosophy",
    kicker: "ENGINEERING PROCESS",
    blurb: "The loop I actually work in: question, understand, build, break, debug, master.",
    icon: "loop",
    keywords: "philosophy process methodology question understand debug improve",
    content: <Philosophy />,
  },
  {
    id: "hood",
    title: "Under the hood",
    kicker: "SOURCE TO CPU",
    blurb: "What happens between writing code and the machine executing it.",
    icon: "cpu",
    keywords: "under the hood source compiler cpu binary pipeline",
    content: <UnderTheHood />,
  },
  {
    id: "stack",
    title: "Stack",
    kicker: "TECHNICAL DEPTH & FUTURE",
    blurb: "What I am learning, exploring, and planning — honest states, no fake percentages.",
    icon: "layers",
    keywords: "stack technical depth learning exploring planned future roadmap",
    content: <TechnicalStack />,
  },
  {
    id: "security",
    title: "Security",
    kicker: "SEC.LAYER // DEEP DIVE",
    blurb: "Security as a property of understanding the whole stack — exploring, labs only.",
    icon: "shield",
    keywords: "security cybersecurity defense offensive labs failure map",
    content: <DeepDiveBody page={deepDivePages.security} />,
  },
  {
    id: "ai",
    title: "AI Infrastructure",
    kicker: "AI.LAYER // DEEP DIVE",
    blurb: "The stack under intelligence: serving, GPUs, security — and where I stand on it.",
    icon: "spark",
    keywords: "ai ml infrastructure models serving gpu inference machine learning",
    content: <DeepDiveBody page={deepDivePages.ai} />,
  },
  {
    id: "terminal",
    title: "Terminal",
    kicker: "GUEST SHELL · FILESYSTEM ATTACHED",
    blurb: "A real shell over the portfolio's virtual filesystem — cd, ls, cat, open ai.",
    icon: "term",
    keywords: "terminal shell console bash filesystem ls cd cat open pateq",
    fill: true,
    content: <TerminalView />,
  },
  {
    id: "evidence",
    title: "Evidence",
    kicker: "PROOF OF WORK",
    blurb: "Built, building, learning, planned — strictly separated, nothing inflated.",
    icon: "check",
    keywords: "evidence proof repositories github experiments states",
    content: <Evidence />,
  },
  {
    id: "contact",
    title: "Contact",
    kicker: "REACH OUT",
    blurb: "Direct channels. No forms, no trackers — just ways to talk systems.",
    icon: "mail",
    keywords: "contact email github linkedin reach talk",
    content: <Contact />,
  },
];

export const apps: AppMeta[] = sections;
export const appById = (id: AppId): AppMeta => sections.find((a) => a.id === id) ?? sections[0];

/** Radial + dock pick the primary apps for quick access. */
export const dockApps: AppId[] = [
  "about",
  "projects",
  "journey",
  "systems",
  "security",
  "ai",
  "terminal",
  "contact",
];
export const radialApps: AppId[] = [
  "about",
  "projects",
  "journey",
  "systems",
  "security",
  "ai",
  "stack",
  "contact",
];
