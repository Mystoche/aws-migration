'use client'

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus, Search, Edit2, Trash2, ExternalLink, Eye, X, Filter,
} from "lucide-react";
import { useAdmin } from "@/lib/admin-store";
import { categories, getCategory } from "@/data/categories";
import { periods } from "@/data/periods";
import type { HistoricalEvent, Category, Period } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const STATUS_LABELS = {
  published: "Publié",
  draft: "Brouillon",
  "needs-verification": "À vérifier",
} as const;

const emptyEvent: HistoricalEvent = {
  id: "", slug: "", title: "", date: `${new Date().getFullYear()}-01-01`,
  year: new Date().getFullYear(), category: "politique", period: "1960-1969",
  summary: "", content: "", status: "draft",
};

export default function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useAdmin();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editing, setEditing] = useState<HistoricalEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (categoryFilter !== "all" && e.category !== categoryFilter) return false;
      return true;
    }).sort((a, b) => a.year - b.year);
  }, [events, search, statusFilter, categoryFilter]);

  const openNew = () => { setEditing({ ...emptyEvent }); setOpen(true); };
  const openEdit = (e: HistoricalEvent) => { setEditing({ ...e }); setOpen(true); };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error("Le titre est obligatoire");
      return;
    }
    const year = new Date(editing.date).getFullYear();
    const patch = { ...editing, year };
    if (editing.id) {
      updateEvent(editing.id, patch);
      toast.success("Événement mis à jour");
    } else {
      addEvent(patch);
      toast.success("Événement créé");
    }
    setOpen(false);
    setEditing(null);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteEvent(deleteId);
      toast.success("Événement supprimé");
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Événements</h1>
          <p className="text-sm text-muted-foreground">{events.length} événements · gérez, créez, modifiez</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Nouvel événement
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher…"
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="published">Publié</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="needs-verification">À vérifier</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Catégorie" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left">
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Année</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Titre</th>
                <th className="hidden px-4 py-3 md:table-cell font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Catégorie</th>
                <th className="hidden px-4 py-3 sm:table-cell font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Statut</th>
                <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((e) => {
                const cat = getCategory(e.category);
                return (
                  <tr key={e.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <span className="display-date font-bold text-primary">{e.year}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{e.title}</p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{e.summary}</p>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      {cat && (
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                          {cat.label}
                        </span>
                      )}
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <StatusBadge status={e.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/events/${e.slug}`} target="_blank" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Voir">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <button onClick={() => openEdit(e)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Modifier">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteId(e.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Supprimer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    Aucun événement trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Modifier l'événement" : "Nouvel événement"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="grid gap-4 py-2">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input id="title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value, year: new Date(e.target.value).getFullYear() })} />
                </div>
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v as Category })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="period">Période</Label>
                  <Select value={editing.period} onValueChange={(v) => setEditing({ ...editing, period: v as Period })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {periods.map((p) => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select value={editing.status ?? "draft"} onValueChange={(v) => setEditing({ ...editing, status: v as HistoricalEvent["status"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="needs-verification">À vérifier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="summary">Résumé</Label>
                <Textarea id="summary" rows={2} value={editing.summary} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="content">Contenu</Label>
                <Textarea id="content" rows={6} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="context">Contexte (optionnel)</Label>
                <Textarea id="context" rows={3} value={editing.context ?? ""} onChange={(e) => setEditing({ ...editing, context: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="consequences">Conséquences (optionnel)</Label>
                <Textarea id="consequences" rows={3} value={editing.consequences ?? ""} onChange={(e) => setEditing({ ...editing, consequences: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="tags">Tags (séparés par virgule)</Label>
                <Input id="tags" value={(editing.tags ?? []).join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={save}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer cet événement ?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Cette action est irréversible (en local). L'événement sera retiré de la liste.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
            <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return <Badge variant="secondary">Publié</Badge>;
  if (status === "published") return <Badge className="bg-congo-green/15 text-congo-green">Publié</Badge>;
  if (status === "draft") return <Badge variant="secondary">Brouillon</Badge>;
  return <Badge className="bg-congo-yellow/30 text-foreground">À vérifier</Badge>;
}
