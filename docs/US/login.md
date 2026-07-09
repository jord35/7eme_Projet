# Page Connexion (`/login`)

> Page d'authentification pour les utilisateurs existants.

---

## US-LOGIN-1 — Formulaire de connexion

**En tant que** visiteur non connecté
**Je veux** me connecter avec mon email et mon mot de passe
**Afin de** accéder à mon tableau de bord

**Critères d'acceptation :**
- [x] Un formulaire avec les champs email et mot de passe est affiché
- [x] Le champ email valide le format email côté client (Zod)
- [x] Le champ mot de passe est masqué (type password)
- [x] Un bouton de soumission "Se connecter" est présent
- [x] En cas d'erreur (mauvais identifiants), un toast "Email ou mot de passe incorrect" s'affiche
- [x] En cas de succès, l'utilisateur est redirigé vers `/dashboard`
- [x] Un état de chargement (spinner) est affiché pendant la requête

---

## US-LOGIN-2 — Lien vers l'inscription

**En tant que** visiteur non connecté
**Je veux** pouvoir accéder à la page d'inscription depuis la page de connexion
**Afin de** créer un compte si je n'en ai pas encore

**Critères d'acceptation :**
- [x] Un lien "S'inscrire" est visible sous le formulaire
- [x] Le lien redirige vers `/register`

---

## US-LOGIN-3 — Mot de passe oublié

**En tant que** visiteur non connecté
**Je veux** pouvoir accéder à une page de réinitialisation de mot de passe
**Afin de** retrouver l'accès à mon compte si j'ai oublié mon mot de passe

**Critères d'acceptation :**
- [ ] Un lien "Mot de passe oublié ?" est visible sur la page de connexion
- [ ] Le lien redirige vers une page dédiée (`/forgot-password`)
- [ ] La page `/forgot-password` n'existe pas encore → **à créer**

---

## Notes

- Voir aussi : [`register.md`](register.md) pour la page d'inscription
- La page `/forgot-password` est identifiée comme manquante
