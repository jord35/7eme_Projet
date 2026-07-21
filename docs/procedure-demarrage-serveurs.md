# Procédure de démarrage des serveurs

> ⚠️ **À lire attentivement avant chaque lancement**
> Le non-respect de cette procédure peut faire buguer l'ordinateur (cache Next.js saturé, processus zombies, boucle infinie de compilation).

---

## 🧹 Étape 1 — Nettoyage préalable (OBLIGATOIRE)

Avant tout, il faut **tuer les éventuels processus Node.js résiduels** et **vider le cache Next.js**.

```bash
# 1. Tuer tous les processus Node.js en cours
taskkill /F /IM node.exe

# 2. Supprimer le cache de compilation Next.js
cd frontend
rmdir /s /q .next
```

> **Pourquoi ?** Next.js stocke un cache de compilation dans le dossier `.next/`. Si ce cache est corrompu ou date d'une version différente du code, le serveur tourne en boucle à compiler sans fin, ce qui sature le CPU et fait buguer l'ordinateur.

---

## 🚀 Étape 2 — Lancement du backend (port 8000)

```bash
cd backend
npm run dev
```

Vérifier que le message suivant apparaît :
```
✅ Connexion à la base de données établie
🚀 Serveur démarré sur le port 8000
```

---

## 🚀 Étape 3 — Lancement du frontend (port 8001)

**⚠️ Attendre que le backend soit bien lancé avant de faire cette étape.**

```bash
cd frontend
npm run dev
```

Le premier chargement peut prendre quelques secondes (compilation à la volée). C'est normal.

---

## 🛑 Étape 4 — Arrêt des serveurs

Quand tu veux arrêter :

```bash
taskkill /F /IM node.exe
```

Ou dans chaque terminal : `Ctrl + C`

---

## ❓ Problèmes fréquents

| Symptôme | Cause probable | Solution |
|----------|---------------|----------|
| Port 8000 déjà utilisé | Processus résiduel | `taskkill /F /IM node.exe` puis relancer |
| Ordinateur qui rame / CPU à 100% | Cache Next.js corrompu | Supprimer `.next/` et relancer |
| Frontend ne répond pas | Il compile encore | Attendre 10-15s le temps de la compilation initiale |
| "Port already in use" | Un autre processus occupe le port | `netstat -ano \| findstr :8000` pour trouver le PID, puis `taskkill /PID <PID> /F` |

---

## ✅ Résumé visuel

```
1. taskkill /F /IM node.exe          ← Tue tout processus Node résiduel
2. rmdir /s /q frontend\.next        ← Vide le cache Next.js
3. cd backend && npm run dev         ← Lance le backend (port 8000)
4. cd frontend && npm run dev        ← Lance le frontend (port 8001)
```
