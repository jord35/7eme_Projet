# Page 404 (`not-found.tsx`)

> Utilise la [`Navigation`](navigation.md) si l'utilisateur est connecté.

> Page affichée lorsqu'une route ne correspond à aucune page existante.

---

## US-404-1 — Page non trouvée

**En tant qu'** utilisateur (connecté ou non)  
**Je veux** voir une page d'erreur claire lorsque je tombe sur une URL inexistante  
**Afin de** comprendre que la page n'existe pas et être redirigé

**Critères d'acceptation :**
- [x] Un message "Page non trouvée" et "404" sont affichés
- [x] Un bouton "Retour à l'accueil" est présent
- [x] Si l'utilisateur est connecté, le bouton redirige vers `/dashboard`
- [x] Si l'utilisateur n'est pas connecté, le bouton redirige vers `/login`
- [x] Le design est cohérent avec le reste de l'application

---

## Notes

- Voir la page 404 existante dans `test-next` : [`not-found.tsx`](../../test-next/src/app/not-found.tsx)
- Voir les specs : [`sprint-1-fondations.md`](../sprints/sprint-1-fondations.md:120)
