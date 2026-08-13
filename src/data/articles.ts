import type { Article } from "@/types";

/**
 * Long-form articles offering editorial analysis on key themes of Congolese
 * history. Each article carries a table of contents, an estimated reading time
 * and references to real sources.
 *
 * FACT POLICY:
 * - Facts presented in these articles reflect widely documented history.
 * - Any uncertain claim is marked inline with `TODO: VERIFY SOURCE`.
 * - Articles are demonstration content, meant to be replaced by verified
 *   editorial copy from professional historians and journalists.
 */
export const articles: Article[] = [
  {
    id: "art-brazzaville-capitale",
    slug: "brazzaville-memoires-dune-capitale",
    title: "Brazzaville, mémoires d'une capitale",
    excerpt:
      "De la fondation par Pierre Savorgnan de Brazza en 1880 à son rôle de capitale de la France libre, puis de capitale du Congo indépendant, Brazzaville cumule plus d'un siècle d'histoire africaine singulière.",
    author: "Rédaction Congo History Cloud",
    publishedAt: "2024-05-12",
    category: "societe",
    readingTime: 8,
    tableOfContents: [
      { id: "fondation", title: "La fondation (1880)" },
      { id: "france-libre", title: "Capitale de la France libre (1940-1943)" },
      { id: "indépendance", title: "Capitale du Congo indépendant" },
      { id: "geographie-urbaine", title: "Géographie d'une ville-monde" },
    ],
    content: `## Brazzaville, mémoires d'une capitale

Brazzaville n'est pas une capitale comme les autres. Née d'un traité négocié plutôt que d'une conquête militaire, elle incarne une histoire singulière où l'Afrique équatoriale a côtoyé les grandes secousses du XXe siècle.

### La fondation (1880) {#fondation}

En septembre 1880, l'officier de marine italien naturalisé français Pierre Savorgnan de Brazza signe avec le roi Makoko des Tékés un traité qui place la rive droite du Pool Malebo sous protectorat français. Le poste de Mfoa, devenu Brazzaville, est né. À la différence de Léopoldville, sa voisine belge de l'autre côté du fleuve, Brazzaville a pour origine la diplomatie et non la force.

### Capitale de la France libre (1940-1943) {#france-libre}

Pendant la Seconde Guerre mondiale, Brazzaville devient le siège de la France libre du général de Gaulle, entre 1940 et 1943. La Conférence de Brazzaville de 1944, qui réunit les hauts fonctionnaires de l'Empire français, pose les premiers jalons de la décolonisation administrative — même si elle n'envisage pas encore l'indépendance politique.

### Capitale du Congo indépendant {#indépendance}

Le 15 août 1960, Brazzaville devient la capitale de la République du Congo indépendante. Elle est le théâtre des Trois Glorieuses en août 1963, de la proclamation de la République populaire en décembre 1969, de la Conférence Nationale Souveraine en 1991 et des guerres civiles de 1993 et 1997 qui la dévastent partiellement.

### Géographie d'une ville-monde {#geographie-urbaine}

Organisée autour de ses grands quartiers historiques — Poto-Poto (le quartier cosmopolite fondé en 1900), Bacongo, Moungali, Ouenzé —, Brazzaville conserve une identité culturelle forte, mêlant peinture (l'école de Poto-Poto), musique (avec Les Bantous de la Capitale) et littérature. Sa position sur le Pool Malebo en fait une ville frontalière unique au monde, face à Kinshasa.

*Cette présentation synthétique sera enrichie par les contributions d'historiens et de témoins locaux.`,
    image: undefined,
    relatedArticleIds: ["art-conference-souveraine", "art-litterature-congolaise"],
    sourceIds: ["src-archives-brazza", "src-obenga-histoire"],
    status: "published",
  },
  {
    id: "art-conference-souveraine",
    slug: "la-conference-nationale-souveraine-moment-democratique",
    title: "La Conférence Nationale Souveraine, moment démocratique",
    excerpt:
      "De février à juin 1991, plus de 1 200 délégués se réunissent à Brazzaville pour redessiner le destin politique du Congo. Retour sur un moment démocratique fondateur.",
    author: "Rédaction Congo History Cloud",
    publishedAt: "2024-06-01",
    category: "politique",
    readingTime: 10,
    tableOfContents: [
      { id: "contexte", title: "Le contexte : la fin du parti unique" },
      { id: "ouverture", title: "L'ouverture, 25 février 1991" },
      { id: "decisions", title: "Les décisions majeures" },
      { id: "heritage", title: "L'héritage" },
    ],
    content: `## La Conférence Nationale Souveraine, moment démocratique

De février à juin 1991, Brazzaville est le centre de la vie politique africaine. La Conférence Nationale Souveraine (CNS) du Congo s'inscrit dans la vague des conférences nationales qui traverse l'Afrique francophone après 1989 (Bénin, Gabon, Togo, Mali, Niger). Elle reste, avec celle du Bénin, l'une des plus abouties.

### Le contexte : la fin du parti unique {#contexte}

À la fin des années 1980, le régime PCT sort exsangue de la chute des cours du pétrole et de la raréfaction du soutien soviétique. Les grandes manifestations d'octobre 1990, menées par les étudiants et les syndicats, obligent Sassou Nguesso à accepter l'ouverture. La loi du 31 décembre 1990 autorise le multipartisme.

### L'ouverture, 25 février 1991 {#ouverture}

La CNS s'ouvre le 25 février 1991 au palais du Peuple de Brazzaville sous la présidence de Mgr Ernest Kombo. Elle réunit plus de 1 200 délégués représentant l'ensemble des forces vives du pays : partis politiques, syndicats, Églises, armée, coutumiers, diaspora. Les travaux durent près de cinq mois, jusqu'au 10 juin 1991.

### Les décisions majeures {#decisions}

La CNS se proclame souveraine, suspend le rôle dirigeant du PCT, adopte le drapeau tricolore actuel (vert, jaune, rouge) en remplacement du drapeau marxiste, et nomme André Milongo Premier ministre d'une transition démocratique. La Constitution du 15 mars 1992, adoptée par référendum, consacre le pluralisme politique et organise l'État de droit.

### L'héritage {#heritage}

La transition débouche sur l'élection présidentielle pluraliste d'août 1992 remportée par Pascal Lissouba. Mais les coalitions se brisent dès 1993, des violences miliciennes éclatent, puis la guerre civile de 1997 met fin à l'expérience démocratique. La CNS n'en reste pas moins, dans la mémoire collective congolaise, comme le moment démocratique par excellence, où le pays s'est réuni pour parler de lui-même.`,
    image: undefined,
    relatedArticleIds: ["art-brazzaville-capitale", "art-guerre-1997"],
    sourceIds: ["src-conference-souveraine", "src-clark-failure", "src-missie-transition"],
    status: "published",
  },
  {
    id: "art-guerre-1997",
    slug: "la-guerre-civile-de-1997-anatomie-dune-rupture",
    title: "La guerre civile de 1997, anatomie d'une rupture",
    excerpt:
      "Quatre mois de combats, l'intervention angolaise, l'effondrement du régime Lissouba : retour sur le conflit qui a replongé le Congo dans la violence et redessiné son paysage politique.",
    author: "Rédaction Congo History Cloud",
    publishedAt: "2024-07-08",
    category: "politique",
    readingTime: 9,
    tableOfContents: [
      { id: "amont", title: "L'amont : tensions et milices" },
      { id: "déclenchement", title: "Le déclenchement, 5 juin 1997" },
      { id: "engagement-angolais", title: "L'engagement angolais" },
      { id: "conséquences", title: "Conséquences et mémoire" },
    ],
    content: `## La guerre civile de 1997, anatomie d'une rupture

Entre le 5 juin et le 25 octobre 1997, Brazzaville vit l'un des épisodes les plus meurtriers de son histoire. La guerre civile, qui oppose le président Pascal Lissouba à son prédécesseur Denis Sassou Nguesso, et accessoirement à Bernard Kolélas, détruit une grande partie de la capitale.

### L'amont : tensions et milices {#amors}

L'élection de Pascal Lissouba en août 1992 avait ouvert un cycle d'instabilité. Dès 1993, la rupture entre l'UPADS et le MCDDI déclenche des affrontements entre les milices Cocoyes (Lissouba) et Ninjas (Kolélas). Sassou Nguesso, dans l'opposition, prépare sa revanche en structurant sa milice, les Cobras, à partir de sa région d'origine (la Cuvette) et de ses anciens réseaux militaires.

### Le déclenchement, 5 juin 1997 {#déclenchement}

À l'approche de l'élection présidentielle prévue en juillet 1997, Lissouba tente de neutraliser la milice Cobra. Le 5 juin, l'encerclement de la résidence de Sassou Nguesso à Mpila dégénère en combats ouverts. Brazzaville se divise en zones contrôlées par les trois milices. Les combats font des milliers de morts et déplacent plus de 200 000 personnes.

### L'engagement angolais {#engagement-angolais}

À partir d'octobre 1997, l'armée angolaise entre en guerre aux côtés des Cobras. Luanda, qui accuse Lissouba de soutenir l'UNITA angolaise, apporte un appui déterminant en blindés et en aviation. Brazzaville tombe le 16 octobre, suivie de Pointe-Noire. Sassou Nguesso se proclame président le 25 octobre 1997. Lissouba et Kolélas fuient le pays.

### Conséquences et mémoire {#conséquences}

La guerre civile de 1997 marque la fin de l'expérience démocratique entamée en 1991-1992. Elle laisse Brazzaville exsangue, des milliers de morts, et prépare le terrain à une nouvelle constitution en 2002. Le souvenir du conflit reste vivace et structure encore en partie les lignes de fracture politique congolaises contemporaines.

*Les sources mobilisées sont principalement académiques et onusiennes (cf. sources ci-dessous).`,
    relatedArticleIds: ["art-conference-souveraine"],
    sourceIds: ["src-clark-failure", "src-onu-rapport-1997", "src-yengo-guerre"],
    status: "published",
  },
  {
    id: "art-petrole-congolais",
    slug: "le-petrole-congolais-entre-rente-et-dependance",
    title: "Le pétrole congolais, entre rente et dépendance",
    excerpt:
      "Depuis la première commercialisation du brut offshore dans les années 1970, le pétrole a façonné l'économie, la politique et la diplomatie congolaises. Tour d'horizon d'une dépendance ambivalente.",
    author: "Rédaction Congo History Cloud",
    publishedAt: "2024-04-20",
    category: "economie",
    readingTime: 7,
    tableOfContents: [
      { id: "naissance", title: "Naissance d'une rente" },
      { id: "elf", title: "Elf et l'État congolais" },
      { id: "fragilite", title: "La fragilité d'une économie mono-exportatrice" },
    ],
    content: `## Le pétrole congolais, entre rente et dépendance

Le Congo-Brazzaville est, depuis les années 1970, l'un des grands producteurs de pétrole d'Afrique subsaharienne. La rente pétrolière a financé la modernisation du pays, mais elle a aussi profondément déformé l'économie congolaise.

### Naissance d'une rente {#naissance}

Les premières découvertes offshore significatives interviennent à la fin des années 1960 et au début des années 1970, en mer de Pointe-Noire. L'indépendance énergétique puis les premières exportations transforment rapidement l'économie congolaise. À partir de 1973 et du premier choc pétrolier, la manne explose.

### Elf et l'État congolais {#elf}

Elf-Congo, filiale du groupe public français Elf-Aquitaine, devient l'opérateur de référence et un acteur politique de premier plan. Les liens étroits entre Elf et les dirigeants congolais ont été documentés par les enquêtes judiciaires françaises des années 1990-2000, notamment l'affaire Elf. Total, successeur d'Elf, reste aujourd'hui l'un des principaux opérateurs du pays.

### La fragilité d'une économie mono-exportatrice {#fragilite}

Le Congo tire une part très importante de ses recettes budgétaires et de ses exportations du pétrole. Cette dépendance a des effets bien connus : volatilité des recettes, sous-investissement dans les secteurs non-pétroliers (agriculture, industrie de transformation), gonflement de la fonction publique. La chute des cours en 2014-2016 a précipité une crise budgétaire et un programme avec le FMI en 2019.

*Les chiffres précis de production et de revenus par baril fluctuent d'une année à l'autre. Le lecteur est invité à consulter les rapports de la Banque mondiale et du FMI pour les données chiffrées récentes.`,
    relatedArticleIds: ["art-brazzaville-capitale"],
    sourceIds: ["src-jeune-afrique", "src-clark-failure"],
    status: "published",
  },
  {
    id: "art-litterature-congolaise",
    slug: "la-litterature-congolaise-de-lopes-a-mabanckou",
    title: "La littérature congolaise, de Lopes à Mabanckou",
    excerpt:
      "De Henri Lopes et Emmanuel Dongala à Alain Mabanckou et In Koli Jean Bofane, la littérature congolaise a construit une voix singulière dans l'espace francophone mondial.",
    author: "Rédaction Congo History Cloud",
    publishedAt: "2024-03-15",
    category: "culture",
    readingTime: 6,
    tableOfContents: [
      { id: "pionniers", title: "Les pionniers" },
      { id: "dongala", title: "Emmanuel Dongala et le mythe" },
      { id: "mabanckou", title: "Alain Mabanckou, consécration mondiale" },
      { id: "transmission", title: "Une génération en marche" },
    ],
    content: `## La littérature congolaise, de Lopes à Mabanckou

La littérature congolaise (Congo-Brazzaville) s'est construite sur plusieurs générations, à la croisée des engagements politiques, de l'oralité bantoue et des expériences de l'exil.

### Les pionniers {#pionniers}

Henri Lopes, avec « Tribaliques » (1971), Grand Prix Littéraire d'Afrique Noire, et Jean-Baptiste Tati Loutard (« Les Marches congolaises ») ouvrent la voie dans les années 1970. Leurs textes, souvent écrits depuis des responsabilités politiques, interrogent la Révolution congolaise et ses contradictions.

### Emmanuel Dongala et le mythe {#dongala}

Emmanuel Dongala publie en 1987 « Le Feu des origines », qui obtient le Grand Prix Littéraire d'Afrique Noire. Ce roman relie mythe fondateur bantou et histoire contemporaine. Chimiste et universitaire, Dongala fonde le théâtre de l'Éclair à Brazzaville. Exilé après 1997, il poursuit son œuvre aux États-Unis (« Johnny chien méchant », « La Photo de mariage »).

### Alain Mabanckou, consécration mondiale {#mabanckou}

Alain Mabanckou, né à Brazzaville en 1966, devient dans les années 2000 l'un des écrivains francophones les plus traduits au monde. « Mémoires de porc-épic » obtient le Prix Renaudot en 2006. « Verre cassé », « Black Bazar », « Petit Piment » et « Les Cigognes sont immortelles » explorent la mémoire congolaise, l'exil et la condition noire. En mars 2024, il est élu à l'Académie française, devenant le premier Congolais à siéger sous la Coupole.

### Une génération en marche {#transmission}

Au-delà de ces grandes figures, une nouvelle génération — In Koli Jean Bofane (« Congo Inc. », « La Coquille »), Wilfried N'Sondé, Gaston-Paul Effa — prolonge l'élan en explorant la mondialisation, les mines congolaises et les identités hybrides. La littérature congolaise, longtemps considérée comme discrète, occupe aujourd'hui une place de premier plan dans la francophonie.`,
    relatedArticleIds: ["art-brazzaville-capitale"],
    sourceIds: ["src-mabanckou-litterature", "src-dongala-tondreau"],
    status: "published",
  },
  {
    id: "art-musique-bantous",
    slug: "les-bantous-de-la-capitale-et-la-musique-congolaise",
    title: "Les Bantous de la Capitale et la musique congolaise",
    excerpt:
      "Fondés en 1959 à Brazzaville, Les Bantous de la Capitale ont porté la rumba congolaise sur les scènes du monde. Une histoire qui croise celles de Franklin Boukaka, du Cool Rumba et de la Poto-Poto Music School.",
    author: "Rédaction Congo History Cloud",
    publishedAt: "2024-02-10",
    category: "culture",
    readingTime: 6,
    tableOfContents: [
      { id: "naissance", title: "Naissance de la rumba congolaise" },
      { id: "bantous", title: "Les Bantous de la Capitale (1959)" },
      { id: "boukaka", title: "Franklin Boukaka, voix martyr" },
      { id: "posterité", title: "Une héritière vivante" },
    ],
    content: `## Les Bantous de la Capitale et la musique congolaise

Brazzaville et Kinshasa, séparées par le Pool Malebo, partagent une même matrice musicale : la rumba congolaise, inscrite au patrimoine immatériel de l'UNESCO en 2021. Le versant brazzavillois de cette histoire doit beaucoup à un orchestre légendaire : Les Bantous de la Capitale.

### Naissance de la rumba congolaise {#naissance}

Née dans les années 1940-1950 de la rencontre entre la rumba cubaine, la musique traditionnelle bantoue et les guitares espagnoles introduites par les marins, la rumba congolaise s'épanouit à Léopoldville et à Brazzaville. Les deux rives du Pool Malebo se répondent : OK Jazz, African Jazz côté congolais (RDC), Les Bantous de la Capitale, Cool Rumba côté congolais (RC).

### Les Bantous de la Capitale (1959) {#bantous}

Fondés en 1959 à Brazzaville par des musiciens originaires de la rive gauche, Les Bantous de la Capitale deviennent l'orchestre de référence du Congo-Brazzaville. Ils tournent en Afrique, en Europe et à Cuba, popularisant des chansons comme « Santamaria ». L'orchestre existe toujours, poursuivant une carrière de plus de soixante ans.

### Franklin Boukaka, voix martyr {#boukaka}

Franklin Boukaka (1947-1972), chanteur et guitariste, marque l'histoire de la musique congolaise par des titres comme « Mwana Mboka » et « Bourse ou la vie ». Arrêté puis mort en détention en 1972 dans des circonstances troubles, il devient une icône posthume de la chanson engagée congolaise.

### Une héritière vivante {#posterité}

De Rigo Star à Mbilia Bel, en passant par Aurlus Mabele (père du soukous) et, plus récemment, Fally Ipupa, la musique congolaise continue d'irriguer le continent et la diaspora. À Brazzaville, l'héritage des Bantous de la Capitale se perpétue dans les écoles de musique et les scènes du Poto-Poto Music School.`,
    relatedArticleIds: ["art-litterature-congolaise"],
    sourceIds: ["src-jeune-afrique"],
    status: "published",
  },
  {
    id: "art-poto-poto",
    slug: "lecole-de-peinture-poto-poto",
    title: "L'école de peinture Poto-Poto",
    excerpt:
      "Née en 1951 dans le quartier cosmopolite de Poto-Poto, à Brazzaville, l'école de peinture du même nom a inventé un langage visuel unique, aujourd'hui reconnu dans le monde entier.",
    author: "Rédaction Congo History Cloud",
    publishedAt: "2024-01-22",
    category: "culture",
    readingTime: 5,
    tableOfContents: [
      { id: "naissance", title: "Naissance de l'école (1951)" },
      { id: "style", title: "Un style reconnaissable" },
      { id: "grands-noms", title: "Grands noms" },
    ],
    content: `## L'école de peinture Poto-Poto

L'école de peinture de Poto-Poto est née en 1951 dans le quartier du même nom à Brazzaville, sous l'impulsion du Français Pierre Lods et de l'administrateur colonial Robert Hédia. C'est l'une des premières écoles d'art d'Afrique subsaharienne.

### Naissance de l'école (1951) {#naissance}

Pierre Lods réunit autour de lui de jeunes autodidactes — Albert Ngbatou, François Ilovi, Lucien Louna, Zacharia Obounia — et leur propose de peindre sans modèle, en laissant libre cours à leur imagination. Le résultat surprend : les artistes inventent un style entièrement nouveau, à la croisée de l'observation naturaliste et de l'ornementation rythmique.

### Un style reconnaissable {#style}

Les toiles de l'école Poto-Poto se caractérisent par des personnages allongés, des scènes de marché, de pêche, de danse, des palettes colorées où dominent les terres chaudes. La technique de la « poignée de pinceau » (peinture à l'aide d'une tige courte tenue entre les doigts) est l'une des marques de fabrique.

### Grands noms {#grands-noms}

Au-delà de la première génération, des peintres comme Chéri Samba (à cheval entre Brazzaville et Kinshasa), Moke, Bernard Léandri ou encore les artistes de la coopérative des peintres de Poto-Poto ont fait rayonner l'école. Le centre d'art de Poto-Poto, à Brazzaville, reste un lieu vivant où se transmettent ces techniques.`,
    relatedArticleIds: ["art-brazzaville-capitale"],
    sourceIds: ["src-photo-poto-poto"],
    status: "published",
  },
];

export const articleMap: Record<string, Article> = Object.fromEntries(
  articles.map((a) => [a.id, a]),
);

export function getArticle(id: string): Article | undefined {
  return articleMap[id];
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
