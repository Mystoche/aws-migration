import { cn } from "@/lib/utils";

/**
 * Logo — Congo History
 *
 * Replaces the previous Cloud icon with a stylized silhouette of the
 * Republic of Congo map. The overall shape (rounded square + flag strip
 * at the bottom) is preserved.
 *
 * The silhouette path is a simplified, recognizable outline of the
 * Congo-Brazzaville territory.
 */
export function CongoLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-11 w-11" : "h-9 w-9";
  return (
    <span
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-congo-green via-congo-green to-emerald-700 shadow-glow-green",
        dims,
        className,
      )}
    >
      {/* Stylized country map silhouette */}
      <svg
        viewBox="0 0 100 100"
        className="h-3/5 w-3/5 text-white"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M30 8 L48 6 L66 10 L74 18 L80 16 L84 24 L80 32 L86 38 L82 46 L78 52 L84 60 L80 68 L72 72 L70 80 L62 84 L58 78 L50 82 L44 76 L36 80 L28 74 L24 64 L18 58 L22 50 L16 44 L20 36 L14 28 L22 22 L26 14 Z" />
      </svg>
      {/* Flag strip */}
      <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-congo-green via-congo-yellow to-congo-red" />
    </span>
  );
}

/**
 * Full brand lockup: logo + wordmark "CONGO HISTORY".
 */
export function BrandMark({
  className,
  size = "md",
  showSubtitle = false,
  subtitle = "Cloud",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  subtitle?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <CongoLogo size={size} />
      <div className="flex flex-col leading-none">
        <span className="font-serif text-base font-bold tracking-tight text-foreground">
          CONGO HISTORY
        </span>
        {showSubtitle && (
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            {subtitle}
          </span>
        )}
      </div>
    </span>
  );
}
