# Page Inscription (`/register`)

> Page de création de compte pour les nouveaux utilisateurs.

---

## US-REGISTER-1 — Formulaire d'inscription

**En tant que** visiteur non connecté
**Je veux** créer un compte avec mon prénom, mon nom, mon email et mon mot de passe
**Afin de** accéder à l'application

**Critères d'acceptation :**
- [x] Un formulaire avec les champs prénom, nom, email, mot de passe et confirmation est affiché
- [x] Le champ email valide le format email côté client (Zod)
- [x] Le mot de passe respecte les règles : ≥ 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (@ $ ! % * ? &)
- [x] Le champ confirmation vérifie que les deux mots de passe sont identiques
- [x] Un bouton "Créer un compte" est présent
- [x] Appel API `POST /auth/register`
- [x] En cas de succès, redirection vers `/login` avec un toast de confirmation
- [x] En cas d'erreur (email déjà utilisé), toast d'erreur affiché
- [x] État de chargement pendant la requête

---

## US-REGISTER-2 — Lien vers la connexion

**En tant que** visiteur non connecté
**Je veux** pouvoir accéder à la page de connexion depuis la page d'inscription
**Afin de** me connecter si j'ai déjà un compte

**Critères d'acceptation :**
- [x] Un lien "Déjà un compte ? Se connecter" est visible sous le formulaire
- [x] Le lien redirige vers `/login`

---

## Notes

- Voir aussi : [`login.md`](login.md) pour la page de connexion
- Les règles de validation côté client (Zod) sont dans [`validators.ts`](../../frontend/src/lib/validators.ts)
