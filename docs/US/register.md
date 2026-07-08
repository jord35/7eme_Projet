# Page Inscription (`/register`)

## US-REGISTER-1 — Création de compte

**En tant que** visiteur non connecté  
**Je veux** créer un compte avec mon nom, mon email et mon mot de passe  
**Afin de** accéder à l'application

**Critères d'acceptation :**
- [x] Un formulaire avec les champs prénom, nom, email, mot de passe et confirmation est affiché
- [x] Le champ email valide le format email côté client (Zod)
- [x] Le mot de passe respecte les règles : ≥ 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (@ $ ! % * ? &)
- [x] Le champ confirmation vérifie que les deux mots de passe sont identiques
- [x] Un bouton "Créer un compte" est présent
- [x] Appel API `POST /auth/register`
- [x] En cas de succès, redirection vers `/login` avec un message de succès
- [x] En cas d'erreur de validation (Zod), message d'erreur affiché avant envoi à l'API
- [x] En cas d'erreur backend (email déjà utilisé), message d'erreur affiché après la réponse API
- [x] État de chargement pendant la requête

---

## US-REGISTER-2 — Lien vers la connexion

**En tant que** visiteur non connecté  
**Je veux** pouvoir accéder à la page de connexion depuis la page d'inscription  
**Afin de** me connecter si j'ai déjà un compte

**Critères d'acceptation :**
- [x] Un lien "Déjà un compte ? Se connecter" est visible sur la page
- [x] Le lien redirige vers `/login`

---

## Notes

- Voir aussi : [`login.md`](login.md) pour la page de connexion
- Les règles de validation côté client (Zod) doivent correspondre à celles du backend : [`backend/src/utils/validation.ts`](../../backend/src/utils/validation.ts)
