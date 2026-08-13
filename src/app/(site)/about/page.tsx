'use client'

import Link from "next/link";
import { Cloud, Target, Eye, FileCheck, BookOpen, MapPin, ImageIcon, Users } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-congo-noir py-16 text-white sm:py-24">
        <div className="absolute inset-0 bg-archive-grid opacity-40" />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-congo-green/40 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-congo-yellow/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
            <Cloud className="h-3 w-3 text-congo-yellow" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
              Congo History Cloud
            </span>
          </div>
          <h1 className="mt-6 font-serif text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Une mémoire vivante,<br />
            <span className="text-gradient-congo">portée par le Cloud</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Une initiative numérique destinée à préserver, raconter et rendre
            accessible l'histoire du Congo grâce aux technologies modernes.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Méthodologie */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal as="div">
              <Card icon={Target} color="#009543" title="Objectif">
                Constituer une plateforme interactive de référence sur l'histoire
                de la République du Congo, de 1960 à aujourd'hui, en réunissant
                événements, personnalités, articles, sources, images et lieux en
                un seul espace numérique.
              </Card>
            </Reveal>
            <Reveal as="div" delay={60}>
              <Card icon={Eye} color="#FBDE4A" title="Vision">
                Démocratiser l'accès à la mémoire congolaise, donner aux jeunes,
                aux chercheurs et à la diaspora un outil moderne pour explorer,
                comprendre et partager l'histoire du pays.
              </Card>
            </Reveal>
            <Reveal as="div" delay={120}>
              <Card icon={FileCheck} color="#DC241F" title="Méthodologie">
                Documenter chaque fait à partir de sources publiées et vérifiables.
                Toute référence utilisée correspond à un ouvrage, un document ou une
                archive réelle. Aucune source n'est jamais inventée.
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sources & fiabilité */}
      <section className="bg-card py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Fiabilité"
            title="Sources & rigueur documentaire"
            description="Chaque contenu historique cite ses sources. Toute référence utilisée correspond à un ouvrage, un document ou une archive réelle. Aucune source n'est jamais inventée."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Livres & essais", d: "Ouvrages académiques de référence sur le Congo." },
              { t: "Documents officiels", d: "Constitutions, actes de la Conférence Nationale, rapports onusiens." },
              { t: "Archives de presse", d: "Jeune Afrique, Afrique Histoire, archives audiovisuelles." },
              { t: "Interviews & témoignages", d: "Récits d'acteurs et de témoins, à documenter." },
              { t: "Sites institutionnels", d: "Sources officielles congolaises et internationales." },
              { t: "Fonds photographiques", d: "Iconographie historique et patrimoniale." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 40} as="div">
                <div className="rounded-xl border border-border bg-background p-5">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-serif text-lg font-bold">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que vous trouverez sur la plateforme */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explorer"
            title="Une plateforme, plusieurs entrées"
            description="Congo History Cloud organise la mémoire congolaise autour de six espaces complémentaires, pour traverser l'histoire sous tous ses angles."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Timeline interactive", d: "Voyagez de 1960 à aujourd'hui à travers les dates qui ont basculé le destin du Congo.", icon: "timeline" },
              { t: "Événements documentés", d: "Contexte, déroulement, conséquences, personnalités et lieux associés.", icon: "events" },
              { t: "Personnalités", d: "Présidents, écrivains, musiciens, pasteurs et intellectuels congolais.", icon: "personalities" },
              { t: "Articles éditoriaux", d: "Analyses, récits et essais sur l'histoire, la culture et la société.", icon: "articles" },
              { t: "Galerie visuelle", d: "Iconographie historique avec visualisation immersive et lightbox.", icon: "gallery" },
              { t: "Carte interactive", d: "Explorez Brazzaville, Pointe-Noire, Dolisie et les grands lieux de mémoire.", icon: "map" },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 40} as="div">
                <ExploreCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Une initiative ouverte */}
      <section className="relative overflow-hidden bg-congo-noir py-16 text-white sm:py-24">
        <div className="absolute inset-0 bg-archive-grid opacity-30" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-congo-green/30 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-congo-yellow/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Une initiative ouverte"
            title={<span className="text-white">Une mémoire à partager</span>}
            description="Congo History Cloud est pensé comme un bien commun : un espace où chaque Congolais, chaque chercheur, chaque curieux peut venir puiser, comprendre et transmettre l'histoire du pays."
            className="mx-auto text-white"
          />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60">
            L'histoire du Congo appartient à tous les Congolais. Cette plateforme
            n'est qu'un humble vecteur numérique — appelé à s'enrichir des
            contributions d'historiens, de témoins et de la diaspora.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-congo-yellow text-congo-noir hover:bg-congo-yellow/90">
              <Link href="/timeline">Explorer l'histoire</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/search">Rechercher</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({
  icon: Icon, color, title, children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-archive">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-serif text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function ExploreCard({
  t, d, icon,
}: { t: string; d: string; icon: string }) {
  const Icon = icon === "map"
    ? MapPin
    : icon === "gallery"
      ? ImageIcon
      : icon === "personalities"
        ? Users
        : icon === "articles"
          ? BookOpen
          : icon === "events"
            ? BookOpen
            : BookOpen;
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-archive">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-serif text-lg font-bold">{t}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{d}</p>
    </div>
  );
}
