'use client'

import { Suspense } from "react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Filter, X, Calendar, ChevronRight } from "lucide-react";
import { eventsService } from "@/services";
import { periods } from "@/data/periods";
import { categories } from "@/data/categories";
import type { HistoricalEvent, Category, Period } from "@/types";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LoadingState, EmptyState } from "@/components/common/States";
import { Reveal } from "@/components/common/Reveal";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { getCategory } from "@/data/categories";
import { cn } from "@/lib/utils";

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

/**
 * Default export wraps the timeline in a Suspense boundary.
 * Required by Next.js because `useSearchParams()` opts the page into CSR,
 * and the static prerenderer needs a Suspense fallback during `next build`.
 */
export default function TimelinePage() {
  return (
    <Suspense fallback={<LoadingState className="min-h-screen" />}>
      <TimelineContent />
    </Suspense>
  );
}

function TimelineContent() {
  const searchParams = useSearchParams();
  const initialPeriod = searchParams.get("period") as Period | null;
  const [periodFilter, setPeriodFilter] = useState<Period | "all">(initialPeriod ?? "all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["timeline-events", periodFilter, categoryFilter],
    queryFn: () => eventsService.list({
      period: periodFilter !== "all" ? periodFilter : undefined,
      category: categoryFilter !== "all" ? categoryFilter : undefined,
    }),
  });

  const activeCount = (periodFilter !== "all" ? 1 : 0) + (categoryFilter !== "all" ? 1 : 0);

  const resetFilters = () => {
    setPeriodFilter("all");
    setCategoryFilter("all");
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border bg-congo-noir py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-archive-grid opacity-40" />
        <div
          className="absolute -right-32 top-0 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,149,67,0.5), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Voyage dans le temps"
            title={<span className="text-white">La timeline du Congo</span>}
            description="De 1960 à aujourd'hui, parcourez les événements qui ont façonné la République du Congo, filtrés par période et par catégorie."
            className="text-white"
          />
        </div>
      </section>

      {/* Filters bar */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary/40"
            >
              <Filter className="h-4 w-4" />
              Filtres
              {activeCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {activeCount}
                </span>
              )}
            </button>

            {/* Period quick filters */}
            <div className="flex flex-1 flex-wrap items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setPeriodFilter("all")}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  periodFilter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                Toutes
              </button>
              {periods.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPeriodFilter(p.id)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    periodFilter === p.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70",
                  )}
                >
                  {p.yearStart}–{p.yearEnd ?? "···"}
                </button>
              ))}
            </div>

            {activeCount > 0 && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
                Réinitialiser
              </button>
            )}
          </div>

          {/* Expanded filters (categories) */}
          {showFilters && (
            <div className="mt-3 border-t border-border pt-3">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Catégorie
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    categoryFilter === "all"
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/70",
                  )}
                >
                  Toutes
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategoryFilter(c.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                      categoryFilter === c.id
                        ? "text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/70",
                    )}
                    style={
                      categoryFilter === c.id
                        ? { backgroundColor: c.color }
                        : undefined
                    }
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <LoadingState message="Chargement de la timeline…" />
          ) : events.length === 0 ? (
            <EmptyState
              title="Aucun événement trouvé."
              description="Essayez d'élargir vos filtres."
              action={
                <button
                  onClick={resetFilters}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Réinitialiser les filtres
                </button>
              }
            />
          ) : (
            <>
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {events.length} événement{events.length > 1 ? "s" : ""} · 1960 → aujourd'hui
              </p>

              {/* Desktop alternated timeline */}
              <ol className="relative hidden md:block">
                {/* Central line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-congo-green via-congo-yellow to-congo-red opacity-30" />

                <div className="space-y-8">
                  {events.map((event, i) => (
                    <TimelineItemAlternated key={event.id} event={event} index={i} />
                  ))}
                </div>
              </ol>

              {/* Mobile vertical timeline */}
              <ol className="relative md:hidden">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-congo-green via-congo-yellow to-congo-red opacity-30" />
                <div className="space-y-4">
                  {events.map((event, i) => (
                    <TimelineItemVertical key={event.id} event={event} index={i} />
                  ))}
                </div>
              </ol>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function TimelineItemAlternated({ event, index }: { event: HistoricalEvent; index: number }) {
  const category = getCategory(event.category);
  const isLeft = index % 2 === 0;
  const dateLabel = event.day && event.month
    ? `${event.day} ${MONTHS_FR[event.month - 1]}`
    : event.month
      ? MONTHS_FR[event.month - 1]
      : "";

  return (
    <Reveal as="li" delay={index * 40} className="relative grid grid-cols-2 gap-8">
      {/* Card */}
      <div className={cn("relative", isLeft ? "col-start-1 pr-8 text-right" : "col-start-2 pl-8")}>
        <Link
          href={`/events/${event.slug}`}
          className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-archive"
        >
          <div className={cn("flex gap-4", isLeft && "flex-row-reverse")}>
            <VisualIdentity
              year={event.year}
              month={event.month}
              day={event.day}
              seed={event.id}
              variant="event"
              aspect="square"
              className="w-32 shrink-0 rounded-none border-0"
            />
            <div className="flex flex-1 flex-col gap-1.5 p-4">
              <div className={cn("flex items-center gap-2", isLeft && "justify-end")}>
                {category && (
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.label}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {dateLabel || event.year}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                {event.title}
              </h3>
              <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {event.summary}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Year on the line */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-background bg-congo-noir text-congo-yellow shadow-lg"
          >
            <span className="display-date text-sm font-black">{event.year}</span>
          </span>
          <span
            className="absolute inset-0 -z-10 rounded-full opacity-40 blur-md"
            style={{ backgroundColor: category?.color }}
          />
        </div>
      </div>
    </Reveal>
  );
}

function TimelineItemVertical({ event, index }: { event: HistoricalEvent; index: number }) {
  const category = getCategory(event.category);
  const dateLabel = event.day && event.month
    ? `${event.day} ${MONTHS_FR[event.month - 1]}`
    : event.month
      ? MONTHS_FR[event.month - 1]
      : "";

  return (
    <Reveal as="li" delay={index * 40} className="relative pl-12">
      <Link
        href={`/events/${event.slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40"
      >
        <div className="flex gap-4">
          <VisualIdentity
            year={event.year}
            month={event.month}
            day={event.day}
            seed={event.id}
            variant="event"
            aspect="square"
            className="w-24 shrink-0 rounded-none border-0"
          />
          <div className="flex flex-1 flex-col gap-1.5 p-3">
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.label}
                </span>
              )}
              <span className="text-[11px] text-muted-foreground">{dateLabel || event.year}</span>
            </div>
            <h3 className="font-serif text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
              {event.title}
            </h3>
            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {event.summary}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
              Découvrir <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
      <span className="absolute left-2 top-3 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: category?.color }} />
      </span>
    </Reveal>
  );
}
