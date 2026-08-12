'use client'

import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-congo-noir text-white">
      {/* Background composition */}
      <div className="absolute inset-0">
        {/* Generated Congo river image as atmospheric backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/images/hero-congo-river.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-congo-noir/70 via-congo-noir/60 to-congo-noir" />
        <div className="absolute inset-0 bg-gradient-to-r from-congo-noir via-congo-noir/80 to-transparent" />

        {/* Radial green glow */}
        <div
          className="absolute -left-32 -top-32 h-[42rem] w-[42rem] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,149,67,0.55) 0%, rgba(0,149,67,0) 70%)",
          }}
        />
        <div
          className="absolute -right-32 top-1/3 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(251,222,74,0.35) 0%, rgba(251,222,74,0) 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(220,36,31,0.4) 0%, rgba(220,36,31,0) 70%)",
          }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-archive-grid opacity-60" />

        {/* Tribal dots overlay */}
        <div className="absolute inset-0 bg-tribal-dots opacity-30" />

        {/* Flag diagonal bands (very subtle) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,149,67,0.6) 0%, rgba(0,149,67,0) 35%, rgba(251,222,74,0.4) 50%, rgba(220,36,31,0) 65%, rgba(220,36,31,0.6) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-32 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur">
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-congo-yellow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-congo-yellow" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
                République du Congo · 1960 → Aujourd'hui
              </span>
            </div>

            <h1 className="mt-6 font-serif text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="block text-white">HISTOIRE</span>
              <span className="block">
                <span className="text-white">DU</span>{" "}
                <span className="text-gradient-congo">CONGO</span>
              </span>
            </h1>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="display-date text-6xl font-black text-congo-yellow sm:text-7xl">
                1960
              </span>
              <span className="font-mono text-2xl text-white/40 sm:text-3xl">→</span>
              <span className="display-date text-3xl font-bold text-white sm:text-4xl">
                AUJOURD'HUI
              </span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Explorez les événements, les personnalités et les transformations
              qui ont marqué l'histoire de la République du Congo, de
              l'indépendance à nos jours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/timeline">
                  Explorer l'histoire
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/timeline">
                  <Clock className="h-4 w-4" />
                  Voir la timeline
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <span className="block h-2 w-2 rounded-full bg-congo-green" />
                Indépendance
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="block h-2 w-2 rounded-full bg-congo-yellow" />
                Trois Glorieuses
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="block h-2 w-2 rounded-full bg-congo-red" />
                Républiques
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                Brazzaville
              </span>
            </div>
          </div>

          {/* Right: visual identity stack */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              {/* Back card */}
              <div className="absolute -inset-3 rotate-3 rounded-2xl bg-gradient-to-br from-congo-green/40 via-congo-yellow/20 to-congo-red/30 blur-sm" />
              {/* Main composition */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  <div className="bg-congo-noir p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-congo-yellow">
                      Indépendance
                    </p>
                    <p className="display-date mt-2 text-5xl font-black text-white">1960</p>
                    <p className="mt-1 text-xs text-white/60">15 août</p>
                  </div>
                  <div className="bg-congo-green p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                      Trois Glorieuses
                    </p>
                    <p className="display-date mt-2 text-5xl font-black text-white">1963</p>
                    <p className="mt-1 text-xs text-white/80">13 août</p>
                  </div>
                  <div className="bg-congo-red p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                      République populaire
                    </p>
                    <p className="display-date mt-2 text-5xl font-black text-white">1969</p>
                    <p className="mt-1 text-xs text-white/80">30 décembre</p>
                  </div>
                  <div className="bg-congo-yellow p-6 text-congo-noir">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-congo-noir/80">
                      Conférence Souveraine
                    </p>
                    <p className="display-date mt-2 text-5xl font-black">1991</p>
                    <p className="mt-1 text-xs text-congo-noir/70">Février</p>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="flex items-center justify-between bg-white/5 px-6 py-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                    Archives · Congo History Cloud
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <ArrowRight className="h-3 w-3 text-white" />
                  </span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="animate-float absolute -bottom-5 -left-5 rounded-xl border border-white/15 bg-congo-noir/80 px-4 py-3 backdrop-blur">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-congo-yellow">
                  Aujourd'hui
                </p>
                <p className="display-date text-2xl font-black text-white">2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom flag strip */}
      <div className="divider-flag" />
    </section>
  );
}
