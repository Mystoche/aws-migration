'use client'

import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  as?: "div" | "section" | "article" | "li";
  threshold?: number;
}

/**
 * Reveal — fades & slides children into view on scroll.
 * Respects prefers-reduced-motion via CSS (see globals.css `.reveal`).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  threshold,
}: RevealProps) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
      data-reveal
      ref={(node) => {
        if (!node) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          },
          { threshold: threshold ?? 0.15, rootMargin: "0px 0px -8% 0px" },
        );
        observer.observe(node);
      }}
    >
      {children}
    </Tag>
  );
}
