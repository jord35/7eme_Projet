# Détail projet (`/projects/[id]`)

> Utilise le composant [`PageHeader`](dashboard.md) avec : `title={project.name}` + `backLink="/projects"` + `action="Créer une tâche"` + `showEditButton` + `showIAButton`
> Utilise la [`Navigation`](navigation.md) pour la barre de navigation.

> Page détaillée d'un projet avec ses informations, ses membres et ses tâches.

---

## US-DETAIL-1 — En-tête du projet

**En tant qu'** utilisateur connecté membre du projet  
**Je veux** voir le nom et la description du projet  
**Afin de** savoir de quel projet il s'agit

**Critères d'acceptation :**
- [ ] Une flèche de retour permet de revenir à la liste des projets (`/projects`)
- [ ] Le nom du projet est affiché
- [ ] La description du projet est affichée
- [ ] Si l'utilisateur est admin, une icône "modifier" à côté du nom redirige vers le formulaire d'édition

---

## US-DETAIL-2 — Bouton "Créer une tâche"

**En tant qu'** utilisateur connecté membre du projet  
**Je veux** pouvoir créer une nouvelle tâche dans le projet  
**Afin de** ajouter du travail à accomplir

**Critères d'acceptation :**
- [ ] Un bouton "Créer une tâche" est visible
- [ ] Le clic ouvre un formulaire de création de tâche (modale ou page dédiée)

---

## US-DETAIL-3 — Bouton "IA" (lien mort)

**En tant qu'** utilisateur connecté  
**Je veux** voir un bouton "IA" dans l'interface  
**Afin de** (fonctionnalité non définie)

**Critères d'acceptation :**
- [ ] Le bouton "IA" est présent mais non cliquable (désactivé)
- [ ] Un tooltip ou indication visuelle signale "Fonctionnalité à venir"

---

## US-DETAIL-4 — Section Contributeurs

**En tant qu'** utilisateur connecté membre du projet  
**Je veux** voir la liste des membres du projet  
**Afin de** savoir qui travaille sur le projet

**Critères d'acceptation :**
- [ ] Le titre "Contributeurs" est affiché avec le nombre total de membres
- [ ] Le propriétaire du projet est affiché à gauche, mis en évidence
- [ ] Le rôle de l'utilisateur connecté est visible
- [ ] Les autres membres sont affichés à droite
- [ ] Si le nombre de membres dépasse 4, seuls les 4 premiers sont affichés avec un indicateur "+X" pour les suivants

---

## US-DETAIL-5 — Navigation entre les vues (Liste / Calendrier)

**En tant qu'** utilisateur connecté membre du projet
**Je veux** pouvoir basculer entre une vue Liste et une vue Calendrier des tâches
**Afin de** visualiser les tâches de la manière qui me convient

**Critères d'acceptation :**
- [ ] Un mécanisme de navigation permet de switcher entre les deux vues
- [ ] La vue active est visuellement mise en évidence
- [ ] La vue Calendrier utilise `react-calendar` pour l'affichage
- [ ] Les jours où une tâche a une échéance sont mis en évidence (couleur ou marqueur visuel)
- [ ] Le clic sur un jour avec échéance affiche les tâches correspondantes

---

## US-DETAIL-6 — Filtres et recherche des tâches

**En tant qu'** utilisateur connecté membre du projet  
**Je veux** pouvoir filtrer les tâches par statut et rechercher par mot-clé  
**Afin de** trouver rapidement une tâche spécifique

**Critères d'acceptation :**
- [ ] Un filtre par statut est disponible : "À faire" (TODO), "En cours" (IN_PROGRESS), "Terminé" (DONE)
- [ ] Une barre de recherche permet de chercher une tâche par mot-clé (titre, description)
- [ ] Les filtres et la recherche peuvent être combinés

---

## US-DETAIL-7 — Carte de tâche dans le projet

**En tant qu'** utilisateur connecté membre du projet  
**Je veux** voir les informations essentielles de chaque tâche  
**Afin de** savoir ce qu'il reste à faire

**Éléments affichés sur la carte :**
- [ ] Titre de la tâche
- [ ] Description de la tâche (extrait si trop long)
- [ ] Date d'échéance
- [ ] Personne à qui la tâche est assignée
- [ ] Section commentaires (menu déroulant pour afficher/masquer)

**Critères d'acceptation :**
- [ ] Les commentaires sont affichés dans un menu déroulant (accordéon) pour ne pas surcharger la vue
- [ ] Le design est cohérent avec la maquette Figma

---

## Notes

- Le bouton "IA" est un lien mort : fonctionnalité non définie, à implémenter plus tard si nécessaire
- La vue Calendrier est une fonctionnalité supplémentaire par rapport aux specs initiales
- Composants associés : [`ProjectInfo.tsx`](../../frontend/src/components/features/ProjectInfo.tsx), [`ProjectMembers.tsx`](../../frontend/src/components/features/ProjectMembers.tsx), [`TaskList.tsx`](../../frontend/src/components/features/TaskList.tsx)
