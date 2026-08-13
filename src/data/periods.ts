import type { PeriodInfo } from "@/types";

/**
 * Historical periods dividing Congo's post-independence history.
 */
export const periods: PeriodInfo[] = [
  {
    id: "1960-1969",
    label: "Indépendance & Premiers Pas",
    yearStart: 1960,
    yearEnd: 1969,
    description:
      "L'accession à la souveraineté en 1960, la révolution des Trois Glorieuses en 1963, puis l'avènement de la République populaire en 1968-1969.",
    color: "#009543",
  },
  {
    id: "1970-1979",
    label: "Révolution & Transition",
    yearStart: 1970,
    yearEnd: 1979,
    description:
      "L'ère marxiste-léniniste du Parti Congolais du Travail, l'assassinat du président Marien Ngouabi en 1977 et l'arrivée de Denis Sassou Nguesso en 1979.",
    color: "#DC241F",
  },
  {
    id: "1980-1989",
    label: "Pétrole & Contestation",
    yearStart: 1980,
    yearEnd: 1989,
    description:
      "Boom pétrolier, dépendance économique croissante et montée des revendications démocratiques à la fin de la décennie.",
    color: "#FBDE4A",
  },
  {
    id: "1990-1999",
    label: "Démocratie & Guerre Civile",
    yearStart: 1990,
    yearEnd: 1999,
    description:
      "La Conférence Nationale Souveraine de 1991, les premières élections pluralistes de 1992, puis la guerre civile de 1997 et le retour de Denis Sassou Nguesso.",
    color: "#DC241F",
  },
  {
    id: "2000-2009",
    label: "Reconstruction & Elections",
    yearStart: 2000,
    yearEnd: 2009,
    description:
      "Réconciliation nationale, nouvelle constitution en 2002, et consolidation du pouvoir après les accords de paix.",
    color: "#009543",
  },
  {
    id: "2010-2019",
    label: "Cinquantenaire & Modernisation",
    yearStart: 2010,
    yearEnd: 2019,
    description:
      "Célébrations du 50e anniversaire de l'indépendance, référendum constitutionnel de 2015 et modernisation des infrastructures.",
    color: "#FBDE4A",
  },
  {
    id: "2020-aujourdhui",
    label: "Congo Contemporain",
    yearStart: 2020,
    yearEnd: null,
    description:
      "Gestion de la pandémie, réélection de 2021, organisation de sommets africains et transitions numériques.",
    color: "#009543",
  },
];

export const periodMap: Record<string, PeriodInfo> = Object.fromEntries(
  periods.map((p) => [p.id, p]),
);

export function getPeriodByYear(year: number): PeriodInfo | undefined {
  return periods.find(
    (p) => year >= p.yearStart && (p.yearEnd === null || year <= p.yearEnd),
  );
}
