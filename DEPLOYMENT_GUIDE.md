# 📘 Guide de Déploiement - happios.dev

## 🎯 Vue d'ensemble

Ce guide t'accompagne étape par étape pour publier ton site React iOS Security Demo sur GitHub Pages avec ton domaine personnalisé **happios.dev**.

---

## ✅ Prérequis

Avant de commencer, assure-toi d'avoir :

- [x] Un compte GitHub (username: **hoseiocean**)
- [x] Git installé sur ton ordinateur
- [x] Node.js et npm installés
- [x] Un dépôt GitHub nommé **happios.dev** (ou créé ci-dessous)
- [x] DNS configuré (déjà fait ✅)

---

## 📝 Étape 1 : Créer le dépôt sur GitHub

### Option A : Via l'interface GitHub
1. Va sur https://github.com/new
2. Nom du dépôt : **happios.dev**
3. Description : "iOS Security Architecture Interactive Demo"
4. Public
5. Ne pas initialiser avec README (on a déjà le code)
6. Clique sur "Create repository"

### Option B : Via GitHub CLI
```bash
gh repo create happios.dev --public --description "iOS Security Architecture Interactive Demo"
```

---

## 🚀 Étape 2 : Initialiser et Pousser le Code

Ouvre un terminal dans le dossier du projet et exécute :

```bash
# 1. Initialiser Git
git init
git branch -M main

# 2. Ajouter ton dépôt distant
git remote add origin https://github.com/hoseiocean/happios.dev.git

# 3. Ajouter tous les fichiers
git add .

# 4. Premier commit
git commit -m "Initial commit: iOS Security Demo"

# 5. Pousser sur GitHub
git push -u origin main
```

---

## 📦 Étape 3 : Installer les Dépendances

```bash
npm install
```

Cela va installer :
- React & React DOM
- React Scripts (Create React App)
- Lucide React (icônes)
- gh-pages (outil de déploiement)

---

## 🧪 Étape 4 : Tester en Local (Optionnel)

Avant de déployer, tu peux tester localement :

```bash
npm start
```

Ton navigateur devrait s'ouvrir sur http://localhost:3000

Vérifie que tout fonctionne correctement, puis arrête le serveur (Ctrl+C).

---

## 🚀 Étape 5 : Déployer sur GitHub Pages

### Méthode Automatique (Recommandée)

```bash
./deploy.sh
```

Ce script va :
1. ✅ Vérifier la configuration Git
2. ✅ Installer les dépendances si nécessaire
3. ✅ Committer et pousser sur `main`
4. ✅ Builder le projet
5. ✅ Déployer sur la branche `gh-pages`

### Méthode Manuelle

```bash
npm run deploy
```

---

## ⚙️ Étape 6 : Configurer GitHub Pages

1. Va sur ton dépôt : https://github.com/hoseiocean/happios.dev
2. Clique sur **Settings** (en haut à droite)
3. Dans le menu latéral, clique sur **Pages**
4. Dans "Build and deployment" :
   - **Source** : Deploy from a branch
   - **Branch** : `gh-pages` / `root`
   - Clique sur **Save**
5. Dans "Custom domain" :
   - Entre : **happios.dev**
   - Clique sur **Save**
   - Coche **Enforce HTTPS** (après quelques minutes)

---

## 🌐 Étape 7 : Vérifier le DNS

Tes enregistrements DNS sont déjà configurés ✅ :

```
Type    Name              Value
----    ----              -----
A       happios.dev       185.199.108.153
A       happios.dev       185.199.109.153
A       happios.dev       185.199.110.153
A       happios.dev       185.199.111.153
CNAME   www.happios.dev   hoseiocean.github.io
```

Le fichier `public/CNAME` contient : **happios.dev** ✅

---

## ⏱️ Étape 8 : Attendre la Propagation

- **GitHub Pages** : 2-5 minutes pour le premier déploiement
- **DNS/HTTPS** : 5-10 minutes pour le certificat SSL

---

## 🎉 Étape 9 : Vérifier le Déploiement

Ouvre dans ton navigateur :
- https://happios.dev
- https://www.happios.dev
- https://hoseiocean.github.io/happios.dev (sera redirigé)

---

## 🔄 Mises à Jour Futures

Pour mettre à jour ton site après des modifications :

```bash
# Méthode rapide
./deploy.sh

# Ou manuellement
git add .
git commit -m "Description des changements"
git push origin main
npm run deploy
```

---

## 🐛 Dépannage

### Problème : "Permission denied"
```bash
git remote set-url origin https://github.com/hoseiocean/happios.dev.git
# Ensuite réessaye le push
```

### Problème : Le site affiche une page 404
- Vérifie que GitHub Pages est activé dans Settings > Pages
- Vérifie que la branche `gh-pages` existe
- Attends 5 minutes et vide le cache du navigateur

### Problème : Les styles ne s'affichent pas
- Vérifie que `"homepage"` dans `package.json` est bien `"https://happios.dev"`
- Rebuild et redéploie : `npm run deploy`

### Problème : Le domaine personnalisé ne fonctionne pas
- Vérifie le fichier `public/CNAME`
- Vérifie les enregistrements DNS sur Cloudflare
- Attends 10-15 minutes pour la propagation DNS

---

## 📞 Support

Si tu as des problèmes :
1. Vérifie les logs dans le terminal
2. Vérifie l'onglet "Actions" sur GitHub
3. Vérifie Settings > Pages sur GitHub

---

## ✨ Félicitations !

Ton site iOS Security Demo est maintenant en ligne sur **happios.dev** ! 🎉
