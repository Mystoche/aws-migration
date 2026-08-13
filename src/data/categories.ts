import type { CategoryInfo } from "@/types";

/**
 * Categories used to classify historical events and articles.
 */
export const categories: CategoryInfo[] = [
  {
    id: "politique",
    label: "Politique",
    description: "Gouvernance, régimes, élections, transitions et vie publique.",
    color: "#009543",
    icon: "landmark",
  },
  {
    id: "societe",
    label: "Société",
    description: "Vie quotidienne, mouvements sociaux, transformations sociales.",
    color: "#FBDE4A",
    icon: "users",
  },
  {
    id: "economie",
    label: "Économie",
    description: "Pétrole, infrastructures, commerce et développement.",
    color: "#DC241F",
    icon: "trending-up",
  },
  {
    id: "culture",
    label: "Culture",
    description: "Littérature, musique, arts, peinture et patrimoine.",
    color: "#009543",
    icon: "palette",
  },
  {
    id: "sport",
    label: "Sport",
    description: "Football, athlétisme et grandes compétitions.",
    color: "#FBDE4A",
    icon: "trophy",
  },
  {
    id: "education",
    label: "Éducation",
    description: "Enseignement, universités et recherche.",
    color: "#009543",
    icon: "graduation-cap",
  },
  {
    id: "international",
    label: "International",
    description: "Relations extérieures, Afrique centrale et mondialisation.",
    color: "#DC241F",
    icon: "globe",
  },
];

export const categoryMap: Record<string, CategoryInfo> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
);

export function getCategory(id: string): CategoryInfo | undefined {
  return categoryMap[id];
}
