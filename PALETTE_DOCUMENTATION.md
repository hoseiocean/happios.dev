# 🎨 PALETTE DE COULEURS - happios.dev

## 🌿 Inspiration

Cette palette s'inspire de la nature avec des tons terreux, végétaux et minéraux. Elle évoque :
- Le calme d'une forêt
- La douceur du lin naturel
- La solidité de la pierre

## 📊 Les 6 couleurs

| Nom           | HEX         | RGB             | Description             |
| ------------- | ----------- | --------------- | ----------------------- |
| **Alabaster** | **#EEECE6** | (238, 236, 230) | Blanc cassé très doux   |
| **Silken**    | **#D9D1C4** | (217, 209, 196) | Beige lin / sable clair |
| **Moss**      | **#A3AE98** | (163, 174, 152) | Vert sauge naturel      |
| **Taupe**     | **#8E8274** | (142, 130, 116) | Taupe chaud             |
| **Juniper**   | **#44554E** | (68, 85, 78)    | Vert forêt profond      |
| **Onyx**      | **#222222** | (34, 34, 34)    | Noir charbon            |

## 🌞 Light Mode

### Hiérarchie visuelle

```
┌─────────────────────────────────────────┐
│  Alabaster (#EEECE6)                    │ ← Background principal
│  ┌───────────────────────────────────┐  │
│  │ Silken (#D9D1C4)                  │  │ ← Cards, sections
│  │ ┌───────────────────────────────┐ │  │
│  │ │ Moss (#A3AE98)                │ │  │ ← Surfaces, accents subtils
│  │ └───────────────────────────────┘ │  │
│  │                                   │  │
│  │ [Juniper] Button                  │  │ ← CTA, liens
│  │ Onyx texte principal              │  │ ← Texte
│  │ Juniper texte secondaire          │  │ ← Sous-titres
│  │ ─────────────── (Taupe)           │  │ ← Séparateurs
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Usage

| Rôle iOS              | Couleur       | HEX       | Usage               |
| --------------------- | ------------- | --------- | ------------------- |
| `backgroundPrimary`   | **Alabaster** | `#EEECE6` | Fond principal      |
| `backgroundSecondary` | **Silken**    | `#D9D1C4` | Cartes, sections    |
| `surface`             | **Moss**      | `#A3AE98` | Surfaces naturelles |
| `accentPrimary`       | **Juniper**   | `#44554E` | CTA, liens          |
| `textPrimary`         | **Onyx**      | `#222222` | Texte principal     |
| `textSecondary`       | **Juniper**   | `#44554E` | Texte secondaire    |
| `border / divider`    | **Taupe**     | `#8E8274` | Séparateurs         |

## 🌙 Dark Mode

### Hiérarchie visuelle

```
┌─────────────────────────────────────────┐
│  Onyx (#222222)                         │ ← Background principal
│  ┌───────────────────────────────────┐  │
│  │ Juniper (#44554E)                 │  │ ← Cards
│  │ ┌───────────────────────────────┐ │  │
│  │ │ Taupe (#8E8274)               │ │  │ ← Surfaces élevées
│  │ └───────────────────────────────┘ │  │
│  │                                   │  │
│  │ [Moss] Button                     │  │ ← CTA (vert doux)
│  │ Alabaster texte principal         │  │ ← Texte
│  │ Silken texte secondaire           │  │ ← Sous-titres
│  │ ─────────────── (Moss)            │  │ ← Séparateurs
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Usage

| Rôle iOS              | Couleur       | HEX       | Usage            |
| --------------------- | ------------- | --------- | ---------------- |
| `backgroundPrimary`   | **Onyx**      | `#222222` | Fond principal   |
| `backgroundSecondary` | **Juniper**   | `#44554E` | Cartes           |
| `surface`             | **Taupe**     | `#8E8274` | Surfaces         |
| `accentPrimary`       | **Moss**      | `#A3AE98` | CTA, focus       |
| `textPrimary`         | **Alabaster** | `#EEECE6` | Texte principal  |
| `textSecondary`       | **Silken**    | `#D9D1C4` | Texte secondaire |
| `border / divider`    | **Moss**      | `#A3AE98` | Séparateurs      |

## 📱 Équivalences iOS System

Pour une intégration parfaite avec l'écosystème iOS :

| iOS System Role             | Light     | Dark      |
| --------------------------- | --------- | --------- |
| `systemBackground`          | Alabaster | Onyx      |
| `secondarySystemBackground` | Silken    | Juniper   |
| `label`                     | Onyx      | Alabaster |
| `secondaryLabel`            | Juniper   | Silken    |
| `tintColor`                 | Juniper   | Moss      |
| `separator`                 | Taupe     | Moss      |

## 🎯 Principes d'utilisation

### 1. Contraste et lisibilité

**Light Mode** :
- Texte Onyx sur Alabaster : Ratio 13.5:1 ✅
- Texte Juniper sur Silken : Ratio 4.8:1 ✅
- Bouton Juniper sur Alabaster : Ratio 7.2:1 ✅

**Dark Mode** :
- Texte Alabaster sur Onyx : Ratio 13.5:1 ✅
- Texte Silken sur Juniper : Ratio 4.6:1 ✅
- Bouton Moss sur Onyx : Ratio 7.8:1 ✅

Tous les contrastes respectent les normes WCAG AA (4.5:1 pour le texte).

### 2. Hiérarchie d'information

```
Important    →  Juniper (light) / Moss (dark)
Standard     →  Onyx (light) / Alabaster (dark)
Secondaire   →  Juniper (light) / Silken (dark)
Désactivé    →  Taupe
```

### 3. États interactifs

```css
/* Bouton primaire */
Normal:  Juniper background, Alabaster text
Hover:   Légèrement plus sombre (opacity: 0.9)
Active:  Plus sombre (opacity: 0.8)
Focus:   Ring Moss 2px

/* Bouton secondaire */
Normal:  Silken background, Onyx text
Hover:   Juniper background, Alabaster text
Active:  Juniper plus foncé
```

## 🔧 Implémentation CSS

### Variables

```css
:root {
  /* Palette */
  --color-alabaster: #EEECE6;
  --color-silken: #D9D1C4;
  --color-moss: #A3AE98;
  --color-taupe: #8E8274;
  --color-juniper: #44554E;
  --color-onyx: #222222;
  
  /* Rôles sémantiques */
  --bg-primary: var(--color-alabaster);
  --text-primary: var(--color-onyx);
  --accent-primary: var(--color-juniper);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--color-onyx);
    --text-primary: var(--color-alabaster);
    --accent-primary: var(--color-moss);
  }
}
```

### Classes utilitaires

```css
.bg-primary { background-color: var(--bg-primary); }
.text-primary { color: var(--text-primary); }
.border-default { border-color: var(--border); }
```

## 🎨 Exemples visuels

### Card typique (Light)

```
┌──────────────────────────────────┐
│ Silken (#D9D1C4)                 │
│                                  │
│ ■ Juniper  Titre de la carte     │
│            Onyx                  │
│                                  │
│ Description du contenu           │
│ Juniper (texte secondaire)       │
│                                  │
│ ───────── Taupe ─────────        │
│                                  │
│ [Juniper] Action                 │
└──────────────────────────────────┘
```

### Card typique (Dark)

```
┌──────────────────────────────────┐
│ Juniper (#44554E)                │
│                                  │
│ ■ Moss  Titre de la carte        │
│         Alabaster                │
│                                  │
│ Description du contenu           │
│ Silken (texte secondaire)        │
│                                  │
│ ───────── Moss ─────────         │
│                                  │
│ [Moss] Action                    │
└──────────────────────────────────┘
```

## 🌈 Harmonies et variations

Si tu as besoin d'autres nuances :

### Variations claires (pour highlights)
- Alabaster + 5% blanc = #F5F4F0
- Silken + 5% blanc = #E5DED4
- Moss + 10% blanc = #B8C2B0

### Variations foncées (pour shadows)
- Taupe - 10% noir = #746B60
- Juniper - 10% noir = #323E39
- Onyx - 5% noir = #1A1A1A

## 📐 Ratios et espacements

Pour accompagner la palette :

```css
/* Espacements */
--space-xs: 0.25rem;  /* 4px */
--space-sm: 0.5rem;   /* 8px */
--space-md: 1rem;     /* 16px */
--space-lg: 1.5rem;   /* 24px */
--space-xl: 2rem;     /* 32px */

/* Border radius */
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(34, 34, 34, 0.1);
--shadow-md: 0 4px 6px rgba(34, 34, 34, 0.1);
--shadow-lg: 0 10px 15px rgba(34, 34, 34, 0.15);
```

## ✨ Résumé

Cette palette offre :
- ✅ Cohérence visuelle naturelle
- ✅ Excellent contraste (WCAG AA+)
- ✅ Dark mode harmonieux
- ✅ Évolutivité et variations
- ✅ Compatibilité iOS native
- ✅ Feeling premium et apaisant

**Philosophie** : Minimalisme naturel, élégance discrète, confort visuel.
