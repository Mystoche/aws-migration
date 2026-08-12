'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, ChevronRight, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CongoLogo } from "@/components/layout/CongoLogo";
import { useAuth } from "@/lib/admin-store";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  const closeMobile = () => setMobileOpen(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b border-white/10 bg-congo-noir/95 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo — map of Congo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Congo History — accueil">
            <CongoLogo size="md" />
            <span className="hidden font-serif text-base font-bold tracking-tight text-white sm:inline">
              CONGO HISTORY
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-center lg:flex" aria-label="Navigation principale">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "text-congo-yellow"
                          : "text-white/75 hover:text-white",
                      )}
                    >
                      {link.label}
                      {active && (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-congo-yellow" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Search (desktop) */}
          <form
            onSubmit={onSearch}
            className="hidden items-center md:flex"
            role="search"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Rechercher…"
                aria-label="Rechercher dans l'histoire du Congo"
                className="h-9 w-40 rounded-full border border-white/15 bg-white/5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:w-56 focus:border-congo-yellow/50 focus:outline-none focus:ring-2 focus:ring-congo-yellow/30 transition-all"
              />
            </div>
          </form>

          {/* Connexion / Account area */}
          <div className="hidden items-center gap-2 lg:flex">
            {isAuthenticated && user ? (
              <>
                {isAdmin() && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 hover:border-congo-yellow/50 hover:text-white transition-colors"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  title={`Connecté : ${user.name}`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-congo-yellow text-[10px] font-bold text-congo-noir">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[8rem] truncate">{user.name}</span>
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-full bg-congo-yellow px-4 py-1.5 text-xs font-semibold text-congo-noir hover:bg-congo-yellow/90 transition-colors"
              >
                <UserIcon className="h-3.5 w-3.5" />
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-200",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className="absolute inset-0 bg-congo-noir/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <nav
          className={cn(
            "absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-background shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
          aria-label="Navigation mobile"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <span className="font-serif font-bold">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-md p-2 hover:bg-muted"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={onSearch} className="p-4" role="search">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Rechercher dans l'histoire…"
                aria-label="Rechercher"
                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </form>

          <ul className="space-y-1 px-3 pb-3">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-muted",
                    )}
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="divider-flag mx-4" />

          {/* Auth area mobile */}
          <div className="px-3 py-3">
            {isAuthenticated && user ? (
              <>
                {isAdmin() && (
                  <Link
                    href="/admin"
                    onClick={closeMobile}
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-muted"
                  >
                    <span className="inline-flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Administration
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                )}
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-muted/60 px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-md p-2 text-muted-foreground hover:bg-background hover:text-foreground"
                    aria-label="Se déconnecter"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                onClick={closeMobile}
                className="flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <span className="inline-flex items-center gap-2">
                  <UserIcon className="h-4 w-4" /> Connexion
                </span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            )}
          </div>

          <p className="px-7 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {APP_NAME}
          </p>
        </nav>
      </div>
    </>
  );
}
