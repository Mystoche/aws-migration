'use client'

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, X, Grid3x3, List } from "lucide-react";
import { eventsService } from "@/services";
import { periods } from "@/data/periods";
import { categories } from "@/data/categories";
import type { Category, Period } from "@/types";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EventCard } from "@/components/events/EventCard";
import { LoadingState, EmptyState } from "@/components/common/States";
import { cn } from "@/lib/utils";

type SortKey = "year-asc" | "year-desc";

export default function EventsPage() {
  const [periodFilter, setPeriodFilter] = useState<Period | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("year-asc");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events-list", periodFilter, categoryFilter, search, sort],
    queryFn: () =>
      eventsService.list({
        period: periodFilter !== "all" ? periodFilter : undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        search: search || undefined,
      }),
  });

  const sorted = useMemo(() => {
    const arr = [...events];
    if (sort === "year-desc") arr.reverse();
    return arr;
  }, [events, sort]);

  const activeCount = (periodFilter !== "all" ? 1 : 0) + (categoryFilter !== "all" ? 1 : 0) + (search ? 1 : 0);
  const reset = () => { setPeriodFilter("all"); setCategoryFilter("all"); setSearch(""); };

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border bg-congo-noir py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-archive-grid opacity-40" />
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-congo-green/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Catalogue"
            title={<span className="text-white">Tous les événements</span>}
            description="Parcourez l'ensemble des événements historiques documentés de la République du Congo."
          />
        </div>
      </section>

      {/* Filter bar */}
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Search */}
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un événement…"
            className="mb-3 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Period filters */}
          <div className="mb-2 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground shrink-0">
              Période
            </span>
            <button
              onClick={() => setPeriodFilter("all")}
              className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-medium", periodFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70")}
            >
              Toutes
            </button>
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriodFilter(p.id)}
                className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-medium", periodFilter === p.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70")}
              >
                {p.yearStart}–{p.yearEnd ?? "···"}
              </button>
            ))}
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground shrink-0">
              Catégorie
            </span>
            <button
              onClick={() => setCategoryFilter("all")}
              className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-medium", categoryFilter === "all" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/70")}
            >
              Toutes
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", categoryFilter === c.id ? "text-white" : "bg-muted text-muted-foreground hover:bg-muted/70")}
                style={categoryFilter === c.id ? { backgroundColor: c.color } : undefined}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                {c.label}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {sorted.length} résultat{sorted.length > 1 ? "s" : ""}
              {activeCount > 0 && (
                <button onClick={reset} className="ml-3 inline-flex items-center gap-1 text-foreground hover:underline">
                  <X className="h-3 w-3" />
                  Réinitialiser
                </button>
              )}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSort("year-asc")}
                className={cn("rounded-md px-2 py-1 text-xs", sort === "year-asc" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}
              >
                ↑ Chronologique
              </button>
              <button
                onClick={() => setSort("year-desc")}
                className={cn("rounded-md px-2 py-1 text-xs", sort === "year-desc" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}
              >
                ↓ Récent
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <LoadingState message="Chargement des événements…" />
          ) : sorted.length === 0 ? (
            <EmptyState
              title="Aucun événement trouvé."
              description="Ajustez vos filtres ou réinitialisez la recherche."
              action={<button onClick={reset} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Réinitialiser</button>}
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
