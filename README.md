# Carte mondiale des pathologies du voyageur

Prototype web statique pour visualiser, pour un voyageur au départ de France, les niveaux de vigilance vaccinale/épidémiologique par pays.

## Fonctions livrées
- Bandeau supérieur avec filtres multi-sélection des pathologies:
  - Arboviroses
  - Encéphalite japonaise
  - Zika
  - Chikungunya
  - Dengue
  - Rage
  - Fièvre typhoïde
  - Choléra
- Carte du monde interactive (Leaflet) avec gradient de couleurs de niveau 0→3.
- Tooltip pays avec score agrégé selon les pathologies sélectionnées.

## Lancer localement
Ouvrir `index.html` dans un navigateur.

## Source des recommandations
- Base de cadrage: **HCSP – Recommandations sanitaires aux voyageurs, édition 2025** (document daté du 4 juin 2025, mise en ligne 1er juillet 2025).
- Compléments épidémiologiques à intégrer dans itérations suivantes: cartes CDC Travelers' Health et ECDC.

> ⚠️ Le jeu de données inclus (`countryRisk` dans `app.js`) est un **seed dataset** de démonstration. Pour un usage médical opérationnel, brancher une pipeline de mise à jour officielle et une validation experte.


## Déploiement
- Configuration GitHub Pages disponible: `.github/workflows/deploy-gh-pages.yml`.
- Guide pas-à-pas: `DEPLOY.md`.
