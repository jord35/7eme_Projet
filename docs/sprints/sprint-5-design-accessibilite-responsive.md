# Sprint 5 — Design, Accessibilité & Responsive

> **Objectif :** Peaufiner l'application pour la soutenance
> **Durée estimée :** 3-4 jours
> **Dépendances :** Sprint 4 terminé

---

## 1. Design & Style

- [ ] Vérifier la cohérence entre [`tailwind.config.ts`](../../frontend/tailwind.config.ts) et [`design-tokens.json`](../design-tokens.json)
- [ ] Remplacer les couleurs `indigo-*`, `gray-*` des composants importés par `brand-orange-*`, `neutral-*`
- [ ] Corriger les warnings SVG (images avec width/height modifié sans l'autre)
- [ ] Vérifier les espacements, tailles de police, ombres

---

## 2. Accessibilité (US-012)

- [ ] **Labels ARIA** sur tous les composants interactifs
- [ ] **Focus visible** (outline) sur tous les éléments cliquables
- [ ] **Skip link** "Aller au contenu" en haut de chaque page
- [ ] **Modales** : `role="dialog"`, `aria-modal="true"`, piège de focus, Escape pour fermer
- [ ] **Messages d'erreur** : `role="alert"` sur les toasts et erreurs de formulaire
- [ ] **Images** : `alt` descriptif ou `alt=""` pour les décoratives
- [ ] **Contraste** : vérifier le ratio 4.5:1 minimum

---

## 3. Responsive (US-013)

- [ ] **Menu hamburger** pour la navigation sur mobile (< 768px)
- [ ] **Kanban** : 1 colonne sur mobile, 2 sur tablette, 3 sur desktop
- [ ] **Modales** : plein écran sur mobile
- [ ] **Grille projets** : déjà responsive (1/2/3 colonnes) — vérifier
- [ ] **Formulaires** : pleine largeur sur mobile
- [ ] **Boutons** : taille minimum 44×44px pour le tactile

---

## 4. Tests finaux

- [ ] Tester toutes les pages sur desktop
- [ ] Tester sur mobile (mode développement navigateur)
- [ ] Vérifier WAVE (plugin accessibilité) — aucune erreur
- [ ] Vérifier qu'il n'y a pas de warning dans la console

---

## Notes

- L'accessibilité et le responsive sont **transversaux** — ils concernent toutes les pages
- Utiliser le mode "Device Toolbar" du navigateur (F12) pour tester le responsive
- Le plugin WAVE est disponible sur Chrome/Firefox
