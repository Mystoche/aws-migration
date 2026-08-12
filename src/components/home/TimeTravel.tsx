'use client'

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

interface Milestone {
  year: number;
  label: string;
  href: string;
  color: "green" | "yellow" | "red";
}

const MILESTONES: Milestone[] = [
  { year: 1960, label: "Indépendance", href: "/events/independance-de-la-republique-du-congo", color: "green" },
  { year: 1963, label: "Trois Glorieuses", href: "/events/trois-glorieuses-aout-1963", color: "yellow" },
  { year: 1969, label: "République populaire", href: "/events/proclamation-republique-populaire-du-congo", color: "red" },
  { year: 1977, label: "Assassinat de Ngouabi", href: "/events/assassinat-de-marien-ngouabi-1977", color: "red" },
  { year: 1990, label: "Vent de l'Est", href: "/timeline?period=1990-1999", color: "yellow" },
  { year: 1992, label: "Premières élections pluralistes", href: "/events/premieres-elections-pluralistes-1992", color: "green" },
  { year: 1997, label: "Guerre civile", href: "/events/guerre-civile-de-1997", color: "red" },
  { year: 2002, label: "Nouvelle Constitution", href: "/events/constitution-du-20-janvier-2002", color: "green" },
  { year: 2010, label: "Cinquantenaire", href: "/events/cinquantenaire-de-lindependance-2010", color: "yellow" },
  { year: 2015, label: "Référendum constitutionnel", href: "/events/referendum-constitutionnel-doctobre-2015", color: "red" },
  { year: 2020, label: "Congo contemporain", href: "/timeline?period=2020-aujourdhui", color: "green" },
];

const COLOR_MAP = {
  green: { dot: "bg-congo-green", text: "text-congo-green", line: "from-congo-green" },
  yellow: { dot: "bg-congo-yellow", text: "text-congo-yellow", line: "from-congo-yellow" },
  red: { dot: "bg-congo-red", text: "text-congo-red", line: "from-congo-red" },
};

export function TimeTravel() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="absolute inset-0 bg-kente-subtle opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Voyage dans le temps"
          title={
            <>
              Remontez le fil de <span className="text-gradient-congo">l'histoire</span>
            </>
          }
          description="De l'indépendance de 1960 au Congo contemporain, traversez les dates qui ont façonné la République du Congo."
          className="mx-auto"
        />

        {/* Horizontal timeline (desktop) */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-congo-green via-congo-yellow to-congo-red opacity-30" />

            {/* Milestones */}
            <ol className="grid grid-cols-11 gap-1">
              {MILESTONES.map((m, i) => {
                const c = COLOR_MAP[m.color];
                return (
                  <Reveal as="li" key={m.year} delay={i * 50} className="relative">
                    <Link
                      href={m.href}
                      className="group flex flex-col items-center gap-2 text-center"
                    >
                      <span
                        className={`display-date text-2xl font-bold transition-all group-hover:scale-110 ${
                          i % 2 === 0 ? "order-1" : "order-3"
                        } ${c.text}`}
                      >
                        {m.year}
                      </span>
                      <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-foreground/20">
                        <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                      </span>
                      <span
                        className={`text-[11px] leading-tight text-muted-foreground transition-colors group-hover:text-foreground ${
                          i % 2 === 0 ? "order-3" : "order-1"
                        } line-clamp-2 max-w-[90px]`}
                      >
                        {m.label}
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Vertical timeline (mobile/tablet) */}
        <ol className="mt-12 space-y-1 lg:hidden">
          {MILESTONES.map((m, i) => {
            const c = COLOR_MAP[m.color];
            return (
              <Reveal as="li" key={m.year} delay={i * 40}>
                <Link
                  href={m.href}
                  className="group flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/60"
                >
                  <span className={`display-date text-2xl font-bold ${c.text} w-16 shrink-0`}>
                    {m.year}
                  </span>
                  <span className="relative flex h-10 w-1 shrink-0 rounded-full bg-border">
                    <span className={`absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${c.dot}`} />
                  </span>
                  <span className="flex-1 text-sm text-foreground/80 group-hover:text-foreground">
                    {m.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
