'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cloud, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@congo-history.cloud");
  const [password, setPassword] = useState("congo1960");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate a small delay
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        router.push("/admin");
      } else {
        setError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-congo-noir px-4 py-12 text-white">
      <div className="absolute inset-0 bg-archive-grid opacity-30" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-congo-green/40 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-congo-yellow/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-congo-green to-emerald-700 shadow-glow-green">
              <Cloud className="h-6 w-6 text-white" />
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-congo-green via-congo-yellow to-congo-red" />
            </span>
            <div className="text-left leading-none">
              <p className="font-serif text-lg font-bold">CONGO HISTORY</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-congo-yellow">Cloud · Admin</p>
            </div>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-congo-green/20 text-congo-green">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-white">Connexion administrateur</h1>
              <p className="text-xs text-white/50">Accès réservé à l'équipe éditoriale</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-lg border border-white/15 bg-white/5 pl-10 pr-3 text-sm text-white placeholder:text-white/30 focus:border-congo-yellow/50 focus:outline-none focus:ring-2 focus:ring-congo-yellow/30"
                  placeholder="admin@congo-history.cloud"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-lg border border-white/15 bg-white/5 pl-10 pr-3 text-sm text-white placeholder:text-white/30 focus:border-congo-yellow/50 focus:outline-none focus:ring-2 focus:ring-congo-yellow/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg bg-congo-red/15 px-3 py-2 text-xs text-congo-red">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Connexion…" : "Se connecter"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-white/10 bg-congo-noir/40 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-congo-yellow">
              Démo
            </p>
            <p className="mt-1 text-xs text-white/60">
              Email : <span className="font-mono text-white/80">admin@congo-history.cloud</span>
            </p>
            <p className="text-xs text-white/60">
              Mot de passe : <span className="font-mono text-white/80">congo1960</span>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Authentification simulée en local. Migration future vers Amazon Cognito.
        </p>
      </div>
    </div>
  );
}
