# Profil utilisateur (`/profile`)

> Utilise la [`Navigation`](navigation.md) pour la barre de navigation.

> Page de gestion du compte utilisateur : informations personnelles et mot de passe.

---

## US-PROFILE-1 — Modification des informations personnelles

**En tant qu'** utilisateur connecté  
**Je veux** modifier mon nom, mon prénom et mon email  
**Afin de** mettre à jour mes informations personnelles

**Critères d'acceptation :**
- [x] Les champs prénom, nom et email sont pré-remplis avec les valeurs actuelles
- [x] Le champ email valide le format email côté client (Zod)
- [x] La validation côté client (Zod) vérifie le format de l'email
- [x] Appel API `PUT /auth/profile`
- [x] En cas de succès, message de confirmation et mise à jour du contexte d'authentification
- [x] En cas d'erreur, message d'erreur affiché
- [x] Bouton "Enregistrer" avec état de chargement

---

## US-PROFILE-2 — Changement de mot de passe

**En tant qu'** utilisateur connecté  
**Je veux** changer mon mot de passe  
**Afin de** sécuriser mon compte

**Critères d'acceptation :**
- [x] Un formulaire dédié avec les champs : mot de passe actuel, nouveau mot de passe, confirmation
- [x] La validation côté client (Zod) vérifie les règles du mot de passe (≥ 8 car, maj, min, chiffre, spécial)
- [x] Appel API `PUT /auth/password`
- [x] En cas de succès, message de confirmation
- [x] En cas d'erreur, message d'erreur affiché
- [x] Les champs sont vidés après un changement réussi

---

## Notes

- Voir les schémas Zod dans [`validators.ts`](../../frontend/src/lib/validators.ts) (à créer)
- Les règles de validation doivent correspondre à celles du backend : [`validation.ts`](../../backend/src/utils/validation.ts)
