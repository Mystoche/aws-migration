import type { GalleryItem } from "@/types";

/**
 * Gallery items. For this local version, images are referenced via deterministic
 * gradient "visual identity" SVGs generated on the client (no external image
 * dependency). They can be replaced later by S3-hosted media.
 *
 * Each item carries meaningful metadata so the gallery remains informative
 * even before real photographs are integrated.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "g-01",
    title: "Proclamation de l'indépendance, 15 août 1960",
    description:
      "Cérémonie officielle de transfert de souveraineté à Brazzaville. Fulbert Youlou devient chef d'État.",
    category: "Indépendance",
    year: 1960,
    imageUrl: "ident:1960:independance",
    placeId: "place-brazzaville",
    tags: ["indépendance", "Youlou", "Brazzaville"],
  },
  {
    id: "g-02",
    title: "Les Trois Glorieuses, août 1963",
    description: "Manifestations populaires à Brazzaville, chute de Youlou.",
    category: "Indépendance",
    year: 1963,
    imageUrl: "ident:1963:trois-glorieuses",
    placeId: "place-brazzaville",
    tags: ["Trois Glorieuses", "révolution"],
  },
  {
    id: "g-03",
    title: "Marien Ngouabi, fondateur de la République populaire",
    description:
      "Portrait symbolique du président Marien Ngouabi (1969-1977).",
    category: "Personnalités",
    year: 1970,
    imageUrl: "ident:1970:ngouabi",
    tags: ["Ngouabi", "PCT", "République populaire"],
  },
  {
    id: "g-04",
    title: "Drapeau de la République populaire du Congo",
    description:
      "Drapeau rouge frappé du marteau et de la houe, en vigueur de 1970 à 1991.",
    category: "Politique",
    year: 1970,
    imageUrl: "ident:1970:drapeau-rp",
    tags: ["drapeau", "marxisme-léninisme"],
  },
  {
    id: "g-05",
    title: "Victoire à la CAN 1972",
    description:
      "Les Diables Rouges remportent la Coupe d'Afrique des Nations au Cameroun, battant le Mali 3-2.",
    category: "Sport",
    year: 1972,
    imageUrl: "ident:1972:can",
    tags: ["football", "Diables Rouges", "CAN"],
  },
  {
    id: "g-06",
    title: "Henri Lopes, Premier ministre",
    description:
      "L'écrivain Henri Lopes dirige le gouvernement congolais entre 1973 et 1975.",
    category: "Personnalités",
    year: 1973,
    imageUrl: "ident:1973:lopes",
    tags: ["Lopes", "littérature", "Premier ministre"],
  },
  {
    id: "g-07",
    title: "Port de Pointe-Noire",
    description:
      "Le port en eau profonde de Pointe-Noire, poumon économique du Congo.",
    category: "Économie",
    year: 1975,
    imageUrl: "ident:1975:port",
    placeId: "place-pointe-noire",
    tags: ["port", "Pointe-Noire", "économie"],
  },
  {
    id: "g-08",
    title: "Chez Les Bantous de la Capitale",
    description:
      "L'orchestre mythique de Brazzaville en répétition. Rumba congolaise depuis 1959.",
    category: "Culture",
    year: 1976,
    imageUrl: "ident:1976:bantous",
    placeId: "place-brazzaville",
    tags: ["musique", "Bantous", "rumba"],
  },
  {
    id: "g-09",
    title: "École de peinture Poto-Poto",
    description:
      "Toile de l'école de peinture de Poto-Poto, Brazzaville, fondée en 1951.",
    category: "Culture",
    year: 1980,
    imageUrl: "ident:1980:poto-poto",
    placeId: "place-brazzaville",
    tags: ["peinture", "Poto-Poto", "art"],
  },
  {
    id: "g-10",
    title: "Conférence Nationale Souveraine, 1991",
    description:
      "Palais du Peuple, Brazzaville. 1 200 délégués réunis de février à juin 1991.",
    category: "Politique",
    year: 1991,
    imageUrl: "ident:1991:conference",
    placeId: "place-brazzaville",
    tags: ["CNS", "démocratie", "Kombo", "Milongo"],
  },
  {
    id: "g-11",
    title: "Pascal Lissouba, premier président élu",
    description: "Élu en août 1992, il est renversé par la guerre civile en 1997.",
    category: "Personnalités",
    year: 1992,
    imageUrl: "ident:1992:lissouba",
    tags: ["Lissouba", "UPADS", "élections"],
  },
  {
    id: "g-12",
    title: "Brazzaville en guerre, 1997",
    description:
      "Quatre mois de combats opposant les milices Cobras, Cocoyes et Ninjas.",
    category: "Politique",
    year: 1997,
    imageUrl: "ident:1997:guerre",
    placeId: "place-brazzaville",
    tags: ["guerre civile", "Cobras", "Ninjas", "Cocoyes"],
  },
  {
    id: "g-13",
    title: "Denis Sassou Nguesso, retour au pouvoir",
    description:
      "Président de la République du Congo depuis octobre 1997 (et précédemment 1979-1992).",
    category: "Personnalités",
    year: 1997,
    imageUrl: "ident:1997:sassou",
    tags: ["Sassou Nguesso", "président"],
  },
  {
    id: "g-14",
    title: "Alain Mabanckou, prix Renaudot 2006",
    description:
      "L'écrivain congolais reçoit le Prix Renaudot pour « Mémoires de porc-épic ».",
    category: "Culture",
    year: 2006,
    imageUrl: "ident:2006:mabanckou",
    tags: ["littérature", "Mabanckou", "Renaudot"],
  },
  {
    id: "g-15",
    title: "Cinquantenaire de l'indépendance, 2010",
    description: "Sommet franco-africain et festivités nationales à Brazzaville.",
    category: "Indépendance",
    year: 2010,
    imageUrl: "ident:2010:cinquantenaire",
    placeId: "place-brazzaville",
    tags: ["cinquantenaire", "fête nationale"],
  },
  {
    id: "g-16",
    title: "Route nationale 1 Brazzaville-Pointe-Noire",
    description:
      "Achèvement de la RN1 bitumée reliant la capitale à la ville-port.",
    category: "Architecture",
    year: 2014,
    imageUrl: "ident:2014:rn1",
    tags: ["RN1", "infrastructure", "route"],
  },
  {
    id: "g-17",
    title: "Référendum constitutionnel, 25 octobre 2015",
    description:
      "La révision de la Constitution supprime les limites d'âge et de mandats.",
    category: "Politique",
    year: 2015,
    imageUrl: "ident:2015:referendum",
    placeId: "place-brazzaville",
    tags: ["référendum", "Constitution"],
  },
  {
    id: "g-18",
    title: "Rébellion du Pool, 2016-2017",
    description:
      "Combats entre l'armée et les Ninjas Nsilulu du pasteur Ntoumi.",
    category: "Politique",
    year: 2016,
    imageUrl: "ident:2016:pool",
    placeId: "place-pool",
    tags: ["Pool", "Ninjas", "Pasteur Ntoumi"],
  },
  {
    id: "g-19",
    title: "Réélection de 2021",
    description:
      "Denis Sassou Nguesso réélu au premier tour en pleine pandémie de Covid-19.",
    category: "Politique",
    year: 2021,
    imageUrl: "ident:2021:reelection",
    placeId: "place-brazzaville",
    tags: ["élection", "2021", "Covid-19"],
  },
  {
    id: "g-20",
    title: "Fleuve Congo, artère vitale",
    description:
      "Le second plus grand fleuve d'Afrique, lien historique entre Brazzaville et Kinshasa.",
    category: "Vie quotidienne",
    year: 2023,
    imageUrl: "ident:2023:fleuve",
    tags: ["fleuve", "Pool Malebo", "Kinshasa"],
  },
];

export const galleryCategories: string[] = Array.from(
  new Set(galleryItems.map((i) => i.category)),
).sort();
