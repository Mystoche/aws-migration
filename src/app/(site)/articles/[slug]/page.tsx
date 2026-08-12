'use client'

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft, Clock, Calendar, ChevronRight, BookOpen, List,
} from "lucide-react";
import { articlesService } from "@/services";
import { getCategory } from "@/data/categories";
import { SourceList } from "@/components/sources/SourceList";
import { ShareButtons } from "@/components/share/ShareButtons";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";

function formatDateFr(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Renders simple markdown-like content (## / ### headings, paragraphs, {#id} TOC anchors). */
function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3).replace(/\s*\{#([^}]+)\}$/, "");
      const id = trimmed.match(/\{#([^}]+)\}$/)?.[1];
      return (
        <h2 key={i} id={id} className="mt-10 mb-4 scroll-mt-24 font-serif text-2xl font-bold text-foreground">
          {text}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4).replace(/\s*\{#([^}]+)\}$/, "");
      const id = trimmed.match(/\{#([^}]+)\}$/)?.[1];
      return (
        <h3 key={i} id={id} className="mt-6 mb-3 scroll-mt-24 font-serif text-xl font-semibold text-foreground">
          {text}
        </h3>
      );
    }
    if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
      return (
        <p key={i} className="my-4 border-l-2 border-primary/40 bg-primary/5 py-2 pl-4 text-sm italic text-muted-foreground">
          {trimmed.replace(/^\*|\*$/g, "")}
        </p>
      );
    }
    return (
      <p key={i} className="mb-4 text-base leading-relaxed text-foreground/85">
        {trimmed}
      </p>
    );
  });
}

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: article, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => articlesService.getBySlug(slug),
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related-articles", article?.id],
    queryFn: () => (article ? articlesService.getRelated(article.id, 3) : []),
    enabled: !!article,
  });

  const [activeToc, setActiveToc] = useState<string>("");

  useEffect(() => {
    if (!article?.tableOfContents?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveToc(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    article.tableOfContents.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article]);

  if (isLoading) return <LoadingState className="min-h-[60vh]" />;
  if (!article) notFound();

  const category = getCategory(article.category);

  return (
    <article className="bg-background">
      <header className="relative overflow-hidden border-b border-border bg-congo-noir text-white">
        <div className="absolute inset-0 bg-archive-grid opacity-30" />
        <div
          className="absolute -right-32 top-0 h-96 w-96 rounded-full opacity-50 blur-3xl"
          style={{ background: `radial-gradient(circle, ${category?.color ?? "#009543"}80, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {category && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.label}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-white/60">
              <Clock className="h-3 w-3" /> {article.readingTime} min de lecture
            </span>
          </div>
          <h1 className="mt-5 font-serif text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {article.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-congo-yellow" />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDateFr(article.publishedAt)}
            </span>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <ShareButtons title={article.title} />
            <Button asChild variant="outline" size="sm" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/articles">
                <ArrowLeft className="h-4 w-4" /> Tous les articles
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* TOC sidebar */}
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24">
                <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <List className="h-3 w-3" /> Sommaire
                </p>
                <nav className="space-y-1 border-l border-border">
                  {article.tableOfContents.map((t) => (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                        activeToc === t.id
                          ? "border-primary font-medium text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Content */}
          <div className="lg:col-span-9">
            <div className="mb-8 overflow-hidden rounded-2xl border border-border">
              <VisualIdentity
                seed={article.id}
                variant="article"
                aspect="wide"
                className="rounded-none border-0"
              />
            </div>

            <div className="prose-congo max-w-none">
              {renderContent(article.content)}
            </div>

            {/* Sources */}
            {article.sourceIds && article.sourceIds.length > 0 && (
              <div className="mt-12">
                <SourceList sourceIds={article.sourceIds} />
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="mb-6 font-serif text-2xl font-bold">Articles associés</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
