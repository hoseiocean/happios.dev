#!/bin/bash

echo "🚀 Déploiement de happios.dev sur GitHub Pages"
echo "================================================"

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json introuvable"
    echo "   Exécutez ce script depuis la racine du projet"
    exit 1
fi

# Vérifier que git est initialisé
if [ ! -d ".git" ]; then
    echo "📝 Initialisation du dépôt Git..."
    git init
    git branch -M main
    echo "✅ Dépôt Git initialisé"
fi

# Vérifier la connexion GitHub
echo ""
echo "📡 Vérification de la connexion GitHub..."
if git remote | grep -q "origin"; then
    echo "✅ Remote 'origin' trouvé"
    git remote -v
else
    echo "⚠️  Aucun remote configuré"
    echo "   Ajoutez votre dépôt avec:"
    echo "   git remote add origin https://github.com/hoseiocean/happios.dev.git"
    read -p "Voulez-vous l'ajouter maintenant? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote add origin https://github.com/hoseiocean/happios.dev.git
        echo "✅ Remote ajouté"
    else
        echo "❌ Ajoutez le remote manuellement avant de continuer"
        exit 1
    fi
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
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "Aucun changement à committer"
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
    echo "🌐 Votre site sera disponible dans quelques minutes à:"
    echo "   👉 https://happios.dev"
    echo "   👉 https://www.happios.dev"
    echo ""
    echo "📝 Prochaines étapes:"
    echo "   1. Attendez 2-3 minutes que GitHub Pages se mette à jour"
    echo "   2. Vérifiez les Settings > Pages dans votre repo GitHub"
    echo "   3. Vérifiez que le CNAME est bien configuré sur 'happios.dev'"
else
    echo ""
    echo "❌ Erreur lors du déploiement"
    echo "   Vérifiez que vous avez les droits d'accès au repo"
    exit 1
fi
