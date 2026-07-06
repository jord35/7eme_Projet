# Sprint 0 — Veille technique

> **Objectif :** Préparer l'environnement, analyser les ressources, choisir les outils avant de coder.
> **Durée estimée :** 1-2 jours
> **Livrable :** Projet frontend initialisé, librairies installées, architecture définie.

---

## 1. Analyse de la maquette Figma

### Pages identifiées

| Page | Route | US associées | Composants clés |
|------|-------|-------------|-----------------|
| Connexion | `/login` | [`login.md`](../US/login.md) | Formulaire email + mot de passe |
| Inscription | `/register` | [`register.md`](../US/register.md) | Formulaire nom + prénom + email + mot de passe |
| Dashboard | `/dashboard` | [`dashboard.md`](../US/dashboard.md) | Stats, liste tâches, kanban, PageHeader |
| Profil | `/profile` | [`profile.md`](../US/profile.md) | Formulaire édition nom/prénom/email, changement mot de passe |
| Projets | `/projects` | [`projects.md`](../US/projects.md) | Grille de cartes projet avec progression et avatars |
| Détail projet | `/projects/[id]` | [`project-detail.md`](../US/project-detail.md) | Infos, membres, tâches, calendrier |
| 404 | `*` | [`not-found.md`](../US/not-found.md) | Page d'erreur personnalisée |

### Pages non présentes dans la maquette (écarts détectés)

| Page | Raison | Décision |
|------|--------|----------|
| Mot de passe oublié | Lien présent sur login mais page inexistante | Non prioritaire (hors MVP) |
| Création projet (`/projects/new`) | Remplacé par une modale | Voir [`modals.md`](../US/modals.md) |
| Modification projet | Remplacé par une modale | Voir [`modals.md`](../US/modals.md) |

### Composants transverses identifiés

| Composant | Rôle | Fichier US |
|-----------|------|-----------|
| **Navigation** | Barre de navigation (Dashboard, Projets, pseudo) | [`navigation.md`](../US/navigation.md) |
| **PageHeader** | En-tête de page (titre, description, actions) | [`dashboard.md`](../US/dashboard.md) |
| **Modal** | Conteneur pour les formulaires (création, modification) | [`modals.md`](../US/modals.md) |

### Éléments à extraire de Figma

- [x] Palette de couleurs (primaire, secondaire, neutres, succès, erreur) → `tailwind.config.ts`
- [x] Typographie (polices, tailles, graisses) → Manrope + Inter
- [ ] Espacements (marges, paddings standards) → retouche finale
- [x] Composants récurrents (boutons, inputs, cartes, badges, modales) → documentés dans les US
- [x] Icônes utilisées → 14 SVG dans `public/icons/`
- [ ] États des composants (hover, focus, disabled, error) → à définir
- [x] Barre de progression (utilisée dans les cartes projet)
- [x] Avatars utilisateur (max 4 affichés, puis "+X")

### Configuration Tailwind correspondante

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // À remplacer par les couleurs Figma
        primary: { /* ... */ },
        secondary: { /* ... */ },
      },
      fontFamily: {
        // À remplacer par la typo Figma
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
```

---

## 2. Choix des librairies

### Librairies recommandées

| Librairie | Version | Utilité | Justification soutenance |
|-----------|---------|---------|--------------------------|
| **react-hook-form** | ^7.x | Gestion des formulaires | "Réduit les re-rendus, gestion native des erreurs, API intuitive. Alternative à Formik, plus performante car utilise des refs plutôt que le state." |
| **@hookform/resolvers** | ^3.x | Intégration zod avec react-hook-form | "Permet de valider les formulaires avec un schéma zod côté client, cohérent avec la validation backend." |
| **zod** | ^3.x | Validation des données | "Validation déclarative, inférence TypeScript automatique, messages d'erreur personnalisables." |
| **sonner** | ^1.x | Notifications toast | "Léger (5KB), accessible, supporte le mode sombre, API simple. Alternative à react-hot-toast." |
| **lucide-react** | ^0.x | Icônes | "Icônes cohérentes, personnalisables (taille, couleur), tree-shakeable. Alternative à Font Awesome." |
| **date-fns** | ^3.x | Manipulation de dates | "Modulaire, pas de mutation, support i18n. Alternative à moment.js (déprécié)." |

### Librairies optionnelles

| Librairie | Utilité | Quand l'utiliser |
|-----------|---------|-----------------|
| **@dnd-kit/core** | Drag & drop Kanban | Sprint ultérieur (Dashboard) |
| **react-calendar** | Vue calendrier des tâches | Page détail projet (vue Calendrier) |
| **clsx** | Classes CSS conditionnelles | Si beaucoup de classes dynamiques |
| **tailwind-merge** | Fusion de classes Tailwind | Si conflits de classes dans les composants |

### Installation

```bash
cd frontend
npm install react-hook-form @hookform/resolvers zod sonner lucide-react date-fns
```

---

## 3. Architecture des composants

### Structure des dossiers

```
frontend/src/
├── app/                        ← Pages (App Router)
│   ├── layout.tsx              ← Layout racine
│   ├── page.tsx                ← Page d'accueil (/)
│   ├── not-found.tsx           ← Page 404
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── (authenticated)/
│       ├── layout.tsx          ← Layout protégé (contient Navigation)
│       ├── dashboard/
│       │   └── page.tsx
│       ├── profile/
│       │   └── page.tsx
│       └── projects/
│           ├── page.tsx
│           └── [id]/
│               └── page.tsx
├── components/                 ← Composants réutilisables
│   ├── ui/                     ← Composants UI de base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   ├── ProgressBar.tsx     ← Barre de progression (cartes projet)
│   │   └── Avatar.tsx          ← Avatars utilisateur
│   ├── forms/                  ← Formulaires
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ProfileForm.tsx
│   │   ├── CreateProjectForm.tsx
│   │   ├── EditProjectForm.tsx
│   │   ├── CreateTaskForm.tsx
│   │   └── EditTaskForm.tsx
│   ├── layout/                 ← Layout
│   │   ├── Navigation.tsx      ← Barre de navigation (ex-Header)
│   │   ├── PageHeader.tsx      ← En-tête de page réutilisable
│   │   └── Footer.tsx
│   └── features/               ← Composants métier
│       ├── ProjectCard.tsx
│       ├── TaskCard.tsx
│       ├── TaskKanban.tsx
│       ├── MemberList.tsx
│       ├── CommentSection.tsx
│       ├── DashboardStats.tsx
│       └── TaskCalendar.tsx    ← Vue calendrier (react-calendar)
├── hooks/                      ← Hooks personnalisés
│   ├── useAuth.ts
│   └── useDebounce.ts
├── lib/                        ← Utilitaires
│   ├── api.ts                  ← Appels API
│   ├── validators.ts           ← Schémas zod
│   └── utils.ts                ← Fonctions utilitaires
├── context/
│   └── AuthContext.tsx
└── types/
    └── index.ts                ← Types partagés
```

### Règles de nommage

- **Composants** : PascalCase (`ProjectCard.tsx`)
- **Hooks** : camelCase avec préfixe `use` (`useAuth.ts`)
- **Fichiers utilitaires** : camelCase (`api.ts`, `validators.ts`)
- **Dossiers** : kebab-case ou camelCase selon le contexte

---

## 4. Initialisation du projet

### Étapes

```bash
# 1. Créer le projet Next.js
cd e:/openclassrooms_FStack/7eme_projet
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir

# 2. Installer les librairies
cd frontend
npm install react-hook-form @hookform/resolvers zod sonner lucide-react date-fns

# 3. Installer Prettier
npm install -D prettier eslint-config-prettier

# 4. Créer les dossiers
mkdir -p src/components/ui src/components/forms src/components/layout src/components/features
mkdir -p src/hooks src/lib src/context src/types
```

### Fichiers de configuration créés

- [x] `.prettierrc` — Règles de formatage
- [ ] `.prettierignore` — Fichiers à ignorer (optionnel)
- [x] `tailwind.config.ts` — Couleurs et typos du projet
- [x] `src/lib/validators.ts` — Schémas zod pour tous les formulaires

---

## 5. Définition des schémas de validation (zod)

### Schémas à créer (basés sur les US)

```typescript
// src/lib/validators.ts
import { z } from "zod";

// Login
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

// Register (avec prénom + nom séparés)
export const registerSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
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

// Profil
export const profileSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
});

// Projet
export const createProjectSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères").max(100, "Maximum 100 caractères"),
  description: z.string().max(500, "Maximum 500 caractères").optional(),
});

// Tâche
export const createTaskSchema = z.object({
  title: z.string().min(2, "Minimum 2 caractères").max(200, "Maximum 200 caractères"),
  description: z.string().max(1000, "Maximum 1000 caractères").optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  dueDate: z.string().optional(),
  assigneeIds: z.array(z.string()).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
```

---

## 6. Checklist de fin de Sprint 0

- [x] Maquette Figma analysée et documentée
- [x] Écarts détectés documentés (mot de passe oublié, modales, bouton IA)
- [x] Palette de couleurs extraite → `tailwind.config.ts`
- [x] Typographie identifiée (Manrope titres, Inter corps)
- [x] Librairies choisies et justifiées
- [x] Projet frontend initialisé (`create-next-app`)
- [x] Librairies installées (react-hook-form, zod, sonner, react-calendar)
- [x] Dossiers créés selon l'architecture définie
- [x] Tailwind configuré avec les couleurs du projet
- [x] Schémas zod créés pour tous les formulaires
- [x] `.prettierrc` configuré
- [x] Icônes SVG exportées depuis Figma et renommées
- [ ] Espacements et bordures (retouche style finale)
- [ ] Premier commit : "Sprint 0 — Initialisation du projet frontend"
