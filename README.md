# iOS Security Demo - happios.dev

Démonstration interactive de l'architecture de sécurité iOS incluant AMFI, Sandbox, ASLR, XN Bit, ATS, Secure Boot, Secure Enclave et Data Protection.

## 🚀 Déploiement sur GitHub Pages

Ce projet est configuré pour être déployé sur GitHub Pages avec le domaine personnalisé `happios.dev`.

### Commandes

```bash
# Installation des dépendances
npm install

# Lancement en développement local
npm start

# Build de production
npm run build

# Déploiement sur GitHub Pages
npm run deploy
```

### Configuration DNS

Le DNS est configuré avec :
- Enregistrements A pointant vers les serveurs GitHub Pages
- CNAME `www.happios.dev` → `hoseiocean.github.io`
- Fichier CNAME dans `/public` contenant `happios.dev`

## 📦 Technologies

- React 18
- Lucide React (icônes)
- Tailwind CSS
- GitHub Pages

## 👨‍💻 Auteur

hoseiocean
