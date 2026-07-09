# Dashboard (`/dashboard`)

> Page d'accueil de l'utilisateur connecté. Affiche un aperçu de son activité.

---

## US-DASHBOARD-1 — En-tête de page (PageHeader)

**En tant qu'** utilisateur connecté
**Je veux** voir un en-tête de page avec un titre et des actions
**Afin de** savoir où je me trouve et pouvoir agir

**Critères d'acceptation :**
- [x] Le titre "Bonjour, [prénom]" est affiché
- [x] Un bouton "Créer un projet" est présent dans l'en-tête

---

## US-DASHBOARD-2 — Navigation entre les vues (Liste / Kanban)

**En tant qu'** utilisateur connecté
**Je veux** pouvoir basculer entre une vue Liste et une vue Kanban
**Afin de** visualiser mes tâches de la manière qui me convient

**Critères d'acceptation :**
- [x] Des onglets "Liste" et "Kanban" permettent de switcher
- [x] La vue active est mise en évidence (couleur orange)
- [x] Le changement de vue n'effectue pas de requête API supplémentaire

---

## US-DASHBOARD-3 — Vue Liste des tâches assignées

**En tant qu'** utilisateur connecté
**Je veux** voir la liste de toutes mes tâches assignées, triées par priorité
**Afin de** savoir ce que j'ai à faire et dans quel ordre

**Critères d'acceptation :**
- [x] Les tâches sont chargées depuis `GET /dashboard/assigned-tasks`
- [x] Les tâches sont triées par priorité (URGENT > HIGH > MEDIUM > LOW)
- [x] Chaque tâche affiche : titre, description, statut, projet, nombre de commentaires
- [ ] Chaque tâche affiche la **date d'échéance**
- [x] Un bouton "Voir" redirige vers `/projects/[projectId]`
- [x] Un message "Aucune tâche assignée" est affiché si vide
- [x] Un état de chargement (Spinner) est affiché pendant le fetch

---

## US-DASHBOARD-4 — Vue Kanban

**En tant qu'** utilisateur connecté
**Je veux** voir mes tâches organisées en colonnes par statut
**Afin de** visualiser l'avancement de mon travail

**Critères d'acceptation :**
- [x] Trois colonnes sont affichées : "À faire" (TODO), "En cours" (IN_PROGRESS), "Terminé" (DONE)
- [x] Chaque colonne contient les cartes de tâches correspondant à son statut
- [x] Les tâches annulées (CANCELLED) ne sont pas affichées
- [x] Chaque carte affiche : titre, description, statut, projet, nombre de commentaires
- [ ] Chaque carte affiche la **date d'échéance**
- [x] Si une colonne est vide, un message "Aucune tâche" est affiché

---

## US-DASHBOARD-5 — Recherche de tâches

**En tant qu'** utilisateur connecté
**Je veux** pouvoir rechercher une tâche par son titre
**Afin de** retrouver rapidement une tâche spécifique

**Critères d'acceptation :**
- [ ] Une barre de recherche est présente dans le dashboard
- [ ] La recherche se déclenche au bout de 3 caractères **OU** sur "Entrée"
- [ ] La recherche filtre les tâches par titre (insensible à la casse)
- [ ] Le composant de recherche est réutilisable (utilisé aussi dans Détail projet)

---

## Notes

- Le composant `TaskCard` est réutilisé dans le dashboard et la page détail projet
- La recherche (`TaskSearch`) est un composant feature à créer dans `components/features/`
