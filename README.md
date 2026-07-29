# 🍑 Abricot — Gestion de projets collaborative

Application web de gestion de projets avec système d'authentification, tableaux Kanban, et gestion des rôles (administrateur / contributeur).

## Stack technique

- **Frontend** : Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend** : Node.js, Express, TypeScript, Prisma (ORM)
- **Base de données** : PostgreSQL
- **Authentification** : JWT (JSON Web Tokens)

## Démarrage rapide

### 1. Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed    # Crée les données de test
npm run dev     # http://localhost:8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev     # http://localhost:8001
```

### Compte de test

| Email | Mot de passe |
|-------|-------------|
| `alice@example.com` | `P@ssword123` |

## Documentation API

http://localhost:8000/api-docs (Swagger)

## Fonctionnalités

- Inscription / Connexion sécurisée
- Dashboard avec vue Liste et Kanban
- Création et gestion de projets
- Attribution des tâches par priorité et statut
- Système de commentaires
- Profil utilisateur
- Accessibilité WCAG AA 
