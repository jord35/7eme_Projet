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
- [ ] Liens "Tableau de bord" → `/dashboard` et "Projets" → `/projects`
- [ ] Lien actif mis en évidence
- [ ] Pseudo utilisateur cliquable → `/profile`
- [ ] Déconnexion (emplacement à définir, absent de la maquette)
- [ ] Si non connecté : liens "Connexion" et "Inscription"
- [ ] Accessible au clavier et lecteurs d'écran

### 2.2 En-tête de page (`PageHeader.tsx`)

**US associée :** [`US-DASHBOARD-1`](../US/dashboard.md)

**Fonctionnalités :**
- [ ] Props : `title` (requis), `description`, `backLink`, `action`, `showEditButton`, `showIAButton`
- [ ] S'adapte à chaque page (Dashboard, Projets, Détail projet)

---

## 3. US-LOGIN — Authentification

### 3.1 Page de connexion (`/login`)

**US associée :** [`US-LOGIN-1`](../US/login.md), [`US-LOGIN-2`](../US/login.md)

**Composant :** `LoginForm.tsx`

**Fonctionnalités :**
- [ ] Formulaire avec `react-hook-form` + `zod`
- [ ] Champs : email, mot de passe
- [ ] Validation côté client (email valide, mot de passe requis)
- [ ] Appel API `POST /auth/login`
- [ ] Stockage du token JWT (sessionStorage)
- [ ] Redirection vers `/dashboard` après connexion
- [ ] Message d'erreur générique ("Email ou mot de passe incorrect")
- [ ] Lien vers la page d'inscription
- [ ] État de chargement pendant la requête

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
- [ ] Formulaire avec `react-hook-form` + `zod`
- [ ] Champs : prénom, nom, email, mot de passe, confirmation
- [ ] Validation : email valide, mot de passe ≥ 8 car + maj + min + chiffre + spécial, confirmation identique
- [ ] Appel API `POST /auth/register`
- [ ] Redirection vers `/login` avec message de succès
- [ ] Message d'erreur si email déjà utilisé (vient du backend)
- [ ] Lien vers la page de connexion

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
- [ ] État global : `user`, `isLoading`, `isAuthenticated`
- [ ] Fonction `login(token, user)` → stocke le token + met à jour l'état
- [ ] Fonction `logout()` → supprime le token + redirige vers `/login`
- [ ] Au chargement, vérifie si un token existe → appelle `GET /auth/profile`
- [ ] Fournit le contexte à toute l'application

### 3.4 Protection des routes

**Layout `(authenticated)/layout.tsx` :**
- [ ] Vérifie si l'utilisateur est connecté
- [ ] Si non connecté → redirection vers `/login`
- [ ] Si chargement → affiche un spinner
- [ ] Si connecté → affiche le contenu + [`Navigation`](../US/navigation.md)

---

## 4. US-PROFILE — Gestion du profil

### 4.1 Page profil (`/profile`)

**US associée :** [`US-PROFILE-1`](../US/profile.md), [`US-PROFILE-2`](../US/profile.md)

**Composant :** `ProfileForm.tsx`

**Fonctionnalités :**
- [ ] Affichage des informations actuelles (prénom, nom, email)
- [ ] Formulaire d'édition (prénom, nom, email) avec `react-hook-form` + `zod`
- [ ] Appel API `PUT /auth/profile`
- [ ] Message de succès après modification
- [ ] Mise à jour du contexte d'authentification

**Section changement de mot de passe :**
- [ ] Formulaire dédié (mot de passe actuel, nouveau, confirmation)
- [ ] Appel API `PUT /auth/password`
- [ ] Message de succès/erreur

---

## 5. US-404 — Page 404

### 5.1 Page 404 (`not-found.tsx`)

**US associée :** [`US-404-1`](../US/not-found.md)

**Fonctionnalités :**
- [ ] Message clair "Page non trouvée"
- [ ] Bouton "Retour à l'accueil"
- [ ] Si connecté → redirige vers `/dashboard`
- [ ] Si non connecté → redirige vers `/login`
- [ ] Design cohérent avec le reste de l'application

---

## 6. Layout global

### 6.1 Layout racine (`app/layout.tsx`)

- [ ] Structure HTML de base (`<html>`, `<body>`)
- [ ] Import des polices (Google Fonts ou locales)
- [ ] Provider du contexte d'authentification
- [ ] Provider des toasts (`sonner`)
- [ ] Métadonnées (title, description)

### 6.2 Layout authentifié (`(authenticated)/layout.tsx`)

- [ ] Barre de navigation [`Navigation`](../US/navigation.md)
- [ ] Vérification d'authentification
- [ ] Redirection si non connecté

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
- [ ] `Navigation.tsx` créé et intégré au layout
- [ ] `PageHeader.tsx` créé (utilisé sur Dashboard)

### US-LOGIN — Authentification
- [ ] Page `/login` fonctionnelle
- [ ] Page `/register` fonctionnelle (avec prénom + nom)
- [ ] AuthContext opérationnel
- [ ] Protection des routes (layout authentifié)
- [ ] Gestion des erreurs API
- [ ] Stockage sécurisé du token

### US-PROFILE — Profil
- [ ] Page `/profile` affiche les infos (prénom, nom, email)
- [ ] Modification prénom/nom/email fonctionnelle
- [ ] Changement de mot de passe fonctionnel
- [ ] Messages de succès/erreur

### US-404 — Page 404
- [ ] Page 404 personnalisée
- [ ] Redirection adaptée (connecté / non connecté)

### Layout
- [ ] Navigation avec liens Dashboard et Projets
- [ ] Footer
- [ ] Layout racine configuré
- [ ] Polices chargées

### Composants UI
- [ ] Input, Textarea, Select, Button créés
- [ ] Spinner créé
- [ ] Badge créé

### Qualité
- [ ] Tous les formulaires utilisent `react-hook-form` + `zod`
- [ ] Tous les labels sont associés aux champs
- [ ] Messages d'erreur avec `role="alert"`
- [ ] Pas d'erreur console
- [ ] Commit : "Sprint 1 — Fondations (Navigation + Auth + Profil + 404)"
