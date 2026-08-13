'use client'

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, MapPin, Briefcase, Users, Layers } from "lucide-react";
import { personalitiesService, eventsService } from "@/services";
import { SourceList } from "@/components/sources/SourceList";
import { ShareButtons } from "@/components/share/ShareButtons";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function formatDateFr(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function PersonalityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: personality, isLoading } = useQuery({
    queryKey: ["personality", slug],
    queryFn: () => personalitiesService.getBySlug(slug),
  });

  const { data: events = [] } = useQuery({
    queryKey: ["personality-events", personality?.id],
    queryFn: async () => {
      if (!personality?.eventIds?.length) return [];
      const all = await eventsService.listAll();
      return all.filter((e) => personality.eventIds?.includes(e.id));
    },
    enabled: !!personality?.eventIds?.length,
  });

  if (isLoading) return <LoadingState className="min-h-[60vh]" />;
  if (!personality) notFound();

  const initials = personality.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <article className="bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border bg-congo-noir text-white">
        <div className="absolute inset-0 bg-archive-grid opacity-30" />
        <div
          className="absolute -left-32 top-0 h-96 w-96 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,149,67,0.5), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            {/* Portrait */}
            <div className="relative mx-auto w-40 shrink-0 sm:mx-0 sm:w-48">
              <div className="overflow-hidden rounded-2xl border border-white/15">
                {personality.image ? (
                  <img
                    src={personality.image}
                    alt={personality.name}
                    className="aspect-[3/4] w-full object-cover"
                  />
                ) : (
                  <>
                    <VisualIdentity
                      seed={personality.id}
                      variant="personality"
                      aspect="portrait"
                      className="rounded-none border-0"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="display-date text-6xl font-black text-white/90 drop-shadow-2xl">
                        {initials}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-serif text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {personality.name}
              </h1>
              {personality.role && (
                <p className="mt-2 text-base text-congo-yellow">{personality.role}</p>
              )}
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/70">
                <Calendar className="h-4 w-4" />
                {personality.birthDate ? formatDateFr(personality.birthDate) : "?"}
                {" — "}
                {personality.deathDate ? formatDateFr(personality.deathDate) : "aujourd'hui"}
              </p>
              {personality.birthPlace && (
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4" />
                  Né(e) à {personality.birthPlace}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <ShareButtons title={personality.name} />
                <Button asChild variant="outline" size="sm" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/personalities">
                    <ArrowLeft className="h-4 w-4" /> Toutes les personnalités
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main */}
          <div className="lg:col-span-8 space-y-10">
            <section>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Biographie
              </span>
              <h2 className="mt-1 mb-4 font-serif text-2xl font-bold">Parcours de vie</h2>
              <div className="space-y-4 text-base leading-relaxed text-foreground/85">
                {personality.biography.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Sources */}
            {personality.sourceIds && personality.sourceIds.length > 0 && (
              <SourceList sourceIds={personality.sourceIds} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {personality.functions && personality.functions.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Fonctions
                </h3>
                <ul className="space-y-2">
                  {personality.functions.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {personality.tags && personality.tags.length > 0 && (
              <div>
                <h3 className="mb-3 font-serif text-lg font-bold">Mots-clés</h3>
                <div className="flex flex-wrap gap-1.5">
                  {personality.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            )}

            {events.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold">
                  <Layers className="h-4 w-4 text-primary" />
                  Événements associés
                </h3>
                <div className="space-y-2">
                  {events.map((e) => (
                    <Link
                      key={e.id}
                      href={`/events/${e.slug}`}
                      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                    >
                      <VisualIdentity year={e.year} seed={e.id} variant="event" aspect="square" className="h-12 w-12 shrink-0 rounded-md" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium leading-snug">{e.title}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{e.year}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
