'use client'

import { useAdmin } from "@/lib/admin-store";
import { AdminResourceTable, type Column } from "@/components/admin/AdminResourceTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Source, SourceType } from "@/types";

const TYPES: SourceType[] = [
  "livre", "archive", "article", "document-officiel",
  "interview", "site-internet", "photographie", "video",
];

const empty: Source = {
  id: "", type: "livre", title: "", author: "", year: new Date().getFullYear(),
  verified: false, description: "",
};

export default function AdminSourcesPage() {
  const { sources, addSource, updateSource, deleteSource } = useAdmin();

  const columns: Column<Source>[] = [
    {
      key: "title",
      header: "Titre",
      render: (s) => (
        <div>
          <p className="font-medium">{s.title}</p>
          {s.author && <p className="text-xs text-muted-foreground">{s.author}</p>}
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      hideOnMobile: true,
      render: (s) => <Badge variant="outline" className="capitalize">{s.type}</Badge>,
    },
    {
      key: "year",
      header: "Année",
      hideOnMobile: true,
      render: (s) => <span className="font-mono text-xs text-muted-foreground">{s.year ?? "—"}</span>,
    },
    {
      key: "verified",
      header: "Statut",
      render: (s) => (
        s.verified
          ? <Badge className="bg-congo-green/15 text-congo-green">Vérifié</Badge>
          : <Badge className="bg-congo-yellow/30">À vérifier</Badge>
      ),
    },
  ];

  return (
    <AdminResourceTable
      items={sources}
      columns={columns}
      searchKeys={["title", "author", "description"]}
      newItem={empty}
      onAdd={addSource}
      onUpdate={updateSource}
      onDelete={deleteSource}
      entityLabel="source"
      renderForm={(item, setItem) => (
        <div className="grid gap-4 py-2">
          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input id="title" value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={item.type} onValueChange={(v) => setItem({ ...item, type: v as SourceType })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="year">Année</Label>
              <Input id="year" type="number" value={item.year ?? ""} onChange={(e) => setItem({ ...item, year: Number(e.target.value) })} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="author">Auteur</Label>
              <Input id="author" value={item.author ?? ""} onChange={(e) => setItem({ ...item, author: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="publisher">Éditeur</Label>
              <Input id="publisher" value={item.publisher ?? ""} onChange={(e) => setItem({ ...item, publisher: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="url">URL</Label>
            <Input id="url" type="url" value={item.url ?? ""} onChange={(e) => setItem({ ...item, url: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} value={item.description ?? ""} onChange={(e) => setItem({ ...item, description: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={item.verified}
              onChange={(e) => setItem({ ...item, verified: e.target.checked })}
              className="h-4 w-4 rounded border-border"
            />
            Source vérifiée (sinon badge « À vérifier »)
          </label>
        </div>
      )}
    />
  );
}
