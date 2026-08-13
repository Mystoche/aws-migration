'use client'

import { Suspense } from "react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Search as SearchIcon, X, Sparkles, Users, Newspaper, MapPin, BookOpen,
  Clock, ChevronRight, TrendingUp,
} from "lucide-react";
import { searchService, eventsService } from "@/services";
import { getCategory } from "@/data/categories";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, LoadingState } from "@/components/common/States";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { cn } from "@/lib/utils";
import type { SearchResult } from "@/types";

const TYPE_META = {
  event: { label: "Événement", icon: Sparkles, color: "#009543" },
  personality: { label: "Personnalité", icon: Users, color: "#FBDE4A" },
  article: { label: "Article", icon: Newspaper, color: "#DC241F" },
  place: { label: "Lieu", icon: MapPin, color: "#009543" },
  source: { label: "Source", icon: BookOpen, color: "#FBDE4A" },
} as const;

const FILTER_TYPES = [
  { id: "all", label: "Tout" },
  { id: "event", label: "Événements" },
  { id: "personality", label: "Personnalités" },
  { id: "article", label: "Articles" },
  { id: "place", label: "Lieux" },
  { id: "source", label: "Sources" },
] as const;

/**
 * Default export wraps the search page in a Suspense boundary.
 * This is REQUIRED by Next.js because `useSearchParams()` opts the page
 * into client-side rendering, and the static prerenderer needs a Suspense
 * fallback to bail out gracefully during `next build`.
 */
export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingState className="min-h-screen" />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [debounced, setDebounced] = useState(params.get("q") ?? "");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  // Update URL when debounced query changes
  useEffect(() => {
    const currentQ = params.get("q") ?? "";
    if (debounced !== currentQ) {
      const url = debounced ? `/search?q=${encodeURIComponent(debounced)}` : "/search";
      router.replace(url, { scroll: false });
    }
  }, [debounced, params, router]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", debounced],
    queryFn: () => searchService.search(debounced),
    enabled: debounced.length > 1,
  });

  const { data: suggestions = [] } = useQuery({
    queryKey: ["suggestions", query],
    queryFn: () => searchService.suggestions(query, 5),
    enabled: query.length > 1 && query !== debounced,
  });

  const { data: trending = [] } = useQuery({
    queryKey: ["trending-events"],
    queryFn: () => eventsService.featured(5),
  });

  const filtered = useMemo(() => {
    return results.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (yearFilter !== "all" && r.year) {
        const y = r.year;
        if (yearFilter === "60s" && !(y >= 1960 && y <= 1969)) return false;
        if (yearFilter === "70s" && !(y >= 1970 && y <= 1979)) return false;
        if (yearFilter === "80s" && !(y >= 1980 && y <= 1989)) return false;
        if (yearFilter === "90s" && !(y >= 1990 && y <= 1999)) return false;
        if (yearFilter === "2000s" && !(y >= 2000 && y <= 2009)) return false;
        if (yearFilter === "2010s" && !(y >= 2010 && y <= 2019)) return false;
        if (yearFilter === "2020s" && !(y >= 2020)) return false;
      }
      return true;
    });
  }, [results, typeFilter, yearFilter]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    filtered.forEach((r) => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border bg-congo-noir py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-archive-grid opacity-40" />
        <div
          className="absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,149,67,0.5), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Recherche globale"
            title={
              <span className="text-white">
                Cherchez dans <span className="text-gradient-congo">l'histoire du Congo</span>
              </span>
            }
            description="Événements, personnalités, articles, lieux et sources — tout en une seule recherche."
            className="mx-auto"
          />

          <div className="relative mt-8">
            <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tapez : indépendance, Sassou, Brazzaville, rumba…"
              autoFocus
              className="h-14 w-full rounded-full border border-white/20 bg-white/5 pl-14 pr-12 text-base text-white backdrop-blur placeholder:text-white/40 focus:border-congo-yellow/50 focus:outline-none focus:ring-2 focus:ring-congo-yellow/30"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Effacer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {/* Suggestions */}
            {suggestions.length > 0 && query !== debounced && (
              <ul className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/15 bg-congo-noir/95 shadow-2xl backdrop-blur">
                {suggestions.map((s) => {
                  const meta = TYPE_META[s.type];
                  const Icon = meta.icon;
                  return (
                    <li key={`${s.type}-${s.id}`}>
                      <Link
                        href={s.url}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10"
                      >
                        <Icon className="h-4 w-4" style={{ color: meta.color }} />
                        <span className="flex-1 truncate">{s.title}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                          {meta.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {FILTER_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTypeFilter(t.id)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
                    typeFilter === t.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="h-8 rounded-full border border-border bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">Toutes années</option>
              <option value="60s">1960–1969</option>
              <option value="70s">1970–1979</option>
              <option value="80s">1980–1989</option>
              <option value="90s">1990–1999</option>
              <option value="2000s">2000–2009</option>
              <option value="2010s">2010–2019</option>
              <option value="2020s">2020–aujourd'hui</option>
            </select>
          </div>

          {/* Results */}
          {debounced.length <= 1 ? (
            <div>
              <EmptyState
                title="Recherche dans l'histoire du Congo"
                description="Saisissez au moins deux caractères pour lancer la recherche."
                icon={<SearchIcon className="h-7 w-7" />}
              />
              {/* Trending */}
              {trending.length > 0 && (
                <div className="mt-12">
                  <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    À découvrir
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {trending.map((e) => (
                      <Link
                        key={e.id}
                        href={`/events/${e.slug}`}
                        className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                      >
                        <VisualIdentity year={e.year} seed={e.id} variant="event" aspect="square" className="h-12 w-12 shrink-0 rounded-md" />
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-medium">{e.title}</p>
                          <p className="font-mono text-[10px] text-muted-foreground">{e.year}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : isLoading ? (
            <LoadingState message="Recherche en cours…" />
          ) : filtered.length === 0 ? (
            <EmptyState
              title={`Aucun résultat pour « ${debounced} »`}
              description="Essayez un autre terme ou élargissez vos filtres."
            />
          ) : (
            <div className="space-y-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {filtered.length} résultat{filtered.length > 1 ? "s" : ""} pour « {debounced} »
              </p>
              {Object.entries(grouped).map(([type, items]) => {
                const meta = TYPE_META[type as keyof typeof TYPE_META];
                const Icon = meta.icon;
                return (
                  <div key={type}>
                    <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold">
                      <Icon className="h-4 w-4" style={{ color: meta.color }} />
                      {meta.label}s
                      <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {items.length}
                      </span>
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {items.map((r) => (
                        <ResultCard key={`${r.type}-${r.id}`} result={r} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ResultCard({ result }: { result: SearchResult }) {
  const category = result.category ? getCategory(result.category) : undefined;
  return (
    <Link
      href={result.url}
      className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-archive"
    >
      {result.type === "event" && (
        <VisualIdentity year={result.year} seed={result.id} variant="event" aspect="square" className="h-14 w-14 shrink-0 rounded-md" />
      )}
      {result.type === "personality" && (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-congo-green to-emerald-700 text-sm font-bold text-white">
          {result.title.split(" ").slice(0, 2).map((n) => n[0]).join("")}
        </div>
      )}
      {result.type === "article" && (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-congo-red/20 text-congo-red">
          <Newspaper className="h-5 w-5" />
        </div>
      )}
      {result.type === "place" && (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-congo-green/20 text-congo-green">
          <MapPin className="h-5 w-5" />
        </div>
      )}
      {result.type === "source" && (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-congo-yellow/20 text-congo-yellow">
          <BookOpen className="h-5 w-5" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {category && (
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase text-white" style={{ backgroundColor: category.color }}>
              {category.label}
            </span>
          )}
          {result.year && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
              <Clock className="h-2.5 w-2.5" /> {result.year}
            </span>
          )}
        </div>
        <h3 className="mt-1 font-serif text-sm font-bold leading-snug transition-colors group-hover:text-primary">
          {result.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{result.excerpt}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
