# 🌿 iOS Security Demo - happios.dev

Démonstration interactive de l'architecture de sécurité iOS avec Tailwind CSS CDN et palette de couleurs custom.

## ✨ Points clés

✅ **Tailwind CSS via CDN** - Pas de build complexe, configuration directe dans HTML
✅ **Palette custom intégrée** - 6 couleurs (Alabaster, Silken, Moss, Taupe, Juniper, Onyx)
✅ **Dark mode automatique** - Selon préférences système
✅ **Composant inchangé** - Overrides CSS pour mapper les couleurs

## 🎨 Configuration Tailwind

La configuration est directement dans `public/index.html` :

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    darkMode: 'media',
    theme: {
      extend: {
        colors: {
          alabaster: '#EEECE6',
          silken: '#D9D1C4',
          moss: '#A3AE98',
          taupe: '#8E8274',
          juniper: '#44554E',
          onyx: '#222222',
        }
      }
    }
  }
</script>
```

## 🎯 Avantages de cette approche

### ✅ Avec Tailwind CDN

- **Simple** : Un seul fichier HTML à éditer
- **Rapide** : Pas de build Tailwind séparé
- **Flexible** : Changement de couleur = 1 ligne à modifier
- **Léger** : Tailwind purge automatiquement les classes non utilisées en production

### ⚠️ Comparé à l'approche CSS custom

- **CDN** : Configuration dans HTML, classes Tailwind natives disponibles
- **CSS custom** : Plus de contrôle bas niveau, variables CSS réutilisables
- **Les deux** : Fonctionnent parfaitement !

## 🚀 Utilisation

### Installation

```bash
npm install
```

### Développement

```bash
npm start
```

### Déploiement

```bash
npm run deploy
```

## 🎨 Palette de couleurs

### Utilisation dans le code

```jsx
// Couleurs directes
<div className="bg-alabaster text-onyx">
  <button className="bg-juniper text-alabaster">Click</button>
</div>

// Dark mode automatique avec variant dark:
<div className="bg-alabaster dark:bg-onyx">
  <p className="text-onyx dark:text-alabaster">Texte</p>
</div>
```

### Light Mode
- Background : `bg-alabaster` (#EEECE6)
- Cards : `bg-silken` (#D9D1C4)
- Accent : `bg-juniper` (#44554E)
- Text : `text-onyx` (#222222)

### Dark Mode
- Background : `bg-onyx` (#222222)
- Cards : `bg-juniper` (#44554E)
- Accent : `bg-moss` (#A3AE98)
- Text : `text-alabaster` (#EEECE6)

## 🔧 Personnalisation

### Changer une couleur

Édite `public/index.html`, section `tailwind.config` :

```javascript
colors: {
  juniper: '#44554E',  // Change cette valeur
}
```

### Ajouter une couleur

```javascript
colors: {
  alabaster: '#EEECE6',
  // ... autres couleurs
  mauve: '#9B7EBD',  // Nouvelle couleur
}
```

Puis utilise : `bg-mauve`, `text-mauve`, etc.

### Modifier les overrides

Édite la section `<style type="text/tailwindcss">` dans `public/index.html` :

```css
.bg-blue-600 {
  @apply bg-juniper dark:bg-moss;
}
```

## 📱 Dark Mode

Le dark mode utilise `prefers-color-scheme` :

- **macOS** : Préférences Système > Apparence > Sombre
- **iOS** : Réglages > Luminosité > Sombre
- **Windows** : Paramètres > Personnalisation > Sombre

Pour forcer le dark mode en dev, utilise les DevTools du navigateur.

## 🌐 URLs

- **Production** : https://happios.dev
- **WWW** : https://www.happios.dev
- **Repository** : https://github.com/hoseiocean/happios.dev

## 📊 Technologies

- React 18
- Tailwind CSS (via CDN)
- Lucide React (icônes)
- GitHub Pages
- Cloudflare (DNS)

## 📝 Structure

```
happios.dev/
├── public/
│   ├── CNAME              # Domaine custom
│   └── index.html         # Config Tailwind + overrides
├── src/
│   ├── IOSSecurityDemo.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css          # Minimal
└── package.json
```

## 💡 Tips

### Utiliser les couleurs custom

```jsx
// Au lieu de
<div className="bg-blue-500">

// Utilise
<div className="bg-juniper">

// Avec dark mode
<div className="bg-juniper dark:bg-moss">
```

### Classes Tailwind complètes disponibles

Toutes les classes Tailwind standard fonctionnent :
- Layout : `flex`, `grid`, `container`
- Spacing : `p-4`, `m-2`, `space-y-4`
- Typography : `text-xl`, `font-bold`
- Responsive : `md:flex`, `lg:grid`
- States : `hover:opacity-80`, `focus:ring-2`

## ✅ Checklist déploiement

- [ ] `npm install`
- [ ] Tester en local : `npm start`
- [ ] Vérifier les couleurs (light + dark)
- [ ] Déployer : `npm run deploy`
- [ ] Attendre 5 minutes
- [ ] Vérifier https://happios.dev
- [ ] Tester dark mode
- [ ] Vérifier sur mobile

## 🎉 C'est tout !

Ton site a maintenant :
- 🎨 Tailwind CSS complet via CDN
- 🌿 Ta palette custom intégrée
- 🌓 Dark mode automatique
- ⚡ Performance optimale

---

Créé avec ❤️ pour la communauté iOS
