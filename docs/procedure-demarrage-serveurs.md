# 🚀 Procédure de démarrage des serveurs

> ⚠️ **Règle absolue** : Les serveurs doivent être lancés dans des **fenêtres de terminal Windows indépendantes** (cmd.exe), PAS dans les terminaux internes de l'agent IA. Cela permet :
> - De voir les logs en temps réel
> - De garder les serveurs actifs même en changeant d'agent
> - D'avoir un contrôle direct sur les processus

---

## 🖥️ Fenêtre 1 — Backend (Express + TypeScript)

```cmd
start "Backend - Abricot" cmd /c "cd /d d:\openclassrooms_FStack\7eme_projet\backend && npm run dev"
```

- **Port** : `8000`
- **URL** : http://localhost:8000
- **Documentation API** : http://localhost:8000/api-docs
- **Redémarrage** : `Ctrl + C` puis relancer la commande

## 🖥️ Fenêtre 2 — Frontend (Next.js + Turbopack)

```cmd
start "Frontend - Abricot" cmd /c "cd /d d:\openclassrooms_FStack\7eme_projet\frontend && npm run dev"
```

- **Port** : `8001`
- **URL** : http://localhost:8001
- **Redémarrage** : `Ctrl + C` puis relancer la commande

---

## 🔄 En cas de problème

### 1. Tuer tous les processus Node

```cmd
taskkill /F /IM node.exe
```

### 2. Supprimer le cache Next.js

```cmd
rmdir /s /q d:\openclassrooms_FStack\7eme_projet\frontend\.next
```

### 3. Relancer les deux fenêtres avec les commandes ci-dessus

---

## 📝 Notes

- Le backend utilise **nodemon** → redémarre automatiquement au moindre changement dans `src/`
- Le frontend utilise **Turbopack** (compilateur rapide Next.js)
- Si le frontend est lent au premier chargement, c'est normal : Next.js compile les pages à la volée
- Ne pas lancer les serveurs depuis l'agent IA — toujours utiliser les fenêtres Windows dédiées
