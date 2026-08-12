'use client'

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft, ArrowRight, Calendar, MapPin, Tag, AlertCircle, Link2,
  Users, FileText, Layers,
} from "lucide-react";
import { eventsService, personalitiesService } from "@/services";
import { getCategory } from "@/data/categories";
import { getPeriodByYear } from "@/data/periods";
import { placesService } from "@/services";
import { SourceList } from "@/components/sources/SourceList";
import { ShareButtons } from "@/components/share/ShareButtons";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { PersonalityCard } from "@/components/personalities/PersonalityCard";
import { LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", slug],
    queryFn: () => eventsService.getBySlug(slug),
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related-events", event?.id],
    queryFn: () => (event ? eventsService.getRelated(event.id, 3) : []),
    enabled: !!event,
  });

  const { data: adjacent } = useQuery({
    queryKey: ["adjacent-events", event?.id],
    queryFn: () => (event ? eventsService.getAdjacent(event.id) : { previous: undefined, next: undefined }),
    enabled: !!event,
  });

  if (isLoading) return <LoadingState className="min-h-[60vh]" />;
  if (!event) notFound();

  const category = getCategory(event.category);
  const period = getPeriodByYear(event.year);
  const dateLabel =
    event.day && event.month
      ? `${event.day} ${MONTHS_FR[event.month - 1]} ${event.year}`
      : event.month
        ? `${MONTHS_FR[event.month - 1]} ${event.year}`
        : `${event.year}`;

  return (
    <article className="bg-background">
      {/* Hero header */}
      <header className="relative overflow-hidden border-b border-border bg-congo-noir text-white">
        <div className="absolute inset-0 bg-archive-grid opacity-30" />
        <div
          className="absolute -right-20 top-0 h-96 w-96 rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(circle, ${category?.color ?? "#009543"}80, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {category && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.label}
              </span>
            )}
            {period && (
              <Badge variant="outline" className="border-white/25 text-white/80">
                {period.label}
              </Badge>
            )}
            {event.status === "needs-verification" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-congo-yellow px-2.5 py-1 text-[10px] font-semibold text-congo-noir">
                <AlertCircle className="h-3 w-3" /> À vérifier
              </span>
            )}
          </div>

          <div className="mt-6 flex items-start gap-6">
            <div className="hidden sm:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-congo-yellow">
                {dateLabel}
              </p>
              <p className="display-date text-7xl font-black leading-none text-white sm:text-8xl">
                {event.year}
              </p>
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">
                {event.summary}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShareButtons title={event.title} />
            <Button asChild variant="outline" size="sm" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/events">
                <ArrowLeft className="h-4 w-4" />
                Tous les événements
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Visual */}
        <div className="overflow-hidden rounded-2xl border border-border">
          <VisualIdentity
            year={event.year}
            month={event.month}
            day={event.day}
            seed={event.id}
            variant="event"
            aspect="wide"
            className="rounded-none border-0"
          />
        </div>

        {/* Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {dateLabel}
          </span>
          {event.locationId && <LocationMeta id={event.locationId} />}
          {event.tags && event.tags.length > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-primary" />
              {event.tags.join(" · ")}
            </span>
          )}
        </div>

        {/* Content sections */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-10">
            {event.context && (
              <Section title="Contexte historique" eyebrow="Mise en perspective">
                <p className="leading-relaxed text-foreground/85">{event.context}</p>
              </Section>
            )}
            {event.unfolding && (
              <Section title="Déroulement" eyebrow="Le récit">
                <p className="leading-relaxed text-foreground/85">{event.unfolding}</p>
              </Section>
            )}
            {event.consequences && (
              <Section title="Conséquences" eyebrow="Héritage">
                <p className="leading-relaxed text-foreground/85">{event.consequences}</p>
              </Section>
            )}
            <Section title="En savoir plus" eyebrow="Approfondir">
              <div className="space-y-4 leading-relaxed text-foreground/85">
                {event.content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Section>

            {/* Sources */}
            {event.sourceIds && event.sourceIds.length > 0 && (
              <SourceList sourceIds={event.sourceIds} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {event.personalityIds && event.personalityIds.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold">
                  <Users className="h-4 w-4 text-primary" />
                  Personnalités associées
                </h3>
                <div className="space-y-3">
                  <PersonalitiesInline ids={event.personalityIds} />
                </div>
              </div>
            )}

            {event.locationId && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold">
                  <MapPin className="h-4 w-4 text-primary" />
                  Lieu associé
                </h3>
                <PlaceInline id={event.locationId} />
              </div>
            )}

            {related.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold">
                  <Layers className="h-4 w-4 text-primary" />
                  Événements liés
                </h3>
                <div className="space-y-2">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/events/${r.slug}`}
                      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                    >
                      <VisualIdentity year={r.year} seed={r.id} variant="event" aspect="square" className="h-12 w-12 shrink-0 rounded-md" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium leading-snug">{r.title}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{r.year}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Prev / Next nav */}
        <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {adjacent?.previous ? (
            <Link
              href={`/events/${adjacent.previous.slug}`}
              className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <ArrowLeft className="h-3 w-3" /> Précédent
              </span>
              <span className="font-serif text-sm font-semibold">{adjacent.previous.title}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{adjacent.previous.year}</span>
            </Link>
          ) : <div />}
          {adjacent?.next ? (
            <Link
              href={`/events/${adjacent.next.slug}`}
              className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-primary/40 sm:col-start-2"
            >
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Suivant <ArrowRight className="h-3 w-3" />
              </span>
              <span className="font-serif text-sm font-semibold">{adjacent.next.title}</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">{adjacent.next.year}</span>
            </Link>
          ) : <div />}
        </nav>
      </div>
    </article>
  );
}

function Section({
  title, eyebrow, children,
}: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section>
      {eyebrow && (
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{eyebrow}</span>
      )}
      <h2 className="mt-1 mb-3 font-serif text-2xl font-bold">{title}</h2>
      <div className="text-base">{children}</div>
    </section>
  );
}

function PersonalitiesInline({ ids }: { ids: string[] }) {
  const { data: personalities = [] } = useQuery({
    queryKey: ["personalities-by-ids", ids],
    queryFn: async () => {
      const all = await personalitiesService.list();
      return all.filter((p) => ids.includes(p.id));
    },
  });
  return (
    <>
      {personalities.map((p) => (
        <Link
          key={p.id}
          href={`/personalities/${p.slug}`}
          className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-congo-green to-emerald-700 text-xs font-bold text-white">
            {p.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{p.name}</p>
            {p.role && <p className="truncate text-[11px] text-muted-foreground">{p.role}</p>}
          </div>
        </Link>
      ))}
    </>
  );
}

function PlaceInline({ id }: { id: string }) {
  const { data: place } = useQuery({
    queryKey: ["place", id],
    queryFn: () => placesService.getById(id),
  });
  if (!place) return null;
  return (
    <Link
      href="/map"
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
    >
      <MapPin className="h-5 w-5 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{place.name}</p>
        <p className="line-clamp-2 text-[11px] text-muted-foreground">{place.region}</p>
      </div>
    </Link>
  );
}

function LocationMeta({ id }: { id: string }) {
  const { data: place } = useQuery({
    queryKey: ["place-meta", id],
    queryFn: () => placesService.getById(id),
  });
  if (!place) return null;
  return (
    <Link href="/map" className="inline-flex items-center gap-1.5 hover:text-foreground">
      <MapPin className="h-4 w-4 text-primary" />
      {place.name}
    </Link>
  );
}
