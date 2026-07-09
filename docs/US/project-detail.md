# Détail projet (`/projects/[id]`)

> Page détaillée d'un projet avec ses informations, ses membres et ses tâches.

---

## US-DETAIL-1 — En-tête du projet

**En tant qu'** utilisateur connecté membre du projet
**Je veux** voir le nom et la description du projet
**Afin de** savoir de quel projet il s'agit

**Critères d'acceptation :**
- [x] Une flèche de retour permet de revenir à la liste des projets (`/projects`)
- [x] Le nom du projet est affiché
- [x] La description du projet est affichée
- [x] Si l'utilisateur est admin, une icône "modifier" à côté du nom ouvre une modale d'édition
- [x] Un bouton "Créer une tâche" ouvre une modale de création
- [x] Un bouton "IA" est présent mais désactivé (fonctionnalité à venir)

---

## US-DETAIL-2 — Section Contributeurs

**En tant qu'** utilisateur connecté membre du projet
**Je veux** voir la liste des membres du projet avec leurs rôles
**Afin de** savoir qui travaille sur le projet

**Critères d'acceptation :**
- [x] Le titre "Contributeurs (X)" est affiché
- [x] Le propriétaire est affiché à gauche (avatar seul, pas de nom)
- [ ] Un badge indique le rôle de l'utilisateur connecté (Propriétaire / Admin / Contributeur)
- [x] Les autres membres sont affichés à droite (avatar + nom)
- [ ] L'avatar de l'utilisateur connecté est en surbrillance
- [x] Si le nombre de membres dépasse 4, seuls les 4 premiers sont affichés avec "+X"

---

## US-DETAIL-3 — Navigation entre les vues (Liste / Calendrier)

**En tant qu'** utilisateur connecté membre du projet
**Je veux** pouvoir basculer entre une vue Liste et une vue Calendrier des tâches
**Afin de** visualiser les tâches de la manière qui me convient

**Critères d'acceptation :**
- [x] Des onglets "Liste" et "Calendrier" permettent de switcher
- [x] La vue active est mise en évidence (orange)
- [x] La vue Calendrier utilise `react-calendar`
- [x] Les jours avec échéance sont mis en évidence (orange)
- [ ] Le clic sur un jour avec échéance affiche les tâches correspondantes

---

## US-DETAIL-4 — Filtres et recherche des tâches

**En tant qu'** utilisateur connecté membre du projet
**Je veux** pouvoir filtrer les tâches par statut et rechercher par mot-clé
**Afin de** trouver rapidement une tâche spécifique

**Critères d'acceptation :**
- [x] Un filtre par statut est disponible (Tous, À faire, En cours, Terminé)
- [x] Une barre de recherche permet de chercher par titre ou description
- [x] Les filtres et la recherche peuvent être combinés
- [ ] La recherche se déclenche au bout de 3 caractères **OU** sur "Entrée"
- [ ] **Important :** Utiliser le composant réutilisable `TaskSearch` (utilisé aussi dans Dashboard)

---

## US-DETAIL-5 — Carte de tâche

**En tant qu'** utilisateur connecté membre du projet
**Je veux** voir les informations essentielles de chaque tâche
**Afin de** savoir ce qu'il reste à faire

**Éléments affichés sur la carte :**
- [x] Titre de la tâche
- [x] Description (extrait si trop long)
- [x] Badge de statut (À faire, En cours, Terminé)
- [ ] Date d'échéance
- [ ] Personne assignée
- [x] Nombre de commentaires
- [x] Section commentaires en accordéon

---

## US-DETAIL-6 — Commentaires

**En tant qu'** utilisateur connecté membre du projet
**Je veux** pouvoir voir les commentaires d'une tâche et y répondre
**Afin de** collaborer avec l'équipe

**Critères d'acceptation :**
- [x] Un accordéon "Commentaires (X)" affiche le compteur
- [ ] Le clic sur l'accordéon affiche la liste des commentaires (auteur, date, contenu)
- [ ] Un formulaire permet d'ajouter un commentaire
- [ ] L'auteur peut modifier/supprimer ses commentaires

---

## Notes

- Composant `CommentSection` à récupérer depuis `test-next`
- Composant `TaskSearch` à créer (réutilisable avec le dashboard)
