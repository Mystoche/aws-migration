/**
 * REPOSITORY LAYER
 * =================
 *
 * SINGLE swap point between local data and AWS DynamoDB.
 *
 * Today (NEXT_PUBLIC_DATA_SOURCE=local or unset):
 *   Each repository reads from the in-memory data files in `src/data/*`.
 *
 * Tomorrow (NEXT_PUBLIC_DATA_SOURCE=aws):
 *   Each repository calls DynamoDB via the AWS SDK.
 *
 * The API routes under `src/app/api/*` call these repositories. The services
 * layer (`src/services/*`) calls the API routes via fetch. This 3-tier design
 * means you can migrate to AWS WITHOUT touching a single UI component.
 *
 * To enable DynamoDB:
 *   1. `npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb`
 *   2. Set env vars: AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
 *   3. Set NEXT_PUBLIC_DATA_SOURCE=aws
 *   4. Uncomment the DynamoDB branch in each repository below (or replace
 *      with your own DynamoDB mapper).
 */

import {
  events as localEvents,
  getEventBySlug as localGetEventBySlug,
  getFeaturedEvents as localGetFeatured,
} from "@/data/events";
import {
  personalities as localPersonalities,
  getPersonalityBySlug as localGetPersonalityBySlug,
} from "@/data/personalities";
import {
  articles as localArticles,
  getArticleBySlug as localGetArticleBySlug,
} from "@/data/articles";
import { places as localPlaces } from "@/data/places";
import { sources as localSources } from "@/data/sources";
import { galleryItems as localGallery } from "@/data/gallery";
import { categories } from "@/data/categories";
import { periods, getPeriodByYear } from "@/data/periods";

import type {
  HistoricalEvent, Personality, Article, Place, Source, GalleryItem,
  Category, Period, PeriodInfo, CategoryInfo,
} from "@/types";

const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "local";
const IS_AWS = DATA_SOURCE === "aws";

/* ================================================================== */
/* EVENTS                                                             */
/* ================================================================== */

export interface EventFilters {
  period?: string;
  category?: string;
  yearFrom?: number;
  yearTo?: number;
  search?: string;
  status?: string;
  limit?: number;
}

export const eventsRepository = {
  async list(filters: EventFilters = {}): Promise<HistoricalEvent[]> {
    if (IS_AWS) {
      // ── DYNAMODB BRANCH ──────────────────────────────────────────
      // Replace this block with:
      //   const { DynamoDBDocumentClient, ScanCommand } = await importDynamo();
      //   const cmd = new ScanCommand({ TableName: process.env.DDB_TABLE_EVENTS });
      //   const res = await ddbDoc.send(cmd);
      //   let result = res.Items as HistoricalEvent[];
      //   ... apply filters ...
      //   return result;
      // ──────────────────────────────────────────────────────────────
      throw new Error("DynamoDB branch not configured. See src/lib/repository/index.ts");
    }
    // LOCAL BRANCH
    let result = localEvents.filter((e) => e.status !== "draft");
    if (filters.period) result = result.filter((e) => e.period === filters.period);
    if (filters.category) result = result.filter((e) => e.category === filters.category);
    if (filters.yearFrom) result = result.filter((e) => e.year >= filters.yearFrom!);
    if (filters.yearTo) result = result.filter((e) => e.year <= filters.yearTo!);
    if (filters.status) result = result.filter((e) => e.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return [...result].sort((a, b) => a.year - b.year);
  },

  async listAll(): Promise<HistoricalEvent[]> {
    if (IS_AWS) {
      throw new Error("DynamoDB branch not configured.");
    }
    return [...localEvents].sort((a, b) => a.year - b.year);
  },

  async featured(limit = 6): Promise<HistoricalEvent[]> {
    if (IS_AWS) {
      throw new Error("DynamoDB branch not configured.");
    }
    return localGetFeatured().slice(0, limit);
  },

  async getBySlug(slug: string): Promise<HistoricalEvent | undefined> {
    if (IS_AWS) {
      throw new Error("DynamoDB branch not configured.");
    }
    return localGetEventBySlug(slug);
  },

  async getById(id: string): Promise<HistoricalEvent | undefined> {
    if (IS_AWS) {
      throw new Error("DynamoDB branch not configured.");
    }
    return localEvents.find((e) => e.id === id);
  },

  async create(data: Omit<HistoricalEvent, "id">): Promise<HistoricalEvent> {
    if (IS_AWS) {
      throw new Error("DynamoDB branch not configured.");
    }
    // In local mode, creation is handled by the Zustand admin store.
    // The API route returns the data with a generated id.
    const id = `evt-${Date.now().toString(36)}`;
    return { ...data, id } as HistoricalEvent;
  },

  async update(id: string, patch: Partial<HistoricalEvent>): Promise<HistoricalEvent | undefined> {
    if (IS_AWS) {
      throw new Error("DynamoDB branch not configured.");
    }
    const existing = localEvents.find((e) => e.id === id);
    return existing ? { ...existing, ...patch, id } : undefined;
  },

  async delete(id: string): Promise<boolean> {
    if (IS_AWS) {
      throw new Error("DynamoDB branch not configured.");
    }
    return true; // no-op in read-only local mode (admin store handles it)
  },

  async stats(): Promise<{ total: number; published: number; drafts: number; needsVerification: number }> {
    if (IS_AWS) {
      throw new Error("DynamoDB branch not configured.");
    }
    const total = localEvents.length;
    const published = localEvents.filter((e) => e.status === "published" || !e.status).length;
    const drafts = localEvents.filter((e) => e.status === "draft").length;
    const needsVerification = localEvents.filter((e) => e.status === "needs-verification").length;
    return { total, published, drafts, needsVerification };
  },
};

/* ================================================================== */
/* PERSONALITIES                                                      */
/* ================================================================== */

export const personalitiesRepository = {
  async list(): Promise<Personality[]> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return [...localPersonalities].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  },
  async getBySlug(slug: string): Promise<Personality | undefined> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return localGetPersonalityBySlug(slug);
  },
  async getById(id: string): Promise<Personality | undefined> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return localPersonalities.find((p) => p.id === id);
  },
  async stats(): Promise<{ total: number }> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return { total: localPersonalities.length };
  },
};

/* ================================================================== */
/* ARTICLES                                                           */
/* ================================================================== */

export const articlesRepository = {
  async list(): Promise<Article[]> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return [...localArticles]
      .filter((a) => a.status !== "draft")
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },
  async getBySlug(slug: string): Promise<Article | undefined> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return localGetArticleBySlug(slug);
  },
  async getById(id: string): Promise<Article | undefined> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return localArticles.find((a) => a.id === id);
  },
  async stats(): Promise<{ total: number }> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return { total: localArticles.length };
  },
};

/* ================================================================== */
/* PLACES                                                             */
/* ================================================================== */

export const placesRepository = {
  async list(): Promise<Place[]> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return [...localPlaces];
  },
  async getBySlug(slug: string): Promise<Place | undefined> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return localPlaces.find((p) => p.slug === slug);
  },
  async getById(id: string): Promise<Place | undefined> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return localPlaces.find((p) => p.id === id);
  },
  async stats(): Promise<{ total: number }> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return { total: localPlaces.length };
  },
};

/* ================================================================== */
/* SOURCES                                                            */
/* ================================================================== */

export const sourcesRepository = {
  async list(): Promise<Source[]> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return [...localSources];
  },
  async getByIds(ids: string[]): Promise<Source[]> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return localSources.filter((s) => ids.includes(s.id));
  },
  async stats(): Promise<{ total: number; verified: number; pending: number }> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return {
      total: localSources.length,
      verified: localSources.filter((s) => s.verified).length,
      pending: localSources.filter((s) => !s.verified).length,
    };
  },
};

/* ================================================================== */
/* GALLERY                                                            */
/* ================================================================== */

export const galleryRepository = {
  async list(category?: string): Promise<GalleryItem[]> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    let result = [...localGallery];
    if (category && category !== "Toutes")
      result = result.filter((i) => i.category === category);
    return result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  },
  async stats(): Promise<{ total: number }> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    return { total: localGallery.length };
  },
};

/* ================================================================== */
/* META (categories, periods)                                        */
/* ================================================================== */

export const metaRepository = {
  async categories(): Promise<CategoryInfo[]> {
    return categories as unknown as CategoryInfo[];
  },
  async periods(): Promise<PeriodInfo[]> {
    return periods as unknown as PeriodInfo[];
  },
  getPeriodByYear,
};

/* ================================================================== */
/* SEARCH                                                             */
/* ================================================================== */

export interface SearchResult {
  type: "event" | "personality" | "article" | "place" | "source";
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  year?: number;
  category?: Category;
  url: string;
}

export const searchRepository = {
  async search(query: string): Promise<SearchResult[]> {
    if (IS_AWS) throw new Error("DynamoDB branch not configured.");
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results: SearchResult[] = [];

    for (const e of localEvents) {
      if (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.tags?.some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({
          type: "event", id: e.id, slug: e.slug, title: e.title,
          excerpt: e.summary, year: e.year, category: e.category,
          url: `/events/${e.slug}`,
        });
      }
    }
    for (const p of localPersonalities) {
      if (
        p.name.toLowerCase().includes(q) ||
        p.biography.toLowerCase().includes(q) ||
        p.role?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({
          type: "personality", id: p.id, slug: p.slug, title: p.name,
          excerpt: p.biography.slice(0, 180) + "…",
          url: `/personalities/${p.slug}`,
        });
      }
    }
    for (const a of localArticles) {
      if (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      ) {
        results.push({
          type: "article", id: a.id, slug: a.slug, title: a.title,
          excerpt: a.excerpt, category: a.category, url: `/articles/${a.slug}`,
        });
      }
    }
    for (const pl of localPlaces) {
      if (
        pl.name.toLowerCase().includes(q) ||
        pl.description.toLowerCase().includes(q) ||
        pl.region?.toLowerCase().includes(q)
      ) {
        results.push({
          type: "place", id: pl.id, slug: pl.slug, title: pl.name,
          excerpt: pl.description.slice(0, 180) + "…", url: `/map`,
        });
      }
    }
    for (const s of localSources) {
      if (
        s.title.toLowerCase().includes(q) ||
        s.author?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
      ) {
        results.push({
          type: "source", id: s.id, slug: s.id, title: s.title,
          excerpt: s.description ?? "", url: `/search`,
        });
      }
    }
    return results;
  },
};

/* ================================================================== */
/* DASHBOARD                                                          */
/* ================================================================== */

export const dashboardRepository = {
  async overview() {
    const [events, personalities, articles, gallery, sources, places] = await Promise.all([
      eventsRepository.stats(),
      personalitiesRepository.stats(),
      articlesRepository.stats(),
      galleryRepository.stats(),
      sourcesRepository.stats(),
      placesRepository.stats(),
    ]);
    return { events, personalities, articles, gallery, sources, places };
  },
};
