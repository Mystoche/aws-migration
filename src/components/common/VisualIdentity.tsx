'use client'

import { cn } from "@/lib/utils";

/**
 * VisualIdentity — deterministic SVG "visual identity" card.
 *
 * Replaces photographs for the demonstration version. Uses the Congo flag's
 * diagonal structure (green top-left, yellow diagonal band, red bottom-right)
 * combined with large date typography (Playfair Display).
 *
 * Easily replaceable: each card renders with `data-visual-id="<seed>"` so the
 * future S3-hosted images can be wired in by swapping the <svg> for an <img>.
 */

const MONTHS_FR = [
  "JAN", "FÉV", "MAR", "AVR", "MAI", "JUN",
  "JUL", "AOÛ", "SEP", "OCT", "NOV", "DÉC",
];

interface VisualIdentityProps {
  year?: number;
  month?: number;
  day?: number;
  title?: string;
  subtitle?: string;
  seed?: string;
  variant?: "event" | "personality" | "article" | "place" | "default";
  className?: string;
  aspect?: "video" | "square" | "portrait" | "wide";
}

const ASPECTS: Record<NonNullable<VisualIdentityProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function VisualIdentity({
  year,
  month,
  day,
  title,
  subtitle,
  seed,
  variant = "default",
  className,
  aspect = "video",
}: VisualIdentityProps) {
  // Deterministic pseudo-random based on seed
  const key = seed || `${year}-${title || ""}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  const rand1 = (hash % 100) / 100;
  const rand2 = ((hash >> 8) % 100) / 100;

  const dateLabel = day && month
    ? `${day} ${MONTHS_FR[month - 1]}`
    : month
      ? MONTHS_FR[month - 1]
      : "";

  return (
    <div
      data-visual-id={key}
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-congo-noir text-white",
        ASPECTS[aspect],
        className,
      )}
    >
      {/* Base flag-inspired diagonal gradient */}
      <svg
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${hash}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#07110C" />
            <stop offset="55%" stopColor="#0B1E14" />
            <stop offset="100%" stopColor="#04150D" />
          </linearGradient>
          <linearGradient id={`flag-${hash}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#009543" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#009543" stopOpacity="0" />
            <stop offset="55%" stopColor="#FBDE4A" stopOpacity="0" />
            <stop offset="60%" stopColor="#FBDE4A" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#DC241F" stopOpacity="0" />
            <stop offset="100%" stopColor="#DC241F" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill={`url(#grad-${hash})`} />
        <rect width="400" height="225" fill={`url(#flag-${hash})`} />
        {/* Tribal dots */}
        <g fill="#FBDE4A" opacity="0.12">
          {Array.from({ length: 14 }).map((_, i) => (
            <circle
              key={`d1-${i}`}
              cx={(i * 32 + rand1 * 20) % 400}
              cy={((i * 47 + rand2 * 30) % 225)}
              r="1.4"
            />
          ))}
        </g>
        <g fill="#009543" opacity="0.15">
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={`d2-${i}`}
              cx={(i * 51 + rand2 * 30) % 400}
              cy={((i * 23 + rand1 * 50) % 225)}
              r="1.1"
            />
          ))}
        </g>
        {/* Diagonal flag accent (subtle) */}
        <polygon
          points="0,0 400,0 0,225"
          fill="#009543"
          opacity="0.10"
        />
        <polygon
          points="400,0 400,225 0,225"
          fill="#DC241F"
          opacity="0.10"
        />
        {/* Yellow diagonal band */}
        <polygon
          points="380,10 390,10 10,215 0,215"
          fill="#FBDE4A"
          opacity="0.18"
        />
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-congo-noir/85 via-congo-noir/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        {dateLabel && (
          <div className="mb-2 inline-flex w-fit items-center gap-2">
            <span className="h-1 w-6 rounded-full bg-congo-yellow" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-congo-yellow/90">
              {dateLabel}
            </span>
          </div>
        )}
        {year && (
          <div
            className="display-date text-5xl font-extrabold leading-none text-white sm:text-6xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
          >
            {year}
          </div>
        )}
        {subtitle && (
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
            {subtitle}
          </div>
        )}
        {title && (
          <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/85 line-clamp-2">
            {title}
          </div>
        )}
      </div>

      {/* Top-right flag mark */}
      <div className="absolute right-3 top-3 flex items-center gap-1">
        <span className="block h-3 w-1 rounded-sm bg-congo-green" />
        <span className="block h-3 w-1 rounded-sm bg-congo-yellow" />
        <span className="block h-3 w-1 rounded-sm bg-congo-red" />
      </div>

      <span className="sr-only">
        {variant === "personality" ? "Portrait" : "Visuel"} {title ?? year ?? ""}
      </span>
    </div>
  );
}
