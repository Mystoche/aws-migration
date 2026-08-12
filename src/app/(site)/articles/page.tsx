'use client'

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { articlesService } from "@/services";
import { categories } from "@/data/categories";
import type { Category } from "@/types";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { LoadingState, EmptyState } from "@/components/common/States";
import { cn } from "@/lib/utils";

export default function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles-list"],
    queryFn: () => articlesService.list(),
  });

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (search) {
        const q = search.toLowerCase();
        if (!a.title.toLowerCase().includes(q) && !a.excerpt.toLowerCase().includes(q)) return false;
      }
      if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
      return true;
    });
  }, [articles, search, categoryFilter]);

  const reset = () => { setSearch(""); setCategoryFilter("all"); };
  const activeCount = (search ? 1 : 0) + (categoryFilter !== "all" ? 1 : 0);

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border bg-congo-noir py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-archive-grid opacity-40" />
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-congo-red/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Carnet éditorial"
            title={<span className="text-white">Articles & essais</span>}
            description="Analyses, récits et reportages sur l'histoire, la culture et la société congolaises."
          />
        </div>
      </section>

      <div className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un article…"
              className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
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
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} article{filtered.length > 1 ? "s" : ""}
            {activeCount > 0 && (
              <button onClick={reset} className="ml-3 inline-flex items-center gap-1 text-foreground hover:underline">
                <X className="h-3 w-3" /> Réinitialiser
              </button>
            )}
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <LoadingState message="Chargement des articles…" />
          ) : filtered.length === 0 ? (
            <EmptyState title="Aucun article trouvé." description="Ajustez votre recherche." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
