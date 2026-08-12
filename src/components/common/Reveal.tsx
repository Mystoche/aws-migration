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
 * ROBUSTNESS:
 *  - Defaults to VISIBLE (the className always includes `is-visible`).
 *  - If the element is below the viewport at mount, `useEffect` removes
 *    `is-visible` and attaches an IntersectionObserver that re-adds it
 *    when the element scrolls into view.
 *  - No React state is used → no re-renders during scroll → fast.
 *  - If IntersectionObserver is unavailable (older browsers, SSR), the
 *    element stays visible — no "infinite loading" trap.
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
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return; // already visible — nothing to do

    // Element is below the viewport: hide it (CSS) and observe
    node.classList.remove("is-visible");

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
      className={cn("reveal", "is-visible", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
