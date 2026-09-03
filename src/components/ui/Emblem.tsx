/**
 * PATEQ emblem — an original, geometric dragon sigil (no copied assets).
 * A stylised dragon coil wound around a glowing core, rendered in the
 * accent palette. Used by the boot screen, system core, and chrome.
 *
 * The design draws inspiration from the Kali Linux dragon but is an
 * original geometric interpretation — not a copy.
 */
export default function Emblem({
  size = 64,
  className,
  variant = "dragon",
}: {
  size?: number;
  className?: string;
  variant?: "dragon" | "serpent";
}) {
  const id = "pateq-grad";
  const id2 = "pateq-glow";

  if (variant === "serpent") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label="PATEQ emblem"
        className={className}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-core)" />
            <stop offset="55%" stopColor="var(--color-accent-2, #8ea2ff)" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill={`url(#${id})`} opacity="0.14" />
        <rect x="2" y="2" width="60" height="60" rx="16" fill="none" stroke={`url(#${id})`} strokeWidth="1.6" opacity="0.85" />
        <path
          d="M14 46 C 10 30, 30 16, 34 22 C 39 30, 16 34, 24 42 C 30 48, 46 42, 50 32 C 53 24, 46 14, 38 12"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path d="M38 12 l -6 1.5 l 4.5 4.5 Z" fill={`url(#${id})`} />
        <circle cx="43" cy="10.5" r="1.6" fill="#fff" />
        <circle cx="34" cy="38" r="5.4" fill="none" stroke={`url(#${id})`} strokeWidth="1.6" />
        <circle cx="34" cy="38" r="2.6" fill={`url(#${id})`} />
      </svg>
    );
  }

  // Kali-inspired dragon emblem — original geometric interpretation
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="PATEQ dragon emblem"
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-core)" />
          <stop offset="50%" stopColor="var(--color-accent-2, #8ea2ff)" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <radialGradient id={id2} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-core)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <filter id="dragon-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx="32" cy="32" r="30" fill={`url(#${id2})`} />

      {/* Rounded tile frame */}
      <rect x="2" y="2" width="60" height="60" rx="14" fill="none" stroke={`url(#${id})`} strokeWidth="1.4" opacity="0.7" />

      {/* Dragon body — geometric coil */}
      <g filter="url(#dragon-glow)">
        {/* Main spine curve */}
        <path
          d="M16 48 C 12 36, 20 24, 28 20 C 34 17, 42 18, 46 22 C 50 26, 50 32, 46 36 C 42 40, 34 42, 30 38"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Wing */}
        <path
          d="M28 20 L 22 12 L 18 16 L 24 14 Z"
          fill={`url(#${id})`}
          opacity="0.8"
        />
        <path
          d="M34 18 L 42 10 L 44 14 L 38 13 Z"
          fill={`url(#${id})`}
          opacity="0.6"
        />
        {/* Head */}
        <path
          d="M46 22 L 52 18 L 54 22 L 50 24 Z"
          fill={`url(#${id})`}
        />
        {/* Eye */}
        <circle cx="51" cy="20" r="1.2" fill="#fff" />
        {/* Tail */}
        <path
          d="M30 38 C 26 42, 18 46, 14 48"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Core orb */}
        <circle cx="32" cy="30" r="4" fill="none" stroke={`url(#${id})`} strokeWidth="1.4" opacity="0.6" />
        <circle cx="32" cy="30" r="2" fill={`url(#${id})`} opacity="0.9" />
      </g>

      {/* Corner accents */}
      <circle cx="8" cy="8" r="1" fill={`url(#${id})`} opacity="0.5" />
      <circle cx="56" cy="8" r="1" fill={`url(#${id})`} opacity="0.5" />
      <circle cx="8" cy="56" r="1" fill={`url(#${id})`} opacity="0.5" />
      <circle cx="56" cy="56" r="1" fill={`url(#${id})`} opacity="0.5" />
    </svg>
  );
}
