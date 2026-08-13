'use client'

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { personalitiesService } from "@/services";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PersonalityCard } from "@/components/personalities/PersonalityCard";
import { LoadingState, EmptyState } from "@/components/common/States";

export default function PersonalitiesPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const { data: personalities = [], isLoading } = useQuery({
    queryKey: ["personalities-list"],
    queryFn: () => personalitiesService.list(),
  });

  const roles = useMemo(() => {
    const set = new Set<string>();
    personalities.forEach((p) => p.role && set.add(p.role));
    return Array.from(set).sort();
  }, [personalities]);

  const filtered = useMemo(() => {
    return personalities.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.biography.toLowerCase().includes(q) ||
          p.role?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (roleFilter !== "all" && p.role !== roleFilter) return false;
      return true;
    });
  }, [personalities, search, roleFilter]);

  const reset = () => { setSearch(""); setRoleFilter("all"); };

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border bg-congo-noir py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-archive-grid opacity-40" />
        <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-congo-yellow/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Figures"
            title={<span className="text-white">Personnalités du Congo</span>}
            description="Présidents, écrivains, musiciens, pasteurs et intellectuels — ceux qui ont écrit et font encore l'histoire du Congo."
          />
        </div>
      </section>

      <div className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une personnalité…"
                className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">Tous les rôles</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} personnalité{filtered.length > 1 ? "s" : ""}
            {(search || roleFilter !== "all") && (
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
            <LoadingState message="Chargement des personnalités…" />
          ) : filtered.length === 0 ? (
            <EmptyState title="Aucune personnalité trouvée." description="Ajustez votre recherche." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <PersonalityCard key={p.id} personality={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
