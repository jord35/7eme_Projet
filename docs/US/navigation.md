# Barre de navigation (composant transverse)

> Composant de navigation affiché sur toutes les pages de l'application (sauf login/register).
> À ne pas confondre avec le [`PageHeader`](dashboard.md) qui est l'en-tête de page avec titre et actions.

---

## US-NAV-1 — Navigation principale

**En tant qu'** utilisateur connecté  
**Je veux** pouvoir naviguer entre "Tableau de bord" et "Projets"  
**Afin de** me déplacer dans l'application

**Critères d'acceptation :**
- [ ] Un lien "Tableau de bord" est présent dans la barre de navigation → redirige vers `/dashboard`
- [ ] Un lien "Projets" est présent dans la barre de navigation → redirige vers `/projects`
- [ ] Le lien correspondant à la page active est visuellement mis en évidence (couleur différente)
- [ ] Les liens sont accessibles au clavier et aux lecteurs d'écran

---

## US-NAV-2 — Menu utilisateur

**En tant qu'** utilisateur connecté  
**Je veux** pouvoir cliquer sur mon nom d'utilisateur / pseudo  
**Afin de** accéder à la page "Mon compte" (`/profile`)

**Critères d'acceptation :**
- [ ] Le nom ou pseudo de l'utilisateur connecté est affiché dans la barre de navigation
- [ ] Le clic sur le nom redirige vers `/profile`
- [ ] La déconnexion vide le token et redirige vers `/login`

**Note :** Le bouton de déconnexion n'est pas présent dans la maquette Figma. À définir ultérieurement (menu déroulant du profil, ou bouton séparé).

---

## US-NAV-3 — Navigation pour utilisateur non connecté

**En tant que** visiteur non connecté  
**Je veux** voir des liens "Connexion" et "Inscription" dans la barre de navigation  
**Afin de** pouvoir m'authentifier

**Critères d'acceptation :**
- [ ] Sur les pages `/login` et `/register`, la barre de navigation affiche des liens vers l'autre page
- [ ] Pas de lien "Tableau de bord" ou "Projets" pour les utilisateurs non connectés

---

## Notes

- La barre de navigation est définie dans le layout racine ou le layout authentifié : voir [`sprint-1-fondations.md`](../sprints/sprint-1-fondations.md:144)
- Composant associé : [`Navigation.tsx`](../../frontend/src/components/layout/Navigation.tsx) (à créer)
- Voir aussi le composant [`PageHeader`](dashboard.md) pour l'en-tête de page (titre, description, actions)
