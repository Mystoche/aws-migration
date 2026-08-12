'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Menu, X, Cloud, ChevronRight } from "lucide-react";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "glass border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-congo-green via-congo-green to-emerald-700 shadow-glow-green">
              <Cloud className="h-5 w-5 text-white" />
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-congo-green via-congo-yellow to-congo-red" />
            </span>
            <div className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-base font-bold tracking-tight text-foreground">
                CONGO HISTORY
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Cloud
              </span>
            </div>
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
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground",
                      )}
                    >
                      {link.label}
                      {active && (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
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
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Rechercher…"
                aria-label="Rechercher dans l'histoire du Congo"
                className="h-9 w-40 rounded-full border border-border bg-background/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:w-56 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>
          </form>

          {/* Admin link */}
          <Link
            href="/admin"
            className="hidden items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-foreground transition-colors lg:inline-flex"
          >
            Admin
            <ChevronRight className="h-3 w-3" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted lg:hidden"
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

          <ul className="space-y-1 px-3 pb-6">
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
            <li>
              <Link
                href="/admin"
                onClick={closeMobile}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-muted"
              >
                Administration
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            </li>
          </ul>

          <div className="divider-flag mx-4" />
          <p className="px-7 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {APP_NAME}
          </p>
        </nav>
      </div>
    </>
  );
}
