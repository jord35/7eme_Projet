# Sprint 1 — Fondations (Navigation + Auth + Profil + 404)

> **Objectif :** Structure de base de l'application + authentification fonctionnelle + composants transverses.
> **Durée estimée :** 3-4 jours
> **US couvertes :** US-LOGIN-1, US-LOGIN-2, US-REGISTER-1, US-REGISTER-2, US-NAV-1, US-NAV-2, US-NAV-3, US-PROFILE-1, US-PROFILE-2, US-404-1
> **Dépendances :** Sprint 0 terminé

---

## 1. Structure des routes

```
/                          → Page d'accueil (redirection vers /dashboard ou /login)
/login                     → Connexion
/register                  → Inscription
/dashboard                 → Tableau de bord (protégé)
/profile                   → Profil utilisateur (protégé)
/projects                  → Liste des projets (protégé)
/projects/[id]             → Détail d'un projet (protégé)
*                          → Page 404
```

---

## 2. Composants transverses

### 2.1 Barre de navigation (`Navigation.tsx`)

**US associées :** [`US-NAV-1`](../US/navigation.md), [`US-NAV-2`](../US/navigation.md), [`US-NAV-3`](../US/navigation.md)

**Fonctionnalités :**
- [x] Liens "Tableau de bord" → `/dashboard` et "Projets" → `/projects`
- [x] Lien actif mis en évidence
- [x] Pseudo utilisateur cliquable → `/profile`
- [x] Déconnexion
- [x] Si non connecté : liens "Connexion" et "Inscription"
- [x] Accessible au clavier et lecteurs d'écran

### 2.2 En-tête de page (`PageHeader.tsx`)

**US associée :** [`US-DASHBOARD-1`](../US/dashboard.md)

**Fonctionnalités :**
- [x] Props : `title` (requis), `description`, `backLink`, `action`, `showEditButton`, `showIAButton`
- [x] S'adapte à chaque page (Dashboard, Projets, Détail projet)

---

## 3. US-LOGIN — Authentification

### 3.1 Page de connexion (`/login`)

**US associée :** [`US-LOGIN-1`](../US/login.md), [`US-LOGIN-2`](../US/login.md)

**Composant :** `LoginForm.tsx`

**Fonctionnalités :**
- [x] Formulaire avec `react-hook-form` + `zod`
- [x] Champs : email, mot de passe
- [x] Validation côté client (email valide, mot de passe requis)
- [x] Appel API `POST /auth/login`
- [x] Stockage du token JWT (sessionStorage)
- [x] Redirection vers `/dashboard` après connexion
- [x] Message d'erreur générique ("Email ou mot de passe incorrect")
- [x] Lien vers la page d'inscription
- [x] État de chargement pendant la requête

**Schéma zod :**
```typescript
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});
```

### 3.2 Page d'inscription (`/register`)

**US associée :** [`US-REGISTER-1`](../US/register.md), [`US-REGISTER-2`](../US/register.md)

**Composant :** `RegisterForm.tsx`

**Fonctionnalités :**
- [x] Formulaire avec `react-hook-form` + `zod`
- [x] Champs : prénom, nom, email, mot de passe, confirmation
- [x] Validation : email valide, mot de passe ≥ 8 car + maj + min + chiffre + spécial, confirmation identique
- [x] Appel API `POST /auth/register`
- [x] Redirection vers `/login` avec message de succès
- [x] Message d'erreur si email déjà utilisé (vient du backend)
- [x] Lien vers la page de connexion

**Schéma zod :**
```typescript
export const registerSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z.string()
    .min(8, "Minimum 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[a-z]/, "Au moins une minuscule")
    .regex(/[0-9]/, "Au moins un chiffre")
    .regex(/[@$!%*?&]/, "Au moins un caractère spécial"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});
```

### 3.3 Contexte d'authentification (`AuthContext.tsx`)

**Fonctionnalités :**
- [x] État global : `user`, `isLoading`, `isAuthenticated`
- [x] Fonction `login(token, user)` → stocke le token + met à jour l'état
- [x] Fonction `logout()` → supprime le token + redirige vers `/login`
- [x] Au chargement, vérifie si un token existe → appelle `GET /auth/profile`
- [x] Fournit le contexte à toute l'application

### 3.4 Protection des routes

**Layout `(authenticated)/layout.tsx` :**
- [x] Vérifie si l'utilisateur est connecté
- [x] Si non connecté → redirection vers `/login`
- [x] Si chargement → affiche un spinner
- [x] Si connecté → affiche le contenu + [`Navigation`](../US/navigation.md)

---

## 4. US-PROFILE — Gestion du profil

### 4.1 Page profil (`/profile`)

**US associée :** [`US-PROFILE-1`](../US/profile.md), [`US-PROFILE-2`](../US/profile.md)

**Composant :** `ProfileForm.tsx`

**Fonctionnalités :**
- [x] Affichage des informations actuelles (prénom, nom, email)
- [x] Formulaire d'édition (prénom, nom, email) avec `react-hook-form` + `zod`
- [x] Appel API `PUT /auth/profile`
- [x] Message de succès après modification
- [x] Mise à jour du contexte d'authentification

**Section changement de mot de passe :**
- [x] Formulaire dédié (mot de passe actuel, nouveau, confirmation)
- [x] Appel API `PUT /auth/password`
- [x] Message de succès/erreur

---

## 5. US-404 — Page 404

### 5.1 Page 404 (`not-found.tsx`)

**US associée :** [`US-404-1`](../US/not-found.md)

**Fonctionnalités :**
- [x] Message clair "Page non trouvée"
- [x] Bouton "Retour à l'accueil"
- [x] Si connecté → redirige vers `/dashboard`
- [x] Si non connecté → redirige vers `/login`
- [x] Design cohérent avec le reste de l'application

---

## 6. Layout global

### 6.1 Layout racine (`app/layout.tsx`)

- [x] Structure HTML de base (`<html>`, `<body>`)
- [x] Import des polices (Google Fonts ou locales)
- [x] Provider du contexte d'authentification
- [x] Provider des toasts (`sonner`)
- [x] Métadonnées (title, description)

### 6.2 Layout authentifié (`(authenticated)/layout.tsx`)

- [x] Barre de navigation [`Navigation`](../US/navigation.md)
- [x] Vérification d'authentification
- [x] Redirection si non connecté

---

## 7. Composants UI de base

Ces composants seront utilisés dans tous les formulaires :

| Composant | Props principales | Rôle |
|-----------|------------------|------|
| `Input` | `label, error, ...inputProps` | Champ texte avec label et erreur |
| `Textarea` | `label, error, rows, ...props` | Zone de texte |
| `Select` | `label, options, error, ...props` | Liste déroulante |
| `Button` | `variant, isLoading, children` | Bouton avec état de chargement |
| `Spinner` | `size` | Indicateur de chargement |
| `Badge` | `variant, children` | Badge coloré (statut, rôle) |

---

## 8. Appels API

### Fichier `src/lib/api.ts`

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Fonctions à implémenter :
- login(email, password)
- register(email, password, firstName, lastName)
- getProfile()
- updateProfile({ firstName, lastName, email })
- updatePassword(currentPassword, newPassword)
```

---

## 9. Checklist de fin de Sprint 1

### Composants transverses
- [x] `Navigation.tsx` créé et intégré au layout
- [x] `PageHeader.tsx` créé (utilisé sur Dashboard)

### US-LOGIN — Authentification
- [x] Page `/login` fonctionnelle
- [x] Page `/register` fonctionnelle (avec prénom + nom)
- [x] AuthContext opérationnel
- [x] Protection des routes (layout authentifié)
- [x] Gestion des erreurs API
- [x] Stockage sécurisé du token

### US-PROFILE — Profil
- [x] Page `/profile` affiche les infos (prénom, nom, email)
- [x] Modification prénom/nom/email fonctionnelle
- [x] Changement de mot de passe fonctionnel
- [x] Messages de succès/erreur

### US-404 — Page 404
- [x] Page 404 personnalisée
- [x] Redirection adaptée (connecté / non connecté)

### Layout
- [x] Navigation avec liens Dashboard et Projets
- [ ] Footer (non prioritaire)
- [x] Layout racine configuré
- [x] Polices chargées

### Composants UI
- [x] Input, Textarea, Select, Button créés
- [x] Spinner créé
- [x] Badge créé
- [x] Modal créée

### Qualité
- [x] Tous les formulaires utilisent `react-hook-form` + `zod`
- [x] Tous les labels sont associés aux champs
- [x] Messages d'erreur avec `role="alert"`
- [x] Pas d'erreur console
- [x] Commit : "Sprint 1 — Fondations (Navigation + Auth + Profil + 404)"
