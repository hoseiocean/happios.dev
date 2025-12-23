# ⚙️ Configuration GitHub Pages - happios.dev

## 🎯 Configuration dans GitHub

### Étape 1 : Aller dans les Settings

1. Va sur : https://github.com/hoseiocean/happios.dev
2. Clique sur **Settings** (onglet en haut)
3. Dans le menu latéral gauche, clique sur **Pages**

### Étape 2 : Configurer la Source

Dans la section **"Build and deployment"** :

```
Source: Deploy from a branch
Branch: gh-pages
Folder: / (root)
```

Clique sur **Save**

### Étape 3 : Configurer le Domaine Personnalisé

Dans la section **"Custom domain"** :

```
Custom domain: happios.dev
```

Clique sur **Save**

⚠️ **Important** : Ne coche PAS encore "Enforce HTTPS"
GitHub doit d'abord provisionner le certificat SSL.

### Étape 4 : Attendre la Vérification DNS

GitHub va vérifier que :
- ✅ Le fichier `CNAME` existe dans ton repo
- ✅ Les enregistrements DNS pointent vers GitHub Pages
- ✅ Le certificat SSL est provisionné

Cela peut prendre 5-10 minutes.

Tu verras un message :
```
✅ DNS check successful
```

### Étape 5 : Activer HTTPS

Une fois le certificat SSL provisionné, coche :
```
☑️ Enforce HTTPS
```

---

## 🔍 Vérifications à Faire

### Dans GitHub

1. **Actions Tab** : https://github.com/hoseiocean/happios.dev/actions
   - Vérifie que le workflow `pages-build-deployment` s'est exécuté avec succès

2. **Branches** : https://github.com/hoseiocean/happios.dev/branches
   - Tu dois voir les branches `main` et `gh-pages`

3. **Commits** : https://github.com/hoseiocean/happios.dev/commits/gh-pages
   - La branche `gh-pages` doit contenir les fichiers buildés

### En Ligne de Commande

```bash
# Vérifier les branches locales et distantes
git branch -a

# Voir les derniers commits sur gh-pages
git log origin/gh-pages --oneline -n 5

# Forcer la mise à jour des références
git fetch --all
```

---

## 🌐 URLs à Tester

Une fois déployé, teste ces URLs :

1. **Domaine principal** : https://happios.dev
2. **Sous-domaine www** : https://www.happios.dev
3. **URL GitHub Pages** : https://hoseiocean.github.io/happios.dev

Les trois devraient afficher ton site (ou rediriger vers happios.dev).

---

## 📊 Configuration DNS (Déjà Fait ✅)

Tes enregistrements DNS sur Cloudflare :

```
Type    Nom               Valeur                       TTL
----    ----              ------                       ---
A       happios.dev       185.199.108.153              1s
A       happios.dev       185.199.109.153              1s
A       happios.dev       185.199.110.153              1s
A       happios.dev       185.199.111.153              1s
AAAA    happios.dev       2606:50c0:8000::153          1s
AAAA    happios.dev       2606:50c0:8001::153          1s
AAAA    happios.dev       2606:50c0:8002::153          1s
AAAA    happios.dev       2606:50c0:8003::153          1s
CNAME   www.happios.dev   hoseiocean.github.io.        3600s
```

---

## 🐛 Dépannage GitHub Pages

### Le site affiche 404

**Causes possibles** :
1. La branche `gh-pages` n'existe pas encore
2. Le build a échoué
3. GitHub Pages n'est pas activé

**Solutions** :
```bash
# Redéployer
npm run deploy

# Vérifier que gh-pages existe
git ls-remote --heads origin
```

### Le domaine personnalisé ne fonctionne pas

**Causes possibles** :
1. Le CNAME n'est pas dans `public/`
2. Les DNS ne sont pas propagés
3. Le certificat SSL n'est pas prêt

**Solutions** :
```bash
# Vérifier le CNAME
cat public/CNAME

# Attendre la propagation DNS (5-15 minutes)
# Vérifier avec :
dig happios.dev
dig www.happios.dev
```

### Les fichiers ne se chargent pas (404 sur les assets)

**Cause** : Le `homepage` dans `package.json` est incorrect

**Solution** :
```json
{
  "homepage": "https://happios.dev"
}
```

Puis redéployer : `npm run deploy`

### HTTPS ne s'active pas

**Cause** : Le certificat SSL n'est pas encore provisionné

**Solution** : Attendre 10-15 minutes, puis réessayer.

---

## 🔄 Workflow de Mise à Jour

```bash
# 1. Modifier ton code
# 2. Tester localement
npm start

# 3. Committer les changements
git add .
git commit -m "Update: description"
git push origin main

# 4. Déployer
npm run deploy

# 5. Attendre 2-3 minutes
# 6. Vérifier sur https://happios.dev
```

---

## 📈 Monitoring

Tu peux surveiller :

1. **GitHub Actions** : https://github.com/hoseiocean/happios.dev/actions
2. **GitHub Insights** : https://github.com/hoseiocean/happios.dev/graphs/traffic
3. **Cloudflare Analytics** : Dans ton dashboard Cloudflare

---

## ✅ Checklist Finale

Avant de considérer que tout est OK :

- [ ] Le repo existe sur GitHub
- [ ] La branche `main` contient le code source
- [ ] La branche `gh-pages` contient le build
- [ ] GitHub Pages est activé dans Settings > Pages
- [ ] Le domaine personnalisé est configuré
- [ ] Le certificat SSL est actif
- [ ] https://happios.dev affiche le site
- [ ] https://www.happios.dev affiche le site
- [ ] HTTPS est forcé

🎉 Si tout est coché, tu es en production !
