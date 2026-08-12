'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  events as seedEvents,
  type HistoricalEvent,
} from "@/data/events";
import {
  personalities as seedPersonalities,
  type Personality,
} from "@/data/personalities";
import { articles as seedArticles, type Article } from "@/data/articles";
import { places as seedPlaces, type Place } from "@/data/places";
import { sources as seedSources, type Source } from "@/data/sources";
import { galleryItems as seedGallery, type GalleryItem } from "@/data/gallery";

/* ------------------------------------------------------------------ */
/* AUTH (simulated/local) — supports admin (pre-registered) & users   */
/* ------------------------------------------------------------------ */

export type UserRole = "admin" | "user";

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
}

interface RegisteredUser extends AuthUser {
  password: string; // local demo only — NEVER store plaintext in production
}

/**
 * Pre-registered accounts (local simulation).
 * - The admin account can manage the platform.
 * - Normal users can register and only view the public site.
 * Future: replace with Amazon Cognito user pools.
 */
const PRE_REGISTERED: RegisteredUser[] = [
  { email: "admin@congo-history.cloud", password: "congo1960", name: "Administrateur", role: "admin" },
];

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  registeredUsers: RegisteredUser[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  isAdmin: () => boolean;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      registeredUsers: PRE_REGISTERED,

      login: (email, password) => {
        const e = email.trim().toLowerCase();
        const all = get().registeredUsers;
        const found = all.find((u) => u.email === e && u.password === password);
        if (!found) {
          return { ok: false, error: "Identifiants incorrects." };
        }
        set({
          isAuthenticated: true,
          user: { email: found.email, name: found.name, role: found.role },
        });
        return { ok: true };
      },

      register: (name, email, password) => {
        const e = email.trim().toLowerCase();
        if (!name.trim()) return { ok: false, error: "Le nom est obligatoire." };
        if (!isEmail(e)) return { ok: false, error: "Email invalide." };
        if (password.length < 6)
          return { ok: false, error: "Le mot de passe doit contenir au moins 6 caractères." };
        const all = get().registeredUsers;
        if (all.some((u) => u.email === e)) {
          return { ok: false, error: "Cet email est déjà enregistré." };
        }
        const newUser: RegisteredUser = {
          email: e,
          password,
          name: name.trim(),
          role: "user", // newly registered users are viewers only
        };
        set({
          registeredUsers: [...all, newUser],
          isAuthenticated: true,
          user: { email: newUser.email, name: newUser.name, role: newUser.role },
        });
        return { ok: true };
      },

      logout: () => set({ isAuthenticated: false, user: null }),

      isAdmin: () => get().user?.role === "admin",
    }),
    { name: "chc-admin-auth" },
  ),
);

/* ------------------------------------------------------------------ */
/* ADMIN DATA STORE (in-memory editable copies of seed data)          */
/* ------------------------------------------------------------------ */

interface AdminState {
  events: HistoricalEvent[];
  personalities: Personality[];
  articles: Article[];
  places: Place[];
  sources: Source[];
  gallery: GalleryItem[];

  // events CRUD
  addEvent: (e: HistoricalEvent) => void;
  updateEvent: (id: string, patch: Partial<HistoricalEvent>) => void;
  deleteEvent: (id: string) => void;

  // personalities CRUD
  addPersonality: (p: Personality) => void;
  updatePersonality: (id: string, patch: Partial<Personality>) => void;
  deletePersonality: (id: string) => void;

  // articles CRUD
  addArticle: (a: Article) => void;
  updateArticle: (id: string, patch: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // sources CRUD
  addSource: (s: Source) => void;
  updateSource: (id: string, patch: Partial<Source>) => void;
  deleteSource: (id: string) => void;

  // places CRUD
  addPlace: (p: Place) => void;
  updatePlace: (id: string, patch: Partial<Place>) => void;
  deletePlace: (id: string) => void;

  // gallery
  addGalleryItem: (g: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  reset: () => void;
}

function genId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const useAdmin = create<AdminState>()((set) => ({
  events: seedEvents,
  personalities: seedPersonalities,
  articles: seedArticles,
  places: seedPlaces,
  sources: seedSources,
  gallery: seedGallery,

  addEvent: (e) =>
    set((s) => ({
      events: [
        { ...e, id: e.id || genId("evt"), slug: e.slug || slugify(e.title) },
        ...s.events,
      ],
    })),
  updateEvent: (id, patch) =>
    set((s) => ({
      events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    })),
  deleteEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),

  addPersonality: (p) =>
    set((s) => ({
      personalities: [
        { ...p, id: p.id || genId("p"), slug: p.slug || slugify(p.name) },
        ...s.personalities,
      ],
    })),
  updatePersonality: (id, patch) =>
    set((s) => ({
      personalities: s.personalities.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),
  deletePersonality: (id) =>
    set((s) => ({ personalities: s.personalities.filter((p) => p.id !== id) })),

  addArticle: (a) =>
    set((s) => ({
      articles: [
        { ...a, id: a.id || genId("art"), slug: a.slug || slugify(a.title) },
        ...s.articles,
      ],
    })),
  updateArticle: (id, patch) =>
    set((s) => ({
      articles: s.articles.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    })),
  deleteArticle: (id) =>
    set((s) => ({ articles: s.articles.filter((a) => a.id !== id) })),

  addSource: (src) =>
    set((s) => ({ sources: [{ ...src, id: src.id || genId("src") }, ...s.sources] })),
  updateSource: (id, patch) =>
    set((s) => ({ sources: s.sources.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
  deleteSource: (id) => set((s) => ({ sources: s.sources.filter((x) => x.id !== id) })),

  addPlace: (p) =>
    set((s) => ({
      places: [
        { ...p, id: p.id || genId("place"), slug: p.slug || slugify(p.name) },
        ...s.places,
      ],
    })),
  updatePlace: (id, patch) =>
    set((s) => ({ places: s.places.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
  deletePlace: (id) => set((s) => ({ places: s.places.filter((p) => p.id !== id) })),

  addGalleryItem: (g) =>
    set((s) => ({ gallery: [{ ...g, id: g.id || genId("g") }, ...s.gallery] })),
  deleteGalleryItem: (id) =>
    set((s) => ({ gallery: s.gallery.filter((g) => g.id !== id) })),

  reset: () =>
    set({
      events: seedEvents,
      personalities: seedPersonalities,
      articles: seedArticles,
      places: seedPlaces,
      sources: seedSources,
      gallery: seedGallery,
    }),
}));
