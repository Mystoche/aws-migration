import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-congo-noir px-4 text-center text-white">
      <div className="absolute inset-0 bg-archive-grid opacity-30" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-congo-red/30 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
          <Compass className="h-3 w-3 text-congo-yellow" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
            404 · Page introuvable
          </span>
        </div>

        <h1 className="mt-6 font-serif text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
          Cette page
          <br />
          <span className="text-gradient-congo">n'existe pas</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm text-white/70 sm:text-base">
          Le fil de l'histoire s'est interrompu ici. Peut-être l'URL a-t-elle
          changé, ou cette page n'a-t-elle jamais existé dans nos archives.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'histoire
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            <Link href="/search">Rechercher</Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-1">
          <span className="block h-3 w-1 rounded-sm bg-congo-green" />
          <span className="block h-3 w-1 rounded-sm bg-congo-yellow" />
          <span className="block h-3 w-1 rounded-sm bg-congo-red" />
        </div>
      </div>
    </div>
  );
}
