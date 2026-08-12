'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, User, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { CongoLogo } from "@/components/layout/CongoLogo";
import { toast } from "sonner";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isAdmin } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (mode === "login") {
        const res = login(email, password);
        if (!res.ok) {
          setError(res.error ?? "Connexion impossible.");
          setLoading(false);
          return;
        }
        toast.success(`Bienvenue, ${email} !`);
        router.push(isAdmin() ? "/admin" : "/");
      } else {
        const res = register(name, email, password);
        if (!res.ok) {
          setError(res.error ?? "Inscription impossible.");
          setLoading(false);
          return;
        }
        toast.success("Compte créé avec succès");
        router.push("/");
      }
    }, 400);
  };

  const fillAdminDemo = () => {
    setMode("login");
    setEmail("admin@congo-history.cloud");
    setPassword("congo1960");
    setError("");
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
            <CongoLogo size="lg" />
            <div className="text-left leading-none">
              <p className="font-serif text-lg font-bold">CONGO HISTORY</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-congo-yellow">
                Connexion
              </p>
            </div>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-congo-green/20 text-congo-green">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-white">
                {mode === "login" ? "Connexion" : "Créer un compte"}
              </h1>
              <p className="text-xs text-white/50">
                {mode === "login"
                  ? "Accédez à votre espace Congo History"
                  : "Inscrivez-vous pour explorer l'histoire du Congo"}
              </p>
            </div>
          </div>

          {/* Mode tabs */}
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-white/5 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-colors ${
                mode === "login" ? "bg-primary text-primary-foreground" : "text-white/60 hover:text-white"
              }`}
            >
              <Lock className="h-3.5 w-3.5" /> Connexion
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-colors ${
                mode === "register" ? "bg-primary text-primary-foreground" : "text-white/60 hover:text-white"
              }`}
            >
              <UserPlus className="h-3.5 w-3.5" /> Inscription
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label htmlFor="name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Nom complet
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-lg border border-white/15 bg-white/5 pl-10 pr-3 text-sm text-white placeholder:text-white/30 focus:border-congo-yellow/50 focus:outline-none focus:ring-2 focus:ring-congo-yellow/30"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
            )}

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
                  placeholder="vous@exemple.com"
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
                  placeholder={mode === "register" ? "6 caractères minimum" : "••••••••"}
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
              {loading
                ? mode === "login" ? "Connexion…" : "Inscription…"
                : mode === "login" ? "Se connecter" : "Créer mon compte"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          {/* Mode switch */}
          <p className="mt-4 text-center text-xs text-white/50">
            {mode === "login" ? (
              <>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="font-semibold text-congo-yellow hover:underline"
                >
                  Inscrivez-vous
                </button>
              </>
            ) : (
              <>
                Déjà inscrit ?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-semibold text-congo-yellow hover:underline"
                >
                  Connectez-vous
                </button>
              </>
            )}
          </p>

          {/* Demo admin */}
          {mode === "login" && (
            <button
              type="button"
              onClick={fillAdminDemo}
              className="mt-6 w-full rounded-lg border border-white/10 bg-congo-noir/40 p-3 text-left transition-colors hover:border-white/25"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-congo-yellow">
                Compte administrateur (démo)
              </p>
              <p className="mt-1 text-xs text-white/60">
                Email : <span className="font-mono text-white/80">admin@congo-history.cloud</span>
              </p>
              <p className="text-xs text-white/60">
                Mot de passe : <span className="font-mono text-white/80">congo1960</span>
              </p>
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          {mode === "login"
            ? "L'administrateur gère la plateforme. L'utilisateur inscrit explore librement."
            : "Les comptes inscrits permettent de consulter le site. Réservé à la lecture."}
          <br />
          Authentification simulée en local. Migration future vers Amazon Cognito.
        </p>
      </div>
    </div>
  );
}
