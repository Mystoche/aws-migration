'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, CalendarDays, Users, Newspaper, MapPin, Image,
  BookCopy, LogOut, ExternalLink, Menu, X, ChevronRight, ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/lib/admin-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CongoLogo } from "@/components/layout/CongoLogo";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Événements", icon: CalendarDays },
  { href: "/admin/personalities", label: "Personnalités", icon: Users },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
  { href: "/admin/gallery", label: "Galerie", icon: Image },
  { href: "/admin/sources", label: "Sources", icon: BookCopy },
  { href: "/admin/places", label: "Lieux", icon: MapPin },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const [mobileNav, setMobileNav] = useState(false);

  // Redirect to /login if not authenticated, or to / if authenticated as user (not admin)
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (!isAdmin()) {
      // Normal users cannot access admin
      router.replace("/");
      return;
    }
  }, [isAuthenticated, isAdmin, router]);

  const closeMobileNav = () => setMobileNav(false);

  if (!isAuthenticated || !isAdmin()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-congo-noir text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-congo-yellow" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
            Vérification de l'accès…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-congo-noir text-white transition-transform lg:translate-x-0",
          mobileNav ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <CongoLogo size="sm" />
            <div className="leading-none">
              <p className="font-serif text-sm font-bold">CONGO HISTORY</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-congo-yellow">Admin</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileNav(false)}
            className="rounded-md p-1.5 hover:bg-white/10 lg:hidden"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
            Gestion
          </p>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileNav}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active && "text-congo-yellow")} />
                    {item.label}
                    {active && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
              Site public
            </p>
            <Link
              href="/"
              onClick={closeMobileNav}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              Voir le site
            </Link>
          </div>
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-congo-green to-emerald-700 text-xs font-bold text-white">
              {user?.name?.charAt(0).toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0 flex-1 leading-none">
              <p className="truncate text-xs font-semibold text-white">{user?.name ?? "Administrateur"}</p>
              <p className="truncate text-[10px] text-white/50">Administrateur</p>
            </div>
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="rounded-md p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
              aria-label="Se déconnecter"
              title="Se déconnecter"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileNav && (
        <div
          className="fixed inset-0 z-40 bg-congo-noir/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileNav(false)}
          aria-hidden="true"
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:px-8">
          <button
            onClick={() => setMobileNav(true)}
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-serif text-lg font-bold capitalize">
            {NAV.find((n) => pathname.startsWith(n.href) && n.href !== "/admin")?.label ??
              "Dashboard"}
          </h1>
          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank" className="gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Site</span>
            </Link>
          </Button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
