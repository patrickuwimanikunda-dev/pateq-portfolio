/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION
 *  Edit this file to personalize the portfolio.
 *  Placeholders (marked below) are intentionally empty/neutral —
 *  nothing here is fabricated.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  /** Personal / system brand shown in the boot sequence and UI chrome. */
  brand: "PATEQ",
  /** Full name as it appears in the hero, about, and footer. */
  name: "Patrick Uwimanikunda",
  firstName: "Patrick",
  /** Short technical positioning line. */
  role: "Systems Engineering · AI Infrastructure · Cybersecurity · HPC",
  /** One-line statement of direction. */
  direction:
    "Building deep technical capability from the foundations of computing upward — C, memory, architecture, Linux, operating systems, networking, security — toward AI infrastructure, high-performance computing, and quantitative engineering.",

  /** Location (used sparingly; edit if inaccurate). */
  location: "Rwanda",

  /**
   * Portrait photo.
   * 1. Drop a photo at  public/portrait.jpg  (square-ish, JPG/PNG), or
   * 2. Paste a hosted image URL here (GitHub avatar, etc).
   * Leave it empty ("") to keep the placeholder frame in the ABOUT section.
   */
  photo: "/UI.png",

  /**
   * Real images via links (optional — empty falls back to the drawn PATEQ
   * emblem / gradient orbs). Paste hosted URLs, e.g.
   *   logo:      "https://example.com/pateq-logo.png"   square emblem
   *   wallpaper: "https://example.com/desktop.png"      desktop backdrop
   */
  logo: "/UI.png",
  wallpaper: "/back.jpg",

  /** ── Links — replace placeholders with real URLs ────────── */
  links: {
    github: "https://github.com/patrickuwimanikunda-dev", // TODO: replace
    linkedin: "https://www.linkedin.com/in/uwimanikunda-patrick-b54a83385/", // TODO: optional
    email: "patrickuwimanikunda@gmail.com", // TODO: e.g. "you@example.com" — empty hides the mail button
    cv: "", // TODO: optional — empty hides the CV button
  },

  /** Boot sequence lines shown on first visit. */
  bootLines: [
    "Initializing environment...",
    "Loading engineering stack...",
    "Loading projects...",
    "Establishing connection...",
    "System ready...",
  ],
} as const;

export const navItems = [
  { id: "world", label: "World" },
  { id: "why", label: "Why this path" },
  { id: "philosophy", label: "Philosophy" },
  { id: "projects", label: "Projects" },
  { id: "hood", label: "Under the hood" },
  { id: "stack", label: "Stack" },
  { id: "timeline", label: "Journey" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

/** Ordered section ids used for scroll tracking. */
export const sectionIds = [
  "hero",
  "world",
  "why",
  "philosophy",
  "projects",
  "hood",
  "stack",
  "timeline",
  "about",
  "evidence",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
