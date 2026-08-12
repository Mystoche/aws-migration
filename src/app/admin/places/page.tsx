'use client'

import { useAdmin } from "@/lib/admin-store";
import { AdminResourceTable, type Column } from "@/components/admin/AdminResourceTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Place } from "@/types";

const empty: Place = {
  id: "", slug: "", name: "", lat: 0, lng: 0, description: "", region: "",
};

export default function AdminPlacesPage() {
  const { places, addPlace, updatePlace, deletePlace } = useAdmin();

  const columns: Column<Place>[] = [
    {
      key: "name",
      header: "Nom",
      render: (p) => (
        <div>
          <p className="font-medium">{p.name}</p>
          {p.region && <p className="text-xs text-muted-foreground">{p.region}</p>}
        </div>
      ),
    },
    {
      key: "coords",
      header: "Coordonnées",
      hideOnMobile: true,
      render: (p) => (
        <span className="font-mono text-xs text-muted-foreground">
          {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
        </span>
      ),
    },
    {
      key: "events",
      header: "Événements",
      hideOnMobile: true,
      render: (p) => <span className="font-mono text-xs text-muted-foreground">{p.eventIds?.length ?? 0}</span>,
    },
  ];

  return (
    <AdminResourceTable
      items={places}
      columns={columns}
      searchKeys={["name", "region", "description"]}
      newItem={empty}
      onAdd={addPlace}
      onUpdate={updatePlace}
      onDelete={deletePlace}
      entityLabel="lieu"
      getPublicUrl={() => "/map"}
      renderForm={(item, setItem) => (
        <div className="grid gap-4 py-2">
          <div>
            <Label htmlFor="name">Nom *</Label>
            <Input id="name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="region">Région</Label>
            <Input id="region" value={item.region ?? ""} onChange={(e) => setItem({ ...item, region: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="lat">Latitude</Label>
              <Input id="lat" type="number" step="0.0001" value={item.lat} onChange={(e) => setItem({ ...item, lat: Number(e.target.value) })} />
            </div>
            <div>
              <Label htmlFor="lng">Longitude</Label>
              <Input id="lng" type="number" step="0.0001" value={item.lng} onChange={(e) => setItem({ ...item, lng: Number(e.target.value) })} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="population">Population</Label>
              <Input id="population" value={item.population ?? ""} onChange={(e) => setItem({ ...item, population: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="founded">Fondation</Label>
              <Input id="founded" value={item.founded ?? ""} onChange={(e) => setItem({ ...item, founded: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={5} value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
          </div>
        </div>
      )}
    />
  );
}
