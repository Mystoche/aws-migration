/**
 * DATA ACCESS LAYER
 * =================
 *
 * This module is the SINGLE point of contact between the UI and the data
 * source. Today, every service reads from the local in-memory data files in
 * `src/data/*`. Tomorrow, the same services can be rewired to call an AWS API
 * Gateway + Lambda + DynamoDB backend without touching a single component.
 *
 * Migration path:
 *   1. Implement the API routes under `src/app/api/*`.
 *   2. Replace each `localXXX` implementation with `fetch('/api/...')`.
 *   3. Components keep calling the same service signatures.
 *
 * All service functions return Promise<T> to match future async API calls.
 */
import { events, getEventBySlug, getFeaturedEvents } from "@/data/events";
import { personalities, getPersonalityBySlug } from "@/data/personalities";
import { articles, getArticleBySlug } from "@/data/articles";
import { places } from "@/data/places";
import { sources } from "@/data/sources";
import { periods, getPeriodByYear } from "@/data/periods";
import { categories } from "@/data/categories";
import { galleryItems, galleryCategories } from "@/data/gallery";
import type {
  HistoricalEvent,
  Personality,
  Article,
  Place,
  Source,
  PeriodInfo,
  CategoryInfo,
  GalleryItem,
  SearchResult,
} from "@/types";

// Simulated latency for realistic loading states (zero in production).
const SIMULATED_LATENCY = 0; // ms

async function delay<T>(value: T): Promise<T> {
  if (SIMULATED_LATENCY <= 0) return value;
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY));
}

/* ------------------------------------------------------------------ */
/* EVENTS                                                              */
/* ------------------------------------------------------------------ */

export const eventsService = {
  async list(filters?: {
    period?: string;
    category?: string;
    yearFrom?: number;
    yearTo?: number;
    search?: string;
  }): Promise<HistoricalEvent[]> {
    let result = events.filter((e) => e.status !== "draft");
    if (filters?.period) result = result.filter((e) => e.period === filters.period);
    if (filters?.category) result = result.filter((e) => e.category === filters.category);
    if (filters?.yearFrom) result = result.filter((e) => e.year >= filters.yearFrom!);
    if (filters?.yearTo) result = result.filter((e) => e.year <= filters.yearTo!);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return delay([...result].sort((a, b) => a.year - b.year));
  },

  async listAll(): Promise<HistoricalEvent[]> {
    return delay([...events].sort((a, b) => a.year - b.year));
  },

  async featured(limit = 6): Promise<HistoricalEvent[]> {
    return delay(getFeaturedEvents().slice(0, limit));
  },

  async getBySlug(slug: string): Promise<HistoricalEvent | undefined> {
    return delay(getEventBySlug(slug));
  },

  async getById(id: string): Promise<HistoricalEvent | undefined> {
    return delay(events.find((e) => e.id === id));
  },

  async getRelated(id: string, limit = 4): Promise<HistoricalEvent[]> {
    const current = events.find((e) => e.id === id);
    if (!current) return delay([]);
    const related = (current.relatedEventIds ?? [])
      .map((rid) => events.find((e) => e.id === rid))
      .filter(Boolean) as HistoricalEvent[];
    const samePeriod = events
      .filter((e) => e.id !== id && e.period === current.period && !related.includes(e))
      .slice(0, limit - related.length);
    return delay([...related, ...samePeriod].slice(0, limit));
  },

  async getAdjacent(id: string): Promise<{
    previous?: HistoricalEvent;
    next?: HistoricalEvent;
  }> {
    const sorted = [...events].sort((a, b) => a.year - b.year);
    const index = sorted.findIndex((e) => e.id === id);
    if (index === -1) return delay({});
    return delay({
      previous: index > 0 ? sorted[index - 1] : undefined,
      next: index < sorted.length - 1 ? sorted[index + 1] : undefined,
    });
  },

  async stats(): Promise<{ total: number; published: number; drafts: number; needsVerification: number }> {
    const total = events.length;
    const published = events.filter((e) => e.status === "published" || !e.status).length;
    const drafts = events.filter((e) => e.status === "draft").length;
    const needsVerification = events.filter((e) => e.status === "needs-verification").length;
    return delay({ total, published, drafts, needsVerification });
  },
};

/* ------------------------------------------------------------------ */
/* PERSONALITIES                                                      */
/* ------------------------------------------------------------------ */

export const personalitiesService = {
  async list(): Promise<Personality[]> {
    return delay([...personalities].sort((a, b) => (a.name || "").localeCompare(b.name || "")));
  },

  async getBySlug(slug: string): Promise<Personality | undefined> {
    return delay(getPersonalityBySlug(slug));
  },

  async getById(id: string): Promise<Personality | undefined> {
    return delay(personalities.find((p) => p.id === id));
  },

  async stats(): Promise<{ total: number }> {
    return delay({ total: personalities.length });
  },
};

/* ------------------------------------------------------------------ */
/* ARTICLES                                                           */
/* ------------------------------------------------------------------ */

export const articlesService = {
  async list(): Promise<Article[]> {
    return delay(
      [...articles]
        .filter((a) => a.status !== "draft")
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    );
  },

  async getBySlug(slug: string): Promise<Article | undefined> {
    return delay(getArticleBySlug(slug));
  },

  async getById(id: string): Promise<Article | undefined> {
    return delay(articles.find((a) => a.id === id));
  },

  async getRelated(id: string, limit = 3): Promise<Article[]> {
    const current = articles.find((a) => a.id === id);
    if (!current) return delay([]);
    const related = (current.relatedArticleIds ?? [])
      .map((rid) => articles.find((a) => a.id === rid))
      .filter(Boolean) as Article[];
    const sameCat = articles
      .filter((a) => a.id !== id && a.category === current.category && !related.includes(a))
      .slice(0, limit - related.length);
    return delay([...related, ...sameCat].slice(0, limit));
  },

  async stats(): Promise<{ total: number }> {
    return delay({ total: articles.length });
  },
};

/* ------------------------------------------------------------------ */
/* PLACES                                                             */
/* ------------------------------------------------------------------ */

export const placesService = {
  async list(): Promise<Place[]> {
    return delay([...places]);
  },

  async getBySlug(slug: string): Promise<Place | undefined> {
    return delay(places.find((p) => p.slug === slug));
  },

  async getById(id: string): Promise<Place | undefined> {
    return delay(places.find((p) => p.id === id));
  },

  async stats(): Promise<{ total: number }> {
    return delay({ total: places.length });
  },
};

/* ------------------------------------------------------------------ */
/* SOURCES                                                            */
/* ------------------------------------------------------------------ */

export const sourcesService = {
  async list(): Promise<Source[]> {
    return delay([...sources]);
  },

  async getByIds(ids: string[]): Promise<Source[]> {
    return delay(sources.filter((s) => ids.includes(s.id)));
  },

  async stats(): Promise<{ total: number; verified: number; pending: number }> {
    return delay({
      total: sources.length,
      verified: sources.filter((s) => s.verified).length,
      pending: sources.filter((s) => !s.verified).length,
    });
  },
};

/* ------------------------------------------------------------------ */
/* GALLERY                                                            */
/* ------------------------------------------------------------------ */

export const galleryService = {
  async list(category?: string): Promise<GalleryItem[]> {
    let result = [...galleryItems];
    if (category && category !== "Toutes")
      result = result.filter((i) => i.category === category);
    return delay(result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0)));
  },

  async categories(): Promise<string[]> {
    return delay(["Toutes", ...galleryCategories]);
  },

  async stats(): Promise<{ total: number }> {
    return delay({ total: galleryItems.length });
  },
};

/* ------------------------------------------------------------------ */
/* PERIODS & CATEGORIES (metadata)                                   */
/* ------------------------------------------------------------------ */

export const metaService = {
  async periods(): Promise<PeriodInfo[]> {
    return delay(periods);
  },
  async categories(): Promise<CategoryInfo[]> {
    return delay(categories);
  },
  getPeriodByYear,
};

/* ------------------------------------------------------------------ */
/* SEARCH — global, multi-type                                        */
/* ------------------------------------------------------------------ */

export const searchService = {
  async search(query: string): Promise<SearchResult[]> {
    const q = query.trim().toLowerCase();
    if (!q) return delay([]);
    const results: SearchResult[] = [];

    for (const e of events) {
      if (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.tags?.some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({
          type: "event",
          id: e.id,
          slug: e.slug,
          title: e.title,
          excerpt: e.summary,
          year: e.year,
          category: e.category,
          url: `/events/${e.slug}`,
        });
      }
    }

    for (const p of personalities) {
      if (
        p.name.toLowerCase().includes(q) ||
        p.biography.toLowerCase().includes(q) ||
        p.role?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({
          type: "personality",
          id: p.id,
          slug: p.slug,
          title: p.name,
          excerpt: p.biography.slice(0, 180) + "…",
          url: `/personalities/${p.slug}`,
        });
      }
    }

    for (const a of articles) {
      if (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      ) {
        results.push({
          type: "article",
          id: a.id,
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          category: a.category,
          url: `/articles/${a.slug}`,
        });
      }
    }

    for (const pl of places) {
      if (
        pl.name.toLowerCase().includes(q) ||
        pl.description.toLowerCase().includes(q) ||
        pl.region?.toLowerCase().includes(q)
      ) {
        results.push({
          type: "place",
          id: pl.id,
          slug: pl.slug,
          title: pl.name,
          excerpt: pl.description.slice(0, 180) + "…",
          url: `/map`,
        });
      }
    }

    for (const s of sources) {
      if (
        s.title.toLowerCase().includes(q) ||
        s.author?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
      ) {
        results.push({
          type: "source",
          id: s.id,
          slug: s.id,
          title: s.title,
          excerpt: s.description ?? "",
          url: `/search`,
        });
      }
    }

    return delay(results);
  },

  async suggestions(prefix: string, limit = 6): Promise<SearchResult[]> {
    const q = prefix.trim().toLowerCase();
    if (!q) return delay([]);
    const all = await this.search(q);
    return delay(all.slice(0, limit));
  },
};

/* ------------------------------------------------------------------ */
/* DASHBOARD — global stats for admin                                */
/* ------------------------------------------------------------------ */

export const dashboardService = {
  async overview() {
    const [eventsStats, persoStats, articlesStats, galleryStats, sourcesStats, placesStats] =
      await Promise.all([
        eventsService.stats(),
        personalitiesService.stats(),
        articlesService.stats(),
        galleryService.stats(),
        sourcesService.stats(),
        placesService.stats(),
      ]);
    return {
      events: eventsStats,
      personalities: persoStats,
      articles: articlesStats,
      gallery: galleryStats,
      sources: sourcesStats,
      places: placesStats,
    };
  },

  async eventsByDecade() {
    const decades: { decade: string; count: number }[] = [];
    for (let start = 1960; start < 2030; start += 10) {
      const count = events.filter((e) => e.year >= start && e.year < start + 10).length;
      decades.push({ decade: `${start}s`, count });
    }
    return delay(decades);
  },

  async eventsByCategory() {
    return delay(
      categories.map((c) => ({
        category: c.label,
        count: events.filter((e) => e.category === c.id).length,
        color: c.color,
      })),
    );
  },

  async recentEvents(limit = 5) {
    return delay(
      [...events]
        .sort((a, b) => b.year - a.year)
        .slice(0, limit)
        .map((e) => ({ id: e.id, slug: e.slug, title: e.title, year: e.year, status: e.status })),
    );
  },

  async pendingVerification() {
    return delay(events.filter((e) => e.status === "needs-verification"));
  },
};
