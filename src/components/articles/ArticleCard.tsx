'use client'

import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import type { Article } from "@/types";
import { getCategory } from "@/data/categories";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  className?: string;
  index?: number;
  compact?: boolean;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleCard({ article, className, index = 0, compact = false }: ArticleCardProps) {
  const category = getCategory(article.category);

  return (
    <Reveal delay={index * 60} as="article">
      <Link
        href={`/articles/${article.slug}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-archive",
          compact && "flex-row items-center",
          className,
        )}
      >
        <div className={cn("relative", compact ? "w-32 shrink-0" : "")}>
          <VisualIdentity
            seed={article.id}
            variant="article"
            aspect={compact ? "square" : "video"}
            title={category?.label}
            className={cn("rounded-none border-0", compact && "h-full")}
          />
          {category && !compact && (
            <span
              className="absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm"
              style={{ backgroundColor: category.color }}
            >
              {category.label}
            </span>
          )}
        </div>

        <div className={cn("flex flex-1 flex-col gap-2 p-5", compact && "p-3")}>
          {!compact && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readingTime} min
              </span>
            </div>
          )}
          <h3
            className={cn(
              "font-serif font-bold leading-snug text-foreground transition-colors group-hover:text-primary",
              compact ? "text-sm" : "text-lg",
            )}
          >
            {article.title}
          </h3>
          {!compact && (
            <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          )}
          <div className="mt-auto flex items-center gap-1 text-xs font-medium text-primary">
            Lire
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
