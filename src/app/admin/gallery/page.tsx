'use client'

import { useState } from "react";
import { Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { useAdmin } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { VisualIdentity } from "@/components/common/VisualIdentity";
import { toast } from "sonner";
import type { GalleryItem } from "@/types";

const CATEGORIES = [
  "Indépendance", "Brazzaville", "Personnalités", "Politique", "Société",
  "Culture", "Sport", "Économie", "Architecture", "Vie quotidienne", "Congo contemporain",
];

export default function AdminGalleryPage() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useAdmin();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>("Toutes");
  const [form, setForm] = useState<GalleryItem>({
    id: "", title: "", description: "", category: "Indépendance",
    year: new Date().getFullYear(), imageUrl: "ident:2024:new",
  });

  const filtered = filter === "Toutes" ? gallery : gallery.filter((g) => g.category === filter);

  const save = () => {
    if (!form.title.trim()) {
      toast.error("Le titre est obligatoire");
      return;
    }
    const imageUrl = form.imageUrl?.startsWith("ident:")
      ? form.imageUrl
      : `ident:${form.year ?? new Date().getFullYear()}:${form.title.slice(0, 12).toLowerCase()}`;
    addGalleryItem({ ...form, imageUrl });
    toast.success("Image ajoutée");
    setOpen(false);
    setForm({ id: "", title: "", description: "", category: "Indépendance", year: new Date().getFullYear(), imageUrl: "ident:2024:new" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Galerie</h1>
          <p className="text-sm text-muted-foreground">{gallery.length} images · upload local simulé</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Ajouter une image
        </Button>
      </div>

      {/* Upload zone (simulated) */}
      <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center">
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">Glissez-déposez vos images ici</p>
        <p className="text-xs text-muted-foreground">
          Upload local simulé. Migration future : <span className="font-mono">Amazon S3 + CloudFront</span>.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setFilter("Toutes")}
          className={`rounded-full px-3 py-1 text-xs font-medium ${filter === "Toutes" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
        >
          Toutes
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => {
          const year = item.imageUrl?.startsWith("ident:")
            ? Number(item.imageUrl.split(":")[1])
            : undefined;
          return (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
              <VisualIdentity
                year={year}
                seed={item.id}
                variant="default"
                aspect="square"
                className="rounded-none border-0"
              />
              <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge>{item.category}</Badge>
                  {item.year && <span className="font-mono text-[10px] text-muted-foreground">{item.year}</span>}
                </div>
                <p className="mt-1 line-clamp-2 text-sm font-medium">{item.title}</p>
              </div>
              <button
                onClick={() => { deleteGalleryItem(item.id); toast.success("Image supprimée"); }}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-congo-noir/70 text-white opacity-0 backdrop-blur transition-opacity hover:bg-destructive group-hover:opacity-100"
                aria-label="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            Aucune image dans cette catégorie.
          </div>
        )}
      </div>

      {/* Add dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nouvelle image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year">Année</Label>
                <Input id="year" type="number" value={form.year ?? ""} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="rounded-lg border border-dashed border-border p-4 text-center">
              <ImageIcon className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-1 text-xs text-muted-foreground">Visuel généré automatiquement (date + couleurs du Congo)</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={save}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[9px] font-semibold uppercase text-muted-foreground">
      {children}
    </span>
  );
}
