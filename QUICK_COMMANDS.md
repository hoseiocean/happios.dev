# 🚀 Commandes Rapides - happios.dev

## Premier Déploiement

```bash
# 1. Initialiser Git
git init
git branch -M main
git remote add origin https://github.com/hoseiocean/happios.dev.git

# 2. Premier commit
git add .
git commit -m "Initial commit: iOS Security Demo"
git push -u origin main

# 3. Installer et déployer
npm install
npm run deploy
```

## Mises à Jour

```bash
# Déploiement automatique (recommandé)
./deploy.sh

# OU manuellement
git add .
git commit -m "Update: description des changements"
git push origin main
npm run deploy
```

## Commandes Utiles

```bash
# Tester en local
npm start                  # http://localhost:3000

# Build de production
npm run build

# Déployer uniquement
npm run deploy

# Voir les branches
git branch -a

# Voir l'historique des commits
git log --oneline

# Voir le statut
git status
```

## URLs

- **Site principal** : https://happios.dev
- **Site www** : https://www.happios.dev
- **GitHub repo** : https://github.com/hoseiocean/happios.dev
- **GitHub Pages** : https://hoseiocean.github.io/happios.dev

## Vérifications

```bash
# Vérifier la configuration Git
git remote -v

# Vérifier que le CNAME existe
cat public/CNAME

# Vérifier le package.json
cat package.json | grep homepage
```

## En Cas de Problème

```bash
# Réinitialiser le remote
git remote remove origin
git remote add origin https://github.com/hoseiocean/happios.dev.git

# Forcer le push
git push -f origin main

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Nettoyer le cache de gh-pages
rm -rf node_modules/.cache
npm run deploy
```

## Timeline Typique

1. `git push` → **Instantané**
2. `npm run deploy` → **1-2 minutes**
3. GitHub Pages build → **2-3 minutes**
4. Site accessible → **Total : 5 minutes**
5. HTTPS activé → **+ 5-10 minutes supplémentaires**
