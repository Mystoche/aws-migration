'use client'

import { useAdmin } from "@/lib/admin-store";
import { AdminResourceTable, type Column } from "@/components/admin/AdminResourceTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";
import type { Article, Category } from "@/types";

const empty: Article = {
  id: "", slug: "", title: "", excerpt: "", content: "",
  author: "Rédaction Congo History Cloud",
  publishedAt: new Date().toISOString().slice(0, 10),
  category: "culture", readingTime: 5, status: "draft",
};

export default function AdminArticlesPage() {
  const { articles, addArticle, updateArticle, deleteArticle } = useAdmin();

  const columns: Column<Article>[] = [
    {
      key: "title",
      header: "Titre",
      render: (a) => (
        <div>
          <p className="font-medium">{a.title}</p>
          <p className="line-clamp-1 text-xs text-muted-foreground">{a.excerpt}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Catégorie",
      hideOnMobile: true,
      render: (a) => <span className="text-xs capitalize">{a.category}</span>,
    },
    {
      key: "readingTime",
      header: "Lecture",
      hideOnMobile: true,
      render: (a) => <span className="font-mono text-xs text-muted-foreground">{a.readingTime} min</span>,
    },
  ];

  return (
    <AdminResourceTable
      items={articles}
      columns={columns}
      searchKeys={["title", "excerpt", "content"]}
      newItem={empty}
      onAdd={addArticle}
      onUpdate={updateArticle}
      onDelete={deleteArticle}
      entityLabel="article"
      getPublicUrl={(a) => `/articles/${a.slug}`}
      renderForm={(item, setItem) => (
        <div className="grid gap-4 py-2">
          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input id="title" value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select value={item.category} onValueChange={(v) => setItem({ ...item, category: v as Category })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="readingTime">Lecture (min)</Label>
              <Input id="readingTime" type="number" min={1} value={item.readingTime} onChange={(e) => setItem({ ...item, readingTime: Number(e.target.value) })} />
            </div>
            <div>
              <Label htmlFor="publishedAt">Date</Label>
              <Input id="publishedAt" type="date" value={item.publishedAt} onChange={(e) => setItem({ ...item, publishedAt: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="author">Auteur</Label>
            <Input id="author" value={item.author} onChange={(e) => setItem({ ...item, author: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="excerpt">Résumé</Label>
            <Textarea id="excerpt" rows={2} value={item.excerpt} onChange={(e) => setItem({ ...item, excerpt: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="content">Contenu (markdown)</Label>
            <Textarea id="content" rows={10} value={item.content} onChange={(e) => setItem({ ...item, content: e.target.value })} className="font-mono text-xs" />
            <p className="mt-1 text-xs text-muted-foreground">
              Utilisez <code>## Titre</code> et <code>### Sous-titre</code>. Pour le sommaire, ajoutez <code>{"{#ancre}"}</code> à la fin du titre.
            </p>
          </div>
        </div>
      )}
    />
  );
}
