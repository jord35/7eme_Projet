# Dashboard (`/dashboard`)

> Page d'accueil de l'utilisateur connecté. Affiche un aperçu de son activité.

---

## US-DASHBOARD-1 — En-tête de page (composant réutilisable PageHeader)

**En tant qu'** utilisateur connecté  
**Je veux** voir un en-tête de page avec un titre, une description et des actions  
**Afin de** savoir où je me trouve et pouvoir agir

**Description :** Composant réutilisable qui s'adapte à chaque page via des props.

**Props :**
- `title` (requis) : le titre de la page
- `description` (optionnel) : sous-titre ou description
- `backLink` (optionnel) : lien de retour (affiche une flèche ←)
- `action` (optionnel) : bouton d'action principal (label + onClick)
- `showEditButton` (optionnel) : affiche un bouton "Modifier" (admin only)
- `showIAButton` (optionnel) : affiche le bouton "IA" (lien mort)

**Utilisations prévues :**
- Dashboard : `title="Bonjour, Jean"` + `action="Créer un projet"`
- Projets : `title="Mes projets"` + `description="Gérer vos projets"` + `action="+ Nouveau projet"`
- Détail projet : `title={project.name}` + `backLink="/projects"` + `action="Créer une tâche"` + `showEditButton` + `showIAButton`

---

## US-DASHBOARD-2 — Navigation entre les vues (Liste / Kanban)

**En tant qu'** utilisateur connecté  
**Je veux** pouvoir basculer entre une vue Liste et une vue Kanban  
**Afin de** visualiser mes tâches de la manière qui me convient

**Critères d'acceptation :**
- [x] Un mécanisme de navigation (onglets) permet de switcher entre les deux vues
- [x] La vue active est visuellement mise en évidence (orange)
- [x] Le changement de vue n'effectue pas de requête API supplémentaire (les données sont déjà chargées)

---

## US-DASHBOARD-3 — Vue Liste des tâches assignées

**En tant qu'** utilisateur connecté  
**Je veux** voir la liste de toutes mes tâches assignées, triées par priorité  
**Afin de** savoir ce que j'ai à faire et dans quel ordre

**Critères d'acceptation :**
- [x] Les tâches sont chargées depuis l'API (`GET /dashboard/assigned-tasks`)
- [x] Les tâches sont triées par priorité (URGENT > HIGH > MEDIUM > LOW)
- [x] Chaque tâche est affichée sous forme de carte (TaskCard)
- [x] Si aucune tâche n'est assignée, un message "Aucune tâche assignée pour le moment" est affiché
- [x] Un état de chargement (Spinner) est affiché pendant le chargement

---

## US-DASHBOARD-4 — Vue Kanban

**En tant qu'** utilisateur connecté  
**Je veux** voir mes tâches organisées en colonnes "À faire", "En cours", "Terminé"  
**Afin de** visualiser l'avancement de mon travail

**Critères d'acceptation :**
- [x] Trois colonnes sont affichées : "À faire" (TODO), "En cours" (IN_PROGRESS), "Terminé" (DONE)
- [x] Chaque colonne contient les cartes de tâches correspondant à son statut
- [x] Les tâches annulées (CANCELLED) ne sont pas affichées dans le Kanban
- [x] Chaque carte de tâche est identique à celle de la vue Liste (TaskCard)
- [x] Si une colonne est vide, un message "Aucune tâche" est affiché

---

## US-DASHBOARD-5 — Carte de tâche (composant réutilisable)

**En tant qu'** utilisateur connecté  
**Je veux** voir une carte récapitulative pour chaque tâche  
**Afin de** avoir les informations essentielles sans ouvrir la tâche

**Éléments affichés sur la carte :**
- [x] Titre de la tâche
- [x] Tag de statut : "À faire" (TODO), "En cours" (IN_PROGRESS), "Terminé" (DONE)
- [x] Description de la tâche (extrait si trop long)
- [x] Nom du projet associé (optionnel, via prop `showProject`)
- [ ] Date de création de la tâche
- [x] Nombre de commentaires (valeur numérique, sans lien)
- [x] Bouton "Voir" qui redirige vers `/projects/[projectId]`

**Critères d'acceptation :**
- [x] Le composant est réutilisable (utilisé dans les vues Liste et Kanban du dashboard + projet)
- [x] Le bouton "Voir" redirige vers `/projects/[projectId]` (page détail du projet)
- [x] Le design est cohérent avec la maquette Figma

---

## Questions en suspens

- [x] Le clic sur le nom du projet dans la carte doit-il rediriger vers `/projects/[id]` ? → Non, seul le bouton "Voir" redirige
- [ ] Faut-il un drag & drop dans la vue Kanban (pour déplacer les tâches entre colonnes) ? → Sera traité dans un sprint ultérieur si nécessaire
