# Liste des projets (`/projects`)

> Utilise le composant [`PageHeader`](dashboard.md) avec : `title="Mes projets"` + `description="Gérer vos projets"` + `action="+ Nouveau projet"`
> Utilise la [`Navigation`](navigation.md) pour la barre de navigation.

> Page listant tous les projets de l'utilisateur connecté.

---

## US-PROJECTS-1 — Bouton "Créer un projet"

**En tant qu'** utilisateur connecté  
**Je veux** pouvoir cliquer sur un bouton "+ Nouveau projet"  
**Afin de** créer un nouveau projet

**Critères d'acceptation :**
- [x] Un bouton "+ Nouveau projet" est visible en haut de la page
- [x] Le clic ouvre une modale de création (pas une page dédiée)

---

## US-PROJECTS-2 — Liste des projets en grille

**En tant qu'** utilisateur connecté  
**Je veux** voir tous mes projets affichés sous forme de cartes en grille  
**Afin de** avoir une vue d'ensemble de mes projets

**Critères d'acceptation :**
- [x] Les projets sont chargés depuis l'API (`GET /projects`)
- [x] Les cartes sont affichées en grille responsive (1 colonne mobile, 2 colonnes tablette, 3 colonnes desktop)
- [x] Chaque carte est cliquable et redirige vers `/projects/[id]`
- [x] Si aucun projet n'existe, un message "Aucun projet trouvé" est affiché
- [x] Un état de chargement (Spinner) est affiché pendant le chargement

---

## US-PROJECTS-3 — Carte projet (composant réutilisable)

**En tant qu'** utilisateur connecté  
**Je veux** voir les informations essentielles de chaque projet sur sa carte  
**Afin de** identifier rapidement un projet

**Éléments affichés sur la carte :**
- [x] Nom du projet
- [x] Description du projet (extrait si trop long)
- [x] Barre de progression avec le pourcentage de tâches complétées
- [x] Nombre de tâches complétées (ex: "5/12 tâches")
- [x] Section "Équipe" avec le nombre de membres
- [x] Avatar / initiales du propriétaire (mis en évidence, fond orange)
- [x] Avatars / initiales des autres membres (max 4 affichés, puis "+X" pour les suivants)
- [ ] Rôle de l'utilisateur connecté visible (Propriétaire / Membre)

**Critères d'acceptation :**
- [x] Le propriétaire du projet est visuellement distinct des autres membres (fond orange)
- [x] La carte entière est cliquable → redirige vers `/projects/[id]`
- [x] Le design est cohérent avec la maquette Figma

---

## Notes

- Composant associé : [`ProjectCard.tsx`](../../frontend/src/components/features/ProjectCard.tsx) (à créer)
- Voir aussi : [`project-new.md`](project-new.md) pour la création, [`project-detail.md`](project-detail.md) pour le détail
