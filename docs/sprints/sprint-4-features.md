# Sprint 4 — Implémentation des features

> **Objectif :** Brancher les composants récupérés dans les pages
> **Durée estimée :** 3-4 jours
> **Dépendances :** Sprint 3 terminé

---

## 1. Commentaires (US-009)

- [x] Intégrer `CommentSection` dans la page détail projet
- [x] Remplacer le placeholder actuel (accordéon) par le vrai composant
- [x] Vérifier : ajout de commentaires (modification/suppression retirées — pas dans les US)

**Fichiers :** [`frontend/src/app/(authenticated)/projects/[id]/page.tsx`](../../frontend/src/app/(authenticated)/projects/[id]/page.tsx)

---

## 2. Modification de tâche (US-007)

- [x] ~~Ajouter un bouton "Modifier" sur chaque carte tâche~~ *(retiré — pas dans les US)*
- [x] ~~Intégrer `EditTaskForm` (édition inline ou modale)~~ *(retiré — pas dans les US)*
- [x] Permettre le changement de statut (TODO → IN_PROGRESS → DONE) — via `TaskForm` unifié (mode edit)

**Fichiers :** [`TaskForm.tsx`](../../frontend/src/components/forms/TaskForm.tsx)

---

## 3. Assignation de tâche (US-008)

- [x] Intégrer le sélecteur d'assignés dans le formulaire de création de tâche (accordéon)
- [x] Afficher les assignés sur chaque carte tâche (détail projet uniquement, via `TaskDetailCard`)
- [x] Permettre d'assigner/désassigner après création (via `TaskForm` mode edit)

**Fichiers :** [`TaskForm.tsx`](../../frontend/src/components/forms/TaskForm.tsx), [`TaskDetailCard.tsx`](../../frontend/src/components/features/TaskDetailCard.tsx)

---

## 4. Gestion des contributeurs (US-005)

- [x] Intégrer `ProjectMembers` dans la page détail projet
- [x] Ajouter le bouton "Ajouter un contributeur" avec recherche
- [x] Ajouter le bouton "Retirer" sur chaque membre (sauf propriétaire)

**Fichiers :** [`projects/[id]/page.tsx`](../../frontend/src/app/(authenticated)/projects/[id]/page.tsx)

---

## 5. Suppression de projet (US-004)

- [x] Intégrer `DeleteProjectModal`
- [x] Ajouter un bouton "Supprimer" visible uniquement pour le propriétaire
- [x] Confirmation avant suppression + redirection

**Fichiers :** [`projects/[id]/page.tsx`](../../frontend/src/app/(authenticated)/projects/[id]/page.tsx)

---

## Bonus — Refacto et harmonisation

- [x] Créer `TaskDetailCard` (carte détaillée avec assignés, pour Single Project)
- [x] Nettoyer `TaskCard` (compact, sans assignés, pour dashboard)
- [x] Créer `TaskListView` (TaskSearch + liste TaskCard)
- [x] Créer `TaskKanbanView` (grille 3 colonnes sans recherche)
- [x] Unifier `CreateTaskForm` + `EditTaskForm` → `TaskForm` (mode create/edit)
- [x] Créer composant UI `<Tabs>` (remplace 2 duplications d'onglets)
- [x] Créer composant UI `<PageLoader>` (remplace 3 duplications de spinner)
- [x] `DeleteProjectModal` utilise `<Modal>` au lieu de son propre overlay
- [x] Dashboard : bouton "Créer un projet" fonctionnel
- [x] `ProjectMembers` : surbrillance utilisateur connecté (#FFE8D9)
- [x] `CreateProjectForm` : accordéon contributeurs avec recherche
- [x] Supprimer le tri par priorité du dashboard (obsolète)
- [x] Commentaires JSDoc sur tous les composants et fonctions API

---

## Notes

- Chaque feature peut être développée indépendamment
- Commencer par les commentaires (le plus gros morceau)
- Tester chaque feature avant de passer à la suivante
