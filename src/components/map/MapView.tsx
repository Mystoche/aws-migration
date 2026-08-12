'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import { useEffect } from "react";
import type { Place } from "@/types";

const congoIcon = L.divIcon({
  className: "congo-marker",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10],
});

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

export function MapView({
  places,
  onSelect,
  flyTo,
}: {
  places: Place[];
  onSelect: (place: Place) => void;
  flyTo: { lat: number; lng: number } | null;
}) {
  const mapRef = (instance: LeafletMap | null) => {
    if (instance && flyTo) {
      instance.flyTo([flyTo.lat, flyTo.lng], 8, { duration: 0.8 });
    }
  };

  return (
    <MapContainer
      center={[-1.5, 15.5]}
      zoom={6}
      minZoom={5}
      maxZoom={12}
      scrollWheelZoom={true}
      className="h-full w-full"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={congoIcon}
          eventHandlers={{ click: () => onSelect(place) }}
        >
          <Popup>
            <div className="min-w-[160px]">
              <p className="font-semibold text-foreground">{place.name}</p>
              {place.region && <p className="text-xs text-muted-foreground">{place.region}</p>}
              <button
                onClick={() => onSelect(place)}
                className="mt-2 text-xs font-medium text-primary hover:underline"
              >
                Voir les détails →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapResizer />
    </MapContainer>
  );
}
