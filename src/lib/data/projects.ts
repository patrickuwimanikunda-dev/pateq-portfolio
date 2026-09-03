import type { CaseStudy, CaseStudyFlow, CProjectCategory } from "@/lib/types";

/** Vertical spine of the architecture; items render as a side branch. */
export type FlowDiagram = CaseStudyFlow;

/**
 * ── HONESTY NOTE ─────────────────────────────────────────────
 * These case studies describe real projects and real engineering
 * thinking. Nothing is fabricated: no users, deployments, revenue,
 * partnerships, or metrics are claimed. "Result" sections state
 * actual current state, even when that state is "in development".
 * ─────────────────────────────────────────────────────────────
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "mediflow",
    index: "01",
    title: "MediFlow Rwanda",
    tagline: "Healthcare flow-management system",
    state: "BUILDING",
    stateLabel: "In development — concept and architecture being implemented",
    summary:
      "A healthcare flow-management system designed to improve patient movement and hospital workflow: smart ticketing, emergency triage scoring, queue management, patient navigation, nearby-hospital suggestions, billing, disease tracking, and an analytics dashboard, with mobile-money integration.",
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "In busy healthcare settings, patient flow is often ad-hoc: people queue in the wrong order, emergency cases mix with routine visits, staff lose time tracking who is next, and patients don't know where to go after registration.",
        bullets: [
          "Long, opaque waiting times",
          "Emergency cases not prioritized fast enough",
          "Patients unclear about the next step",
          "Manual queue and billing coordination",
          "No visibility into flow for hospital management",
        ],
      },
      {
        id: "context",
        title: "Context",
        body: "Patient flow is the path a patient follows from arrival to discharge: registration, triage, consultation, treatment, billing. When that flow is slow or unclear, the cost is measured in waiting time, staff workload, and — in the worst cases — outcomes. Flow management is not a luxury feature; it is core operations.",
      },
      {
        id: "goal",
        title: "Goal",
        body: "Build a system that organizes patient movement end-to-end: patients know where to go, emergencies are identified early by structured triage scoring, queues are managed fairly, billing is connected, and hospital management can see what is happening with real data.",
      },
      {
        id: "architecture",
        title: "Architecture",
        body: "A layered design: the patient interacts through a mobile/web interface; all logic sits behind an API; distinct services own distinct concerns; one database holds the state. The architecture is intentionally service-oriented so each flow can be built, tested, and replaced independently.",
        bullets: [
          "Patient → Mobile/Web interface → API",
          "API services: Queue, Triage, Navigation, Billing, Disease Tracking, Nearby Hospitals, Analytics",
          "Single database at the core",
        ],
      },
      {
        id: "technologies",
        title: "Technologies",
        body: "Being finalized as the project is built. I do not present a stack I have not shipped. Directional candidates (to be confirmed against what is actually implemented): a typed frontend, a language with a strong standard library on the API side, a relational database, and mobile-money integration via MoMo / Airtel Money APIs.",
      },
      {
        id: "decisions",
        title: "Engineering Decisions",
        body: "The reasoning behind the shape of the system:",
        bullets: [
          "Triage before queueing — emergency patients must not wait in the routine queue",
          "Ticketing as the spine — every other flow (navigation, billing, analytics) keys off the ticket",
          "Separate services per domain so queue logic does not entangle billing logic",
          "Analytics as a first-class service, not an afterthought — flow data only exists if it is captured from day one",
          "Mobile money first, because it matches how payments actually happen locally",
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        body: "Real systems are messy: triage scoring must be clinically responsible but usable by staff under pressure; queues must be fair under arrival bursts; disease tracking must respect patient privacy; mobile-money integration introduces external dependencies and failure modes that are outside my control.",
      },
      {
        id: "debugging",
        title: "Debugging",
        body: "The debugging discipline I bring from systems work applies directly: reproduce, isolate the layer, form a hypothesis, verify. When a queue behaves wrongly, the question is which layer is responsible — the ticket state machine, the API, or the database — before changing anything.",
      },
      {
        id: "solution",
        title: "Solution",
        body: "A flow-management platform: patients get a ticket and a clear next step; emergency cases are flagged by triage scoring; staff see the queue; billing and navigation are connected; management gets an analytics view. This is being built now — the solution is the project itself, not a finished product yet.",
      },
      {
        id: "result",
        title: "Result",
        body: "In development — no production metrics to report. This section will only ever contain real numbers: patients served, hospitals onboarded, wait-time changes. Until those exist, the honest result is: architecture defined, build in progress.",
      },
      {
        id: "lessons",
        title: "Lessons Learned",
        body: "Already, the project teaches more than code:",
        bullets: [
          "A healthcare flow system is a process problem as much as a software problem",
          "Requirements live in the hospital, not in the spec — listening beats assuming",
          "Scope discipline: ticketing and triage first, analytics later",
          "External integrations (mobile money) are their own engineering domain",
        ],
      },
      {
        id: "next",
        title: "What Comes Next",
        body: "Complete the core loop (ticketing → triage → queue → navigation), then billing and mobile-money integration, then disease tracking and analytics. Every future milestone gets added here as it actually ships.",
      },
    ],
    flow: {
      flow: [
        { label: "Patient" },
        { label: "Mobile / Web Interface" },
        {
          label: "API",
          detail: "Service layer",
          items: ["Queue System", "Triage Scoring", "Navigation", "Billing", "Disease Tracking", "Nearby Hospitals", "Analytics"],
        },
        { label: "Database" },
      ],
    },
  },
  {
    slug: "safedrive",
    index: "02",
    title: "SafeDriveRW / Guardex",
    tagline: "Vehicle safety IoT system",
    state: "BUILDING",
    stateLabel: "In development — hardware and logic being prototyped",
    summary:
      "An embedded vehicle-safety system built around an ESP32: alcohol detection, speed monitoring, GPS, and motion analysis feeding safety decisions that help protect the driver.",
    sections: [
      {
        id: "problem",
        title: "Problem",
        body: "Road accidents are frequently preceded by preventable factors: impaired driving, speeding, distraction, and poor vehicle state. A vehicle cannot think, but a small embedded system can sense and react faster and more reliably than a distracted driver.",
      },
      {
        id: "context",
        title: "Context",
        body: "Embedded systems sit at the physical edge of computing: they read the real world through sensors and act on it in milliseconds. Vehicle safety is one of the most meaningful applications — every decision the system makes happens in a moving, real-time context.",
      },
      {
        id: "goal",
        title: "Goal",
        body: "Build a vehicle-safety IoT system on an ESP32 that fuses sensor input — alcohol, speed, GPS, motion — into clear safety decisions and driver feedback, with forward-collision-warning concepts as the horizon.",
      },
      {
        id: "architecture",
        title: "Architecture",
        body: "Sensors feed an ESP32; the firmware applies safety logic; outputs reach the driver. Each sensor exists because it answers one question the safety logic needs:",
        bullets: [
          "Sensors → ESP32 → Processing / Safety Logic",
          "Alcohol detection — is the driver impaired?",
          "Speed monitoring — how fast, and against what limit?",
          "GPS — where, and what is nearby?",
          "Motion analysis (accelerometer) — sudden events, harsh braking, swerving",
          "Output → driver alert / monitoring system",
        ],
      },
      {
        id: "technologies",
        title: "Technologies",
        body: "ESP32 microcontroller, sensor modules (alcohol sensor, speed sensor, GPS, accelerometer), and embedded C/C++ firmware. Details of exact sensors and pins are being settled during prototyping.",
      },
      {
        id: "decisions",
        title: "Engineering Decisions",
        body: "Why each component exists:",
        bullets: [
          "ESP32 as the brain — mature, cheap, and well-documented for this exact class of device",
          "Alcohol detection as a core input — impairment is a leading preventable cause of crashes",
          "Accelerometer for motion analysis — swerving and harsh events are signals a speed sensor alone misses",
          "GPS for context — speed limits and road conditions depend on where the vehicle is",
          "Safety decisions kept deterministic — no ML black box in a safety-critical path during prototyping",
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        body: "Embedded reality: limited memory and compute on the ESP32, sensor noise and calibration, real-time constraints, power, and the responsibility of safety logic that must never make things worse. False alarms erode trust; missed events are worse.",
      },
      {
        id: "debugging",
        title: "Debugging",
        body: "Embedded debugging is systems debugging: logic analyzers and serial output instead of console logs, reading datasheets for timing, isolating sensor noise from firmware bugs, and reproducing issues on hardware — not in imagination.",
      },
      {
        id: "solution",
        title: "Solution",
        body: "A prototype that reads the sensors, applies clear safety rules, and communicates decisions to the driver. The build is in progress; the solution is the working prototype, not a marketed product.",
      },
      {
        id: "result",
        title: "Result",
        body: "Prototype stage — no production claims. When real tests on real hardware produce measurable results, they will be reported here as what they are: tests, with their conditions.",
      },
      {
        id: "lessons",
        title: "Lessons Learned",
        body: "Already valuable, and still accumulating:",
        bullets: [
          "Hardware forces honesty — firmware either runs or it does not",
          "Sensors are noisy; signal handling is half the engineering",
          "Safety systems must fail safe, always",
          "Reading datasheets beats guessing, every time",
        ],
      },
      {
        id: "next",
        title: "What Comes Next",
        body: "Complete the sensing and safety-logic loop on the ESP32, add driver communication, then explore forward-collision-warning concepts and vehicle monitoring extensions as the prototype matures.",
      },
    ],
    flow: {
      flow: [
        {
          label: "Sensors",
          detail: "Physical world input",
          items: ["Alcohol sensor", "Speed sensor", "GPS", "Accelerometer"],
        },
        { label: "ESP32", detail: "Firmware" },
        {
          label: "Processing / Safety Logic",
          detail: "Decision layer",
          items: ["Alcohol Detection", "Speed Monitoring", "GPS", "Motion Analysis", "Safety Decisions"],
        },
        { label: "Driver / Monitoring System", detail: "Output" },
      ],
    },
  },
];

/**
 * Growing systems section — planned experiments are labeled
 * PLANNED/EXPLORING and are never presented as completed work.
 */
export const cProjectCategories: CProjectCategory[] = [
  {
    id: "c-fundamentals",
    title: "C Fundamentals",
    description: "Pointers, memory, data structures, algorithms, file handling.",
    items: [
      { name: "Pointer & memory experiments", status: "EXPLORING", note: "First labs on stack vs heap, aliasing, and lifetimes" },
      { name: "Data structure library", status: "PLANNED", note: "Lists, stacks, queues, hash tables from scratch" },
      { name: "Sorting & algorithm workbench", status: "EXPLORING", note: "Implement and measure basic algorithms" },
      { name: "File handling utilities", status: "PLANNED", note: "Small tools that read and write structured files" },
    ],
  },
  {
    id: "linux-systems",
    title: "Linux / Systems",
    description: "Process monitor, shell, filesystem utilities, system-call experiments.",
    items: [
      { name: "System-call experiments", status: "EXPLORING", note: "Tracing and calling the OS directly" },
      { name: "Process monitor", status: "PLANNED", note: "A small tool that inspects running processes" },
      { name: "Filesystem utilities", status: "PLANNED", note: "Reimplementing familiar CLI tools" },
      { name: "Memory allocator", status: "PLANNED", note: "A minimal malloc/free to see the allocator from inside" },
      { name: "Shell", status: "PLANNED", note: "A minimal command interpreter" },
    ],
  },
  {
    id: "networking",
    title: "Networking",
    description: "Sockets, TCP/UDP, HTTP, small networking utilities.",
    items: [
      { name: "Socket programming labs", status: "EXPLORING", note: "Getting hands on the BSD socket API" },
      { name: "TCP client / server", status: "PLANNED", note: "A minimal echo server and client" },
      { name: "HTTP client", status: "PLANNED", note: "Fetch and parse HTTP responses by hand" },
      { name: "Networking utilities", status: "PLANNED", note: "Small diagnostic tools built on sockets" },
    ],
  },
  {
    id: "security",
    title: "Security",
    description: "Secure programming, authentication systems, controlled experiments.",
    items: [
      { name: "Secure C programming practice", status: "PLANNED", note: "Buffer handling, bounds checks, defensive coding" },
      { name: "Authentication systems", status: "PLANNED", note: "Password hashing and verification done properly" },
      { name: "Controlled security experiments", status: "PLANNED", note: "Lab-environment vulnerability analysis only" },
      { name: "Defensive security tools", status: "PLANNED", note: "Audit and hardening helpers" },
    ],
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    description: "Key-value stores, message queues, distributed service experiments.",
    items: [
      { name: "Key-value store", status: "PLANNED", note: "A small store with a real protocol" },
      { name: "Message queue", status: "PLANNED", note: "Publish/subscribe over sockets" },
      { name: "Distributed experiments", status: "PLANNED", note: "Replication and failure-handling labs" },
    ],
  },
  {
    id: "ai-infra",
    title: "AI Infrastructure",
    description: "Model serving, inference systems, CPU/GPU benchmarking.",
    items: [
      { name: "CPU / GPU benchmarking", status: "PLANNED", note: "Measure and understand what compute actually costs" },
      { name: "Inference pipelines", status: "PLANNED", note: "Serving a model end to end" },
      { name: "Model serving experiments", status: "PLANNED", note: "Latency, throughput, and batching" },
    ],
  },
  {
    id: "hpc-quant",
    title: "HPC / Quant",
    description: "Numerical computing, parallel algorithms, low-latency systems.",
    items: [
      { name: "Numerical computing", status: "PLANNED", note: "Stable numeric routines, error analysis" },
      { name: "Parallel algorithms", status: "PLANNED", note: "Speedup, scaling, and where it breaks" },
      { name: "C++ performance engineering", status: "PLANNED", note: "Profiling-driven optimization" },
      { name: "Low-latency systems", status: "PLANNED", note: "Latency budgets and lock-free thinking" },
    ],
  },
];

export const cProjectByCategory = (id: string): CProjectCategory =>
  cProjectCategories.find((c) => c.id === id) ?? cProjectCategories[0];