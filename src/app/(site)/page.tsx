'use client'

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Cloud, BookOpen, Users, MapPin, Image as ImageIcon, Newspaper, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { TimeTravel } from "@/components/home/TimeTravel";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EventCard } from "@/components/events/EventCard";
import { PersonalityCard } from "@/components/personalities/PersonalityCard";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Reveal } from "@/components/common/Reveal";
import { LoadingState } from "@/components/common/States";
import { eventsService, personalitiesService, articlesService, dashboardService } from "@/services";
import { periods } from "@/data/periods";

export default function HomePage() {
  const { data: featured, isLoading: featLoading } = useQuery({
    queryKey: ["featured-events"],
    queryFn: () => eventsService.featured(6),
  });
  const { data: personalities } = useQuery({
    queryKey: ["home-personalities"],
    queryFn: () => personalitiesService.list(),
  });
  const { data: articles } = useQuery({
    queryKey: ["home-articles"],
    queryFn: () => articlesService.list(),
  });
  const { data: stats } = useQuery({
    queryKey: ["home-stats"],
    queryFn: () => dashboardService.overview(),
  });

  const statsCards = [
    { label: "Événements", value: stats?.events.total ?? "—", icon: Sparkles, color: "text-congo-green" },
    { label: "Personnalités", value: stats?.personalities.total ?? "—", icon: Users, color: "text-congo-yellow" },
    { label: "Articles", value: stats?.articles.total ?? "—", icon: Newspaper, color: "text-congo-red" },
    { label: "Lieux", value: stats?.places.total ?? "—", icon: MapPin, color: "text-congo-green" },
  ];

  return (
    <>
      <Hero />

      {/* Stats band */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border sm:grid-cols-4">
          {statsCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="div" key={s.label} delay={i * 60} className="px-4 py-6 text-center sm:px-6">
                <Icon className={`mx-auto h-5 w-5 ${s.color}`} />
                <p className="display-date mt-2 text-3xl font-black text-foreground">{s.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <TimeTravel />

      {/* Featured events */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="À la une"
              title="Événements marquants"
              description="Les moments qui ont basculé le destin de la République du Congo."
            />
            <Link
              href="/events"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Tous les événements
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10">
            {featLoading ? (
              <LoadingState message="Chargement des événements…" />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured?.map((e, i) => (
                  <EventCard key={e.id} event={e} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Periods section */}
      <section className="bg-congo-noir py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Grandes périodes"
            title={
              <span className="text-white">
                Sept décennies, sept <span className="text-gradient-congo">périodes</span>
              </span>
            }
            description="De l'indépendance au Congo contemporain, parcourez les grandes étapes structurelles de l'histoire du pays."
            className="mx-auto"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {periods.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <Link
                  href={`/timeline?period=${p.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <div
                    className="absolute right-0 top-0 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                    style={{ backgroundColor: p.color }}
                  />
                  <div className="flex items-baseline justify-between">
                    <span className="display-date text-4xl font-black text-white">
                      {p.yearStart}
                    </span>
                    <span className="font-mono text-xs text-white/40">
                      {p.yearEnd ?? "···"}
                    </span>
                  </div>
                  <div className="mt-1 h-0.5 w-10 rounded-full" style={{ backgroundColor: p.color }} />
                  <h3 className="mt-4 font-serif text-lg font-bold text-white">{p.label}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/60">
                    {p.description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Personalities preview */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Figures de l'histoire"
              title="Personnalités congolaises"
              description="Présidents, écrivains, musiciens, pasteurs — ceux qui ont écrit le Congo."
            />
            <Link
              href="/personalities"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Toutes les personnalités
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {personalities?.slice(0, 4).map((p, i) => (
              <PersonalityCard key={p.id} personality={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Articles preview */}
      <section className="bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Carnet éditorial"
              title="Derniers articles"
              description="Analyses, récits et essais sur l'histoire et la culture congolaises."
            />
            <Link
              href="/articles"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Tous les articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles?.slice(0, 3).map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore CTA */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-congo-noir via-congo-noir to-emerald-950 p-8 text-white sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-archive-grid opacity-30" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-congo-green/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-congo-yellow/20 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                  <Cloud className="h-3 w-3 text-congo-yellow" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
                    Congo History Cloud
                  </span>
                </div>
                <h2 className="mt-5 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  Une mémoire vivante,<br />
                  <span className="text-gradient-congo">portée par le Cloud</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  Carte interactive, galerie, recherche globale, sources
                  documentées — explorez le Congo d'hier et d'aujourd'hui avec
                  des outils numériques modernes.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/map"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-congo-noir hover:bg-white/90"
                  >
                    <MapPin className="h-4 w-4" />
                    Explorer la carte
                  </Link>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Voir la galerie
                  </Link>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <BookOpen className="h-4 w-4" />
                    Rechercher
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/timeline" className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <span className="display-date text-3xl font-black text-congo-yellow">1960→</span>
                    <p className="mt-1 text-xs text-white/70">Timeline interactive</p>
                  </Link>
                  <Link href="/events" className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <span className="display-date text-3xl font-black text-congo-green">20+</span>
                    <p className="mt-1 text-xs text-white/70">Événements documentés</p>
                  </Link>
                  <Link href="/personalities" className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <span className="display-date text-3xl font-black text-congo-red">12+</span>
                    <p className="mt-1 text-xs text-white/70">Personnalités</p>
                  </Link>
                  <Link href="/articles" className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                    <span className="display-date text-3xl font-black text-white">7</span>
                    <p className="mt-1 text-xs text-white/70">Articles éditoriaux</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
