'use client'

import { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { MapPin, X, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { placesService, eventsService, personalitiesService } from "@/services";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LoadingState } from "@/components/common/States";
import type { Place } from "@/types";

// Leaflet depends on `window`, so we must load the map client-side only.
const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Chargement de la carte…
        </span>
      </div>
    ),
  },
);

export default function MapPage() {
  const [selected, setSelected] = useState<Place | null>(null);
  const [flyTo, setFlyTo] = useState<{ lat: number; lng: number } | null>(null);

  const { data: places = [], isLoading } = useQuery({
    queryKey: ["places-list"],
    queryFn: () => placesService.list(),
  });

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border bg-congo-noir py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-archive-grid opacity-40" />
        <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-congo-green/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Géographie"
            title={<span className="text-white">Carte du Congo</span>}
            description="Explorez les lieux qui ont vu se jouer les grands chapitres de l'histoire congolaise."
          />
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <LoadingState message="Chargement de la carte…" />
          ) : (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="relative h-[60vh] overflow-hidden rounded-2xl border border-border shadow-archive lg:h-[70vh]">
                  <MapView
                    places={places}
                    onSelect={(p) => { setSelected(p); setFlyTo(null); }}
                    flyTo={flyTo}
                  />
                  <div className="pointer-events-none absolute bottom-4 left-4 z-[400] flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 shadow-md backdrop-blur">
                    <span className="block h-2 w-2 rounded-full bg-congo-green" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {places.length} lieux · République du Congo
                    </span>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4">
                {selected ? (
                  <PlaceDetail place={selected} onClose={() => setSelected(null)} />
                ) : (
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Sélectionnez un lieu
                    </p>
                    <ul className="max-h-[60vh] space-y-2 overflow-y-auto pr-1 lg:max-h-[70vh]">
                      {places.map((p) => (
                        <li key={p.id}>
                          <button
                            onClick={() => {
                              setSelected(p);
                              setFlyTo({ lat: p.lat, lng: p.lng });
                            }}
                            className="group flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
                          >
                            <MapPin className="h-5 w-5 shrink-0 text-primary" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold">{p.name}</p>
                              <p className="truncate text-[11px] text-muted-foreground">{p.region}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function PlaceDetail({ place, onClose }: { place: Place; onClose: () => void }) {
  const { data: events = [] } = useQuery({
    queryKey: ["place-events", place.id],
    queryFn: async () => {
      if (!place.eventIds?.length) return [];
      const all = await eventsService.listAll();
      return all.filter((e) => place.eventIds?.includes(e.id));
    },
    enabled: !!place.eventIds?.length,
  });
  const { data: personalities = [] } = useQuery({
    queryKey: ["place-personalities", place.id],
    queryFn: async () => {
      if (!place.personalityIds?.length) return [];
      const all = await personalitiesService.list();
      return all.filter((p) => place.personalityIds?.includes(p.id));
    },
    enabled: !!place.personalityIds?.length,
  });

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-archive">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            {place.region}
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold">{place.name}</h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{place.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        {place.population && (
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="font-mono uppercase tracking-wider text-muted-foreground">Population</p>
            <p className="mt-1 font-semibold text-foreground">{place.population}</p>
          </div>
        )}
        {place.founded && (
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="font-mono uppercase tracking-wider text-muted-foreground">Fondation</p>
            <p className="mt-1 font-semibold text-foreground">{place.founded}</p>
          </div>
        )}
      </div>

      {events.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-3 w-3" /> Événements associés
          </h3>
          <ul className="space-y-1.5">
            {events.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/events/${e.slug}`}
                  className="group flex items-center gap-2 rounded-md p-2 text-sm hover:bg-muted/60"
                >
                  <span className="display-date text-sm font-bold text-primary">{e.year}</span>
                  <span className="line-clamp-1 flex-1 text-foreground/80 group-hover:text-foreground">{e.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {personalities.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Personnalités liées
          </h3>
          <ul className="space-y-1.5">
            {personalities.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/personalities/${p.slug}`}
                  className="group flex items-center gap-2 rounded-md p-2 text-sm hover:bg-muted/60"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-congo-green to-emerald-700 text-[10px] font-bold text-white">
                    {p.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-foreground">{p.name}</span>
                    {p.role && <span className="block text-[10px] text-muted-foreground">{p.role}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
