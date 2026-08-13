'use client'

import { useState, useMemo, ReactNode } from "react";
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

export interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface AdminResourceTableProps<T extends { id: string }> {
  items: T[];
  columns: Column<T>[];
  searchKeys: (keyof T)[];
  newItem: T;
  onAdd: (item: T) => void;
  onUpdate: (id: string, patch: Partial<T>) => void;
  onDelete: (id: string) => void;
  renderForm: (item: T, setItem: (item: T) => void) => ReactNode;
  getPublicUrl?: (item: T) => string;
  entityLabel?: string;
}

export function AdminResourceTable<T extends { id: string; [k: string]: any }>({
  items, columns, searchKeys, newItem, onAdd, onUpdate, onDelete,
  renderForm, getPublicUrl, entityLabel = "élément",
}: AdminResourceTableProps<T>) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((item) =>
      searchKeys.some((k) => String(item[k] ?? "").toLowerCase().includes(q)),
    );
  }, [items, search, searchKeys]);

  const openNew = () => { setEditing({ ...newItem, id: "" }); setOpen(true); };
  const openEdit = (item: T) => { setEditing({ ...item }); setOpen(true); };

  const save = () => {
    if (!editing) return;
    if (editing.id) {
      onUpdate(editing.id, editing);
    } else {
      onAdd(editing);
    }
    setOpen(false);
    setEditing(null);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">{entityLabel}s</h1>
          <p className="text-sm text-muted-foreground">{items.length} {entityLabel}s</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Nouveau
        </Button>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher…"
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left">
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={`px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground ${c.hideOnMobile ? "hidden md:table-cell" : ""} ${c.className ?? ""}`}
                  >
                    {c.header}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30">
                  {columns.map((c) => (
                    <td key={c.key} className={`px-4 py-3 ${c.hideOnMobile ? "hidden md:table-cell" : ""} ${c.className ?? ""}`}>
                      {c.render(item)}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {getPublicUrl && (
                        <a href={getPublicUrl(item)} target="_blank" rel="noopener noreferrer" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Voir">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <button onClick={() => openEdit(item)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Modifier">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    Aucun {entityLabel} trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? `Modifier ${entityLabel}` : `Nouveau ${entityLabel}`}</DialogTitle>
          </DialogHeader>
          {editing && renderForm(editing, setEditing)}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={save}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer cet {entityLabel} ?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Action irréversible (en local).</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Annuler</Button>
            <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
