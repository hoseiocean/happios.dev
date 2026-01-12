# happios.dev

Site personnel présentant du contenu éducatif sur la sécurité iOS.

🌐 **[happios.dev](https://happios.dev)**

## Technologies

- React 18
- Tailwind CSS (via CDN)
- Lucide React
- react-i18next (FR, EN, ES, DE)
- GitHub Pages
- Cloudflare (DNS)

## Structure

```
happios.dev/
├── public/
│   ├── CNAME
│   └── index.html
├── src/
│   ├── locales/
│   │   ├── fr.json
│   │   ├── en.json
│   │   ├── es.json
│   │   └── de.json
│   ├── IOSSecurityDemo-i18n.jsx
│   ├── App.js
│   ├── i18n.js
│   ├── index.js
│   └── index.css
└── package.json
```

## Palette de couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Alabaster | `#EEECE6` | Background light |
| Silken | `#D9D1C4` | Cards light |
| Moss | `#A3AE98` | Accent dark |
| Taupe | `#8E8274` | Secondary |
| Juniper | `#44554E` | Accent light |
| Onyx | `#222222` | Background dark |

## Développement

```bash
npm install
npm start
```

## Déploiement

```bash
npm run deploy
```

---

© Thomas Heinis
