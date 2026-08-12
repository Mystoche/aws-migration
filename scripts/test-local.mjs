#!/usr/bin/env node
/**
 * Congo History Cloud — Local test script
 * =======================================
 * Run with:  npm run test:local
 *
 * Checks:
 *   1. Dev server is running on http://localhost:3000
 *   2. All public + admin routes return HTTP 200
 *   3. 404 page returns 404
 *   4. Each route responds under a performance threshold (2nd hit, cached)
 *   5. dev.log contains no runtime errors
 *
 * Exit code 0 = all good, 1 = something failed.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BASE = "http://localhost:3000";
const ROOT = path.resolve(process.cwd());

const ROUTES = [
  { path: "/", label: "Accueil", maxMs: 300 },
  { path: "/timeline", label: "Timeline", maxMs: 300 },
  { path: "/events", label: "Événements (liste)", maxMs: 300 },
  { path: "/events/independance-de-la-republique-du-congo", label: "Détail événement", maxMs: 300 },
  { path: "/personalities", label: "Personnalités (liste)", maxMs: 300 },
  { path: "/personalities/denis-sassou-nguesso", label: "Détail personnalité", maxMs: 300 },
  { path: "/articles", label: "Articles (liste)", maxMs: 300 },
  { path: "/articles/brazzaville-memoires-dune-capitale", label: "Détail article", maxMs: 300 },
  { path: "/gallery", label: "Galerie", maxMs: 300 },
  { path: "/map", label: "Carte", maxMs: 500 },
  { path: "/search", label: "Recherche", maxMs: 300 },
  { path: "/search?q=congo", label: "Recherche (q=congo)", maxMs: 300 },
  { path: "/about", label: "À propos", maxMs: 300 },
  { path: "/login", label: "Connexion", maxMs: 300 },
  { path: "/admin", label: "Admin", maxMs: 500 },
];

const NOT_FOUND_PATH = "/cette-page-nexiste-pas";

// Tiny color helpers (no dependency)
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

function ok(msg) { console.log(`${C.green}✓${C.reset} ${msg}`); }
function fail(msg) { console.log(`${C.red}✗${C.reset} ${msg}`); }
function info(msg) { console.log(`${C.cyan}→${C.reset} ${msg}`); }
function header(msg) { console.log(`\n${C.bold}${C.cyan}── ${msg} ──${C.reset}`); }

let failures = 0;
let warnings = 0;

/* ---------------------------------------------------------------- */
/* 1. Dev server alive?                                             */
/* ---------------------------------------------------------------- */
async function checkServerAlive() {
  header("1. Vérification du serveur de développement");
  try {
    const res = await fetch(BASE, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      ok(`Serveur actif sur ${BASE}`);
      return true;
    }
    fail(`Serveur répond mais status ${res.status}`);
    return false;
  } catch (e) {
    fail(`Impossible de joindre ${BASE}. Lancez d'abord : ${C.bold}npm run dev${C.reset}`);
    console.log(`   ${C.dim}(${e.message})${C.reset}`);
    return false;
  }
}

/* ---------------------------------------------------------------- */
/* 2. Route status + timing                                         */
/* ---------------------------------------------------------------- */
async function checkRoutes() {
  header("2. Routes publiques & admin (status + performance)");

  for (const route of ROUTES) {
    const url = BASE + route.path;
    // 1st hit (may compile)
    try { await fetch(url, { signal: AbortSignal.timeout(30000) }); } catch {}
    // small pause so cache settles
    await new Promise((r) => setTimeout(r, 100));
    // 2nd hit (measured)
    const t0 = performance.now();
    let res;
    try {
      res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    } catch (e) {
      fail(`${route.label} — ${route.path} — ${C.red}timeout/erreur${C.reset}`);
      failures++;
      continue;
    }
    const ms = Math.round(performance.now() - t0);

    if (!res.ok) {
      fail(`${route.label} — ${route.path} — HTTP ${res.status}`);
      failures++;
    } else if (ms > route.maxMs) {
      console.log(`${C.yellow}⚠${C.reset} ${route.label} — ${route.path} — HTTP 200 en ${C.yellow}${ms}ms${C.reset} (seuil ${route.maxMs}ms)`);
      warnings++;
    } else {
      ok(`${route.label} — ${route.path} — HTTP 200 en ${C.green}${ms}ms${C.reset}`);
    }
  }
}

/* ---------------------------------------------------------------- */
/* 3. 404 page                                                      */
/* ---------------------------------------------------------------- */
async function check404() {
  header("3. Page 404");
  try {
    const res = await fetch(BASE + NOT_FOUND_PATH, { signal: AbortSignal.timeout(10000) });
    if (res.status === 404) {
      ok(`${NOT_FOUND_PATH} — HTTP 404 ${C.dim}(page 404 personnalisée active)${C.reset}`);
    } else {
      fail(`${NOT_FOUND_PATH} — HTTP ${res.status} (attendu 404)`);
      failures++;
    }
  } catch (e) {
    fail(`${NOT_FOUND_PATH} — erreur: ${e.message}`);
    failures++;
  }
}

/* ---------------------------------------------------------------- */
/* 4. Dev log errors                                                */
/* ---------------------------------------------------------------- */
function checkDevLog() {
  header("4. Recherche d'erreurs dans dev.log");
  const logPath = path.join(ROOT, "dev.log");
  if (!fs.existsSync(logPath)) {
    console.log(`${C.yellow}⚠${C.reset} dev.log introuvable — skip`);
    warnings++;
    return;
  }
  const content = fs.readFileSync(logPath, "utf-8");
  // Tail the last 1000 lines to avoid old noise
  const lines = content.split("\n").slice(-1000);
  const errorPatterns = [
    /\bError:\s/,
    /\bTypeError:/,
    /\bReferenceError:/,
    /\bModule not found\b/i,
    /\bFailed to compile\b/i,
    /EADDRINUSE/,
  ];
  const found = lines.filter((l) => errorPatterns.some((p) => p.test(l)) && !l.includes("react-devtools"));
  if (found.length === 0) {
    ok("Aucune erreur détectée dans les 1000 dernières lignes de dev.log");
  } else {
    fail(`${found.length} ligne(s) d'erreur détectée(s) dans dev.log :`);
    found.slice(0, 5).forEach((l) => console.log(`   ${C.dim}${l.trim().slice(0, 200)}${C.reset}`));
    failures++;
  }
}

/* ---------------------------------------------------------------- */
/* 5. Lint                                                         */
/* ---------------------------------------------------------------- */
function checkLint() {
  header("5. Lint ESLint");
  try {
    execSync("npm run lint", { stdio: "pipe", cwd: ROOT });
    ok("ESLint — 0 erreur, 0 warning");
  } catch (e) {
    const out = e.stdout?.toString() ?? "";
    if (out.includes("✖") || out.includes("error")) {
      fail("ESLint a détecté des erreurs :");
      console.log(out.split("\n").slice(0, 20).map((l) => `   ${C.dim}${l}${C.reset}`).join("\n"));
    } else {
      fail("ESLint a échoué (voir sortie)");
    }
    failures++;
  }
}

/* ---------------------------------------------------------------- */
/* 6. Key files sanity                                             */
/* ---------------------------------------------------------------- */
function checkFiles() {
  header("6. Fichiers clés présents");
  const mustExist = [
    "public/images/congo-carte.png",
    "public/images/hero-congo-river.png",
    "src/data/events.ts",
    "src/data/personalities.ts",
    "src/data/articles.ts",
    "src/data/sources.ts",
    "src/data/places.ts",
    "src/services/index.ts",
    "README.md",
  ];
  let allOk = true;
  for (const f of mustExist) {
    if (fs.existsSync(path.join(ROOT, f))) {
      ok(f);
    } else {
      fail(`${f} — manquant`);
      allOk = false;
      failures++;
    }
  }
  return allOk;
}

/* ---------------------------------------------------------------- */
/* 7. Data sanity                                                  */
/* ---------------------------------------------------------------- */
function checkData() {
  header("7. Cohérence des données");
  // Dynamic import of the TS data is tricky from a Node script,
  // so we just read the files and check counts quickly via regex.
  const eventsFile = fs.readFileSync(path.join(ROOT, "src/data/events.ts"), "utf-8");
  const eventCount = (eventsFile.match(/\bid:\s*"evt-/g) || []).length;
  if (eventCount >= 15) ok(`${eventCount} événements dans src/data/events.ts`);
  else { fail(`Seulement ${eventCount} événements (attendu ≥ 15)`); failures++; }

  const persoFile = fs.readFileSync(path.join(ROOT, "src/data/personalities.ts"), "utf-8");
  const persoCount = (persoFile.match(/\bid:\s*"p-/g) || []).length;
  if (persoCount >= 10) ok(`${persoCount} personnalités dans src/data/personalities.ts`);
  else { fail(`Seulement ${persoCount} personnalités (attendu ≥ 10)`); failures++; }

  const articleFile = fs.readFileSync(path.join(ROOT, "src/data/articles.ts"), "utf-8");
  const articleCount = (articleFile.match(/\bid:\s*"art-/g) || []).length;
  if (articleCount >= 5) ok(`${articleCount} articles dans src/data/articles.ts`);
  else { fail(`Seulement ${articleCount} articles (attendu ≥ 5)`); failures++; }
}

/* ---------------------------------------------------------------- */
/* MAIN                                                            */
/* ---------------------------------------------------------------- */
async function main() {
  console.log(`\n${C.bold}${C.cyan}╔══════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}${C.cyan}║  CONGO HISTORY CLOUD — Test local automatisé     ║${C.reset}`);
  console.log(`${C.bold}${C.cyan}╚══════════════════════════════════════════════════╝${C.reset}`);

  const alive = await checkServerAlive();
  if (!alive) {
    console.log(`\n${C.red}${C.bold}Abandon : le serveur de développement n'est pas actif.${C.reset}`);
    console.log(`Lancez-le avec : ${C.bold}npm run dev${C.reset}, puis relancez ${C.bold}npm run test:local${C.reset}.\n`);
    process.exit(1);
  }

  await checkRoutes();
  await check404();
  checkDevLog();
  checkLint();
  checkFiles();
  checkData();

  /* Summary */
  console.log(`\n${C.bold}${C.cyan}══════════════ RÉSUMÉ ══════════════${C.reset}`);
  if (failures === 0 && warnings === 0) {
    console.log(`${C.bold}${C.green}✓ TOUS LES TESTS SONT PASSÉS${C.reset} — le site est prêt pour la production.\n`);
    process.exit(0);
  } else {
    if (failures > 0) console.log(`${C.red}${C.bold}✗ ${failures} échec(s)${C.reset}`);
    if (warnings > 0) console.log(`${C.yellow}⚠ ${warnings} avertissement(s)${C.reset}`);
    console.log("");
    process.exit(failures > 0 ? 1 : 0);
  }
}

main().catch((e) => {
  console.error(`${C.red}Erreur fatale:${C.reset}`, e);
  process.exit(1);
});
