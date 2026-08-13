'use client'

import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  CalendarDays, Users, Newspaper, MapPin, Image as ImageIcon,
  BookCopy, AlertCircle, TrendingUp, Clock, ChevronRight, FileEdit,
} from "lucide-react";
import { useAdmin } from "@/lib/admin-store";
import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

export default function AdminDashboardPage() {
  const { events, personalities, articles, places, sources, gallery } = useAdmin();

  const stats = [
    { label: "Événements", value: events.length, icon: CalendarDays, color: "#009543", href: "/admin/events" },
    { label: "Personnalités", value: personalities.length, icon: Users, color: "#FBDE4A", href: "/admin/personalities" },
    { label: "Articles", value: articles.length, icon: Newspaper, color: "#DC241F", href: "/admin/articles" },
    { label: "Images", value: gallery.length, icon: ImageIcon, color: "#009543", href: "/admin/gallery" },
    { label: "Sources", value: sources.length, icon: BookCopy, color: "#FBDE4A", href: "/admin/sources" },
    { label: "Lieux", value: places.length, icon: MapPin, color: "#DC241F", href: "/admin/places" },
  ];

  // Events by decade
  const decadeData = [
    { decade: "1960s", count: events.filter((e) => e.year >= 1960 && e.year < 1970).length },
    { decade: "1970s", count: events.filter((e) => e.year >= 1970 && e.year < 1980).length },
    { decade: "1980s", count: events.filter((e) => e.year >= 1980 && e.year < 1990).length },
    { decade: "1990s", count: events.filter((e) => e.year >= 1990 && e.year < 2000).length },
    { decade: "2000s", count: events.filter((e) => e.year >= 2000 && e.year < 2010).length },
    { decade: "2010s", count: events.filter((e) => e.year >= 2010 && e.year < 2020).length },
    { decade: "2020s", count: events.filter((e) => e.year >= 2020).length },
  ];

  // Events by category
  const categoryData = categories.map((c) => ({
    name: c.label,
    value: events.filter((e) => e.category === c.id).length,
    color: c.color,
  })).filter((d) => d.value > 0);

  const pendingVerification = events.filter((e) => e.status === "needs-verification");
  const recentEvents = [...events].sort((a, b) => b.year - a.year).slice(0, 6);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Vue d'ensemble"
        title="Congo History Admin"
        description="Tableau de bord de la plateforme. Statistiques, contenus récents et contenus à vérifier."
      />

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.label} delay={i * 40} as="div">
              <Link
                href={s.href}
                className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-archive"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${s.color}20` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: s.color }} />
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <div>
                  <p className="display-date text-3xl font-black text-foreground">{s.value}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Bar chart */}
        <Reveal as="div" className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold">Événements par décennie</h2>
                <p className="text-xs text-muted-foreground">Distribution chronologique du contenu</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={decadeData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#009543" />
                      <stop offset="100%" stopColor="#009543" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="decade" tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "currentColor" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "var(--popover)",
                      color: "var(--popover-foreground)",
                      fontSize: 12,
                    }}
                    cursor={{ fill: "rgba(0,149,67,0.08)" }}
                  />
                  <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        {/* Pie chart */}
        <Reveal as="div" delay={80} className="lg:col-span-5">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-lg font-bold">Par catégorie</h2>
            <p className="text-xs text-muted-foreground">Répartition thématique</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={84}
                    paddingAngle={2}
                  >
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "var(--popover)",
                      color: "var(--popover-foreground)",
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11 }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Recent + pending */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal as="div" className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-serif text-lg font-bold">
                <Clock className="h-4 w-4 text-primary" />
                Événements récents
              </h2>
              <Link href="/admin/events" className="text-xs font-medium text-primary hover:underline">
                Tout voir
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {recentEvents.map((e) => (
                <li key={e.id} className="flex items-center gap-3 py-2.5">
                  <span className="display-date w-12 shrink-0 text-center font-mono text-sm font-bold text-primary">
                    {e.year}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{e.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {e.category} · {e.status === "needs-verification" ? "à vérifier" : "publié"}
                    </p>
                  </div>
                  <Link
                    href={`/events/${e.slug}`}
                    className="shrink-0 rounded-md px-2 py-1 text-[11px] font-medium text-primary hover:bg-primary/10"
                    target="_blank"
                  >
                    Voir
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal as="div" delay={80} className="lg:col-span-5">
          <div className="rounded-xl border border-congo-yellow/30 bg-congo-yellow/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-congo-red" />
              <h2 className="font-serif text-lg font-bold">À vérifier</h2>
              <span className="ml-auto rounded-full bg-congo-yellow/30 px-2 py-0.5 text-xs font-bold text-congo-noir">
                {pendingVerification.length}
              </span>
            </div>
            {pendingVerification.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun contenu en attente de vérification.</p>
            ) : (
              <ul className="space-y-2">
                {pendingVerification.map((e) => (
                  <li key={e.id} className="flex items-center gap-3 rounded-lg bg-background/60 p-2.5">
                    <FileEdit className="h-4 w-4 shrink-0 text-congo-red" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{e.title}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{e.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 rounded-lg bg-background/40 p-3 text-xs text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-wider text-congo-red">Rappel</span>
              <p className="mt-1">
                Les contenus <span className="font-mono">needs-verification</span> portent un
                badge « À vérifier » côté public et ne doivent pas être présentés comme faits établis.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
