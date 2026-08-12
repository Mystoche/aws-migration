# Congo History Cloud

> « Racontons l'histoire du Congo à travers le Cloud. »

**Congo History Cloud** est une plateforme numérique interactive de mémoire et d'histoire de la **République du Congo (Congo-Brazzaville)**, de l'indépendance en **1960** à aujourd'hui.

Conçue comme une **archive historique numérique moderne**, l'application mêle histoire, design africain contemporain et technologies cloud-ready.

---

## Sommaire

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Installation & lancement](#installation--lancement)
- [Structure du projet](#structure-du-projet)
- [Données historiques](#données-historiques)
- [Administration](#administration)
- [Ajouter du contenu](#ajouter-du-contenu)
- [Migration future vers AWS Serverless](#migration-future-vers-aws-serverless)

---

## Aperçu

L'application permet à un utilisateur de :

- découvrir les grandes périodes historiques du Congo ;
- parcourir une **timeline** interactive de 1960 à aujourd'hui ;
- consulter les **événements** et leurs pages détaillées (contexte, déroulement, conséquences, sources) ;
- découvrir les **personnalités** (présidents, écrivains, musiciens, pasteurs) ;
- lire des **articles** éditoriaux avec sommaire et temps de lecture ;
- explorer une **galerie** visuelle avec lightbox ;
- naviguer sur une **carte interactive** (Leaflet) des lieux historiques ;
- effectuer une **recherche globale** (événements, personnalités, articles, lieux, sources) ;
- consulter les **sources** de chaque contenu, avec un badge « À vérifier » pour les éléments non confirmés ;
- accéder à un **espace d'administration** complet (CRUD, dashboard, statistiques).

---

## Fonctionnalités

| Module | Description |
|--------|-------------|
| **Accueil** | Hero spectaculaire, voyage dans le temps, périodes, événements à la une, personnalités, articles, CTA cloud |
| **Timeline** | Timeline alternée (desktop) / verticale (mobile), filtres par période & catégorie, animations au scroll |
| **Événements** | Catalogue filtrable + page détaillée (contexte, déroulement, conséquences, personnalités/lieux liés, sources, partage, précédent/suivant) |
| **Personnalités** | Catalogue filtrable + page biographique détaillée |
| **Articles** | Carnet éditorial + lecture avec sommaire actif, temps de lecture, articles associés |
| **Galerie** | Masonry grid, lightbox avec zoom et navigation clavier, filtres par catégorie |
| **Carte** | Carte Leaflet interactive, marqueurs des villes, sidebar détaillée avec événements & personnalités liés |
| **Recherche** | Recherche instantanée multi-types, suggestions, filtres par type et décennie |
| **Sources** | Composant `SourceList` avec typologie (livre, archive, document officiel, etc.) et statut de vérification |
| **Administration** | Login simulé, dashboard avec graphiques (Recharts), CRUD complet pour toutes les entités |
| **404** | Page d'erreur thématique |

---

## Technologies

- **Next.js 16** (App Router, React 19, Server Components)
- **TypeScript 5** (strict)
- **Tailwind CSS 4** + **shadcn/ui** (style New York)
- **Framer Motion** (animations)
- **Lucide React** (icônes)
- **Leaflet** + **react-leaflet** (cartographie)
- **TanStack Query** (cache/state serveur)
- **Recharts** (graphiques admin)
- **Zustand** (state admin + auth simulée)
- **next-themes** (dark mode)
- **sonner** (toasts)
- **Prisma** (prêt pour base de données, non utilisé dans cette version locale)

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       PRESENTATION (UI)                        │
│  app/(site)/* · app/admin/* · components/*                    │
└──────────────────────────────┬───────────────────────────────┘
                               │ appelle
┌──────────────────────────────▼───────────────────────────────┐
│                      SERVICES LAYER                           │
│  services/eventsService · personalitiesService · searchService │
│  … etc.                                                        │
│  ( signatures async — point unique d'accès aux données )       │
└──────────────────────────────┬───────────────────────────────┘
                               │ lit aujourd'hui / fetchera demain
┌──────────────────────────────▼───────────────────────────────┐
│                      DATA LAYER                                │
│  AUJOURD'HUI (local)          │  DEMAIN (AWS)                 │
│  src/data/*.ts                │  API Gateway → Lambda → Dynamo │
│  (données en mémoire)         │  S3 pour les médias           │
└──────────────────────────────────────────────────────────────┘
```

**Principe clé** : la couche `src/services` isole totalement l'UI de la source de données.
Aujourd'hui, chaque service lit les fichiers locaux de `src/data/*`. Demain, il suffit
de remplacer chaque implémentation par un `fetch('/api/...')` vers API Gateway/Lambda,
sans toucher au moindre composant.

---

## Installation & lancement

Prérequis : **Node.js 18+** et **npm** (ou **bun**).

```bash
# 1. Installer les dépendances
npm install
# (ou : bun install)

# 2. Lancer le serveur de développement
npm run dev
# (ou : bun run dev)

# 3. Ouvrir l'application
# → http://localhost:3000
```

### Autres commandes

```bash
npm run lint     # Vérification ESLint
npm run build    # Build de production
npm run preview  # Prévisualisation du build
```

### Identifiants admin (démo)

```
URL      : http://localhost:3000/admin/login
Email    : admin@congo-history.cloud
Mot de passe : congo1960
```

> Authentification simulée en local (Zustand + localStorage). Migration future vers
> **Amazon Cognito**.

---

## Structure du projet

```
src/
├── app/
│   ├── (site)/                 # Site public (Navbar + Footer)
│   │   ├── page.tsx            # Accueil
│   │   ├── timeline/
│   │   ├── events/ · [slug]/
│   │   ├── personalities/ · [slug]/
│   │   ├── articles/ · [slug]/
│   │   ├── gallery/
│   │   ├── map/
│   │   ├── search/
│   │   └── about/
│   ├── admin/                  # Espace administration
│   │   ├── layout.tsx          # Sidebar + auth gate
│   │   ├── login/
│   │   ├── page.tsx            # Dashboard
│   │   ├── events/ · personalities/ · articles/
│   │   ├── gallery/ · sources/ · places/
│   ├── layout.tsx              # Layout racine (fonts, providers)
│   ├── globals.css             # Thème Congo + utilitaires
│   └── not-found.tsx           # 404
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── home/                   # Hero, TimeTravel
│   ├── common/                 # SectionHeading, Reveal, States, VisualIdentity
│   ├── events/ · personalities/ · articles/
│   ├── sources/ · share/ · map/ · admin/
│   └── ui/                     # shadcn/ui
├── data/                       # Données historiques (local)
│   ├── events.ts · personalities.ts · articles.ts
│   ├── places.ts · sources.ts · periods.ts
│   ├── categories.ts · gallery.ts
├── services/                   # Couche d'accès aux données (async)
│   └── index.ts
├── types/                      # Types TypeScript du domaine
├── lib/                        # utils, constants, admin-store (Zustand)
└── hooks/                      # use-reveal, etc.
```

---

## Données historiques

Le dossier `src/data/` contient des données de démonstration reposant sur des
**faits historiques largement documentés** de l'histoire du Congo-Brazzaville :

- Indépendance du 15 août 1960 (Youlou)
- Trois Glorieuses d'août 1963 (Massamba-Débat)
- Proclamation de la République populaire en 1969 (Ngouabi)
- Victoire à la CAN 1972
- Assassinat de Marien Ngouabi en 1977
- Arrivée de Denis Sassou Nguesso en 1979
- Conférence Nationale Souveraine de 1991 (Milongo, Kombo)
- Premières élections pluralistes de 1992 (Lissouba)
- Guerre civile de 1997 (intervention angolaise)
- Constitution de 2002
- Cinquantenaire de 2010
- Référendum de 2015
- Rébellion du Pool 2016-2017
- Réélection de 2021

### Politique de fiabilité

- Aucune source n'est inventée : seules des références réelles (ouvrages,
  documents officiels, archives de presse) sont citées.
- Tout élément dont la référence exacte n'a pas pu être confirmée est marqué
  `status: "needs-verification"` et porte un badge **« À vérifier »** côté public,
  accompagné de la mention `TODO: VERIFY SOURCE`.
- Les données sont conçues pour être **remplaçables** ultérieurement par des
  contenus validés par des historiens professionnels.

---

## Administration

L'espace `/admin` propose :

- **Dashboard** : statistiques (compteurs, graphiques par décennie et par catégorie,
  événements récents, contenus à vérifier) ;
- **CRUD complet** pour : événements, personnalités, articles, sources, lieux, galerie ;
- **Recherche & filtres** dans chaque liste ;
- **Authentification simulée** (Zustand persisté en localStorage).

Les modifications effectuées dans l'admin sont conservées en mémoire (et en
localStorage pour l'auth) pendant la session. Elles ne persistent pas au
redémarrage côté serveur — c'est le comportement attendu avant la connexion
à DynamoDB.

---

## Ajouter du contenu

### Ajouter un événement

1. Via l'admin : `/admin/events` → bouton **« Nouvel événement »**.
2. Ou en éditant directement `src/data/events.ts` :

```ts
{
  id: "evt-mon-evenement",
  slug: "mon-evenement",
  title: "Titre de l'événement",
  date: "1975-06-15",
  year: 1975, month: 6, day: 15,
  category: "politique",            // voir categories.ts
  period: "1970-1979",              // voir periods.ts
  summary: "Résumé court…",
  content: "Récit complet…",
  sourceIds: ["src-xxx"],
  tags: ["mot-clé"],
  status: "published",              // ou "draft" ou "needs-verification"
}
```

### Ajouter une personnalité

`src/data/personalities.ts` — modèle `Personality` (id, slug, name, dates, role,
biography, functions, eventIds, sourceIds).

### Ajouter un article

`src/data/articles.ts` — modèle `Article`. Le contenu est du markdown simple :
`## Titre` et `### Sous-titre`, avec `{#ancre}` optionnel à la fin du titre pour
le sommaire actif.

### Ajouter une source

`src/data/sources.ts` — modèle `Source` (type, title, author, year, url, verified).
Mettre `verified: false` si la référence exacte n'est pas confirmée.

---

## Migration future vers AWS Serverless

L'application est **conçue pour une migration native vers AWS Serverless**.
Le déploiement cloud fera l'objet d'une étape ultérieure dédiée.

### Architecture cible

| Couche | Service AWS |
|--------|-------------|
| Frontend (SSR/SSG) | **S3 + CloudFront** (export statique) ou **Amplify Hosting** |
| API | **API Gateway** + **Lambda** (Node.js / TypeScript) |
| Base de données | **DynamoDB** (une table par entité, ou single-table design) |
| Médias (images) | **S3** + **CloudFront** pour la distribution |
| Authentification | **Amazon Cognito** (user pools) |
| Recherche | **Amazon OpenSearch Serverless** (optionnel) |
| Cache | **CloudFront** + **DAX** pour DynamoDB (optionnel) |

### Comment migrer sans réécriture

1. **Implémenter les routes API** sous `src/app/api/*` qui appellent DynamoDB.
2. **Remplacer** chaque service de `src/services/index.ts` par un `fetch('/api/...')`.
   Les signatures restent identiques → aucun composant à modifier.
3. **Brancher Cognito** en remplaçant `useAuth` (Zustand) par `@aws-amplify/auth`.
4. **Stocker les images** sur S3 et remplacer les `imageUrl: "ident:..."` par
   des URLs CloudFront.
5. **Déployer** le frontend via `next build` (export statique) sur S3+CloudFront,
   ou via Amplify.

Exemple de migration d'un service :

```ts
// Aujourd'hui (local)
async list() {
  return delay(events); // lit src/data/events.ts
}

// Demain (AWS)
async list() {
  const res = await fetch('/api/events');   // → API Gateway → Lambda → DynamoDB
  return res.json();
}
```

---

## Politique de sources

> **NE JAMAIS INVENTER DE SOURCE.**

Chaque source listée dans `src/data/sources.ts` correspond à un ouvrage, un
document ou une archive réelle. Lorsqu'une référence exacte (éditeur, année,
ISBN) ne peut être confirmée, `verified` est mis à `false` et la description
porte la mention `TODO: VERIFY SOURCE`. L'interface affiche alors un badge
**« À vérifier »** bien visible.

---

## Licence

Projet de démonstration — © 2026 Congo History Cloud. Tous droits réservés.

L'histoire du Congo appartient à tous les Congolais ; cette plateforme n'est
qu'un humble vecteur numérique.
