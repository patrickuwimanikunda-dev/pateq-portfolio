# PATEQ — Technical Portfolio

An interactive, technical portfolio representing a systems-oriented engineering journey —
built with **Next.js, React, TypeScript, Tailwind CSS, and Framer Motion**.

The site is a **desktop-environment portfolio**: a Plymouth-style boot into a PATEQ
desktop shell (Caelestia/Hyprland-inspired, original implementation) where every
portfolio section opens as its own floating, draggable, maximizable window — with a
radial system core, app launcher (⌘K), control center, workspaces, dock, notifications,
and a real shell over a virtual filesystem. Dark/light themes and honest, data-driven
case studies included.

### Windows & keybinds

- **Drag** a window by its title bar; **resize** from the bottom-right corner.
- Double-click the title bar to toggle **maximize**.
- `ALT+1–5` switch workspaces (home, projects, journey, systems, future)
- `ALT+T` terminal · `ALT+H` home · `CTRL/CMD+K` launcher · `ESC` close/back

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint      # eslint
```

## Make it yours

Everything personal lives in `src/lib/`:

| File | What to edit |
| --- | --- |
| `src/lib/site.ts` | Name, role, location, GitHub / LinkedIn / email / CV links, boot lines |
| `src/lib/data/technicalWorld.ts` | The 14 journey nodes + graph edges |
| `src/lib/data/journey.ts` | Timeline stages + System Core milestones |
| `src/lib/data/stack.ts` | Technical depth categories + learning statuses |
| `src/lib/data/projects.ts` | MediFlow + SafeDrive case studies, C/Systems categories |
| `src/lib/data/pipeline.ts` | "Under the Hood" stages |
| `src/lib/data/philosophy.ts` | Engineering process loop |
| `src/lib/data/fs.ts` | Virtual filesystem: the files `ls` / `cd` / `cat` operate on |
| `src/lib/data/terminal.ts` | Shell command docs (`man`) + `open` target routing |
| `src/lib/data/deepdive.ts` | AI + Security briefing-page content |
| `src/components/desktop/apps.tsx` | App registry: which sections open as windows + `appImages` icon URLs |
| `src/components/desktop/PateqDesktop.tsx` | Desktop shell: dock, windows, launcher, control center |

### Personalization checklist

- [ ] `src/lib/site.ts` → replace GitHub URL, add email / LinkedIn / CV if you want them
- [ ] **Portrait:** set `photo` in `src/lib/site.ts` to `/portrait.jpg` (dropped in `public/`)
      or a hosted URL. It appears in the ABOUT window. Leave empty for the placeholder.
- [ ] **Real images via links:** set `logo` and `wallpaper` in `src/lib/site.ts`, and per-app
      icons in `appImages` inside `src/components/desktop/apps.tsx`. Empty = drawn glyphs/
      emblem, so nothing breaks until you paste URLs.
- [ ] Review every status in `src/lib/data/stack.ts` and `projects.ts` — they should
      reflect reality at all times
- [ ] Add future projects to `src/lib/data/projects.ts` as they actually ship

### The terminal (real shell, virtual filesystem)

The button in the bottom-left opens a guest shell with Linux-style navigation over a
read-only virtual filesystem:

```bash
ls                 # list files (dirs end with /)
cd ~/notes && ls   # move around (supports ., .., ~, /)
cat notes/c.txt    # read a file
open ai            # opens the AI briefing page
open security      # opens the security briefing page
open projects      # scrolls to a section
man ls · tree · whoami · uname · date · history · clear · exit
```

Tab completes command names and paths. `help` lists everything. The filesystem tree
lives in `src/lib/data/fs.ts`; the AI/security briefing content is in
`src/lib/data/deepdive.ts`.

### Theme

The sun/moon toggle in the nav switches between dark and light. The choice is saved in
`localStorage`; the site defaults to dark.

## Design principles

- **Honesty first** — no fabricated users, metrics, deployments, or expertise.
  Planned work is labeled `FUTURE`, active study is `LEARNING` / `EXPLORING`.
- **Privacy-first** — no trackers, analytics, or third-party scripts.
- **Accessible** — semantic HTML, keyboard navigation, focus states, and full
  `prefers-reduced-motion` support throughout.
- **Performance** — server-rendered content for SEO, minimal client JavaScript,
  self-hosted fonts, SVG diagrams instead of image assets.

## Content rules (keep these forever)

- RESTORA and StudentDB are **not** part of this portfolio — do not reference them.
- Never present a future goal as an accomplishment.
- If information is unknown, use a placeholder.

## Project structure

```
src/
  app/            layout, metadata, page composition, globals.css, favicon
  components/
    boot/         boot sequence + provider
    layout/       nav, footer, System Core rail, theme toggle
    hero/         hero section
    world/        My Technical World graph
    why/          abstraction stack
    philosophy/   engineering process loop
    projects/     case studies, flow diagrams, C/Systems grid
    hood/         source→CPU pipeline
    stack/        technical depth
    timeline/     journey timeline
    about/        story + portrait placeholder
    evidence/     built / building / learning / planned
    contact/      contact panel
    terminal/     shell over the virtual filesystem
    deepdive/     AI + Security briefing pages
    ui/           Section, Reveal, StatusBadge primitives
  context/        boot + scroll-tracking + theme providers
  lib/            site config + all content data (edit here)
```