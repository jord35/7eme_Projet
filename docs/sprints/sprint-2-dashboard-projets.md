# Sprint 2 — Tableau de bord & Projets

> **Objectif :** Pages Dashboard, liste des projets, détail projet et modales associées.
> **Durée estimée :** 4-5 jours
> **US couvertes :** US-DASHBOARD-1 à 5, US-PROJECTS-1 à 3, US-DETAIL-1 à 7, US-MODAL-1 à 3
> **Dépendances :** Sprint 1 terminé

---

## 1. Dashboard (`/dashboard`)

### 1.1 En-tête de page (PageHeader)

**US associée :** [`US-DASHBOARD-1`](../US/dashboard.md)

- [x] Utiliser le composant `PageHeader` avec `title="Bonjour, {user.name}"` + `action="Créer un projet"`

### 1.2 Navigation entre les vues (Liste / Kanban)

**US associée :** [`US-DASHBOARD-2`](../US/dashboard.md)

- [x] Deux onglets ou boutons pour basculer entre vue Liste et vue Kanban
- [x] La vue active est mise en évidence
- [x] Pas de requête API supplémentaire au changement de vue

### 1.3 Vue Liste des tâches assignées

**US associée :** [`US-DASHBOARD-3`](../US/dashboard.md)

- [x] Appel API `GET /dashboard/assigned-tasks`
- [x] Tâches triées par priorité (URGENT > HIGH > MEDIUM > LOW)
- [x] Chaque tâche affichée via le composant `TaskCard`
- [x] Message "Aucune tâche assignée" si vide
- [x] État de chargement

### 1.4 Vue Kanban

**US associée :** [`US-DASHBOARD-4`](../US/dashboard.md)

- [x] Trois colonnes : "À faire" (TODO), "En cours" (IN_PROGRESS), "Terminé" (DONE)
- [x] Les tâches CANCELLED ne sont pas affichées
- [x] Mêmes cartes que la vue Liste

### 1.5 Carte de tâche (TaskCard)

**US associée :** [`US-DASHBOARD-5`](../US/dashboard.md)

- [x] Composant réutilisable (Liste + Kanban)
- [x] Éléments : nom, tag statut, description, nom projet, date création, nb commentaires, bouton "Voir"
- [x] Bouton "Voir" → redirige vers `/projects/[projectId]`

---

## 2. Projets (`/projects`)

### 2.1 En-tête de page

**US associée :** [`US-PROJECTS-1`](../US/projects.md)

- [x] Utiliser `PageHeader` avec `title="Mes projets"` + `description="Gérer vos projets"` + `action="+ Nouveau projet"`
- [x] Le bouton "Nouveau projet" ouvre la modale de création (US-MODAL-1)

### 2.2 Grille de projets

**US associée :** [`US-PROJECTS-2`](../US/projects.md)

- [x] Appel API `GET /projects`
- [x] Grille responsive (1 col mobile, 2 tablette, 3 desktop)
- [x] Chaque carte cliquable → `/projects/[id]`
- [x] Message "Aucun projet trouvé" si vide
- [x] État de chargement

### 2.3 Carte projet (ProjectCard)

**US associée :** [`US-PROJECTS-3`](../US/projects.md)

- [x] Éléments : nom, description, barre de progression, nb tâches, équipe (avatars max 4 + "+X"), rôle utilisateur
- [x] Propriétaire mis en évidence
- [x] Carte entière cliquable

---

## 3. Détail projet (`/projects/[id]`)

### 3.1 En-tête de page

**US associée :** [`US-DETAIL-1`](../US/detail.md)

- [x] Utiliser `PageHeader` avec `title={project.name}` + `backLink="/projects"` + `action="Créer une tâche"` + `showEditButton` + `showIAButton`

### 3.2 Section Contributeurs

**US associée :** [`US-DETAIL-4`](../US/detail.md)

- [x] Titre "Contributeurs (X)" avec le nombre
- [x] Propriétaire à gauche (mis en évidence)
- [x] Autres membres (max 4 + "+X")

### 3.3 Navigation entre les vues (Liste / Calendrier)

**US associée :** [`US-DETAIL-5`](../US/detail.md)

- [x] Basculer entre vue Liste et vue Calendrier
- [x] Vue Calendrier utilise `react-calendar`
- [x] Jours avec échéance mis en évidence

### 3.4 Filtres et recherche

**US associée :** [`US-DETAIL-6`](../US/detail.md)

- [x] Filtre par statut (TODO, IN_PROGRESS, DONE)
- [x] Barre de recherche par mot-clé
- [x] Filtres combinables

### 3.5 Carte de tâche dans le projet

**US associée :** [`US-DETAIL-7`](../US/detail.md)

- [x] Titre, description, échéance, assignée à
- [x] Commentaires en accordéon (menu déroulant)

---

## 4. Modales

### 4.1 Création de projet (modale)

**US associée :** [`US-MODAL-1`](../US/modals.md)

- [x] Champs : nom, description
- [x] Validation Zod
- [x] Appel API `POST /projects`
- [x] Fermeture et rafraîchissement de la liste après création

### 4.2 Modification de projet (modale)

**US associée :** [`US-MODAL-2`](../US/modals.md)

- [x] Champs pré-remplis (nom, description)
- [x] Appel API `PUT /projects/[id]`
- [x] Fermeture et mise à jour après modification

### 4.3 Création de tâche (modale)

**US associée :** [`US-MODAL-3`](../US/modals.md)

- [x] Champs : titre, description, priorité, échéance, assignation
- [x] Validation Zod
- [x] Appel API `POST /projects/[id]/tasks`

---

## 5. Checklist de fin de Sprint 2

### Dashboard
- [x] Page `/dashboard` fonctionnelle avec PageHeader
- [x] Navigation Liste / Kanban opérationnelle
- [x] Vue Liste des tâches assignées
- [x] Vue Kanban (3 colonnes)
- [x] Composant `TaskCard` réutilisable

### Projets
- [x] Page `/projects` avec grille de cartes
- [x] Composant `ProjectCard` (progression, avatars)
- [x] Modale de création de projet

### Détail projet
- [x] Page `/projects/[id]` avec infos, membres, tâches
- [x] Section Contributeurs avec avatars
- [x] Navigation Liste / Calendrier (react-calendar)
- [x] Filtres et recherche de tâches
- [x] Modale de création de tâche
- [x] Modale de modification de projet

### Qualité
- [x] Pas d'erreur console
- [x] États de chargement partout
- [x] Messages pour les listes vides
- [x] Commit : "Sprint 2 — Tableau de bord & Projets"
