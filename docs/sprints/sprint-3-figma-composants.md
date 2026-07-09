# Sprint 3 — Analyse Figma + Corrections UI

> **Objectif :** Analyser Figma, corriger les écarts UI, récupérer les composants test-next
> **Durée estimée :** 3-4 jours
> **Dépendances :** Sprint 2 terminé

---

## 1. Analyse Figma — Mise à jour des US

**Aller sur Figma** et pour chaque page, noter les éléments visibles, interactions, états.

**Pages à analyser :**
- [x] Login / Register
- [x] Dashboard (vues Liste + Kanban)
- [x] Projets (grille)
- [x] Détail projet (infos, membres, tâches, commentaires)
- [x] Profil
- [x] 404

**Livrable :** Mettre à jour les fichiers dans [`docs/US/`](../US/).

---

## 2. Nettoyage rapide

- [ ] `app/page.tsx` — Remplacer le template Next.js par une redirection vers `/login`

---

## 3. Corrections UI identifiées

### 3.1 Feature recherche — `TaskSearch`
- [ ] Extraire la barre de recherche + filtre statut de la page détail projet
- [ ] Créer un composant `TaskSearch` dans `components/features/` (feature, pas UI)
- [ ] Props : `onSearch(query)`, `onFilterStatus(status)`, `placeholder`
- [ ] Déclenchement au bout de 3 caractères **OU** sur "Entrée"
- [ ] Utiliser ce composant dans **Dashboard** ET **Détail projet**

### 3.2 Dashboard — Carte tâche (TaskCard)
- [ ] Ajouter la **date d'échéance** (`dueDate`) sur la carte
- [ ] Ajouter le **nombre de commentaires** (déjà fait, vérifier)

### 3.3 Projets — Carte projet (ProjectCard)
- [ ] **Propriétaire toujours à gauche** (avatar seul, pas de badge)
- [ ] **Un seul badge** dans toute la carte : celui du **rôle de l'utilisateur connecté** (`Propriétaire`, `Admin` ou `Contributeur`)
- [ ] **Membres à droite** (avatars des autres participants)
- [ ] **Surbrillance** de l'avatar de l'utilisateur connecté où qu'il soit
- [ ] Rôles disponibles (backend) : Owner (via `project.ownerId`), Admin, Contributeur

### 3.4 Détail projet — Contributeurs
- [ ] Même logique que la carte projet : propriétaire à gauche, membres à droite
- [ ] Chaque avatar (sauf celui de l'utilisateur connecté) est un badge contenant le **nom** de la personne
- [ ] L'avatar de l'utilisateur connecté n'affiche **que l'avatar** (pas de nom)
- [ ] Surbrillance de l'utilisateur connecté

### 3.5 Profil — Simplification
- [ ] Fusionner les deux formulaires en un seul (nom, prénom, email, mot de passe actuel, nouveau mot de passe)
- [ ] Un seul bouton "Enregistrer"

---

## 4. Récupération des composants `test-next`

| Composant | Fichier source | Destination |
|-----------|---------------|-------------|
| `CommentSection` | [`test-next/src/components/CommentSection.tsx`](../../test-next/src/components/CommentSection.tsx) | `frontend/src/components/features/CommentSection.tsx` |
| `EditTaskForm` | [`test-next/src/components/forms/EditTaskForm.tsx`](../../test-next/src/components/forms/EditTaskForm.tsx) | `frontend/src/components/forms/EditTaskForm.tsx` |
| `TaskAssigneeSelector` | [`test-next/src/components/forms/TaskAssigneeSelector.tsx`](../../test-next/src/components/forms/TaskAssigneeSelector.tsx) | `frontend/src/components/forms/TaskAssigneeSelector.tsx` |
| `ProjectMembers` | [`test-next/src/components/ProjectMembers.tsx`](../../test-next/src/components/ProjectMembers.tsx) | `frontend/src/components/features/ProjectMembers.tsx` |
| `DeleteProjectModal` | [`test-next/src/components/DeleteProjectModal.tsx`](../../test-next/src/components/DeleteProjectModal.tsx) | `frontend/src/components/features/DeleteProjectModal.tsx` |

**Important :** Remplacer les classes `indigo-600`, `gray-*` par `brand-orange-main`, `neutral-*`.

---

## 5. Vérification API

- [ ] Vérifier que les endpoints existent dans le backend
- [ ] Vérifier que `api.ts` a les fonctions nécessaires

---

## Notes

- Les corrections UI (section 3) peuvent être faites **avant** la récupération des composants
- Le branchement des composants dans les pages sera fait dans le Sprint 4
