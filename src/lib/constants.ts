export const NAV_LINKS = [
  { href: "/", label: "Histoire" },
  { href: "/timeline", label: "Timeline" },
  { href: "/events", label: "Événements" },
  { href: "/personalities", label: "Personnalités" },
  { href: "/articles", label: "Articles" },
  { href: "/gallery", label: "Galerie" },
  { href: "/map", label: "Carte" },
  { href: "/about", label: "À propos" },
] as const;

export const FOOTER_LINKS = {
  Explorer: [
    { href: "/", label: "Histoire" },
    { href: "/timeline", label: "Timeline" },
    { href: "/events", label: "Événements" },
    { href: "/personalities", label: "Personnalités" },
    { href: "/articles", label: "Articles" },
    { href: "/gallery", label: "Galerie" },
    { href: "/map", label: "Carte" },
  ],
  Ressources: [
    { href: "/search", label: "Recherche" },
    { href: "/about", label: "À propos" },
    { href: "/admin", label: "Administration" },
  ],
} as const;

export const APP_NAME = "Congo History Cloud";
export const APP_SLOGAN = "Racontons l'histoire du Congo à travers le Cloud";
