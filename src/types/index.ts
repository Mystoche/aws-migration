/**
 * Congo History Cloud — Domain Types
 * Centralized TypeScript interfaces for the historical content.
 * These mirror the future AWS DynamoDB schema to ease migration.
 */

export type Category =
  | "politique"
  | "societe"
  | "economie"
  | "culture"
  | "sport"
  | "education"
  | "international";

export type Period =
  | "1960-1969"
  | "1970-1979"
  | "1980-1989"
  | "1990-1999"
  | "2000-2009"
  | "2010-2019"
  | "2020-aujourdhui";

export type SourceType =
  | "livre"
  | "archive"
  | "article"
  | "document-officiel"
  | "interview"
  | "site-internet"
  | "photographie"
  | "video";

export interface HistoricalEvent {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO date YYYY-MM-DD
  year: number;
  month?: number; // 1-12
  day?: number; // 1-31
  category: Category;
  period: Period;
  summary: string;
  context?: string;
  unfolding?: string; // "déroulement"
  consequences?: string;
  content: string; // full narrative (markdown-friendly plain text)
  image?: string;
  locationId?: string;
  personalityIds?: string[];
  sourceIds?: string[];
  relatedEventIds?: string[];
  tags?: string[];
  featured?: boolean;
  status?: "published" | "draft" | "needs-verification";
}

export interface Personality {
  id: string;
  slug: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  role?: string;
  functions?: string[];
  biography: string;
  image?: string;
  eventIds?: string[];
  sourceIds?: string[];
  tags?: string[];
  status?: "published" | "draft" | "needs-verification";
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown body
  author: string;
  publishedAt: string;
  category: Category;
  image?: string;
  readingTime: number; // minutes
  tableOfContents?: { id: string; title: string }[];
  relatedArticleIds?: string[];
  sourceIds?: string[];
  status?: "published" | "draft";
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  region?: string;
  lat: number;
  lng: number;
  description: string;
  population?: string;
  founded?: string;
  eventIds?: string[];
  personalityIds?: string[];
  image?: string;
}

export interface Source {
  id: string;
  type: SourceType;
  title: string;
  author?: string;
  year?: number;
  publisher?: string;
  url?: string;
  isbn?: string;
  description?: string;
  verified: boolean; // false = "TODO: VERIFY SOURCE"
}

export interface PeriodInfo {
  id: Period;
  label: string;
  yearStart: number;
  yearEnd: number | null;
  description: string;
  color: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  description: string;
  color: string;
  icon: string; // lucide icon name
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  year?: number;
  imageUrl: string;
  sourceId?: string;
  placeId?: string;
  tags?: string[];
}

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
