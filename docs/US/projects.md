# Liste des projets (`/projects`)

> Page listant tous les projets de l'utilisateur connecté.

---

## US-PROJECTS-1 — Bouton "Créer un projet"

**En tant qu'** utilisateur connecté
**Je veux** pouvoir cliquer sur un bouton "+ Nouveau projet"
**Afin de** créer un nouveau projet

**Critères d'acceptation :**
- [x] Un bouton "+ Nouveau projet" est visible dans l'en-tête
- [x] Le clic ouvre une modale de création

---

## US-PROJECTS-2 — Liste des projets en grille

**En tant qu'** utilisateur connecté
**Je veux** voir tous mes projets affichés sous forme de cartes en grille
**Afin de** avoir une vue d'ensemble de mes projets

**Critères d'acceptation :**
- [x] Les projets sont chargés depuis `GET /projects`
- [x] Les cartes sont affichées en grille responsive (1 colonne mobile, 2 tablette, 3 desktop)
- [x] Chaque carte est cliquable et redirige vers `/projects/[id]`
- [x] Si aucun projet n'existe, un message "Aucun projet trouvé" est affiché
- [x] Un état de chargement (Spinner) est affiché pendant le fetch

---

## US-PROJECTS-3 — Carte projet

**En tant qu'** utilisateur connecté
**Je veux** voir les informations essentielles de chaque projet sur sa carte
**Afin de** identifier rapidement un projet

**Éléments affichés sur la carte :**
- [x] Nom du projet
- [x] Description du projet (extrait si trop long)
- [x] Barre de progression avec le pourcentage de tâches complétées
- [x] Nombre de tâches complétées (ex: "5/12 tâches")
- [x] Section "Équipe" avec le nombre de membres
- [x] Avatar du propriétaire (à gauche)
- [ ] Badge du rôle de l'utilisateur connecté (Propriétaire / Admin / Contributeur)
- [x] Avatars des autres membres (à droite, max 4, puis "+X")
- [ ] Surbrillance de l'avatar de l'utilisateur connecté

**Critères d'acceptation :**
- [ ] Le propriétaire est affiché à gauche, les membres à droite
- [ ] Un seul badge est affiché : celui du rôle de l'utilisateur connecté
- [ ] L'avatar de l'utilisateur connecté est en surbrillance (où qu'il soit)
- [x] La carte entière est cliquable → redirige vers `/projects/[id]`

---

## Notes

- Composant associé : [`ProjectCard.tsx`](../../frontend/src/components/features/ProjectCard.tsx)
- Voir aussi : [`modals.md`](modals.md) pour la création, [`project-detail.md`](project-detail.md) pour le détail
