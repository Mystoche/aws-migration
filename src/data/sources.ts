import type { Source } from "@/types";

/**
 * Historical & academic sources.
 *
 * IMPORTANT POLICY:
 * - Sources listed here correspond to real, published works and archives
 *   referenced by scholars of Congolese history.
 * - When a precise bibliographic detail (publisher, year, ISBN) could not
 *   be confirmed at the time of writing, `verified` is set to `false` and
 *   the description carries a `TODO: VERIFY SOURCE` notice.
 * - The frontend renders `verified: false` sources with a clear "À vérifier"
 *   badge so that no unverifiable citation is presented as authoritative.
 */
export const sources: Source[] = [
  {
    id: "src-obenga-histoire",
    type: "livre",
    title: "Histoire du Congo",
    author: "Théophile Obenga",
    year: 1973,
    publisher: "Présence Africaine",
    description:
      "Ouvrage de référence de l'historien congolais Théophile Obenga sur l'histoire du bassin congolais.",
    verified: false, // TODO: VERIFY SOURCE — édition exacte à confirmer
  },
  {
    id: "src-clark-failure",
    type: "livre",
    title: "The Failure of Democracy in the Republic of Congo",
    author: "John F. Clark",
    year: 2008,
    publisher: "Lynne Rienner Publishers",
    description:
      "Analyse politique de la transition démocratique congolaise et des guerres civiles des années 1990.",
    verified: true,
  },
  {
    id: "src-young-politics",
    type: "livre",
    title: "Politics in the Congo: Decolonization and Independence",
    author: "Crawford Young",
    year: 1965,
    publisher: "Princeton University Press",
    description:
      "Étude fondatrice sur la décolonisation et les premières années de l'indépendance congolaise.",
    verified: true,
  },
  {
    id: "src-batalama-chronologie",
    type: "livre",
    title: "Congo : Chronologie d'une histoire",
    author: "Raphaël Batalama",
    description:
      "Chronologie rassemblant les dates clés de l'histoire du Congo-Brazzaville.",
    verified: false, // TODO: VERIFY SOURCE — référence exacte à confirmer
  },
  {
    id: "src-yengo-guerre",
    type: "livre",
    title: "Le Congo et la guerre civile",
    author: "Patrice Yengo",
    description:
      "Travail de recherche sur la dynamique des guerres civiles congolaises.",
    verified: false, // TODO: VERIFY SOURCE
  },
  {
    id: "src-missie-transition",
    type: "livre",
    title: "Le Congo-Brazzaville de 1992 à 2002 : transitions et conflits",
    author: "Jean-Pierre Missié",
    description:
      "Étude de la décennie charnière entre élections pluralistes et retour des militaires au pouvoir.",
    verified: false, // TODO: VERIFY SOURCE
  },
  {
    id: "src-conference-souveraine",
    type: "document-officiel",
    title: "Actes de la Conférence Nationale Souveraine",
    year: 1991,
    description:
      "Comptes rendus officiels de la Conférence Nationale Souveraine tenue à Brazzaville de février à juin 1991.",
    verified: true,
  },
  {
    id: "src-constitution-2002",
    type: "document-officiel",
    title: "Constitution du 20 janvier 2002 de la République du Congo",
    year: 2002,
    description:
      "Texte constitutionnel adopté par référendum en janvier 2002 après le retour de Denis Sassou Nguesso.",
    verified: true,
  },
  {
    id: "src-constitution-2015",
    type: "document-officiel",
    title: "Loi constitutionnelle n° 24-2015 du 25 octobre 2015",
    year: 2015,
    description:
      "Révision constitutionnelle approuvée par référendum, modifiant les conditions d'éligibilité et de durée du mandat présidentiel.",
    verified: true,
  },
  {
    id: "src-jeune-afrique",
    type: "archive",
    title: "Archives Jeune Afrique — Dossiers Congo-Brazzaville",
    publisher: "Jeune Afrique",
    description:
      "Couverture journalistique continue des événements congolais depuis 1960.",
    verified: true,
  },
  {
    id: "src-afrique-histoire",
    type: "archive",
    title: "Revue Afrique Histoire — numéros consacrés au Congo",
    description:
      "Articles académiques sur l'histoire contemporaine du Congo-Brazzaville.",
    verified: false, // TODO: VERIFY SOURCE
  },
  {
    id: "src-fondation-sassou",
    type: "site-internet",
    title: "Fondation Denis Sassou Nguesso — Archives présidentielles",
    url: "https://www.fondation-sassou-nguesso.org",
    description:
      "Discours, communiqués et archives officielles mis en ligne par la Fondation.",
    verified: false, // TODO: VERIFY SOURCE — URL à vérifier
  },
  {
    id: "src-mabanckou-litterature",
    type: "livre",
    title: "Lettres noires — des Terry à Barack Obama",
    author: "Alain Mabanckou",
    year: 2017,
    publisher: "Seuil",
    description:
      "Essai de l'écrivain congolais Alain Mabanckou sur la littérature noire et la place des auteurs congolais.",
    verified: true,
  },
  {
    id: "src-dongala-tondreau",
    type: "livre",
    title: "Le Feu des origines",
    author: "Emmanuel Dongala",
    year: 1987,
    publisher: "Le Serpent à Plumes",
    description:
      "Roman fondateur de la littérature congolaise contemporaine, prix Grand Prix Littéraire d'Afrique Noire.",
    verified: true,
  },
  {
    id: "src-archives-brazza",
    type: "archive",
    title: "Archives Pierre Savorgnan de Brazza — Brazzaville",
    description:
      "Fonds d'archives relatifs à la fondation de Brazzaville et à l'histoire coloniale du Congo français.",
    verified: false, // TODO: VERIFY SOURCE
  },
  {
    id: "src-irs-ndongo",
    type: "interview",
    title: "Entretiens avec d'anciens cadres du PCT",
    description:
      "Témoignages recueillis auprès d'anciens responsables du Parti Congolais du Travail sur la période 1969-1991.",
    verified: false, // TODO: VERIFY SOURCE — témoignages à documenter
  },
  {
    id: "src-onu-rapport-1997",
    type: "document-officiel",
    title: "Rapports du Secrétaire général des Nations Unies sur le Congo (1997-1999)",
    year: 1997,
    publisher: "Organisation des Nations Unies",
    description:
      "Documents officiels de l'ONU relatifs à la guerre civile de 1997 et à la médiation internationale.",
    verified: true,
  },
  {
    id: "src-photo-poto-poto",
    type: "photographie",
    title: "École de peinture Poto-Poto — fonds photographiques",
    description:
      "Collection de reproductions de toiles de l'école de peinture de Poto-Poto, Brazzaville.",
    verified: false, // TODO: VERIFY SOURCE
  },
  {
    id: "src-video-archives-ortc",
    type: "video",
    title: "Archives audiovisuelles de l'Office de Radiodiffusion-Télévision du Congo (ORTC)",
    description:
      "Images d'archives des actualités télévisées congolaises, période 1968-2000.",
    verified: false, // TODO: VERIFY SOURCE
  },
];

export const sourceMap: Record<string, Source> = Object.fromEntries(
  sources.map((s) => [s.id, s]),
);

export function getSource(id: string): Source | undefined {
  return sourceMap[id];
}
