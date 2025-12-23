# 🌿 iOS Security Demo - happios.dev

Démonstration interactive de l'architecture de sécurité iOS avec un design system élégant et naturel.

## ✨ Fonctionnalités

- 🔒 **Architecture de sécurité iOS complète**
  - AMFI (Apple Mobile File Integrity)
  - Sandbox (Isolation des applications)
  - ASLR (Address Space Layout Randomization)
  - XN Bit (Execute Never)
  - ATS (App Transport Security)
  - Secure Boot
  - Secure Enclave
  - Data Protection

- 🎨 **Design system custom**
  - Palette de 6 couleurs naturelles
  - Dark mode automatique
  - Animations fluides
  - Responsive design

- ♿ **Accessibilité**
  - Contraste WCAG AA
  - Focus visible
  - Navigation clavier

## 🎨 Palette de couleurs

| Nom           | HEX         | Usage                    |
| ------------- | ----------- | ------------------------ |
| **Alabaster** | `#EEECE6`   | Background principal     |
| **Silken**    | `#D9D1C4`   | Cards, sections          |
| **Moss**      | `#A3AE98`   | Surfaces, accents        |
| **Taupe**     | `#8E8274`   | Borders, séparateurs     |
| **Juniper**   | `#44554E`   | CTA, liens               |
| **Onyx**      | `#222222`   | Texte principal          |

Voir [PALETTE_DOCUMENTATION.md](./PALETTE_DOCUMENTATION.md) pour plus de détails.

## 🚀 Déploiement

### Prérequis

- Node.js 16+
- npm
- Git

### Installation locale

```bash
# Cloner le projet
git clone https://github.com/hoseiocean/happios.dev.git
cd happios.dev

# Installer les dépendances
npm install

# Lancer en développement
npm start
```

Le site sera disponible sur http://localhost:3000

### Déploiement sur GitHub Pages

```bash
# Build et déploiement
npm run deploy
```

Le site sera publié sur https://happios.dev

### Mise à jour

```bash
# Modifier le code
# Committer les changements
git add .
git commit -m "Update: description"
git push origin main

# Déployer
npm run deploy
```

Voir [GUIDE_MISE_A_JOUR.md](./GUIDE_MISE_A_JOUR.md) pour plus de détails.

## 📂 Structure du projet

```
happios.dev/
├── public/
│   ├── CNAME              # Domaine personnalisé
│   └── index.html         # Page HTML
├── src/
│   ├── IOSSecurityDemo.jsx  # Composant principal
│   ├── App.js               # Application React
│   ├── index.js             # Point d'entrée
│   ├── styles.css           # Design system
│   └── index.css            # Overrides & utilities
├── package.json
├── README.md
├── PALETTE_DOCUMENTATION.md
└── GUIDE_MISE_A_JOUR.md
```

## 🎯 Fonctionnalités techniques

### Dark mode

Le dark mode s'active automatiquement selon les préférences système :

```css
@media (prefers-color-scheme: dark) {
  /* Ajustements automatiques */
}
```

### Variables CSS

Le design system utilise des variables CSS pour faciliter la personnalisation :

```css
:root {
  --bg-primary: var(--color-alabaster);
  --text-primary: var(--color-onyx);
  --accent-primary: var(--color-juniper);
}
```

### Classes utilitaires

```css
.card          /* Card avec ombre */
.btn-primary   /* Bouton principal */
.badge-success /* Badge de succès */
.tab           /* Onglet */
```

## 🔧 Personnalisation

### Modifier les couleurs

Édite `src/styles.css` :

```css
:root {
  --color-alabaster: #EEECE6;  /* Ta couleur ici */
  --color-juniper: #44554E;
  /* etc. */
}
```

### Ajouter des composants

Ajoute tes styles dans `src/styles.css` :

```css
.mon-composant {
  background-color: var(--bg-secondary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}
```

## 📱 Responsive

Le site est optimisé pour tous les écrans :

- 📱 Mobile : 320px+
- 📱 Tablet : 768px+
- 💻 Desktop : 1024px+

## 🌐 URLs

- **Production** : https://happios.dev
- **WWW** : https://www.happios.dev
- **Repository** : https://github.com/hoseiocean/happios.dev

## 📊 Technologies

- React 18
- Lucide React (icônes)
- CSS Custom (design system)
- GitHub Pages (hébergement)
- Cloudflare (DNS & SSL)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour proposer des modifications :

1. Fork le projet
2. Crée une branche (`git checkout -b feature/amelioration`)
3. Commit tes changements (`git commit -m 'Add: nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/amelioration`)
5. Ouvre une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

**hoseiocean**
- GitHub: [@hoseiocean](https://github.com/hoseiocean)
- Site: [happios.dev](https://happios.dev)

## 🙏 Remerciements

- Inspiration de design : Palette naturelle terre & forêt
- Icônes : Lucide React
- Hébergement : GitHub Pages

---

Créé avec ❤️ pour la communauté iOS
