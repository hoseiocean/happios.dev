import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importez les fichiers de traduction depuis le dossier locales
// Ajustez les chemins selon votre structure de projet
import fr from './locales/fr.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  es: { translation: es },
  de: { translation: de }
};

i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Intégration avec React
  .use(initReactI18next)
  .init({
    resources,
    // Français par défaut si la langue n'est pas supportée
    fallbackLng: 'fr',
    // Langues supportées
    supportedLngs: ['fr', 'en', 'es', 'de'],
    // Configuration de la détection
    detection: {
      // Ordre de détection : navigateur d'abord
      order: ['navigator', 'localStorage', 'htmlTag'],
      // Sauvegarder le choix de l'utilisateur
      caches: ['localStorage'],
    },
    interpolation: {
      // React échappe déjà les valeurs
      escapeValue: false
    },
    react: {
      // Désactiver Suspense pour éviter les problèmes de rendu
      useSuspense: false
    }
  });

export default i18n;
