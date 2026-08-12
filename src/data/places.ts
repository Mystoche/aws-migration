import type { Place } from "@/types";

/**
 * Geographic places of historical significance in the Republic of Congo.
 * Coordinates are approximate city-center coordinates (WGS84).
 */
export const places: Place[] = [
  {
    id: "place-brazzaville",
    slug: "brazzaville",
    name: "Brazzaville",
    region: "Pool",
    lat: -4.2634,
    lng: 15.2429,
    description:
      "Capitale politique de la République du Congo, fondée en 1880 par Pierre Savorgnan de Brazza sur la rive droite du fleuve Congo. Siège des grandes institutions, théâtre des Trois Glorieuses (1963), de la Conférence Nationale Souveraine (1991) et des guerres civiles de 1993 et 1997.",
    population: "~1,8 million (agglomération)",
    founded: "1880",
    eventIds: [
      "evt-independance-1960",
      "evt-trois-glorieuses-1963",
      "evt-republique-populaire-1969",
      "evt-conference-souveraine-1991",
      "evt-guerre-civile-1997",
    ],
    personalityIds: [
      "p-youlou",
      "p-massamba-debat",
      "p-ngouabi",
      "p-sassou-nguesso",
      "p-lissouba",
      "p-kolelas",
    ],
  },
  {
    id: "place-pointe-noire",
    slug: "pointe-noire",
    name: "Pointe-Noire",
    region: "Kouilou / Pointe-Noire",
    lat: -4.7964,
    lng: 11.8639,
    description:
      "Capitale économique du Congo et premier port en eau profonde d'Afrique centrale. Carrefour du chemin de fer Congo-Océan et point de départ des exportations pétrolières. Le port a été aménagé dès les années 1930 et considérablement modernisé après l'indépendance.",
    population: "~715 000",
    founded: "1922",
    eventIds: ["evt-congo-ocean", "evt-hypermaritime", "evt-mpengi-1981"],
    personalityIds: [],
  },
  {
    id: "place-dolisie",
    slug: "dolisie",
    name: "Dolisie",
    region: "Niari",
    lat: -4.2003,
    lng: 12.669,
    description:
      "Troisième ville du Congo, nœud ferroviaire stratégique sur la ligne Congo-Océan. Anciennement Fort-Desaix sous la colonisation, elle fut rebaptisée Dolisie en 1974 en hommage à Albert Dolisie, administrateur colonial.",
    population: "~83 000",
    founded: "1887",
    eventIds: ["evt-congo-ocean"],
    personalityIds: [],
  },
  {
    id: "place-nkayi",
    slug: "nkayi",
    name: "Nkayi",
    region: "Bouenza",
    lat: -4.1714,
    lng: 13.2831,
    description:
      "Cité industrielle du sud du Congo, siège de la sucrerie de Saris-Ngangas et de plusieurs unités agro-industrielles. Anciennement Jacob, rebaptisée Nkayi après l'indépendance.",
    population: "~71 000",
    founded: "1909",
    eventIds: [],
    personalityIds: [],
  },
  {
    id: "place-ouesso",
    slug: "ouesso",
    name: "Ouesso",
    region: "Sangha",
    lat: 1.6167,
    lng: 16.05,
    description:
      "Chef-lieu de la région de la Sangha, au nord du pays, au cœur de la grande forêt équatoriale. Carrefour du bois et porte d'entrée des parcs nationaux du Nord (Nouabalé-Ndoki, Odzala).",
    population: "~46 000",
    founded: "1890",
    eventIds: [],
    personalityIds: [],
  },
  {
    id: "place-owando",
    slug: "owando",
    name: "Owando",
    region: "Cuvette",
    lat: -0.4833,
    lng: 15.9,
    description:
      "Chef-lieu de la région de la Cuvette, région natale de plusieurs dirigeants congolais, dont Marien Ngouabi. Anciennement Fort-Rousset, rebaptisée Owando en 1975.",
    population: "~31 000",
    founded: "1902",
    eventIds: ["evt-ngouabi-assassinat-1977"],
    personalityIds: ["p-ngouabi"],
  },
  {
    id: "place-oyo",
    slug: "oyo",
    name: "Oyo",
    region: "Cuvette",
    lat: -0.9833,
    lng: 16.3167,
    description:
      "Petite ville de la Cuvette devenue un pôle administratif moderne dans les années 2000, avec la construction d'infrastructures publiques et d'un complexe aéroportuaire de classe internationale.",
    population: "~10 000",
    founded: "XXe siècle",
    eventIds: ["evt-modernisation-infrastructures-2010s"],
    personalityIds: ["p-sassou-nguesso"],
  },
  {
    id: "place-loango",
    slug: "loango",
    name: "Loango",
    region: "Kouilou",
    lat: -4.6428,
    lng: 12.0167,
    description:
      "Site historique du royaume de Loango, grand royaume commerçant pré-colonial qui dominait la côte atlantique. Voisine de Pointe-Noire, la localité conserve des traces de l'ancien comptoir colonial.",
    founded: "XVe siècle",
    eventIds: [],
    personalityIds: [],
  },
  {
    id: "place-impfondo",
    slug: "impfondo",
    name: "Impfondo",
    region: "Likouala",
    lat: 1.6167,
    lng: 18.0667,
    description:
      "Chef-lieu de la Likouala, extrême nord-est du Congo, sur le fleuve Oubangui. Zone frontalière avec la RDC et la RCA, ouverte sur le bassin du Congo.",
    population: "~23 000",
    founded: "1898",
    eventIds: [],
    personalityIds: [],
  },
  {
    id: "place-pool",
    slug: "region-pool",
    name: "Région du Pool",
    region: "Pool",
    lat: -4.0,
    lng: 15.3,
    description:
      "Région périphérique de Brazzaville, fief historique de la milice Cobra et du pasteur Ntoumi. Théâtre des affrontements de la guerre civile de 1997 puis de la rébellion du Pool (2016-2017).",
    eventIds: ["evt-guerre-civile-1997", "evt-rebellion-pool-2016"],
    personalityIds: ["p-kolelas"],
  },
];

export const placeMap: Record<string, Place> = Object.fromEntries(
  places.map((p) => [p.id, p]),
);

export function getPlace(id: string): Place | undefined {
  return placeMap[id];
}
