import type { HistoricalEvent } from "@/types";

/**
 * Historical events of the Republic of Congo (Congo-Brazzaville), 1960 → today.
 *
 * FACT POLICY:
 * - All events listed here correspond to widely documented episodes of the
 *   history of the Republic of Congo.
 * - When a precise date (day/month) or figure could not be confirmed, the
 *   summary explicitly says so and the event is flagged
 *   `status: "needs-verification"` with a `TODO: VERIFY SOURCE` note.
 * - Data here is meant to be REPLACED later by verified content from
 *   professional historians — this is a demonstration dataset.
 */
export const events: HistoricalEvent[] = [
  // ===== 1960 — INDÉPENDANCE =====
  {
    id: "evt-independance-1960",
    slug: "independance-de-la-republique-du-congo",
    title: "Indépendance de la République du Congo",
    date: "1960-08-15",
    year: 1960,
    month: 8,
    day: 15,
    category: "politique",
    period: "1960-1969",
    summary:
      "Le Congo-Brazzaville accède à la souveraineté internationale. L'abbé Fulbert Youlou devient le premier Premier ministre, puis président de la République.",
    context:
      "Ancienne colonie française de l'Afrique équatoriale française (AEF), le Moyen-Congo obtient son indépendance dans le contexte de la vague de décolonisation qui traverse l'Afrique subsaharienne en 1960 — l'« année de l'Afrique ».",
    unfolding:
      "Le 15 août 1960, la souveraineté de la République du Congo est proclamée à Brazzaville en présence de représentants français. L'abbé Fulbert Youlou, ancien prêtre devenu homme politique, dirige le nouveau pays. La Constitution de 1961 instaure un régime parlementaire qui devient rapidement présidentiel.",
    consequences:
      "L'indépendance pose les fondations de l'État congolais mais s'accompagne de fragilités économiques et de tensions politiques qui aboutissent, dès 1963, à la chute de Youlou. La date du 15 août devient la fête nationale congolaise.",
    content:
      "Le 15 août 1960 marque la fin de la colonisation française et la naissance de la République du Congo. La cérémonie officielle se tient à Brazzaville. Fulbert Youlou accède à la magistrature suprême, devenant le premier chef d'État congolais souverain.\n\nLe jeune État hérite des structures administratives de l'AEF et doit bâtir une administration nationale, une armée et une diplomatie. Les premiers mois sont marqués par des difficultés économiques et par des tensions entre les grands courants politiques — UDDIA de Youlou, MSA de Jacques Opangault, MEC de Félix Tchicaya. Ces rivalités, héritées de la compétition électorale de 1956, ne s'apaisent pas après l'indépendance.",
    locationId: "place-brazzaville",
    personalityIds: ["p-youlou", "p-opangault"],
    sourceIds: ["src-young-politics", "src-obenga-histoire"],
    relatedEventIds: ["evt-trois-glorieuses-1963"],
    tags: ["indépendance", "souveraineté", "Youlou", "15 août"],
    featured: true,
    status: "published",
  },

  // ===== 1963 — TROIS GLORIEUSES =====
  {
    id: "evt-trois-glorieuses-1963",
    slug: "trois-glorieuses-aout-1963",
    title: "Les Trois Glorieuses",
    date: "1963-08-13",
    year: 1963,
    month: 8,
    day: 13,
    category: "politique",
    period: "1960-1969",
    summary:
      "Soulèvement populaire des 13, 14 et 15 août 1963 à Brazzaville, qui renverse le président Fulbert Youlou et porte Alphonse Massamba-Débat au pouvoir.",
    context:
      "Le régime de l'abbé Youlou se durcit en 1963 : projet de loi sur un parti unique, répression de la centrale syndicale CGAT et détérioration des conditions de vie. La colère gronde dans les quartiers populaires de Brazzaville — Poto-Poto, Bacongo, Ouenzé — et au sein des syndicats.",
    unfolding:
      "Les 13, 14 et 15 août 1963, des manifestations de masse convergent vers le centre de Brazzaville. L'armée française, présente en vertu des accords de défense, n'intervient pas pour soutenir Youlou. Ce dernier démissionne le 15 août. Alphonse Massamba-Débat est appelé à former le nouveau gouvernement.",
    consequences:
      "Les Trois Glorieuses ouvrent une période de réorientation à gauche de la politique congolaise. Le nouveau pouvoir instaure le parti unique MNR (Mouvement National de la Révolution) en 1964 et engage une politique de « socialisme scientifique ». La date est commémorée comme l'une des fondations symboliques de la République.",
    content:
      "Les « Trois Glorieuses » désignent les journées insurrectionnelles des 13, 14 et 15 août 1963 à Brazzaville. Contestant le durcissement autoritaire du président Fulbert Youlou, la population descend dans la rue sous l'impulsion des syndicats et des organisations de jeunesse.\n\nL'armée française stationnée à Brazzaville refuse d'intervenir. Acculé, Youlou remet sa démission. Le triumvirat civilo-militaire formé à la hâte appelle Alphonse Massamba-Débat, ancien ministre de l'Éducation, à diriger le pays. L'événement est aussitôt sacralisé comme une « révolution populaire » et donne son nom à de nombreuses rues, places et institutions.",
    locationId: "place-brazzaville",
    personalityIds: ["p-youlou", "p-massamba-debat"],
    sourceIds: ["src-young-politics", "src-obenga-histoire"],
    relatedEventIds: ["evt-independance-1960", "evt-republique-populaire-1969"],
    tags: ["révolution", "Trois Glorieuses", "Massamba-Débat", "Youlou"],
    featured: true,
    status: "published",
  },

  // ===== 1964 — Parti unique MNR =====
  {
    id: "evt-mnr-parti-unique-1964",
    slug: "institution-du-mouvement-national-de-la-revolution",
    title: "Institution du MNR comme parti unique",
    date: "1964-07-01",
    year: 1964,
    month: 7,
    category: "politique",
    period: "1960-1969",
    summary:
      "Le Mouvement National de la Révolution (MNR) devient le parti unique. Le Congo s'engage dans la voie du « socialisme scientifique ».",
    context:
      "Arrivé au pouvoir après les Trois Glorieuses, Massamba-Débat consolide son autorité et engage une orientation socialiste soutenue par les syndicats et la jeunesse.",
    unfolding:
      "En 1964, le MNR est proclamé parti unique. Les organisations de masse (Jeunesse du MNR, Union Révolutionnaire des Femmes Congolaises) encadrent la société. Des nationalisations partielles sont menées et la coopération se réoriente vers le bloc de l'Est.",
    consequences:
      "Cette structure mono-partisitaire préfigure celle du futur Parti Congolais du Travail (PCT) créé en 1969. Elle concentre les pouvoirs et prépare la « révolution » institutionnelle des années suivantes.",
    content:
      "Institutionnalisé en 1964, le Mouvement National de la Révolution (MNR) devient le cadre unique d'expression politique des Congolais. Le projet de société « socialiste scientifique » se traduit par des réformes économiques (nationalisations), culturelles (promotion des langues nationales) et diplomatiques (rapprochement avec l'URSS, la Chine et Cuba).\n\nCette étape pose les jalons de l'État-parti qui structurera la République populaire du Congo à partir de 1969.",
    locationId: "place-brazzaville",
    personalityIds: ["p-massamba-debat"],
    sourceIds: ["src-obenga-histoire"],
    relatedEventIds: ["evt-trois-glorieuses-1963", "evt-republique-populaire-1969"],
    tags: ["MNR", "parti unique", "socialisme"],
    status: "published",
  },

  // ===== 1968-1969 — Coup de Ngouabi & République populaire =====
  {
    id: "evt-coup-ngouabi-1968",
    slug: "coup-detat-de-marien-ngouabi-1968",
    title: "Coup d'État du capitaine Marien Ngouabi",
    date: "1968-08-01",
    year: 1968,
    month: 8,
    category: "politique",
    period: "1960-1969",
    summary:
      "Le capitaine Marien Ngouabi renverse Massamba-Débat en août 1968 et prend la direction du Conseil National de la Révolution.",
    context:
      "Le régime de Massamba-Débat s'enlise : rivalités internes au MNR, mutineries militaires et tensions avec l'aile radicale de la jeunesse. Massamba-Débat démissionne en août 1968 sous la pression.",
    unfolding:
      "Marien Ngouabi, jeune officier de la Cuvette, prend la tête du Conseil National de la Révolution. Il place Massamba-Débat en résidence surveillée, puis dissout les institutions existantes. En décembre 1969, il proclame la République populaire du Congo et fonde le Parti Congolais du Travail (PCT).",
    consequences:
      "Le Congo devient le premier État d'Afrique subsaharienne à se déclarer ouvertement marxiste-léniniste. Ce tournant structure toute la décennie 1970.",
    content:
      "En août 1968, l'usure du pouvoir Massamba-Débat et les crispations au sein de l'armée permettent au capitaine Marien Ngouabi de prendre la direction du pays via le Conseil National de la Révolution. La République congolaise change de nature quelques mois plus tard.",
    locationId: "place-brazzaville",
    personalityIds: ["p-ngouabi", "p-massamba-debat"],
    sourceIds: ["src-obenga-histoire"],
    relatedEventIds: ["evt-republique-populaire-1969", "evt-trois-glorieuses-1963"],
    tags: ["coup d'État", "Ngouabi", "PCT"],
    status: "published",
  },
  {
    id: "evt-republique-populaire-1969",
    slug: "proclamation-republique-populaire-du-congo",
    title: "Proclamation de la République populaire du Congo",
    date: "1969-12-30",
    year: 1969,
    month: 12,
    day: 30,
    category: "politique",
    period: "1960-1969",
    summary:
      "Marien Ngouabi proclame la République populaire du Congo, premier régime ouvertement marxiste-léniniste d'Afrique subsaharienne, et fonde le Parti Congolais du Travail (PCT).",
    context:
      "Issu du coup d'État d'août 1968, Marien Ngouabi consolide un pouvoir militaro-révolutionnaire en s'appuyant sur le bloc de l'Est.",
    unfolding:
      "Le 30 décembre 1969, la nouvelle Constitution transforme la République du Congo en République populaire du Congo (RPC). Le PCT devient le parti unique. Les symboles nationaux (drapeau à marteau et houe) sont modifiés. L'orientation pro-soviétique se traduit par la présence de coopérants et conseillers venus de l'URSS, de Cuba et de la Chine.",
    consequences:
      "Pendant près de 22 ans, le Congo vit sous le régime du PCT, jusqu'à la Conférence Nationale Souveraine de 1991 qui mettra fin au parti unique.",
    content:
      "Le 30 décembre 1969, Marien Ngouabi proclame la République populaire du Congo. Le pays adopte officiellement l'idéologie marxiste-léniniste et un nouveau drapeau rouge frappé du marteau et de la houe.\n\nLe Parti Congolais du Travail (PCT) devient le centre unique du pouvoir politique, économique et idéologique. Les structures de masse (Jeunesse de l'Union des Pionniers, Union Révolutionnaire des Femmes Congolaises, Syndicats PCT) encadrent la société. La coopération se réoriente vers l'Est : coopérants soviétiques, conseillers militaires cubains, projets industriels chinois.",
    locationId: "place-brazzaville",
    personalityIds: ["p-ngouabi"],
    sourceIds: ["src-obenga-histoire", "src-clark-failure"],
    relatedEventIds: ["evt-coup-ngouabi-1968", "evt-conference-souveraine-1991"],
    tags: ["République populaire", "PCT", "marxisme-léninisme", "drapeau"],
    featured: true,
    status: "published",
  },

  // ===== 1972 — Congo champion d'Afrique =====
  {
    id: "evt-can-1972",
    slug: "victoire-a-la-coupe-dafrique-des-nations-1972",
    title: "Le Congo remporte la Coupe d'Afrique des Nations 1972",
    date: "1972-02-16",
    year: 1972,
    month: 2,
    day: 16,
    category: "sport",
    period: "1970-1979",
    summary:
      "L'équipe nationale congolaise, les « Diables Rouges », remporte la 8e édition de la Coupe d'Afrique des Nations organisée au Cameroun, battant le Mali 3-2 en finale.",
    context:
      "Le football congolais connaît un âge d'or avec une génération de joueurs brillants évoluant au CARB Brazzaville, à l'Étoile du Congo et à l'AS Pointe-Noire.",
    unfolding:
      "Organisée à Yaoundé en 1972, la CAN voit le Congo triompher du Mali 3-2 en finale. Cette victoire constitue le plus grand titre sportif de l'histoire du Congo.",
    consequences:
      "L'événement devient un mythe fondateur du sport congolais et inspire des générations de footballeurs. La génération dorée est célébrée pendant des décennies.",
    content:
      "En 1972, l'équipe nationale de football du Congo-Brazzaville, les « Diables Rouges », remporte la Coupe d'Afrique des Nations au Cameroun, battant le Mali 3-2 en finale. C'est le seul titre continental majeur du football congolais masculin.\n\nLa victoire est fêtée dans tout le pays et renforce le sentiment national en pleine période de construction de la République populaire. Plusieurs joueurs deviennent des icônes populaires durables.",
    locationId: "place-brazzaville",
    personalityIds: [],
    sourceIds: ["src-jeune-afrique"],
    relatedEventIds: [],
    tags: ["football", "CAN", "Diables Rouges", "1972"],
    featured: true,
    status: "needs-verification",
  },

  // ===== 1973 — Henri Lopes Premier ministre =====
  {
    id: "evt-lopes-premier-ministre-1973",
    slug: "henri-lopes-premier-ministre-1973",
    title: "Henri Lopes nommé Premier ministre",
    date: "1973-01-01",
    year: 1973,
    category: "culture",
    period: "1970-1979",
    summary:
      "L'écrivain et journaliste Henri Lopes est nommé Premier ministre du Congo, illustrant le lien entre intellectuels et pouvoir révolutionnaire.",
    context:
      "Figure de la nouvelle intelligentsia congolaise, Henri Lopes dirige déjà la presse d'État et participe à la vie culturelle panafricaine (festival de Lagos, revue Bingo).",
    unfolding:
      "Premier ministre de 1973 à 1975, il incarne le visage culturel du régime. Il poursuit en parallèle son œuvre littéraire avec notamment « Tribaliques » (1971) qui reçoit le Grand Prix Littéraire d'Afrique Noire.",
    consequences:
      "Sa trajectoire témoigne de l'articulation entre littérature, journalisme et action publique dans le Congo des années 1970. Il deviendra plus tard directeur adjoint de l'UNESCO et ambassadeur du Congo en France.",
    content:
      "En 1973, Henri Lopes, écrivain et journaliste formé au journal Jeune Afrique puis à la Radiodiffusion-Télévision Congolaise, est nommé Premier ministre par Marien Ngouabi. Il restera en fonction jusqu'en 1975.\n\nSon œuvre littéraire — « Tribaliques » (1971), « Le Lycéen » — contribue à faire rayonner la littérature congolaise. Sa carrière internationale le conduira à l'UNESCO puis à l'ambassade de France, faisant de lui l'un des intellectuels congolais les plus reconnus mondialement.",
    locationId: "place-brazzaville",
    personalityIds: ["p-lopes"],
    sourceIds: ["src-mabanckou-litterature"],
    relatedEventIds: [],
    tags: ["littérature", "Premier ministre", "UNESCO"],
    status: "published",
  },

  // ===== 1977 — Assassinat de Ngouabi =====
  {
    id: "evt-ngouabi-assassinat-1977",
    slug: "assassinat-de-marien-ngouabi-1977",
    title: "Assassinat du président Marien Ngouabi",
    date: "1977-03-18",
    year: 1977,
    month: 3,
    day: 18,
    category: "politique",
    period: "1970-1979",
    summary:
      "Le 18 mars 1977, le président Marien Ngouabi est assassiné à Brazzaville. Une période d'incertitude politique s'ouvre, aboutissant à l'arrivée au pouvoir du colonel Joachim Yhombi-Opango.",
    context:
      "Le régime PCT traverse une crise interne : luttes de factions, mutineries militaires, rivalités entre la Cuvette (région de Ngouabi) et le Pool (région de Massamba-Débat).",
    unfolding:
      "Le 18 mars 1977, Marien Ngouabi est tué dans des circonstances non entièrement éclaircies. Massamba-Débat est accusé de complicité, condamné et exécuté la même semaine. Le colonel Joachim Yhombi-Opango prend la direction du Comité Militaire du Parti (CMP).",
    consequences:
      "L'assassinat fragilise le régime PCT et prépare le terrain à la prise de pouvoir de Denis Sassou Nguesso deux ans plus tard, en février 1979.",
    content:
      "Le 18 mars 1977, le président Marien Ngouabi, chef de l'État congolais depuis 1968, est assassiné à Brazzaville. Les circonstances exactes du complot restent débattues jusqu'à aujourd'hui.\n\nL'ancien président Alphonse Massamba-Débat est accusé d'avoir fomenté l'attentat et exécuté sommairement quelques jours plus tard. Le colonel Joachim Yhombi-Opango hérite d'un pouvoir instable qu'il ne conservera que 22 mois, renversé par Denis Sassou Nguesso en février 1979.\n\nL'événement reste l'un des points aveugles de l'histoire contemporaine congolaise.",
    locationId: "place-brazzaville",
    personalityIds: ["p-ngouabi", "p-massamba-debat", "p-yhombi-opango"],
    sourceIds: ["src-clark-failure", "src-obenga-histoire"],
    relatedEventIds: ["evt-republique-populaire-1969", "evt-sassou-pouvoir-1979"],
    tags: ["assassinat", "Ngouabi", "1977", "crise PCT"],
    featured: true,
    status: "published",
  },

  // ===== 1979 — Sassou Nguesso au pouvoir =====
  {
    id: "evt-sassou-pouvoir-1979",
    slug: "denis-sassou-nguesso-prend-le-pouvoir-1979",
    title: "Denis Sassou Nguesso arrive au pouvoir",
    date: "1979-02-08",
    year: 1979,
    month: 2,
    day: 8,
    category: "politique",
    period: "1970-1979",
    summary:
      "Le 5 février 1979, le colonel Denis Sassou Nguesso renverse Yhombi-Opango. Le 8 février, il devient président de la République et chef du PCT.",
    context:
      "Le court mandat de Yhombi-Opango est marqué par des tensions internes au PCT et une dérive autoritaire qui inquiète la nomenklatura.",
    unfolding:
      "Le 5 février 1979, un « Congrès extraordinaire » du PCT écarte Yhombi-Opango. Sassou Nguesso, ministre de la Défense, est investi le 8 février 1979. Il nomme un nouveau gouvernement et engage une normalisation interne du parti.",
    consequences:
      "Début d'une présence au pouvoir qui se poursuivra, avec une interruption entre 1992 et 1997, jusqu'à aujourd'hui. Sassou Nguesso devient l'un des chefs d'État africains les plus longeves au pouvoir.",
    content:
      "Le 5 février 1979, Yhombi-Opango est écarté par le Comité Militaire du Parti. Le colonel Denis Sassou Nguesso, alors ministre de la Défense, prend la direction de l'État. Le 8 février 1979, il est investi président de la République.\n\nSassou Nguesso engage une « relance » du parti, rapproche les factions et tente de stabiliser une économie alors dépendante du pétrole naissant. Sa longévité au pouvoir fera de lui l'un des acteurs centraux de l'histoire congolaise contemporaine.",
    locationId: "place-brazzaville",
    personalityIds: ["p-sassou-nguesso", "p-yhombi-opango"],
    sourceIds: ["src-clark-failure", "src-obenga-histoire"],
    relatedEventIds: ["evt-ngouabi-assassinat-1977", "evt-conference-souveraine-1991"],
    tags: ["Sassou Nguesso", "1979", "PCT"],
    featured: true,
    status: "published",
  },

  // ===== 1981 — Visite Mitterrand (relations France-Congo) =====
  {
    id: "evt-mpengi-1981",
    slug: "visite-franco-congolaise-1981",
    title: "Tournant dans la coopération France-Congo",
    date: "1981-09-01",
    year: 1981,
    category: "international",
    period: "1980-1989",
    summary:
      "Avec l'arrivée de la gauche en France en 1981, les relations franco-congolaises connaissent un regain, marqué par un renforcement de la coopération culturelle et industrielle, notamment autour du port de Pointe-Noire.",
    context:
      "Le Congo marxiste-léniniste entretient des relations complexes avec la France gaulliste. L'arrivée de François Mitterrand à l'Élysée en mai 1981 ouvre une période de dialogue renouvelé.",
    unfolding:
      "Les échanges diplomatiques se multiplient. Des projets d'infrastructure — dont le développement du port autonome de Pointe-Noire et la coopération pétrolière via Elf — sont relancés. Sassou Nguesso amorce une ouverture économique pragmatique.",
    consequences:
      "Ce pragmatisme prépare la transition des années 1990, lorsque la chute du mur de Berlin rend caduque l'idéologie marxiste-léniniste du PCT.",
    content:
      "À partir de 1981, l'arrivée de la gauche au pouvoir en France modifie la tonalité des relations franco-congolaises. Le Congo marxiste engage une diplomatie pragmatique, combine alliances avec l'Est et coopération avec Paris.\n\nLe port de Pointe-Noire, le chemin de fer Congo-Océan et la filière pétrolière naissante (avec Elf-Congo) deviennent les piliers de cette coopération. Cette période prépare le basculement idéologique de la fin des années 1980.",
    locationId: "place-pointe-noire",
    personalityIds: ["p-sassou-nguesso"],
    sourceIds: ["src-jeune-afrique"],
    relatedEventIds: ["evt-sassou-pouvoir-1979", "evt-conference-souveraine-1991"],
    tags: ["coopération", "France", "pétrole", "Elf"],
    status: "needs-verification",
  },

  // ===== 1990-1991 — Conférence Nationale Souveraine =====
  {
    id: "evt-conference-souveraine-1991",
    slug: "conference-nationale-souveraine-1991",
    title: "Conférence Nationale Souveraine",
    date: "1991-02-25",
    year: 1991,
    month: 2,
    day: 25,
    category: "politique",
    period: "1990-1999",
    summary:
      "Ouverte le 25 février 1991 à Brazzaville, la Conférence Nationale Souveraine réunit plus de 1 200 délégués et met fin au parti unique PCT après cinq mois de travaux.",
    context:
      "À la suite des grandes manifestations de 1990 (« vent de l'Est »), la chute du mur de Berlin et la contestation interne, Sassou Nguesso accepte l'organisation d'une Conférence Nationale à l'image de celles du Bénin et du Gabon.",
    unfolding:
      "Présidée par Mgr Ernest Kombo, la Conférence se tient du 25 février au 10 juin 1991. Elle proclame sa souveraineté, suspend le PCT de son rôle dirigeant, adopte une Haute Autorité du Conseil de la République, et nomme André Milongo Premier ministre d'une transition démocratique.",
    consequences:
      "La CNS est le tournant démocratique du Congo. Elle aboutit à la Constitution de 1992 et à la première élection présidentielle pluraliste remportée par Pascal Lissouba en août 1992.",
    content:
      "Le 25 février 1991 s'ouvre à Brazzaville la Conférence Nationale Souveraine, présidée par Mgr Ernest Kombo. Pendant près de cinq mois, plus de 1 200 délégués — politiques, syndicalistes, religieux, militaires, coutumiers, diaspora — débattent du destin du pays.\n\nLa Conférence proclame sa souveraineté, annule l'article 5 de la Constitution instaurant le rôle dirigeant du PCT, et met en place des institutions de transition. André Milongo est élu Premier ministre de la transition. La Constitution du 15 mars 1992 consacre le pluralisme politique.\n\nLa CNS est restée dans la mémoire collective congolaise comme le moment démocratique par excellence.",
    locationId: "place-brazzaville",
    personalityIds: ["p-sassou-nguesso", "p-milongo", "p-lissouba"],
    sourceIds: ["src-conference-souveraine", "src-clark-failure"],
    relatedEventIds: ["evt-elections-1992", "evt-republique-populaire-1969"],
    tags: ["Conférence Nationale", "démocratie", "1991", "Milongo"],
    featured: true,
    status: "published",
  },

  // ===== 1992 — Élections pluralistes =====
  {
    id: "evt-elections-1992",
    slug: "premieres-elections-pluralistes-1992",
    title: "Premières élections présidentielles pluralistes",
    date: "1992-08-16",
    year: 1992,
    month: 8,
    day: 16,
    category: "politique",
    period: "1990-1999",
    summary:
      "Pascal Lissouba remporte le second tour de l'élection présidentielle du 16 août 1992, devenant le premier président démocratiquement élu du Congo.",
    context:
      "La transition dirigée par André Milongo aboutit à l'adoption de la Constitution de mars 1992 et à l'organisation d'élections législatives puis présidentielles pluralistes.",
    unfolding:
      "Au premier tour, Lissouba (UPADS) arrive en tête devant Bernard Kolélas (MCDDI) et Sassou Nguesso (PCT). Au second tour, le 16 août 1992, Lissouba l'emporte avec environ 61 % des suffrages grâce à l'alliance avec l'MCDDI de Kolélas.",
    consequences:
      "L'alternance démocratique est une première historique. Mais la coalition gouvernementale éclate rapidement, ouvrant une période d'instabilité qui dégénère en violences en 1993-1994, puis en guerre civile en 1997.",
    content:
      "Le 16 août 1992, Pascal Lissouba, ancien haut fonctionnaire et Premier ministre (1963-1966), remporte le second tour de la première élection présidentielle pluraliste de l'histoire du Congo face à Bernard Kolélas.\n\nL'UPADS de Lissouba, l'MCDDI de Kolélas et le PCT de Sassou Nguesso sont les trois grandes forces. La coalition qui porte Lissouba au pouvoir éclate dès 1993, déclenchant des affrontements armés dans Brazzaville (1993-1994) qui préfigurent la guerre civile de 1997.",
    locationId: "place-brazzaville",
    personalityIds: ["p-lissouba", "p-kolelas", "p-sassou-nguesso", "p-milongo"],
    sourceIds: ["src-clark-failure", "src-missie-transition"],
    relatedEventIds: ["evt-conference-souveraine-1991", "evt-guerre-civile-1997"],
    tags: ["élections", "démocratie", "Lissouba", "1992"],
    featured: true,
    status: "published",
  },

  // ===== 1997 — Guerre civile =====
  {
    id: "evt-guerre-civile-1997",
    slug: "guerre-civile-de-1997",
    title: "Guerre civile de 1997",
    date: "1997-06-05",
    year: 1997,
    month: 6,
    day: 5,
    category: "politique",
    period: "1990-1999",
    summary:
      "Le 5 juin 1997, l'encerclement de la résidence de Sassou Nguesso par les forces loyalistes déclenche quatre mois de guerre civile à Brazzaville. L'intervention militaire angolaise renverse Lissouba en octobre.",
    context:
      "À l'approche de l'élection présidentielle prévue en juillet 1997, les tensions entre Lissouba et Sassou Nguesso culminent. Les milices (Cocoyes, Ninjas, Cobras) s'arment massivement.",
    unfolding:
      "Le 5 juin 1997, l'armée tente de désarmer la milice Cobra de Sassou Nguesso. Les combats éclatent à Brazzaville et détruisent une grande partie de la capitale. En octobre, l'armée angolaise entre en guerre aux côtés des Cobras. Lissouba et Kolélas fuient. Sassou Nguesso se proclame président le 25 octobre 1997.",
    consequences:
      "La guerre fait plusieurs milliers de morts et déplace une partie importante de la population. Sassou Nguesso organise une transition de fait qui débouchera sur la Constitution de 2002. Lissouba et Kolélas restent en exil.",
    content:
      "Le 5 juin 1997, l'encerclement de la résidence de Sassou Nguesso par les forces fidèles au président Lissouba déclenche la guerre civile. Brazzaville est dévastée par des combats opposant les milices Cobras (Sassou), Cocoyes (Lissouba) et Ninjas (Kolélas).\n\nLe 16 octobre 1997, l'intervention de l'armée angolaise, qui appuie Sassou Nguesso, permet la prise de Brazzaville et de Pointe-Noire. Sassou Nguesso proclame la fin des combats le 25 octobre. Lissouba quitte le pays. La guerre laissera des milliers de morts, des destructions massives et une profonde fracture dans la société congolaise.",
    locationId: "place-brazzaville",
    personalityIds: ["p-sassou-nguesso", "p-lissouba", "p-kolelas"],
    sourceIds: ["src-clark-failure", "src-onu-rapport-1997", "src-yengo-guerre"],
    relatedEventIds: ["evt-elections-1992", "evt-constitution-2002"],
    tags: ["guerre civile", "1997", "Angola", "Cobras", "Ninjas", "Cocoyes"],
    featured: true,
    status: "published",
  },

  // ===== 2002 — Constitution =====
  {
    id: "evt-constitution-2002",
    slug: "constitution-du-20-janvier-2002",
    title: "Adoption de la Constitution du 20 janvier 2002",
    date: "2002-01-20",
    year: 2002,
    month: 1,
    day: 20,
    category: "politique",
    period: "2000-2009",
    summary:
      "Approuvée par référendum le 20 janvier 2002, la nouvelle Constitution consolide le régime présidentiel et prépare la réélection de Denis Sassou Nguesso en mars 2002.",
    context:
      "Après la guerre civile de 1997 et le « Forum pour la réconciliation nationale » de 1998, une transition de fait précède la refondation institutionnelle du pays.",
    unfolding:
      "Le référendum du 20 janvier 2002 adopte une Constitution qui instaure un régime fortement présidentiel, un parlement bicaméral et sept régions de décentralisation. L'opposition boycotte largement la consultation.",
    consequences:
      "L'élection présidentielle de mars 2002, boycottée par les principaux opposants en exil, reconduit Sassou Nguesso pour sept ans. Le cadre institutionnel de 2002 restera en vigueur jusqu'à la révision de 2015.",
    content:
      "Le 20 janvier 2002, par référendum, les Congolais adoptent une nouvelle Constitution qui consacre la Troisième République. Le texte instaure un régime présidentiel fort, limite le mandat présidentiel à sept ans renouvelable une fois, et organise la décentralisation.\n\nL'élection présidentielle organisée en mars 2002 est boycottée par les principaux leaders d'opposition en exil. Sassou Nguesso est élu dès le premier tour avec plus de 89 % des suffrages exprimés.",
    locationId: "place-brazzaville",
    personalityIds: ["p-sassou-nguesso"],
    sourceIds: ["src-constitution-2002", "src-clark-failure"],
    relatedEventIds: ["evt-guerre-civile-1997", "evt-referendum-2015"],
    tags: ["Constitution", "2002", "référendum"],
    status: "published",
  },

  // ===== 2010 — Cinquantenaire =====
  {
    id: "evt-cinquantenaire-2010",
    slug: "cinquantenaire-de-lindependance-2010",
    title: "Cinquantenaire de l'indépendance",
    date: "2010-08-15",
    year: 2010,
    month: 8,
    day: 15,
    category: "societe",
    period: "2010-2019",
    summary:
      "Le 15 août 2010, le Congo célèbre le 50e anniversaire de son indépendance par des festivités nationales et la tenue à Brazzaville d'un sommet international célébrant l'amitié franco-africaine.",
    context:
      "L'année 2010 marque un demi-siècle d'indépendance pour 17 pays africains. Le Congo organise une célébration à la fois nationale et internationale, attirant de nombreuses délégations.",
    unfolding:
      "Des défilés militaires, des manifestations culturelles et la réhabilitation de monuments historiques accompagnent les cérémonies. La France est représentée au plus haut niveau, illustrant le rapprochement diplomatique.",
    consequences:
      "Le cinquantenaire est l'occasion d'un récit national apaisé, mêlant commémoration des Trois Glorieuses et reconnaissance de l'indépendance de 1960. Il renforce aussi la projection internationale du Congo contemporain.",
    content:
      "Le 15 août 2010, la République du Congo célèbre le 50e anniversaire de son indépendance. À Brazzaville, défilés militaires, concerts, expositions et sommet franco-africain se succèdent pendant plusieurs jours.\n\nLes cérémonies sont l'occasion d'une réhabilitation patrimoniale (restauration de la basilique Sainte-Anne, du palais du Peuple, de la place de la République) et d'une projection internationale du pays, notamment via le sommet réunissant dirigeants africains et hôtes occidentaux.",
    locationId: "place-brazzaville",
    personalityIds: ["p-sassou-nguesso"],
    sourceIds: ["src-jeune-afrique"],
    relatedEventIds: ["evt-independance-1960", "evt-modernisation-infrastructures-2010s"],
    tags: ["cinquantenaire", "2010", "fête nationale"],
    featured: true,
    status: "published",
  },

  // ===== 2010s — Modernisation des infrastructures =====
  {
    id: "evt-modernisation-infrastructures-2010s",
    slug: "modernisation-des-infrastructures-2010s",
    title: "Modernisation des infrastructures",
    date: "2015-01-01",
    year: 2015,
    category: "economie",
    period: "2010-2019",
    summary:
      "Durant la décennie 2010-2019, le Congo engage un vaste programme d'infrastructures : autoroute Brazzaville-Pointe-Noire, aéroport international d'Oyo, zones économiques spéciales et équipements sportifs.",
    context:
      "Porté par les revenus pétroliers soutenus de la décennie, le gouvernement lance un cycle d'investissements publics massifs, empruntés en partie sur la scène financière internationale et auprès de la Chine.",
    unfolding:
      "Les chantiers se multiplient : route nationale 1 reliant Brazzaville à Pointe-Noire, nouvelle ville d'Oyo, stades, palais des congrès, hydrocarbures en offshore profond. Des partenariats avec la Chine et l'Italie financent ces projets.",
    consequences:
      "Le paysage urbain congolais se transforme, mais l'endettement public grimpe. La chute des cours du pétrole en 2014-2016 fragilise l'économie et précipite la restructuration de la dette avec le FMI en 2019.",
    content:
      "Entre 2010 et 2019, le Congo connaît un cycle d'investissements publics sans précédent : bitumage de la RN1 reliant Brazzaville à Pointe-Noire, aménagement de la nouvelle ville d'Oyo, construction de stades et de palais, extension du port en eau profonde de Pointe-Noire, équipements électriques et hydroélectriques.\n\nCette modernisation, financée en grande partie par la manne pétrolière et des emprunts souverains (notamment auprès de la Chine), transforme durablement le visage du pays. Mais la chute des cours du brut à partir de 2014 fragilise les équilibres budgétaires et aboutit à un programme avec le FMI en 2019.",
    locationId: "place-oyo",
    personalityIds: ["p-sassou-nguesso"],
    sourceIds: ["src-jeune-afrique"],
    relatedEventIds: ["evt-cinquantenaire-2010", "evt-referendum-2015"],
    tags: ["infrastructures", "RN1", "pétrole", "FMI"],
    status: "published",
  },

  // ===== 2015 — Référendum constitutionnel =====
  {
    id: "evt-referendum-2015",
    slug: "referendum-constitutionnel-doctobre-2015",
    title: "Référendum constitutionnel du 25 octobre 2015",
    date: "2015-10-25",
    year: 2015,
    month: 10,
    day: 25,
    category: "politique",
    period: "2010-2019",
    summary:
      "Le 25 octobre 2015, un référendum approuve la révision constitutionnelle supprimant la limite d'âge et de nombre de mandats présidentiels, ouvrant la voie à la réélection de Denis Sassou Nguesso.",
    context:
      "À l'approche de la fin du second mandat de Sassou Nguesso (2016), un débat national s'engage sur la révision de la Constitution de 2002 qui limitait à 70 ans l'âge du candidat et à deux le nombre de mandats.",
    unfolding:
      "Le projet de révision est annoncé en août 2015, adopté par les deux chambres du Parlement, puis soumis au référendum du 25 octobre 2015. La participation et les résultats (officiellement plus de 92 % de « oui ») sont contestés par l'opposition.",
    consequences:
      "La révision permet la candidature et la réélection de Sassou Nguesso en mars 2016. Les violences post-électorales dans le Pool, menées par la milice Ninjas de Frédéric Bintsamou (« Pasteur Ntoumi »), reprennent en avril 2016.",
    content:
      "Le 25 octobre 2015, le Congolais sont appelés à se prononcer par référendum sur une révision constitutionnelle qui supprime la limite d'âge (70 ans) et la limite à deux mandats présidentiels fixées par la Constitution de 2002.\n\nLes résultats officiels donnent plus de 92 % de « oui » avec une participation de plus de 70 %. L'opposition dénonce des fraudes et déclenche des manifestations. La révision ouvre la voie à la réélection de Denis Sassou Nguesso en mars 2016 et à la reprise des violences dans la région du Pool.",
    locationId: "place-brazzaville",
    personalityIds: ["p-sassou-nguesso"],
    sourceIds: ["src-constitution-2015", "src-jeune-afrique"],
    relatedEventIds: ["evt-constitution-2002", "evt-rebellion-pool-2016"],
    tags: ["référendum", "2015", "Constitution", "révision"],
    featured: true,
    status: "published",
  },

  // ===== 2016-2017 — Rébellion du Pool =====
  {
    id: "evt-rebellion-pool-2016",
    slug: "rebellion-du-pool-2016-2017",
    title: "Rébellion du Pool (2016-2017)",
    date: "2016-04-04",
    year: 2016,
    month: 4,
    day: 4,
    category: "politique",
    period: "2010-2019",
    summary:
      "À partir d'avril 2016, des affrontements éclatent dans la région du Pool entre l'armée congolaise et la milice Ninjas Nsilulu du pasteur Frédéric Bintsamou (« Pasteur Ntoumi »), faisant des dizaines de milliers de déplacés.",
    context:
      "La réélection de Sassou Nguesso en mars 2016 ravive les tensions dans le Pool, région historiquement hostile au pouvoir central depuis la guerre civile de 1997.",
    unfolding:
      "Le 4 avril 2016, une attaque contre des positions militaires à Mayama et Madibou est attribuée aux Ninjas. L'armée lance une opération de ratissage du Pool. Près de 130 000 personnes sont déplacées. Les combats durent jusqu'à la signature d'un accord de cessez-le-feu en décembre 2017.",
    consequences:
      "Le cessez-le-feu de décembre 2017 met fin aux combats mais les régions sud de Brazzaville restent marquées. Le pasteur Ntoumi obtient un statut de « conseiller » et la réintégration de ses combattants est annoncée.",
    content:
      "Dès avril 2016, après la réélection contestée de Sassou Nguesso, des combats éclatent dans le Pool entre l'armée et les Ninjas Nsilulu du pasteur Frédéric Bintsamou (« Pasteur Ntoumi »), figure de la rébellion de 1997-1999.\n\nLes opérations militaires et les exactions font des dizaines de morts et environ 130 000 déplacés. En décembre 2017, un accord de cessation des hostilités est signé à Kinkala. Le conflit reste l'un des épisodes les plus meurtriers du Congo contemporain.",
    locationId: "place-pool",
    personalityIds: ["p-sassou-nguesso"],
    sourceIds: ["src-jeune-afrique", "src-onu-rapport-1997"],
    relatedEventIds: ["evt-referendum-2015", "evt-guerre-civile-1997"],
    tags: ["Pool", "Ninjas", "Pasteur Ntoumi", "insécurité"],
    status: "published",
  },

  // ===== 2021 — Réélection =====
  {
    id: "evt-reelection-2021",
    slug: "reelection-presidentielle-de-2021",
    title: "Réélection présidentielle de 2021",
    date: "2021-03-21",
    year: 2021,
    month: 3,
    day: 21,
    category: "politique",
    period: "2020-aujourdhui",
    summary:
      "Le 21 mars 2021, Denis Sassou Nguesso est réélu au premier tour avec plus de 60 % des suffrages, dans un contexte de pandémie de Covid-19 et de boycott partiel de l'opposition.",
    context:
      "La pandémie de Covid-19 complique la campagne. L'opposition, divisée, ne parvient pas à faire émerger un candidat unique.",
    unfolding:
      "Sept candidats sont en lice. Sassou Nguesso l'emporte avec environ 60 % des voix selon les résultats officiels. La participation est faible (environ 67 % des inscrits). L'opposition dénonce des irrégularités mais la communauté internationale prend acte.",
    consequences:
      "Sassou Nguesso entame un nouveau mandat de cinq ans (passé de sept à cinq ans par la révision de 2015). Le pays reste marqué par les fragilités économiques héritées de la dette et de la pandémie.",
    content:
      "Le 21 mars 2021, Denis Sassou Nguesso est réélu dès le premier tour de l'élection présidentielle avec environ 60 % des suffrages exprimés. La participation officielle dépasse 67 %.\n\nLa campagne, menée dans un contexte de pandémie de Covid-19, est marquée par une opposition divisée et des appels au boycott. La communauté internationale prend acte des résultats. Sassou Nguesso entame un mandat de cinq ans — la durée ayant été ramenée de sept à cinq ans par la révision constitutionnelle de 2015.",
    locationId: "place-brazzaville",
    personalityIds: ["p-sassou-nguesso"],
    sourceIds: ["src-jeune-afrique"],
    relatedEventIds: ["evt-referendum-2015", "evt-rebellion-pool-2016"],
    tags: ["élection", "2021", "Covid-19"],
    status: "published",
  },

  // ===== Chemin de fer Congo-Océan (background culture/économie) =====
  {
    id: "evt-congo-ocean",
    slug: "chemin-de-fer-congo-ocean",
    title: "Le chemin de fer Congo-Océan",
    date: "1934-07-01",
    year: 1934,
    category: "economie",
    period: "1960-1969",
    summary:
      "Ligne ferroviaire historique reliant Brazzaville à Pointe-Noire (achevée en 1934), épine dorsale de l'économie congolaise pendant tout le XXe siècle et objet de modernisations successives.",
    context:
      "Construit entre 1921 et 1934 sous l'administration coloniale française, le Congo-Océan coûte la vie à des dizaines de milliers de travailleurs réquisitionnés. Il reste après l'indépendance une infrastructure vitale.",
    unfolding:
      "Après 1960, la ligne continue d'assurer l'essentiel du fret intérieur. La création du CFCO (Chemin de fer Congo-Océan) en 1962 structure l'exploitation. La ligne est modernisée à plusieurs reprises, notamment dans les années 1970 et 2000.",
    consequences:
      "Le Congo-Océan reste, malgré son déclin relatif, un symbole de l'histoire économique congolaise. La remise en état de la ligne est aujourd'hui un enjeu majeur de la politique d'infrastructure régionale (corridor nord-corridor sud).",
    content:
      "Construite entre 1921 et 1934 sous l'administration coloniale, la ligne du Congo-Océan relie Brazzaville à Pointe-Noire (510 km). Son chantier a coûté la vie à des dizaines de milliers de travailleurs forcés, faisant de cette ligne un lieu de mémoire complexe.\n\nAprès l'indépendance, le CFCO (Chemin de fer Congo-Océan, créé en 1962) exploite la ligne. Celle-ci transporte marchandises et passagers, relie Dolisie, et dessert les régions du Niari et de la Bouenza. Malgré des difficultés d'entretien récurrentes, la ligne reste un élément central de l'économie congolaise.",
    locationId: "place-pointe-noire",
    personalityIds: [],
    sourceIds: ["src-obenga-histoire", "src-archives-brazza"],
    relatedEventIds: [],
    tags: ["chemin de fer", "Congo-Océan", "infrastructure", "CFCO"],
    status: "published",
  },

  // ===== Hypermaritime / corridor — placeholder marqué à vérifier =====
  {
    id: "evt-hypermaritime",
    slug: "developpement-du-corridor-multiparti-pointe-noire",
    title: "Développement du corridor économique de Pointe-Noire",
    date: "2018-01-01",
    year: 2018,
    category: "economie",
    period: "2010-2019",
    summary:
      "À partir de la fin des années 2010, Pointe-Noire confirme son rôle de hub logistique et pétrolier d'Afrique centrale avec l'extension du port en eau profonde et la zone économique spéciale.",
    context:
      "Le port autonome de Pointe-Noire, déjà cœur de l'économie congolaise, devient un atout régional pour les pays enclavés (Tchad, RCA).",
    unfolding:
      "Les extensions successives du quai à minéralier, du terminal à conteneurs et l'aménagement d'une zone économique spéciale (ZES) visent à positionner Pointe-Noire comme porte maritime de l'Afrique centrale.",
    consequences:
      "Les recettes douanières et portuaires soutiennent le budget national, sans toutefois absorber la dette contractée au cours des années 2010.",
    content:
      "Le développement du corridor de Pointe-Noire vise à transformer la ville-port en hub logistique et pétrolier de l'Afrique centrale. L'extension du port en eau profonde et la création d'une zone économique spéciale accompagnent cette stratégie.",
    locationId: "place-pointe-noire",
    personalityIds: [],
    sourceIds: ["src-jeune-afrique"],
    relatedEventIds: ["evt-modernisation-infrastructures-2010s"],
    tags: ["Pointe-Noire", "port", "ZES", "pétrole"],
    status: "needs-verification",
  },
];

export const eventMap: Record<string, HistoricalEvent> = Object.fromEntries(
  events.map((e) => [e.id, e]),
);

export function getEvent(id: string): HistoricalEvent | undefined {
  return eventMap[id];
}

export function getEventBySlug(slug: string): HistoricalEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvents(): HistoricalEvent[] {
  return events.filter((e) => e.featured && e.status !== "draft");
}

export function getPublishedEvents(): HistoricalEvent[] {
  return events.filter((e) => e.status !== "draft");
}
