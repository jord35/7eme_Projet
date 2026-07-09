# Sprint 4 — Implémentation des features

> **Objectif :** Brancher les composants récupérés dans les pages
> **Durée estimée :** 3-4 jours
> **Dépendances :** Sprint 3 terminé

---

## 1. Commentaires (US-009)

- [ ] Intégrer `CommentSection` dans la page détail projet
- [ ] Remplacer le placeholder actuel (accordéon) par le vrai composant
- [ ] Vérifier : ajout, modification, suppression de commentaires

**Fichiers :** [`frontend/src/app/(authenticated)/projects/[id]/page.tsx`](../../frontend/src/app/(authenticated)/projects/[id]/page.tsx)

---

## 2. Modification de tâche (US-007)

- [ ] ~~Ajouter un bouton "Modifier" sur chaque carte tâche~~ *(retiré — pas dans les US)*
- [ ] ~~Intégrer `EditTaskForm` (édition inline ou modale)~~ *(retiré — pas dans les US)*
- [ ] Permettre le changement de statut (TODO → IN_PROGRESS → DONE) *(à faire dans une US dédiée)*

**Fichiers :** page détail projet

---

## 3. Assignation de tâche (US-008)

- [ ] Intégrer `TaskAssigneeSelector` dans le formulaire de création de tâche
- [ ] Afficher les assignés sur chaque carte tâche
- [ ] Permettre d'assigner/désassigner après création

**Fichiers :** [`frontend/src/components/forms/CreateTaskForm.tsx`](../../frontend/src/components/forms/CreateTaskForm.tsx), [`TaskCard.tsx`](../../frontend/src/components/features/TaskCard.tsx)

---

## 4. Gestion des contributeurs (US-005)

- [ ] Intégrer `ProjectMembers` dans la page détail projet
- [ ] Ajouter le bouton "Ajouter un contributeur" avec recherche
- [ ] Ajouter le bouton "Retirer" sur chaque membre (sauf propriétaire)

**Fichiers :** page détail projet

---

## 5. Suppression de projet (US-004)

- [ ] Intégrer `DeleteProjectModal`
- [ ] Ajouter un bouton "Supprimer" visible uniquement pour le propriétaire
- [ ] Confirmation avant suppression + redirection

**Fichiers :** page détail projet

---

## Notes

- Chaque feature peut être développée indépendamment
- Commencer par les commentaires (le plus gros morceau)
- Tester chaque feature avant de passer à la suivante
