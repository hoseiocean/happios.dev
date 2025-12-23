#!/bin/bash

echo "🔍 Vérification de la Configuration - happios.dev"
echo "=================================================="
echo ""

# Compteur de problèmes
ISSUES=0

# Fonction pour afficher OK ou ERREUR
check_ok() {
    echo "✅ $1"
}

check_error() {
    echo "❌ $1"
    ((ISSUES++))
}

check_warning() {
    echo "⚠️  $1"
}

# 1. Vérifier la structure des fichiers
echo "📁 Vérification de la structure des fichiers..."

if [ -f "package.json" ]; then
    check_ok "package.json trouvé"
else
    check_error "package.json manquant"
fi

if [ -f "public/CNAME" ]; then
    CNAME_CONTENT=$(cat public/CNAME)
    if [ "$CNAME_CONTENT" = "happios.dev" ]; then
        check_ok "CNAME correctement configuré: $CNAME_CONTENT"
    else
        check_error "CNAME incorrect: $CNAME_CONTENT (devrait être: happios.dev)"
    fi
else
    check_error "public/CNAME manquant"
fi

if [ -f "public/index.html" ]; then
    check_ok "public/index.html trouvé"
else
    check_error "public/index.html manquant"
fi

if [ -f "src/IOSSecurityDemo.tsx" ]; then
    check_ok "src/IOSSecurityDemo.tsx trouvé"
else
    check_error "src/IOSSecurityDemo.tsx manquant"
fi

if [ -f "src/App.js" ]; then
    check_ok "src/App.js trouvé"
else
    check_error "src/App.js manquant"
fi

if [ -f "src/index.js" ]; then
    check_ok "src/index.js trouvé"
else
    check_error "src/index.js manquant"
fi

echo ""

# 2. Vérifier package.json
echo "📦 Vérification de package.json..."

if [ -f "package.json" ]; then
    HOMEPAGE=$(grep '"homepage"' package.json | cut -d'"' -f4)
    if [ "$HOMEPAGE" = "https://happios.dev" ]; then
        check_ok "Homepage correctement configurée: $HOMEPAGE"
    else
        check_error "Homepage incorrecte: $HOMEPAGE (devrait être: https://happios.dev)"
    fi
    
    if grep -q '"gh-pages"' package.json; then
        check_ok "gh-pages présent dans devDependencies"
    else
        check_error "gh-pages manquant dans devDependencies"
    fi
    
    if grep -q '"deploy".*"gh-pages -d build"' package.json; then
        check_ok "Script deploy correctement configuré"
    else
        check_error "Script deploy manquant ou incorrect"
    fi
fi

echo ""

# 3. Vérifier Git
echo "🔧 Vérification de Git..."

if [ -d ".git" ]; then
    check_ok "Dépôt Git initialisé"
    
    if git remote | grep -q "origin"; then
        REMOTE_URL=$(git remote get-url origin)
        if [[ "$REMOTE_URL" == *"hoseiocean/happios.dev"* ]]; then
            check_ok "Remote origin correctement configuré: $REMOTE_URL"
        else
            check_error "Remote origin incorrect: $REMOTE_URL"
        fi
    else
        check_warning "Remote origin non configuré"
        echo "   Ajoutez-le avec: git remote add origin https://github.com/hoseiocean/happios.dev.git"
    fi
    
    BRANCH=$(git branch --show-current)
    if [ "$BRANCH" = "main" ]; then
        check_ok "Branche actuelle: main"
    else
        check_warning "Branche actuelle: $BRANCH (devrait être main)"
    fi
else
    check_error "Dépôt Git non initialisé"
    echo "   Initialisez-le avec: git init && git branch -M main"
fi

echo ""

# 4. Vérifier Node.js et npm
echo "🔧 Vérification de Node.js et npm..."

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    check_ok "Node.js installé: $NODE_VERSION"
else
    check_error "Node.js non installé"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    check_ok "npm installé: $NPM_VERSION"
else
    check_error "npm non installé"
fi

if [ -d "node_modules" ]; then
    check_ok "Dépendances installées (node_modules présent)"
else
    check_warning "Dépendances non installées"
    echo "   Installez-les avec: npm install"
fi

echo ""

# 5. Résumé
echo "📊 Résumé"
echo "========"

if [ $ISSUES -eq 0 ]; then
    echo "✅ Tout est correctement configuré !"
    echo ""
    echo "🚀 Tu es prêt à déployer !"
    echo ""
    echo "Prochaines étapes :"
    echo "  1. Si pas encore fait : git add . && git commit -m 'Initial commit' && git push -u origin main"
    echo "  2. Exécute : ./deploy.sh"
    echo "  3. Attends 5 minutes"
    echo "  4. Visite : https://happios.dev"
else
    echo "⚠️  $ISSUES problème(s) détecté(s)"
    echo ""
    echo "Corrige les erreurs ci-dessus avant de déployer."
fi

echo ""
