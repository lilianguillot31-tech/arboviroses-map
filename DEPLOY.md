# Déploiement

## Option 1 — GitHub Pages (recommandé)
Ce dépôt inclut déjà le workflow `.github/workflows/deploy-gh-pages.yml`.

1. Pousser la branche sur GitHub.
2. Dans **Settings > Pages**, choisir **Source: GitHub Actions**.
3. Lancer le workflow **Deploy static site to GitHub Pages** (ou push sur `main`/`master`/`work`).
4. URL finale:
   - `https://<org-ou-user>.github.io/<repo>/`

## Option 2 — Netlify (drag & drop)
1. Aller sur https://app.netlify.com/drop
2. Glisser-déposer le dossier du repo.
3. Netlify retourne une URL publique immédiate.

## Build
Aucun build requis: site statique (`index.html`, `styles.css`, `app.js`).
