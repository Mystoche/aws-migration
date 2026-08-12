'use client'

import { useRef, useEffect } from "react";
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
 *
 * PERFORMANCE: uses a single stable ref + ONE IntersectionObserver per
 * element. The observer directly toggles the `is-visible` class on the DOM
 * node, avoiding React re-renders entirely. This is critical for pages with
 * many cards (timeline, events list, gallery).
 *
 * Respects prefers-reduced-motion via CSS (see globals.css `.reveal`).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as any}
      className={cn("reveal", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
