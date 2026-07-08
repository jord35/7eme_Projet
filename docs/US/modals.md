# Modales (formulaires)

> Les formulaires de création et modification sont des modales, pas des pages dédiées.

---

## US-MODAL-1 — Création de projet (modale)

**Déclencheur :** Bouton "+ Nouveau projet" (page projets ou dashboard)

**En tant qu'** utilisateur connecté  
**Je veux** créer un nouveau projet via une modale  
**Afin de** ajouter un projet sans quitter la page courante

**Critères d'acceptation :**
- [x] Une modale s'ouvre avec les champs : nom du projet, description
- [x] La validation côté client (Zod) vérifie que le nom est requis (min 2 caractères)
- [x] Appel API `POST /projects`
- [x] En cas de succès, la modale se ferme et le projet apparaît dans la liste
- [x] En cas d'erreur, message d'erreur dans la modale (toast)
- [x] La modale peut être fermée (bouton fermeture, clic overlay, touche Échap)

---

## US-MODAL-2 — Modification de projet (modale)

**Déclencheur :** Icône "modifier" à côté du nom du projet (page détail projet)

**En tant qu'** utilisateur connecté admin du projet  
**Je veux** modifier le nom et la description du projet via une modale  
**Afin de** mettre à jour les informations du projet

**Critères d'acceptation :**
- [x] Une modale s'ouvre avec les champs pré-remplis (nom, description actuels)
- [x] Appel API `PUT /projects/[id]`
- [x] En cas de succès, la modale se ferme et les infos sont mises à jour
- [x] En cas d'erreur, message d'erreur dans la modale (toast)

---

## US-MODAL-3 — Création de tâche (modale)

**Déclencheur :** Bouton "Créer une tâche" (page détail projet)

**En tant qu'** utilisateur connecté membre du projet  
**Je veux** créer une nouvelle tâche via une modale  
**Afin de** ajouter une tâche sans quitter la page du projet

**Critères d'acceptation :**
- [x] Une modale s'ouvre avec les champs : titre, description, priorité, échéance
- [ ] Assignation (pas encore implémentée)
- [x] La validation côté client (Zod) vérifie que le titre est requis
- [x] Appel API `POST /projects/[id]/tasks`
- [x] En cas de succès, la modale se ferme et la tâche apparaît dans la liste
- [x] En cas d'erreur, message d'erreur dans la modale (toast)

---

## US-MODAL-4 — Création de tâche IA (modale) — EN SUSPENS

**Déclencheur :** Bouton "IA"

**Statut :** ❓ Fonctionnalité non définie. Lien mort pour l'instant.

---

## US-MODAL-5 — Liste de tâches IA (modale) — EN SUSPENS

**Déclencheur :** ? (non identifié)

**Statut :** ❓ Fonctionnalité non définie. Lien mort pour l'instant.

---

## Notes

- Les modales utilisent le composant `Modal` défini dans l'architecture : [`sprint-0-veille.md`](../sprints/sprint-0-veille.md:118)
- Les formulaires utilisent `react-hook-form` + `zod` pour la validation
- Les modales IA sont en suspens : à définir ultérieurement
