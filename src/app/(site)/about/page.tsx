'use client'

import Link from "next/link";
import { Cloud, Database, Server, Globe, Shield, Cpu, GitBranch, Target, Eye, FileCheck, BookOpen } from "lucide-react";
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

      {/* Technologies */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Stack"
            title="Technologies utilisées"
            description="Une stack moderne, open-source et performante pour servir une expérience d'archive numérique."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Next.js 16", d: "Framework React App Router.", icon: Globe },
              { t: "TypeScript", d: "Typage strict de bout en bout.", icon: GitBranch },
              { t: "Tailwind CSS 4", d: "Design system utilitaire.", icon: Cpu },
              { t: "shadcn/ui", d: "Composants accessibles.", icon: Shield },
              { t: "Leaflet", d: "Cartographie interactive.", icon: Globe },
              { t: "TanStack Query", d: "State serveur & cache.", icon: Database },
              { t: "Prisma", d: "ORM prêt pour la base de données.", icon: Database },
              { t: "Framer Motion", d: "Animations élégantes.", icon: Cpu },
            ].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <Reveal key={tech.t} delay={i * 30} as="div">
                  <div className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="font-serif text-base font-bold">{tech.t}</h3>
                    <p className="text-xs text-muted-foreground">{tech.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AWS future architecture */}
      <section className="relative overflow-hidden bg-congo-noir py-16 text-white sm:py-24">
        <div className="absolute inset-0 bg-archive-grid opacity-30" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-congo-green/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Architecture future"
            title={<span className="text-white">Built with AWS Serverless</span>}
            description="L'application est conçue pour une migration native vers AWS Serverless. Le déploiement cloud fera l'objet d'une étape ultérieure dédiée."
            className="text-white"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal as="div">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <h3 className="font-serif text-xl font-bold text-white">Architecture cible</h3>
                <ol className="mt-6 space-y-4">
                  {[
                    { layer: "Frontend", tech: "S3 + CloudFront", icon: Globe, color: "#009543" },
                    { layer: "API", tech: "API Gateway + Lambda", icon: Server, color: "#FBDE4A" },
                    { layer: "Database", tech: "DynamoDB", icon: Database, color: "#DC241F" },
                    { layer: "Media", tech: "S3", icon: Cloud, color: "#009543" },
                    { layer: "Authentication", tech: "Amazon Cognito", icon: Shield, color: "#FBDE4A" },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <li key={row.layer} className="flex items-center gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${row.color}25` }}>
                          <Icon className="h-5 w-5" style={{ color: row.color }} />
                        </span>
                        <div className="flex-1">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                            {row.layer}
                          </p>
                          <p className="font-serif text-base font-semibold text-white">{row.tech}</p>
                        </div>
                        <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>

            <Reveal as="div" delay={80}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <h3 className="font-serif text-xl font-bold text-white">Migration sans réécriture</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Toute la logique d'accès aux données passe par une couche de
                  services (<span className="font-mono text-congo-yellow">src/services</span>).
                  Aujourd'hui, ces services lisent les fichiers locaux de
                  <span className="font-mono text-congo-yellow"> src/data</span>.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Demain, il suffit de remplacer chaque service par des appels
                  <span className="font-mono text-congo-yellow"> fetch('/api/...')</span> vers
                  API Gateway / Lambda, sans modifier le moindre composant.
                </p>
                <div className="mt-6 rounded-lg border border-white/10 bg-congo-noir/60 p-4 font-mono text-xs text-white/60">
                  <p className="text-congo-yellow">{"// Aujourd'hui"}</p>
                  <p>eventsService.list()</p>
                  <p>↳ lit <span className="text-congo-green">src/data/events.ts</span></p>
                  <p className="mt-3 text-congo-yellow">{"// Demain (AWS)"}</p>
                  <p>eventsService.list()</p>
                  <p>↳ <span className="text-congo-green">fetch('/api/events')</span></p>
                  <p>  ↳ API Gateway → Lambda → DynamoDB</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
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
