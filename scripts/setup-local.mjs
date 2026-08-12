#!/usr/bin/env node
/**
 * Congo History Cloud — Local Setup Script
 * ========================================
 * Run with:  npm run setup
 *
 * Does everything needed to get the app running locally:
 *   1. Checks Node.js version (>= 18)
 *   2. Runs `npm install` if node_modules is missing
 *   3. Verifies all required files exist (data, images, etc.)
 *   4. Creates a portable .env.local if needed
 *   5. Regenerates the hero image if missing
 *   6. Starts the dev server and runs the local test suite
 *
 * If everything passes, the app is ready at http://localhost:3000.
 */

import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const C = {
  reset: "\x1b[0m", bold: "\x1b[1m",
  green: "\x1b[32m", red: "\x1b[31m", yellow: "\x1b[33m", cyan: "\x1b[36m",
  dim: "\x1b[2m",
};
const ok = (m) => console.log(`${C.green}✓${C.reset} ${m}`);
const fail = (m) => { console.log(`${C.red}✗${C.reset} ${m}`); process.exit(1); };
const info = (m) => console.log(`${C.cyan}→${C.reset} ${m}`);
const header = (m) => console.log(`\n${C.bold}${C.cyan}── ${m} ──${C.reset}`);

let failures = 0;

/* 1. Node version */
function checkNode() {
  header("1. Vérification de Node.js");
  const version = process.versions.node;
  const major = parseInt(version.split(".")[0], 10);
  info(`Node.js v${version} détecté`);
  if (major < 18) {
    fail(`Node.js >= 18 requis (vous avez ${major}). Mettez à jour : https://nodejs.org/`);
  }
  ok(`Node.js v${version} — OK`);
}

/* 2. npm install */
function installDeps() {
  header("2. Installation des dépendances npm");
  const nodeModules = path.join(ROOT, "node_modules");
  if (fs.existsSync(nodeModules) && fs.existsSync(path.join(nodeModules, "next", "package.json"))) {
    ok("node_modules déjà présent");
    return;
  }
  info("Exécution de `npm install` (peut prendre quelques minutes)…");
  try {
    execSync("npm install", { stdio: "inherit", cwd: ROOT });
    ok("Dépendances installées");
  } catch (e) {
    fail("Échec de `npm install`. Vérifiez votre connexion réseau.");
  }
}

/* 3. Required files */
function checkFiles() {
  header("3. Vérification des fichiers requis");
  const required = [
    "src/data/events.ts",
    "src/data/personalities.ts",
    "src/data/articles.ts",
    "src/data/places.ts",
    "src/data/sources.ts",
    "src/data/periods.ts",
    "src/data/categories.ts",
    "src/data/gallery.ts",
    "src/services/index.ts",
    "src/types/index.ts",
    "src/lib/repository/index.ts",
    "src/components/layout/Navbar.tsx",
    "src/components/layout/Footer.tsx",
    "src/components/layout/CongoLogo.tsx",
    "src/components/common/Reveal.tsx",
    "src/components/common/VisualIdentity.tsx",
    "src/components/home/Hero.tsx",
    "src/components/home/TimeTravel.tsx",
    "src/components/events/EventCard.tsx",
    "src/components/personalities/PersonalityCard.tsx",
    "src/components/articles/ArticleCard.tsx",
    "src/components/query-provider.tsx",
    "src/components/theme-provider.tsx",
    "src/app/layout.tsx",
    "src/app/globals.css",
    "src/app/(site)/layout.tsx",
    "src/app/(site)/page.tsx",
    "src/app/(site)/timeline/page.tsx",
    "src/app/(site)/events/page.tsx",
    "src/app/(site)/personalities/page.tsx",
    "src/app/(site)/articles/page.tsx",
    "src/app/(site)/gallery/page.tsx",
    "src/app/(site)/map/page.tsx",
    "src/app/(site)/search/page.tsx",
    "src/app/(site)/about/page.tsx",
    "src/app/login/page.tsx",
    "src/app/admin/layout.tsx",
    "src/app/admin/page.tsx",
    "public/images/congo-carte.png",
    "public/images/hero-congo-river.png",
    "next.config.ts",
    "tailwind.config.ts",
    "tsconfig.json",
    "package.json",
  ];
  let allOk = true;
  for (const f of required) {
    if (fs.existsSync(path.join(ROOT, f))) {
      ok(f);
    } else {
      console.log(`${C.red}✗${C.reset} ${f} — MANQUANT`);
      allOk = false;
      failures++;
    }
  }
  if (!allOk) {
    console.log(`\n${C.yellow}Certains fichiers manquent. Le projet est peut-être incomplet.${C.reset}`);
    console.log(`${C.yellow}Récupérez une version complète du code source.${C.reset}`);
  }
}

/* 4. .env.local */
function ensureEnv() {
  header("4. Fichier .env.local");
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, [
      "# Congo History Cloud — Local environment",
      "# This file is loaded by Next.js automatically.",
      "",
      "# Data source: 'local' (in-memory data files) or 'aws' (DynamoDB)",
      "NEXT_PUBLIC_DATA_SOURCE=local",
      "",
      "# SQLite database path (used only if you enable Prisma later)",
      'DATABASE_URL="file:./db/custom.db"',
      "",
      "# AWS config (only needed when NEXT_PUBLIC_DATA_SOURCE=aws)",
      "# AWS_REGION=eu-central-1",
      "# AWS_ACCESS_KEY_ID=...",
      "# AWS_SECRET_ACCESS_KEY=...",
      "# DDB_TABLE_EVENTS=congo-history-events",
      "# DDB_TABLE_PERSONALITIES=congo-history-personalities",
      "# COGNITO_USER_POOL_ID=...",
      "# COGNITO_CLIENT_ID=...",
      "# CLOUDFRONT_URL=https://d1234567890.cloudfront.net",
      "",
    ].join("\n"));
    ok(".env.local créé avec valeurs par défaut (local mode)");
  } else {
    ok(".env.local déjà présent");
  }
}

/* 5. Generate hero image if missing */
async function ensureHeroImage() {
  header("5. Image hero");
  const heroPath = path.join(ROOT, "public/images/hero-congo-river.png");
  if (fs.existsSync(heroPath) && fs.statSync(heroPath).size > 10000) {
    ok("public/images/hero-congo-river.png présent");
    return;
  }
  info("Régénération de l'image hero via z-ai CLI…");
  try {
    execSync(
      `z-ai image -p "Cinematic aerial view of the Congo River at dusk near Brazzaville, vast tropical rainforest, dramatic golden sunset light, mist over the water, dark moody atmosphere, premium editorial photography, deep green and amber tones, subtle African landscape, no text, high quality, atmospheric" -o "${heroPath}" -s 1344x768`,
      { stdio: "inherit", cwd: ROOT },
    );
    ok("Image hero générée");
  } catch (e) {
    console.log(`${C.yellow}⚠${C.reset} Impossible de générer l'image hero (z-ai CLI non disponible).`);
    console.log(`   ${C.dim}L'app fonctionnera quand même avec un placeholder.${C.reset}`);
  }
}

/* 6. Lint */
function lint() {
  header("6. Lint ESLint");
  try {
    execSync("npm run lint", { stdio: "inherit", cwd: ROOT });
    ok("Lint — OK");
  } catch (e) {
    console.log(`${C.yellow}⚠${C.reset} Le lint a des warnings, mais l'app devrait fonctionner.`);
    failures++;
  }
}

/* 7. Start dev server (background) + run tests */
async function startAndTest() {
  header("7. Démarrage du serveur de développement");

  // Check if a server is already running on port 3000
  let alreadyRunning = false;
  try {
    const res = await fetch("http://localhost:3000", { signal: AbortSignal.timeout(2000) });
    alreadyRunning = res.ok;
  } catch {}
  if (alreadyRunning) {
    ok("Serveur déjà actif sur http://localhost:3000");
  } else {
    info("Démarrage de `npm run dev` en arrière-plan…");
    const child = spawn("npm", ["run", "dev"], {
      cwd: ROOT,
      detached: true,
      stdio: "ignore",
      shell: true,
    });
    child.unref();

    // Wait for the server to be ready (up to 60s)
    info("Attente du démarrage du serveur…");
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      try {
        const res = await fetch("http://localhost:3000", { signal: AbortSignal.timeout(3000) });
        if (res.ok) { ok("Serveur prêt sur http://localhost:3000"); break; }
      } catch {}
      if (i === 29) fail("Le serveur n'a pas démarré dans les 60 secondes.");
    }
  }
}

/* 8. Run the automated test suite */
function runTests() {
  header("8. Test automatisé");
  try {
    execSync("npm run test:local", { stdio: "inherit", cwd: ROOT });
  } catch (e) {
    failures++;
  }
}

/* MAIN */
async function main() {
  console.log(`\n${C.bold}${C.cyan}╔══════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}${C.cyan}║  CONGO HISTORY CLOUD — Setup local complet        ║${C.reset}`);
  console.log(`${C.bold}${C.cyan}╚══════════════════════════════════════════════════╝${C.reset}`);

  checkNode();
  installDeps();
  checkFiles();
  ensureEnv();
  await ensureHeroImage();
  lint();
  await startAndTest();
  runTests();

  console.log(`\n${C.bold}${C.cyan}════════════════════════════════════════${C.reset}`);
  if (failures === 0) {
    console.log(`${C.bold}${C.green}✓ SETUP TERMINÉ AVEC SUCCÈS${C.reset}`);
    console.log(`\nL'application est disponible sur : ${C.bold}http://localhost:3000${C.reset}\n`);
    console.log(`${C.bold}Identifiants admin :${C.reset}`);
    console.log(`  Email    : admin@congo-history.cloud`);
    console.log(`  Password : congo1960\n`);
    console.log(`${C.bold}Commandes utiles :${C.reset}`);
    console.log(`  npm run dev          — Démarrer le serveur de dev`);
    console.log(`  npm run test:local   — Tester l'application`);
    console.log(`  npm run lint         — Vérifier la qualité du code`);
    console.log(`  npm run build        — Build de production\n`);
  } else {
    console.log(`${C.yellow}${C.bold}⚠ Setup terminé avec ${failures} avertissement(s)${C.reset}`);
    console.log(`L'application devrait quand même fonctionner. Vérifiez les messages ci-dessus.\n`);
  }
}

main().catch((e) => {
  console.error(`${C.red}Erreur fatale:${C.reset}`, e);
  process.exit(1);
});
