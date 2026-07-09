# Profil utilisateur (`/profile`)

> Page de gestion du compte utilisateur.

---

## US-PROFILE-1 — Modification des informations

**En tant qu'** utilisateur connecté
**Je veux** modifier mon prénom, mon nom, mon email et mon mot de passe
**Afin de** mettre à jour mes informations personnelles

**Critères d'acceptation :**
- [x] Les champs prénom, nom et email sont pré-remplis avec les valeurs actuelles
- [x] Le champ email valide le format email côté client (Zod)
- [x] Appel API `PUT /auth/profile`
- [x] En cas de succès, toast de confirmation et mise à jour du contexte
- [x] En cas d'erreur, toast d'erreur
- [x] Formulaire de changement de mot de passe (actuel, nouveau, confirmation)
- [x] Appel API `PUT /auth/password`

**À simplifier (Sprint 3) :**
- [ ] Fusionner les deux formulaires en un seul (comme la maquette Figma)
- [ ] Un seul bouton "Enregistrer" pour tout (nom, email, mot de passe)

---

## Notes

- ⚠️ **Attention :** La modification de l'email est risquée — si l'utilisateur met un mauvais email, il ne peut plus se connecter (pas de page "mot de passe oublié" fonctionnelle). Mais la maquette Figma le demande.
- Voir les schémas Zod dans [`validators.ts`](../../frontend/src/lib/validators.ts)
- Les règles de validation doivent correspondre à celles du backend : [`validation.ts`](../../backend/src/utils/validation.ts)
