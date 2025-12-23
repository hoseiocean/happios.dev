#!/bin/bash

echo "🚀 Déploiement de happios.dev avec nouvelle palette"
echo "===================================================="

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json introuvable"
    echo "   Exécutez ce script depuis la racine du projet"
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'installation des dépendances"
        exit 1
    fi
    echo "✅ Dépendances installées"
fi

# Commit et push sur main
echo ""
echo "💾 Sauvegarde sur la branche main..."
git add .
git commit -m "Update: Custom color palette and design system - $(date '+%Y-%m-%d %H:%M:%S')" || echo "Aucun changement à committer"
git push origin main
echo "✅ Code poussé sur main"

# Déploiement sur gh-pages
echo ""
echo "🚀 Déploiement sur GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ================================"
    echo "✅ Déploiement réussi!"
    echo "✅ ================================"
    echo ""
    echo "🎨 Nouvelles fonctionnalités:"
    echo "   • Palette de couleurs naturelle (Alabaster, Silken, Moss, etc.)"
    echo "   • Dark mode automatique"
    echo "   • Design system complet"
    echo "   • Animations fluides"
    echo ""
    echo "🌐 Ton site sera disponible dans quelques minutes à:"
    echo "   👉 https://happios.dev"
    echo "   👉 https://www.happios.dev"
    echo ""
    echo "📝 Vérifications à faire:"
    echo "   1. Ouvrir https://happios.dev"
    echo "   2. Vérifier les couleurs (Alabaster background, etc.)"
    echo "   3. Tester le dark mode (préférences système)"
    echo "   4. Vérifier sur mobile"
    echo ""
    echo "⏱️  Temps estimé: 3-5 minutes"
else
    echo ""
    echo "❌ Erreur lors du déploiement"
    echo "   Vérifiez que vous avez les droits d'accès au repo"
    exit 1
fi
