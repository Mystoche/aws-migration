import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import { FOOTER_LINKS, APP_NAME, APP_SLOGAN } from "@/lib/constants";
import { CongoLogo } from "@/components/layout/CongoLogo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-congo-noir text-white">
      <div className="divider-flag" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Congo History — accueil">
              <CongoLogo size="lg" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold tracking-tight">
                  CONGO HISTORY
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              « {APP_SLOGAN}. »
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/50">
              Plateforme numérique de mémoire et d'histoire de la République du
              Congo, de l'indépendance en 1960 à aujourd'hui.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="block h-3 w-1 rounded-sm bg-congo-green" />
              <span className="block h-3 w-1 rounded-sm bg-congo-yellow" />
              <span className="block h-3 w-1 rounded-sm bg-congo-red" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                République du Congo
              </span>
            </div>
          </div>

          {/* Explorer */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-congo-yellow">
              Explorer
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.Explorer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-congo-yellow">
              Ressources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.Ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Built with */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-congo-yellow">
              Stack
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-white/60">
              Next.js · TypeScript · Tailwind · Leaflet · Prisma
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/40">
              Conçu pour une migration future vers
              <span className="text-congo-yellow/90"> AWS Serverless</span> (S3,
              CloudFront, API Gateway, Lambda, DynamoDB, Cognito).
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {year} {APP_NAME}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Contact email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
