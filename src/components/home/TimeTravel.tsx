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
  { year: 1992, label: "Premières élections", href: "/events/premieres-elections-pluralistes-1992", color: "green" },
  { year: 1997, label: "Guerre civile", href: "/events/guerre-civile-de-1997", color: "red" },
  { year: 2002, label: "Nouvelle Constitution", href: "/events/constitution-du-20-janvier-2002", color: "green" },
  { year: 2010, label: "Cinquantenaire", href: "/events/cinquantenaire-de-lindependance-2010", color: "yellow" },
  { year: 2015, label: "Référendum", href: "/events/referendum-constitutionnel-doctobre-2015", color: "red" },
  { year: 2020, label: "Congo contemporain", href: "/timeline?period=2020-aujourdhui", color: "green" },
];

const COLOR_MAP = {
  green: { dot: "bg-congo-green", ring: "ring-congo-green", text: "text-congo-green", glow: "shadow-[0_0_0_4px_rgba(0,149,67,0.15)]" },
  yellow: { dot: "bg-congo-yellow", ring: "ring-congo-yellow", text: "text-congo-yellow", glow: "shadow-[0_0_0_4px_rgba(251,222,74,0.15)]" },
  red: { dot: "bg-congo-red", ring: "ring-congo-red", text: "text-congo-red", glow: "shadow-[0_0_0_4px_rgba(220,36,31,0.15)]" },
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

        {/* Horizontal timeline (desktop) — dates above, dots in the middle on the line */}
        <div className="mt-20 hidden lg:block">
          <div className="relative">
            {/* Horizontal line — sits in the middle of the dots */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-congo-green via-congo-yellow to-congo-red opacity-30" />

            <ol className="grid grid-cols-11 gap-1">
              {MILESTONES.map((m, i) => {
                const c = COLOR_MAP[m.color];
                return (
                  <Reveal as="li" key={m.year} delay={i * 50} className="relative">
                    <Link
                      href={m.href}
                      className="group flex flex-col items-center gap-3 text-center"
                    >
                      {/* Date — always on top, with its color */}
                      <span className={`display-date text-2xl font-bold transition-all group-hover:scale-110 ${c.text}`}>
                        {m.year}
                      </span>

                      {/* Dot — in the middle, on the line */}
                      <span className="relative z-10 my-1 flex h-5 w-5 items-center justify-center">
                        <span
                          className={`h-3 w-3 rounded-full ${c.dot} ring-4 ${c.ring} ring-opacity-25 transition-all group-hover:scale-150 ${c.glow}`}
                        />
                      </span>

                      {/* Label — below the line */}
                      <span className="mt-1 text-[11px] leading-tight text-muted-foreground transition-colors group-hover:text-foreground line-clamp-2 max-w-[90px] min-h-[28px]">
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
                    <span className={`absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${c.dot} ring-4 ${c.ring} ring-opacity-25`} />
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
