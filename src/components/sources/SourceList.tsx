'use client'

import { sourcesService } from "@/services";
import type { Source } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  Book,
  Archive,
  FileText,
  ScrollText,
  Mic,
  Globe,
  Image as ImageIcon,
  Video,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_META: Record<
  Source["type"],
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  livre: { label: "Livre", icon: Book, color: "#009543" },
  archive: { label: "Archive", icon: Archive, color: "#FBDE4A" },
  article: { label: "Article", icon: FileText, color: "#009543" },
  "document-officiel": { label: "Document officiel", icon: ScrollText, color: "#DC241F" },
  interview: { label: "Interview", icon: Mic, color: "#FBDE4A" },
  "site-internet": { label: "Site internet", icon: Globe, color: "#009543" },
  photographie: { label: "Photographie", icon: ImageIcon, color: "#FBDE4A" },
  video: { label: "Vidéo", icon: Video, color: "#DC241F" },
};

interface SourceListProps {
  sourceIds: string[];
  className?: string;
  title?: string;
}

export function SourceList({ sourceIds, className, title = "Sources" }: SourceListProps) {
  const { data: sources = [] } = useQuery({
    queryKey: ["sources", sourceIds],
    queryFn: () => sourcesService.getByIds(sourceIds),
    enabled: sourceIds.length > 0,
  });

  if (sources.length === 0) return null;

  return (
    <section className={cn("space-y-4", className)} aria-labelledby="sources-heading">
      <div className="flex items-center gap-2">
        <span className="h-1 w-8 rounded-full bg-primary" />
        <h3 id="sources-heading" className="font-serif text-xl font-bold">
          {title}
        </h3>
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {sources.length} référence{sources.length > 1 ? "s" : ""}
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {sources.map((source) => {
          const meta = TYPE_META[source.type];
          const Icon = meta.icon;
          return (
            <li
              key={source.id}
              className={cn(
                "group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40",
                !source.verified && "border-l-4 border-l-congo-yellow/70",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white"
                  style={{ backgroundColor: meta.color }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {meta.label}
                    {source.year && ` · ${source.year}`}
                  </p>
                  <h4 className="mt-0.5 text-sm font-semibold leading-snug text-foreground">
                    {source.title}
                  </h4>
                </div>
              </div>

              {(source.author || source.publisher) && (
                <p className="text-xs text-muted-foreground">
                  {[source.author, source.publisher].filter(Boolean).join(" — ")}
                </p>
              )}

              {source.description && (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {source.description}
                </p>
              )}

              {source.url && source.verified && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Consulter <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
