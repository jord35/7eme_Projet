# Page 404 (`not-found.tsx`)

> Page affichée lorsqu'une route ne correspond à aucune page existante.

---

## US-404-1 — Page non trouvée

**En tant qu'** utilisateur (connecté ou non)
**Je veux** voir une page d'erreur claire lorsque je tombe sur une URL inexistante
**Afin de** comprendre que la page n'existe pas et être redirigé

**Critères d'acceptation :**
- [x] Un message "404" et "Page non trouvée" sont affichés
- [x] Un bouton "Retour à l'accueil" est présent
- [x] Si l'utilisateur est connecté, le bouton redirige vers `/dashboard`
- [x] Si l'utilisateur n'est pas connecté, le bouton redirige vers `/login`
- [x] Le design est cohérent avec le reste de l'application

---

## Notes

- La page utilise `useAuth()` pour savoir si l'utilisateur est connecté
- C'est pour ça que `AuthProvider` est dans le layout racine et pas dans `(authenticated)/`
