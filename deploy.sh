#!/bin/bash

echo "🚀 Déploiement happios.dev"
echo "============================================="

if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json introuvable"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'installation"
        exit 1
    fi
    echo "✅ Dépendances installées"
fi

echo ""
echo "💾 Sauvegarde sur main..."
git add .
git commit -m "Update: bg-white => bg-alabaster - $(date '+%Y-%m-%d %H:%M:%S')" || echo "Aucun changement"
git push origin main
echo "✅ Code poussé"

echo ""
echo "🚀 Déploiement sur GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ================================"
    echo "✅ Déploiement réussi!"
    echo "✅ ================================"
    echo ""
    echo "🎨 Configuration:"
    echo "   • Tailwind CSS via CDN"
    echo "   • Palette custom (6 couleurs)"
    echo "   • Dark mode automatique"
    echo ""
    echo "🌐 Disponible dans 3-5 minutes:"
    echo "   👉 https://happios.dev"
    echo ""
    echo "💡 Pour changer les couleurs:"
    echo "   Édite public/index.html > tailwind.config"
else
    echo ""
    echo "❌ Erreur lors du déploiement"
    exit 1
fi
