import { cn } from "@/lib/utils";

/**
 * Logo — Congo History
 *
 * Uses the real map of the Republic of Congo (public/images/congo-carte.png),
 * which already carries the flag colors (green, yellow, red). The map image
 * has a white background, so the container uses a light background to let
 * the flag colors show through cleanly.
 *
 * A small flag strip at the bottom keeps the brand signature.
 */
export function CongoLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-9 w-9";
  return (
    <span
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg bg-congo-cream ring-1 ring-congo-green/30 shadow-sm",
        dims,
        className,
      )}
    >
      {/* Real Congo map image (flag-colored silhouette on white) */}
      <img
        src="/images/congo-carte.png"
        alt="Carte de la République du Congo"
        className="h-full w-full object-contain p-0.5"
        loading="eager"
        decoding="async"
      />
      {/* Flag strip at the bottom for brand signature */}
      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-congo-green via-congo-yellow to-congo-red" />
    </span>
  );
}

/**
 * Full brand lockup: logo + wordmark "CONGO HISTORY".
 */
export function BrandMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <CongoLogo size={size} />
      <span className="font-serif text-base font-bold tracking-tight text-foreground">
        CONGO HISTORY
      </span>
    </span>
  );
}
