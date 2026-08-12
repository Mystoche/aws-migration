import type { Personality } from "@/types";

/**
 * Congolese personalities — political, intellectual, artistic and religious
 * figures central to the history of the Republic of Congo.
 *
 * FACT POLICY:
 * - Biographical facts (names, dates, roles) correspond to widely documented
 *   elements of these public figures' lives.
 * - Any element requiring additional verification is flagged with
 *   `status: "needs-verification"` and a `TODO: VERIFY SOURCE` note.
 */
export const personalities: Personality[] = [
  {
    id: "p-youlou",
    slug: "fulbert-youlou",
    name: "Fulbert Youlou",
    birthDate: "1917-06-09",
    deathDate: "1972-05-06",
    birthPlace: "Madibou (Pool)",
    role: "Premier président de la République du Congo (1960-1963)",
    functions: [
      "Prêtre catholique (ordré en 1946)",
      "Fondateur de l'UDDIA (1956)",
      "Premier ministre (1960)",
      "Président de la République (1961-1963)",
    ],
    biography:
      "Fulbert Youlou est le premier chef d'État du Congo indépendant. Prêtre catholique entré en politique, il fonde l'Union Démocratique pour la Défense des Intérêts Africains (UDDIA) en 1956 et accède à la mairie de Brazzaville puis à la direction du gouvernement. Élu président en 1961, il est renversé par les Trois Glorieuses d'août 1963 et s'exile en France où il meurt en 1972.",
    eventIds: ["evt-independance-1960", "evt-trois-glorieuses-1963"],
    sourceIds: ["src-young-politics", "src-obenga-histoire"],
    tags: ["président", "UDDIA", "indépendance", "Trois Glorieuses"],
    status: "published",
  },
  {
    id: "p-massamba-debat",
    slug: "alphonse-massamba-debat",
    name: "Alphonse Massamba-Débat",
    birthDate: "1921-08-04",
    deathDate: "1977-03-25",
    birthPlace: "Nkolo (Pool)",
    role: "Président de la République (1963-1968)",
    functions: [
      "Instituteur",
      "Ministre de l'Éducation nationale (1960-1963)",
      "Président de la République et du Conseil (1963-1968)",
      "Fondateur du MNR (1964)",
    ],
    biography:
      "Alphonse Massamba-Débat prend la direction du Congo après les Trois Glorieuses d'août 1963. Il instaure le MNR comme parti unique en 1964 et engage le pays dans la voie du « socialisme scientifique ». Renversé par Marien Ngouabi en août 1968, il est placé en résidence surveillée. Accusé de complicité dans l'assassinat de Ngouabi en mars 1977, il est exécuté peu après.",
    eventIds: ["evt-trois-glorieuses-1963", "evt-mnr-parti-unique-1964", "evt-ngouabi-assassinat-1977"],
    sourceIds: ["src-obenga-histoire", "src-clark-failure"],
    tags: ["président", "MNR", "socialisme", "Trois Glorieuses"],
    status: "published",
  },
  {
    id: "p-ngouabi",
    slug: "marien-ngouabi",
    name: "Marien Ngouabi",
    birthDate: "1938-12-31",
    deathDate: "1977-03-18",
    birthPlace: "Owando (Cuvette)",
    role: "Président de la République populaire du Congo (1969-1977)",
    functions: [
      "Capitaine de l'armée congolaise",
      "Président du Conseil National de la Révolution (1968-1969)",
      "Président de la République populaire du Congo (1969-1977)",
      "Président du Parti Congolais du Travail (PCT)",
    ],
    biography:
      "Marien Ngouabi, officier originaire de la Cuvette, prend le pouvoir en août 1968 et proclame la République populaire du Congo en décembre 1969. Il fait du Congo le premier État d'Afrique subsaharienne ouvertement marxiste-léniniste. Son régime s'aligne sur le bloc soviétique et développe une coopération active avec Cuba, l'URSS et la Chine. Assassiné le 18 mars 1977, il reste une figure très controversée de l'histoire congolaise.",
    eventIds: [
      "evt-coup-ngouabi-1968",
      "evt-republique-populaire-1969",
      "evt-ngouabi-assassinat-1977",
    ],
    sourceIds: ["src-obenga-histoire", "src-clark-failure"],
    tags: ["président", "PCT", "marxisme-léninisme", "Cuvette"],
    status: "published",
  },
  {
    id: "p-yhombi-opango",
    slug: "joachim-yhombi-opango",
    name: "Joachim Yhombi-Opango",
    birthDate: "1939-01-12",
    deathDate: "2020-03-30",
    birthPlace: "Owando (Cuvette)",
    role: "Président de la République (1977-1979)",
    functions: [
      "Colonel de l'armée congolaise",
      "Président du Comité Militaire du Parti (1977-1979)",
      "Chef de l'État (1977-1979)",
    ],
    biography:
      "Joachim Yhombi-Opango prend la tête du Congo après l'assassinat de Marien Ngouabi en mars 1977. Il dirige le Comité Militaire du Parti pendant 22 mois, avant d'être écarté par Denis Sassou Nguesso le 5 février 1979. Arrêté puis libéré, il revient dans le jeu politique au début des années 1990 et soutient Pascal Lissouba pendant la transition démocratique. Il meurt à Paris en mars 2020, des suites du Covid-19.",
    eventIds: ["evt-ngouabi-assassinat-1977", "evt-sassou-pouvoir-1979"],
    sourceIds: ["src-clark-failure", "src-jeune-afrique"],
    tags: ["président", "Comité Militaire", "Cuvette"],
    status: "published",
  },
  {
    id: "p-sassou-nguesso",
    slug: "denis-sassou-nguesso",
    name: "Denis Sassou Nguesso",
    birthDate: "1943-11-23",
    birthPlace: "Edou (Oyo, Cuvette)",
    role: "Président de la République (1979-1992, puis depuis 1997)",
    functions: [
      "Colonel de l'armée congolaise",
      "Ministre de la Défense (années 1970)",
      "Président de la République populaire du Congo (1979-1992)",
      "Président de la République du Congo (1997-présent)",
      "Président de l'Union africaine (2006-2007)",
      "Président tournant de la CEMAC et de la CEEAC à plusieurs reprises",
    ],
    biography:
      "Denis Sassou Nguesso arrive au pouvoir le 5 février 1979 en écartant Yhombi-Opango. Il dirige la République populaire jusqu'en 1992, lorsqu'il accepte l'organisation de la Conférence Nationale Souveraine et perd l'élection présidentielle face à Pascal Lissouba. Chassé du pouvoir, il revient par les armes en octobre 1997 avec l'appui de l'Angola. Réélu en 2002, 2009, 2016 et 2021 — après la révision constitutionnelle de 2015 qui a supprimé les limites d'âge et de mandats — il est l'un des chefs d'État africains les plus longeves au pouvoir.",
    eventIds: [
      "evt-sassou-pouvoir-1979",
      "evt-conference-souveraine-1991",
      "evt-elections-1992",
      "evt-guerre-civile-1997",
      "evt-constitution-2002",
      "evt-cinquantenaire-2010",
      "evt-referendum-2015",
      "evt-rebellion-pool-2016",
      "evt-reelection-2021",
      "evt-modernisation-infrastructures-2010s",
    ],
    sourceIds: ["src-clark-failure", "src-jeune-afrique", "src-missie-transition"],
    tags: ["président", "PCT", "Cobras", "Cuvette", "Oyo"],
    status: "published",
  },
  {
    id: "p-lissouba",
    slug: "pascal-lissouba",
    name: "Pascal Lissouba",
    birthDate: "1931-11-15",
    deathDate: "2020-08-24",
    birthPlace: "Nkayi (Bouenza)",
    role: "Président de la République (1992-1997)",
    functions: [
      "Agronome de formation",
      "Premier ministre (1963-1966)",
      "Directeur général de la Société Congolaise de Raffinage (Coraf)",
      "Président de l'UPADS",
      "Président de la République (1992-1997)",
    ],
    biography:
      "Pascal Lissouba est le premier président démocratiquement élu du Congo en août 1992. Son mandat est marqué par l'instabilité politique, des violences miliciennes en 1993-1994 et la guerre civile de 1997 qui l'évince au profit de Sassou Nguesso. Réfugié à Londres, il est condamné par contumace pour haute trahison en 2001. Il meurt en exil en août 2020.",
    eventIds: [
      "evt-conference-souveraine-1991",
      "evt-elections-1992",
      "evt-guerre-civile-1997",
    ],
    sourceIds: ["src-clark-failure", "src-missie-transition"],
    tags: ["président", "UPADS", "1992", "exil"],
    status: "published",
  },
  {
    id: "p-kolelas",
    slug: "bernard-kolelas",
    name: "Bernard Kolélas",
    birthDate: "1930-09-12",
    deathDate: "2020-11-13",
    birthPlace: "Brazzaville",
    role: "Opposant, maire de Brazzaville, Premier ministre (1997)",
    functions: [
      "Fondateur du MCDDI",
      "Maire de Brazzaville (années 1990)",
      "Premier ministre de Pascal Lissouba (septembre-octobre 1997)",
      "Pasteur évangélique",
    ],
    biography:
      "Bernard Kolélas, chef de file du sud de Brazzaville et de la communauté Lari, est le fondateur du Mouvement Congolais pour la Démocratie et le Développement Intégral (MCDDI). Ses milices « Ninjas » s'opposent aux Cocoyes de Lissouba puis aux Cobras de Sassou Nguesso. Nommé Premier ministre par Lissouba au plus fort de la guerre de 1997, il s'exile après la chute de Brazzaville. Amnistié en 2005, il rentrera au Congo mais restera en marge du pouvoir. Il meurt en novembre 2020.",
    eventIds: ["evt-elections-1992", "evt-guerre-civile-1997", "evt-rebellion-pool-2016"],
    sourceIds: ["src-clark-failure", "src-missie-transition"],
    tags: ["MCDDI", "Ninjas", "Lari", "Brazzaville", "Pasteur"],
    status: "published",
  },
  {
    id: "p-milongo",
    slug: "andre-milongo",
    name: "André Milongo",
    birthDate: "1935-11-20",
    deathDate: "2007-07-22",
    birthPlace: "Mbanza-Ndounga (Pool)",
    role: "Premier ministre de la transition démocratique (1991-1992)",
    functions: [
      "Haut fonctionnaire international",
      "Cadre à la BEAC puis à la BDEAC",
      "Premier ministre de la transition (1991-1992)",
      "Président de l'Union pour la Démocratie et la République (UDR)",
    ],
    biography:
      "André Milongo est nommé Premier ministre de la transition démocratique par la Conférence Nationale Souveraine de 1991. Il organise les premières élections pluralistes de 1992 et supervise le désengagement du parti unique. Figure respectée de la transition, il se présente à l'élection présidentielle de 1992 sans succès. Il reste une voix écoutée de la vie publique congolaise jusqu'à son décès en 2007.",
    eventIds: ["evt-conference-souveraine-1991", "evt-elections-1992"],
    sourceIds: ["src-conference-souveraine", "src-clark-failure"],
    tags: ["transition", "Premier ministre", "CNS", "UDR"],
    status: "published",
  },
  {
    id: "p-lopes",
    slug: "henri-lopes",
    name: "Henri Lopes",
    birthDate: "1937-09-12",
    deathDate: "2023-12-02",
    birthPlace: "Léopoldville (Kinshasa)",
    role: "Écrivain, journaliste, diplomate et homme d'État",
    functions: [
      "Journaliste à Jeune Afrique",
      "Directeur de la Radiodiffusion-Télévision Congolaise (RTC)",
      "Premier ministre (1973-1975)",
      "Directeur général adjoint de l'UNESCO (1982-1998)",
      "Ambassadeur du Congo en France (1998-2015)",
    ],
    biography:
      "Henri Lopes est l'une des figures majeures de la littérature congolaise et africaine. Auteur de « Tribaliques » (Grand Prix Littéraire d'Afrique Noire en 1972), « Le Lycéen » et « Le Chercheur d'Afriques », il mène en parallèle une brillante carrière de journaliste, de haut fonctionnaire international et de diplomate. Premier ministre de 1973 à 1975, puis directeur adjoint de l'UNESCO, il est ambassadeur du Congo en France de 1998 à 2015. Il meurt à Suresnes en décembre 2023.",
    eventIds: ["evt-lopes-premier-ministre-1973"],
    sourceIds: ["src-mabanckou-litterature"],
    tags: ["littérature", "UNESCO", "Premier ministre", "Tribaliques"],
    status: "published",
  },
  {
    id: "p-mabanckou",
    slug: "alain-mabanckou",
    name: "Alain Mabanckou",
    birthDate: "1966-02-24",
    birthPlace: "Brazzaville",
    role: "Écrivain, professeur de littérature francophone",
    functions: [
      "Professeur à l'Université de Californie, Los Angeles (UCLA)",
      "Membre de l'Académie française (élu en 2024)",
      "Auteur de « Verre cassé », « Mémoires de porc-épic », « Black Bazar »",
      "Prix Renaudot 2006 pour « Mémoires de porc-épic »",
    ],
    biography:
      "Né à Brazzaville en 1966, Alain Mabanckou est l'un des écrivains francophones les plus lus dans le monde. Après des études de droit à Brazzaville puis à Paris, il se consacre à l'écriture. Ses romans (« Bleu-Blanc-Rouge », « Verre cassé », « Mémoires de porc-épic » Prix Renaudot 2006) explorent la mémoire congolaise, l'exil et la condition africaine contemporaine. Professeur de littérature à UCLA, il est élu à l'Académie française en mars 2024, devenant le premier Congolais à siéger sous la Coupole.",
    eventIds: [],
    sourceIds: ["src-mabanckou-litterature", "src-dongala-tondreau"],
    tags: ["littérature", "Prix Renaudot", "UCLA", "Académie française"],
    status: "published",
  },
  {
    id: "p-dongala",
    slug: "emmanuel-dongala",
    name: "Emmanuel Dongala",
    birthDate: "1941-07-14",
    birthPlace: "Brazzaville",
    role: "Romancier, chimiste et universitaire",
    functions: [
      "Docteur en chimie",
      "Doyen de la Faculté des sciences de Brazzaville",
      "Fondateur du théâtre de l'Éclair à Brazzaville",
      "Professeur à Bard College (États-Unis)",
      "Auteur du « Feu des origines » et de « Johnny chien méchant »",
    ],
    biography:
      "Emmanuel Dongala est l'une des grandes voix de la littérature congolaise. Chimiste de formation, il dirige la Faculté des sciences de Brazzaville et fonde le théâtre de l'Éclair. « Le Feu des origines » (1987), qui reçoit le Grand Prix Littéraire d'Afrique Noire, mêle mythe et histoire du bassin congolais. Contraint à l'exil pendant la guerre civile de 1997, il enseigne la littérature africaine à Bard College (New York) et poursuit son œuvre (« Johnny chien méchant », « La Photo de mariage »).",
    eventIds: ["evt-guerre-civile-1997"],
    sourceIds: ["src-dongala-tondreau", "src-mabanckou-litterature"],
    tags: ["littérature", "théâtre", "Bard College", "Feu des origines"],
    status: "published",
  },
  {
    id: "p-opangault",
    slug: "jacques-opangault",
    name: "Jacques Opangault",
    birthDate: "1907-12-13",
    deathDate: "1978-03-13",
    birthPlace: "Brazzaville",
    role: "Homme politique pré-indépendance",
    functions: [
      "Fondateur du MSA (Mouvement Socialiste Africain)",
      "Premier vice-président du gouvernement autonome (1958)",
      "Figure de l'élection municipale de 1956 à Brazzaville",
    ],
    biography:
      "Jacques Opangault, ancien commis de l'administration coloniale, fonde le Mouvement Socialiste Africain (MSA) et s'impose comme un rival de Fulbert Youlou. L'élection municipale de Brazzaville de 1956, qui oppose leurs deux camps, déclenche des violences intercommunautaires. Réconcilié avec Youlou à l'indépendance, il devient vice-président puis ministre dans les premiers gouvernements congolais.",
    eventIds: ["evt-independance-1960"],
    sourceIds: ["src-young-politics", "src-obenga-histoire"],
    tags: ["MSA", "élection 1956", "vice-président"],
    status: "needs-verification",
  },
  {
    id: "p-kombo",
    slug: "monseigneur-ernest-kombo",
    name: "Mgr Ernest Kombo",
    birthDate: "1941-01-10",
    deathDate: "2008-10-09",
    birthPlace: "Brazzaville",
    role: "Archevêque de Brazzaville, président de la Conférence Nationale Souveraine (1991)",
    functions: [
      "Prêtre catholique ordonné en 1970",
      "Évêque d'Owando (1990)",
      "Archevêque de Brazzaville (2001-2008)",
      "Président de la Conférence épiscopale du Congo",
      "Président de la Conférence Nationale Souveraine (1991)",
    ],
    biography:
      "Mgr Ernest Kombo préside la Conférence Nationale Souveraine de 1991, jouant un rôle d'arbitre moral dans la transition démocratique. Sa stature d'homme d'Église lui permet de tenir ensemble les factions politiques, syndicales et militaires pendant les cinq mois de travaux. Évêque d'Owando puis archevêque de Brazzaville, il reste une figure respectée de la société congolaise jusqu'à son décès en 2008.",
    eventIds: ["evt-conference-souveraine-1991"],
    sourceIds: ["src-conference-souveraine"],
    tags: ["Église", "CNS", "arbitre", "Brazzaville"],
    status: "published",
  },
];

export const personalityMap: Record<string, Personality> = Object.fromEntries(
  personalities.map((p) => [p.id, p]),
);

export function getPersonality(id: string): Personality | undefined {
  return personalityMap[id];
}

export function getPersonalityBySlug(slug: string): Personality | undefined {
  return personalities.find((p) => p.slug === slug);
}
