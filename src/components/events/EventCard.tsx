'use client'

import Link from "next/link";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import type { HistoricalEvent } from "@/types";
import { getCategory } from "@/data/categories";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: HistoricalEvent;
  className?: string;
  index?: number;
}

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

export function EventCard({ event, className, index = 0 }: EventCardProps) {
  const category = getCategory(event.category);
  const dateLabel = event.day && event.month
    ? `${event.day} ${MONTHS_FR[event.month - 1]}`
    : event.month
      ? MONTHS_FR[event.month - 1]
      : "";

  return (
    <Reveal delay={index * 60} as="article">
      <Link
        href={`/events/${event.slug}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-archive",
          className,
        )}
      >
        <div className="relative">
          <VisualIdentity
            year={event.year}
            month={event.month}
            day={event.day}
            seed={event.id}
            variant="event"
            aspect="video"
            className="rounded-none border-0"
          />
          {/* Category badge */}
          {category && (
            <span
              className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm"
              style={{ backgroundColor: category.color }}
            >
              {category.label}
            </span>
          )}
          {event.status === "needs-verification" && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-congo-yellow/95 px-2 py-1 text-[10px] font-semibold text-congo-noir">
              À vérifier
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {dateLabel || event.year}
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {event.title}
          </h3>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {event.summary}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              Découvrir
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            {event.tags && event.tags.length > 0 && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                {event.tags[0]}
              </span>
            )}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
