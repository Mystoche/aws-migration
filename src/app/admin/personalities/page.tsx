'use client'

import { useAdmin } from "@/lib/admin-store";
import { AdminResourceTable, type Column } from "@/components/admin/AdminResourceTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Personality } from "@/types";

const empty: Personality = {
  id: "", slug: "", name: "", role: "", biography: "", status: "draft",
};

export default function AdminPersonalitiesPage() {
  const { personalities, addPersonality, updatePersonality, deletePersonality } = useAdmin();

  const columns: Column<Personality>[] = [
    {
      key: "name",
      header: "Nom",
      render: (p) => (
        <div>
          <p className="font-medium">{p.name}</p>
          {p.role && <p className="line-clamp-1 text-xs text-muted-foreground">{p.role}</p>}
        </div>
      ),
    },
    {
      key: "dates",
      header: "Dates",
      hideOnMobile: true,
      render: (p) => (
        <span className="font-mono text-xs text-muted-foreground">
          {p.birthDate ? new Date(p.birthDate).getFullYear() : "?"} – {p.deathDate ? new Date(p.deathDate).getFullYear() : "…"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      hideOnMobile: true,
      render: (p) => (
        <span className="text-xs">
          {p.status === "needs-verification" ? "À vérifier" : p.status === "draft" ? "Brouillon" : "Publié"}
        </span>
      ),
    },
  ];

  return (
    <AdminResourceTable
      items={personalities}
      columns={columns}
      searchKeys={["name", "role", "biography"]}
      newItem={empty}
      onAdd={addPersonality}
      onUpdate={updatePersonality}
      onDelete={deletePersonality}
      entityLabel="personnalité"
      getPublicUrl={(p) => `/personalities/${p.slug}`}
      renderForm={(item, setItem) => (
        <div className="grid gap-4 py-2">
          <div>
            <Label htmlFor="name">Nom *</Label>
            <Input id="name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="birthDate">Date de naissance</Label>
              <Input id="birthDate" type="date" value={item.birthDate ?? ""} onChange={(e) => setItem({ ...item, birthDate: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="deathDate">Date de décès</Label>
              <Input id="deathDate" type="date" value={item.deathDate ?? ""} onChange={(e) => setItem({ ...item, deathDate: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="role">Rôle</Label>
            <Input id="role" value={item.role ?? ""} onChange={(e) => setItem({ ...item, role: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="birthPlace">Lieu de naissance</Label>
            <Input id="birthPlace" value={item.birthPlace ?? ""} onChange={(e) => setItem({ ...item, birthPlace: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="biography">Biographie</Label>
            <Textarea id="biography" rows={6} value={item.biography} onChange={(e) => setItem({ ...item, biography: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="functions">Fonctions (une par ligne)</Label>
            <Textarea
              id="functions"
              rows={4}
              value={(item.functions ?? []).join("\n")}
              onChange={(e) => setItem({ ...item, functions: e.target.value.split("\n").filter(Boolean) })}
            />
          </div>
        </div>
      )}
    />
  );
}
