'use client'

import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import type { Personality } from "@/types";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

interface PersonalityCardProps {
  personality: Personality;
  className?: string;
  index?: number;
}

function formatDates(p: Personality): string {
  const birth = p.birthDate ? new Date(p.birthDate).getFullYear() : "?";
  const death = p.deathDate ? new Date(p.deathDate).getFullYear() : "";
  if (birth === "?" && !death) return "";
  return death ? `${birth} – ${death}` : `${birth} – …`;
}

export function PersonalityCard({ personality, className, index = 0 }: PersonalityCardProps) {
  const dates = formatDates(personality);
  const nameParts = personality.name.split(" ");
  const initials = nameParts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <Reveal delay={index * 60} as="article">
      <Link
        href={`/personalities/${personality.slug}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-archive",
          className,
        )}
      >
        <div className="relative">
          <VisualIdentity
            seed={personality.id}
            variant="personality"
            aspect="portrait"
            title={personality.role}
            className="rounded-none border-0"
          />
          {/* Initials overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="display-date text-6xl font-bold text-white/85 drop-shadow-lg">
              {initials}
            </span>
          </div>
          {personality.status === "needs-verification" && (
            <span className="absolute right-3 top-3 rounded-full bg-congo-yellow/95 px-2 py-1 text-[10px] font-semibold text-congo-noir">
              À vérifier
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-serif text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {personality.name}
          </h3>
          {personality.role && (
            <p className="line-clamp-2 text-xs font-medium text-primary/90">
              {personality.role}
            </p>
          )}
          {dates && (
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {dates}
            </p>
          )}
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {personality.biography}
          </p>

          <div className="mt-auto flex items-center gap-1 pt-2 text-xs font-medium text-primary">
            Voir la biographie
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
