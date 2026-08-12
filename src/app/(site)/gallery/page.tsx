'use client'

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from "lucide-react";
import { galleryService } from "@/services";
import { SectionHeading } from "@/components/common/SectionHeading";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { LoadingState, EmptyState } from "@/components/common/States";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

function parseIdent(item: GalleryItem): { year?: number; seed: string; title?: string } {
  const url = item.imageUrl;
  if (url?.startsWith("ident:")) {
    const [, yearStr, seed] = url.split(":");
    return { year: Number(yearStr), seed: `${seed}-${item.id}`, title: item.title };
  }
  return { seed: item.id, title: item.title };
}

export default function GalleryPage() {
  const [category, setCategory] = useState<string>("Toutes");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["gallery", category],
    queryFn: () => galleryService.list(category),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["gallery-categories"],
    queryFn: () => galleryService.categories(),
  });

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % items.length));
  }, [items.length]);
  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, closeLightbox, next, prev]);

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border bg-congo-noir py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-archive-grid opacity-40" />
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-congo-green/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-congo-yellow/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Archives visuelles"
            title={<span className="text-white">Galerie</span>}
            description="Une collection visuelle d'instants, de lieux et de figures de l'histoire du Congo. Cliquez pour agrandir."
          />
        </div>
      </section>

      {/* Category filters */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  category === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <LoadingState message="Chargement de la galerie…" />
          ) : items.length === 0 ? (
            <EmptyState title="Aucune image dans cette catégorie." />
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4">
              {items.map((item, i) => {
                const parsed = parseIdent(item);
                return (
                  <Reveal key={item.id} delay={(i % 4) * 40} as="div" className="break-inside-avoid">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className="group relative block w-full overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-archive"
                      aria-label={`Ouvrir ${item.title}`}
                    >
                      <VisualIdentity
                        year={parsed.year}
                        seed={parsed.seed}
                        title={item.category}
                        variant="default"
                        aspect={i % 5 === 0 ? "portrait" : i % 3 === 0 ? "square" : "video"}
                        className="rounded-none border-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-congo-noir/90 via-congo-noir/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 text-left opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-1 rounded-full bg-congo-yellow/90 px-2 py-0.5 text-[9px] font-semibold uppercase text-congo-noir">
                          {item.category}
                        </span>
                        <h3 className="mt-2 font-serif text-sm font-bold leading-snug text-white">
                          {item.title}
                        </h3>
                        {item.year && (
                          <p className="font-mono text-[10px] text-white/70">{item.year}</p>
                        )}
                      </div>
                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <ZoomIn className="h-4 w-4" />
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-congo-noir/95 p-4 backdrop-blur"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Suivant"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[88vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <VisualIdentity
              year={parseIdent(active).year}
              seed={parseIdent(active).seed}
              variant="default"
              aspect="wide"
              className="rounded-2xl border border-white/15"
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-congo-noir to-transparent p-6 text-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-congo-yellow/90 px-2 py-0.5 text-[10px] font-semibold uppercase text-congo-noir">
                  {active.category}
                </span>
                {active.year && (
                  <span className="font-mono text-xs text-white/70">{active.year}</span>
                )}
              </div>
              <h3 className="mt-2 font-serif text-xl font-bold">{active.title}</h3>
              {active.description && (
                <p className="mt-1 max-w-2xl text-sm text-white/80">{active.description}</p>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            {(activeIndex ?? 0) + 1} / {items.length}
          </div>
        </div>
      )}
    </div>
  );
}
