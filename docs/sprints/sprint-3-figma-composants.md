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

- [x] `app/page.tsx` — Remplacer le template Next.js par une redirection vers `/login`

---

## 3. Corrections UI identifiées

### 3.1 Feature recherche — `TaskSearch`
- [x] Extraire la barre de recherche + filtre statut de la page détail projet
- [x] Créer un composant `TaskSearch` dans `components/features/`
- [x] Props : `onSearch(query, status)`, `placeholder`, `showStatusFilter`
- [x] Déclenchement au bout de 3 caractères **OU** sur "Entrée"
- [x] Utilisé dans **Dashboard** (recherche seule) ET **Détail projet** (recherche + filtre)

### 3.2 Dashboard — Carte tâche (TaskCard)
- [x] Ajouter la **date d'échéance** (`dueDate`) sur la carte
- [x] Ajouter le **nombre de commentaires** (déjà fait)

### 3.3 Projets — Carte projet (ProjectCard)
- [x] **Propriétaire toujours à gauche** (avatar seul, pas de badge)
- [x] **Un seul badge** dans toute la carte : celui du **rôle de l'utilisateur connecté**
- [x] **Membres à droite** (avatars des autres participants)
- [x] **Surbrillance** de l'avatar de l'utilisateur connecté
- [x] Rôles disponibles : Owner, Admin, Contributeur
- [x] Logique extraite dans `ProjectMembers` (composant réutilisable)

### 3.4 Détail projet — Contributeurs
- [x] Même logique que la carte projet (via `ProjectMembers`)
- [x] Chaque avatar (sauf utilisateur connecté) affiche le **nom** de la personne
- [x] L'avatar de l'utilisateur connecté n'affiche **que l'avatar** (pas de nom)
- [x] Surbrillance de l'utilisateur connecté

### 3.5 Profil — Simplification
- [ ] Fusionner les deux formulaires en un seul (nom, prénom, email, mot de passe actuel, nouveau mot de passe)
- [ ] Un seul bouton "Enregistrer"

---

## 4. Récupération des composants `test-next`

| Composant | Fichier source | Destination | Statut |
|-----------|---------------|-------------|--------|
| `CommentSection` | [`test-next/src/components/CommentSection.tsx`](../../test-next/src/components/CommentSection.tsx) | `frontend/src/components/features/CommentSection.tsx` | ✅ |
| `EditTaskForm` | [`test-next/src/components/forms/EditTaskForm.tsx`](../../test-next/src/components/forms/EditTaskForm.tsx) | `frontend/src/components/forms/EditTaskForm.tsx` | ✅ |
| `TaskAssigneeSelector` | [`test-next/src/components/forms/TaskAssigneeSelector.tsx`](../../test-next/src/components/forms/TaskAssigneeSelector.tsx) | `frontend/src/components/forms/TaskAssigneeSelector.tsx` | ✅ |
| `ProjectMembers` | [`test-next/src/components/ProjectMembers.tsx`](../../test-next/src/components/ProjectMembers.tsx) | `frontend/src/components/features/ProjectMembers.tsx` | ✅ |
| `DeleteProjectModal` | [`test-next/src/components/DeleteProjectModal.tsx`](../../test-next/src/components/DeleteProjectModal.tsx) | `frontend/src/components/features/DeleteProjectModal.tsx` | ✅ |

**Important :** Classes `indigo-600`, `gray-*` remplacées par `brand-orange-main`, `neutral-*`.

---

## 5. Vérification API

- [x] Vérifier que les endpoints existent dans le backend
- [x] Vérifier que `api.ts` a les fonctions nécessaires (searchUsers, addContributor, removeContributor, updateTask, deleteTask, Comment)

---

## Notes

- Les corrections UI (section 3) peuvent être faites **avant** la récupération des composants
- Le branchement des composants dans les pages sera fait dans le Sprint 4
