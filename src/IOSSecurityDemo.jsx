import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Shield, AlertTriangle, CheckCircle, Globe, XCircle, Lock, Layers } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLang = i18n.language?.substring(0, 2) || 'fr';

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={currentLang}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const IOSSecurityDemo = () => {
  const [addresses, setAddresses] = useState({
    stack: '',
    heap: '',
    code: '',
    library: ''
  });
  const [showComparison, setShowComparison] = useState(false);
  const [previousAddresses, setPreviousAddresses] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useTranslation();


  const generateRandomAddresses = () => {
    const randomOffset = () => Math.floor(Math.random() * 0xFFFFFF);
    return {
      stack: `0x${(0x7FF000000000 + randomOffset()).toString(16).toUpperCase()}`,
      heap: `0x${(0x600000000000 + randomOffset()).toString(16).toUpperCase()}`,
      code: `0x${(0x100000000 + randomOffset()).toString(16).toUpperCase()}`,
      library: `0x${(0x7FFF00000000 + randomOffset()).toString(16).toUpperCase()}`
    };
  };

  useEffect(() => {
    setAddresses(generateRandomAddresses());
  }, []);

  const handleRefresh = () => {
    setPreviousAddresses(addresses);
    setAddresses(generateRandomAddresses());
    setShowComparison(true);
  };

  const OverviewTab = () => {
    const [selectedLayer, setSelectedLayer] = useState(null);

    const securityLayers = [
      {
        id: 'secureboot',
        name: 'Secure Boot',
        shortName: 'Boot',
        level: 'Matériel/Firmware',
        category: 'hardware',
        color: 'green',
        icon: '🔐',
        description: 'Chaîne de confiance au démarrage',
        details: 'Vérifie chaque composant du démarrage (Boot ROM → iBoot → Kernel) avec des signatures cryptographiques. Empêche le chargement de firmware ou OS modifiés.',
        protects: 'Bootkits, rootkits firmware, OS compromis'
      },
      {
        id: 'secureenclave',
        name: 'Secure Enclave',
        shortName: 'SEP',
        level: 'Matériel',
        category: 'hardware',
        color: 'purple',
        icon: '🔒',
        description: 'Processeur dédié à la sécurité',
        details: 'Coprocesseur isolé avec son propre OS et mémoire chiffrée. Gère les clés de chiffrement, Face ID/Touch ID, et ne partage jamais les secrets avec le processeur principal.',
        protects: 'Vol de clés cryptographiques, contournement biométrique'
      },
      {
        id: 'dataprotection',
        name: 'Data Protection',
        shortName: 'DP',
        level: 'Système de fichiers',
        category: 'data',
        color: 'blue',
        icon: '🗂️',
        description: 'Chiffrement des fichiers par classe',
        details: 'Chaque fichier a sa propre clé AES-256. Les classes de protection déterminent quand les fichiers sont accessibles (appareil verrouillé, déverrouillé, etc.).',
        protects: 'Vol de données si appareil éteint/verrouillé'
      },
      {
        id: 'codesigning',
        name: 'Code Signing',
        shortName: 'Sign',
        level: 'Application',
        category: 'code',
        color: 'indigo',
        icon: '✍️',
        description: 'Signature cryptographique du code',
        details: 'Tout code exécutable doit être signé par Apple ou un développeur approuvé. Garantit l\'authenticité et l\'intégrité de chaque application.',
        protects: 'Applications non autorisées, code tiers malveillant'
      },
      {
        id: 'amfi',
        name: 'AMFI',
        shortName: 'AMFI',
        level: 'Noyau',
        category: 'code',
        color: 'indigo',
        icon: '🛡️',
        description: 'Vérification d\'intégrité en temps réel',
        details: 'Apple Mobile File Integrity vérifie les signatures à l\'exécution via le kernel. Bloque immédiatement tout code modifié ou non signé.',
        protects: 'Injection de code, modification de binaires'
      },
      {
        id: 'sandbox',
        name: 'Sandbox',
        shortName: 'SB',
        level: 'Système/App',
        category: 'isolation',
        color: 'green',
        icon: '📦',
        description: 'Isolation des applications',
        details: 'Chaque app s\'exécute dans son propre conteneur isolé avec des permissions limitées. Doit demander explicitement l\'accès aux ressources système.',
        protects: 'Accès non autorisé aux données, espionnage inter-apps'
      },
      {
        id: 'aslr',
        name: 'ASLR',
        shortName: 'ASLR',
        level: 'Mémoire',
        category: 'memory',
        color: 'purple',
        icon: '🎲',
        description: 'Randomisation des adresses mémoire',
        details: 'Address Space Layout Randomization place le code et les données à des adresses aléatoires à chaque exécution. Rend les exploits mémoire imprévisibles.',
        protects: 'Buffer overflow, ROP attacks, exploits mémoire'
      },
      {
        id: 'xn',
        name: 'XN Bit',
        shortName: 'XN',
        level: 'Processeur',
        category: 'memory',
        color: 'orange',
        icon: '⛔',
        description: 'Protection de la mémoire exécutable',
        details: 'Execute Never marque les zones de données comme non-exécutables au niveau CPU. Même si du code est injecté, il ne peut pas s\'exécuter.',
        protects: 'Exécution de shellcode, injection de code'
      },
      {
        id: 'ats',
        name: 'ATS',
        shortName: 'ATS',
        level: 'Réseau',
        category: 'network',
        color: 'blue',
        icon: '🌐',
        description: 'Sécurité du transport réseau',
        details: 'App Transport Security force l\'utilisation de HTTPS avec TLS 1.2+ et certificats valides. Protège les communications réseau des apps.',
        protects: 'Interception réseau, MITM, downgrade TLS'
      }
    ];

    const categories = [
      { id: 'hardware', name: 'Matériel', color: 'from-amber-100 to-orange-100', border: 'border-amber-300' },
      { id: 'data', name: 'Données', color: 'from-blue-100 to-cyan-100', border: 'border-blue-300' },
      { id: 'code', name: 'Code', color: 'from-indigo-100 to-purple-100', border: 'border-indigo-300' },
      { id: 'isolation', name: 'Isolation', color: 'from-green-100 to-emerald-100', border: 'border-green-300' },
      { id: 'memory', name: 'Mémoire', color: 'from-purple-100 to-pink-100', border: 'border-purple-300' },
      { id: 'network', name: 'Réseau', color: 'from-sky-100 to-blue-100', border: 'border-sky-300' }
    ];

    const getLayerStyles = (layer, isSelected) => {
      const colorMap = {
        green: { bg: 'bg-green-100', border: 'border-green-500', ring: 'ring-green-300' },
        purple: { bg: 'bg-purple-100', border: 'border-purple-500', ring: 'ring-purple-300' },
        blue: { bg: 'bg-blue-100', border: 'border-blue-500', ring: 'ring-blue-300' },
        indigo: { bg: 'bg-indigo-100', border: 'border-indigo-500', ring: 'ring-indigo-300' },
        orange: { bg: 'bg-orange-100', border: 'border-orange-500', ring: 'ring-orange-300' }
      };
      const colors = colorMap[layer.color] || colorMap.blue;
      
      if (isSelected) {
        return `${colors.bg} ${colors.border} ring-2 ${colors.ring}`;
      }
      return 'bg-white border-gray-300 hover:border-gray-400';
    };

    const getDetailStyles = (color) => {
      const styles = {
        green: 'bg-green-50 border-green-300',
        purple: 'bg-purple-50 border-purple-300',
        blue: 'bg-blue-50 border-blue-300',
        indigo: 'bg-indigo-50 border-indigo-300',
        orange: 'bg-orange-50 border-orange-300'
      };
      return styles[color] || styles.blue;
    };

    const getBadgeStyles = (color) => {
      const styles = {
        green: 'bg-green-200 text-green-800',
        purple: 'bg-purple-200 text-purple-800',
        blue: 'bg-blue-200 text-blue-800',
        indigo: 'bg-indigo-200 text-indigo-800',
        orange: 'bg-orange-200 text-orange-800'
      };
      return styles[color] || styles.blue;
    };

    const selectedLayerData = securityLayers.find(l => l.id === selectedLayer);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-6">
          <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600" />
            Défense en Profondeur (Defense in Depth)
          </h3>
          <p className="text-sm text-gray-700">
            iOS implémente <strong>9 mécanismes de sécurité</strong> complémentaires, du matériel jusqu'au réseau. 
            Chaque couche protège contre des menaces spécifiques. Cliquez sur un mécanisme pour en savoir plus.
          </p>
        </div>

        {/* Architecture visuelle en couches */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-center text-gray-700">Architecture de Sécurité iOS</h4>
          
          <div className="space-y-3">
            {categories.map(category => {
              const layersInCategory = securityLayers.filter(l => l.category === category.id);
              return (
                <div key={category.id} className={`bg-gradient-to-r ${category.color} border-2 ${category.border} rounded-lg p-3`}>
                  <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">{category.name}</div>
                  <div className="flex flex-wrap gap-2">
                    {layersInCategory.map(layer => (
                      <button
                        key={layer.id}
                        onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${getLayerStyles(layer, selectedLayer === layer.id)}`}
                      >
                        <span>{layer.icon}</span>
                        <span>{layer.shortName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Détails du mécanisme sélectionné */}
        {selectedLayerData && (
          <div className={`${getDetailStyles(selectedLayerData.color)} border-2 rounded-lg p-6 transition-all`}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">{selectedLayerData.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h4 className="font-bold text-lg">{selectedLayerData.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${getBadgeStyles(selectedLayerData.color)}`}>
                    {selectedLayerData.level}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{selectedLayerData.details}</p>
                <div className="bg-white border border-gray-200 rounded p-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Protège contre</div>
                  <div className="text-sm text-gray-800">{selectedLayerData.protects}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tableau récapitulatif complet */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Récapitulatif des 9 mécanismes de sécurité</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-2">Mécanisme</th>
                  <th className="text-left py-2 px-2">Niveau</th>
                  <th className="text-left py-2 px-2">Rôle principal</th>
                </tr>
              </thead>
              <tbody>
                {securityLayers.map((layer) => (
                  <tr 
                    key={layer.id} 
                    className={`border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
                      selectedLayer === layer.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                  >
                    <td className="py-2 px-2 font-semibold">
                      <span className="mr-2">{layer.icon}</span>
                      {layer.name}
                    </td>
                    <td className="py-2 px-2 text-gray-600">{layer.level}</td>
                    <td className="py-2 px-2">{layer.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schéma de flux d'une attaque */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Comment ces protections travaillent ensemble
          </h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p>Pour compromettre un iPhone, un attaquant devrait:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li><strong>Secure Boot</strong> → Remplacer le firmware/OS (impossible sans clé Apple)</li>
              <li><strong>Code Signing + AMFI</strong> → Faire exécuter du code non signé</li>
              <li><strong>Sandbox</strong> → S'échapper de l'isolation pour accéder aux données</li>
              <li><strong>Data Protection</strong> → Déchiffrer les fichiers protégés</li>
              <li><strong>Secure Enclave</strong> → Extraire les clés cryptographiques</li>
              <li><strong>ASLR + XN</strong> → Exploiter la mémoire malgré la randomisation</li>
              <li><strong>ATS</strong> → Intercepter le trafic réseau chiffré</li>
            </ol>
            <p className="mt-3 font-semibold text-red-700">
              Contourner toutes ces protections simultanément est extrêmement difficile, 
              ce qui explique pourquoi les exploits iOS complets valent des millions de dollars.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const AMFITab = () => {
    const [verificationStep, setVerificationStep] = useState(0);
    const [selectedFile, setSelectedFile] = useState('legitimate');
    
    const steps = [
      { title: "App légitime", desc: "Application signée par Apple/développeur approuvé" },
      { title: "Vérification AMFI", desc: "AMFI vérifie la signature cryptographique" },
      { title: "Signature valide", desc: "Le code est authentique et non modifié" },
      { title: "Exécution autorisée", desc: "L'app peut s'exécuter normalement" }
    ];

    const maliciousSteps = [
      { title: "App modifiée", desc: "Binaire modifié ou non signé détecté" },
      { title: "Vérification AMFI", desc: "AMFI vérifie la signature cryptographique" },
      { title: "Signature invalide", desc: "Le hash ne correspond pas ou signature manquante" },
      { title: "Exécution refusée", desc: "AMFI bloque le lancement - Protection active" }
    ];

    const currentSteps = selectedFile === 'legitimate' ? steps : maliciousSteps;

    return (
      <div className="space-y-6">
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            AMFI - Apple Mobile File Integrity
          </h3>
          <p className="text-sm mb-3">
            AMFI garantit que seul du code signé et approuvé peut s'exécuter sur iOS. 
            Il vérifie l'intégrité et l'authenticité de chaque exécutable avant son lancement.
          </p>
          <div className="text-sm bg-white border border-indigo-200 rounded p-3">
            <p className="font-semibold mb-2">Composants d'AMFI:</p>
            <ul className="space-y-1 text-gray-700">
              <li>• <code className="bg-gray-100 px-1">AppleMobileFileIntegrity.kext</code> - Extension noyau</li>
              <li>• <code className="bg-gray-100 px-1">amfid</code> - Daemon en espace utilisateur</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => { setSelectedFile('legitimate'); setVerificationStep(0); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedFile === 'legitimate'
                ? 'border-green-500 bg-green-50 ring-4 ring-green-200'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold">App Légitime</div>
            <div className="text-xs text-gray-600 mt-1">Signée par Apple/Développeur</div>
          </button>

          <button
            onClick={() => { setSelectedFile('malicious'); setVerificationStep(0); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedFile === 'malicious'
                ? 'border-red-500 bg-red-50 ring-4 ring-red-200'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">⚠️</div>
            <div className="font-semibold">App Modifiée</div>
            <div className="text-xs text-gray-600 mt-1">Non signée ou altérée</div>
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {currentSteps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setVerificationStep(idx)}
              className={`flex-1 min-w-[100px] py-2 px-3 rounded text-sm font-semibold transition-all ${
                verificationStep === idx 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Étape {idx + 1}
            </button>
          ))}
        </div>

        <div className={`bg-white border-2 rounded-lg p-6 ${
          selectedFile === 'malicious' && verificationStep === 3 
            ? 'border-red-400' 
            : 'border-gray-300'
        }`}>
          <h4 className="font-bold mb-2">{currentSteps[verificationStep].title}</h4>
          <p className="text-sm mb-6 text-gray-600">{currentSteps[verificationStep].desc}</p>

          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 ${
              selectedFile === 'legitimate' 
                ? 'border-green-300 bg-green-50' 
                : 'border-red-300 bg-red-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Fichier Exécutable</div>
                {selectedFile === 'legitimate' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="text-xs font-mono space-y-1">
                <div>📱 MyApp.app/MyApp</div>
                <div className="text-gray-600">
                  {selectedFile === 'legitimate' 
                    ? 'Hash: a3f2c1d9e8b7...' 
                    : 'Hash: x9z8y7w6v5u4... (modifié!)'}
                </div>
              </div>
            </div>

            {verificationStep >= 1 && (
              <div className="flex items-center justify-center">
                <div className="text-2xl animate-pulse">⬇️</div>
              </div>
            )}

            {verificationStep >= 1 && (
              <div className="p-4 rounded-lg border-2 border-indigo-300 bg-indigo-50">
                <div className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  Vérification AMFI
                </div>
                <div className="text-xs space-y-1">
                  <div>1. Lecture de la signature cryptographique</div>
                  <div>2. Calcul du hash du binaire</div>
                  <div>3. Vérification du certificat</div>
                  <div>4. Comparaison avec le blob de signature</div>
                </div>
              </div>
            )}

            {verificationStep >= 2 && (
              <div className="flex items-center justify-center">
                <div className="text-2xl animate-pulse">⬇️</div>
              </div>
            )}

            {verificationStep >= 2 && (
              <div className={`p-4 rounded-lg border-2 ${
                selectedFile === 'legitimate'
                  ? 'border-green-400 bg-green-50'
                  : 'border-red-400 bg-red-50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedFile === 'legitimate' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Signature Valide</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">Signature Invalide</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-700">
                  {selectedFile === 'legitimate' 
                    ? 'Le code est authentique et n\'a pas été modifié depuis sa signature.'
                    : 'Le hash calculé ne correspond pas à la signature, ou la signature est absente/invalide.'}
                </div>
              </div>
            )}

            {verificationStep >= 3 && (
              <div className="flex items-center justify-center">
                <div className="text-2xl">⬇️</div>
              </div>
            )}

            {verificationStep >= 3 && (
              <div className={`p-4 rounded-lg border-2 ${
                selectedFile === 'legitimate'
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-red-500 bg-red-100'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedFile === 'legitimate' ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                      <span className="font-bold text-blue-800">Exécution Autorisée</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <span className="font-bold text-red-800">Exécution Refusée</span>
                    </>
                  )}
                </div>
                <div className="text-sm">
                  {selectedFile === 'legitimate' 
                    ? '✅ L\'application peut s\'exécuter normalement sur l\'appareil.'
                    : '🚫 AMFI empêche le lancement. L\'utilisateur voit une erreur. Le code malveillant ou modifié ne peut pas s\'exécuter.'}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">Comment AMFI protège iOS:</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Vérification au lancement:</strong> Chaque app est vérifiée avant exécution</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Vérification des pages:</strong> Les pages mémoire sont vérifiées lors des défauts de page</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Bibliothèques dynamiques:</strong> Vérification des frameworks et dylibs chargés</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Protection continue:</strong> Empêche la modification du code en mémoire</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Position d'AMFI dans la défense en profondeur:</h4>
          <p className="text-sm text-gray-700">
            AMFI est la <strong>première ligne de défense</strong>. Avant même que le Sandbox, l'ASLR 
            ou le XN bit n'interviennent, AMFI s'assure que seul du code légitime et non modifié 
            peut s'exécuter. C'est la fondation sur laquelle reposent toutes les autres protections.
          </p>
        </div>
      </div>
    );
  };

  const SecureBootTab = () => {
    const [bootStep, setBootStep] = useState(0);
    const [tampered, setTampered] = useState(false);

    const normalBootSteps = [
      {
        title: "Boot ROM",
        desc: "Code immuable gravé dans le silicon lors de la fabrication",
        details: "Vérifie la signature de LLB (Low Level Bootloader)",
        status: "trusted",
        level: 0
      },
      {
        title: "LLB (Low Level Bootloader)",
        desc: "Premier code chargé depuis le stockage",
        details: "Vérifie la signature d'iBoot",
        status: "verified",
        level: 1
      },
      {
        title: "iBoot",
        desc: "Bootloader principal d'iOS",
        details: "Vérifie la signature du Kernel iOS",
        status: "verified",
        level: 2
      },
      {
        title: "Kernel iOS (XNU)",
        desc: "Noyau du système d'exploitation",
        details: "Vérifie les extensions kernel et charge le système",
        status: "verified",
        level: 3
      },
      {
        title: "iOS & Apps",
        desc: "Système d'exploitation complet démarré",
        details: "AMFI vérifie toutes les apps avant exécution",
        status: "running",
        level: 4
      }
    ];

    const tamperedBootSteps = [
      {
        title: "Boot ROM",
        desc: "Code immuable gravé dans le silicon lors de la fabrication",
        details: "Vérifie la signature de LLB (Low Level Bootloader)",
        status: "trusted",
        level: 0
      },
      {
        title: "LLB Modifié ⚠️",
        desc: "Bootloader modifié par un attaquant",
        details: "Signature invalide détectée !",
        status: "failed",
        level: 1
      },
      {
        title: "BOOT ARRÊTÉ",
        desc: "Le Boot ROM refuse de continuer",
        details: "L'appareil entre en mode récupération (DFU)",
        status: "blocked",
        level: 2
      }
    ];

    const currentSteps = tampered ? tamperedBootSteps : normalBootSteps;
    const maxSteps = currentSteps.length;

    return (
      <div className="space-y-6">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Secure Boot Chain - Chaîne de Confiance
          </h3>
          <p className="text-sm mb-3">
            Le Secure Boot garantit que seul du logiciel légitime et signé par Apple peut démarrer 
            sur l'appareil. Chaque étape vérifie cryptographiquement la suivante avant de lui passer 
            le contrôle, créant une chaîne de confiance ininterrompue.
          </p>
          <div className="text-sm bg-white border border-green-200 rounded p-3">
            <p className="font-semibold mb-2">Principe fondamental:</p>
            <p className="text-gray-700 text-xs">
              La Boot ROM est la "racine de confiance" (Root of Trust) - elle est immuable et 
              ne peut jamais être modifiée. Toute la sécurité iOS repose sur cette fondation.
            </p>
          </div>
        </div>

        {/* Sélection du scénario */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => { setTampered(false); setBootStep(0); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              !tampered
                ? 'border-green-500 bg-green-50 ring-4 ring-green-200'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold">Boot Normal</div>
            <div className="text-xs text-gray-600 mt-1">Tous les composants signés par Apple</div>
          </button>

          <button
            onClick={() => { setTampered(true); setBootStep(0); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              tampered
                ? 'border-red-500 bg-red-50 ring-4 ring-red-200'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">⚠️</div>
            <div className="font-semibold">Boot Compromis</div>
            <div className="text-xs text-gray-600 mt-1">Bootloader modifié détecté</div>
          </button>
        </div>

        {/* Contrôles de progression */}
        <div className="flex gap-2 flex-wrap">
          {currentSteps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBootStep(idx)}
              className={`flex-1 min-w-[80px] py-2 px-2 rounded text-xs font-semibold transition-all ${
                bootStep === idx 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Étape {idx + 1}
            </button>
          ))}
        </div>

        {/* Visualisation de la chaîne de boot */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Séquence de Démarrage</h4>
          
          <div className="space-y-3">
            {currentSteps.map((step, idx) => {
              const isActive = idx === bootStep;
              const isPast = idx < bootStep;
              const isFuture = idx > bootStep;

              return (
                <div key={idx}>
                  <div className={`p-4 rounded-lg border-2 transition-all ${
                    step.status === 'trusted' ? 'border-blue-400 bg-blue-50' :
                    step.status === 'verified' ? 'border-green-400 bg-green-50' :
                    step.status === 'running' ? 'border-green-500 bg-green-100' :
                    step.status === 'failed' ? 'border-red-400 bg-red-50' :
                    step.status === 'blocked' ? 'border-red-500 bg-red-100' :
                    'border-gray-300 bg-gray-50'
                  } ${isActive ? 'ring-4 ring-blue-200 scale-105' : ''} ${
                    isFuture ? 'opacity-40' : ''
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl ${isActive ? 'animate-pulse' : ''}`}>
                          {step.status === 'trusted' ? '🔐' :
                           step.status === 'verified' ? '✅' :
                           step.status === 'running' ? '🚀' :
                           step.status === 'failed' ? '❌' :
                           step.status === 'blocked' ? '🛑' : '⏸️'}
                        </div>
                        <div>
                          <div className="font-bold">{step.title}</div>
                          <div className="text-sm text-gray-600">{step.desc}</div>
                        </div>
                      </div>
                      {step.status === 'verified' && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {step.status === 'failed' && (
                        <XCircle className="w-6 h-6 text-red-600 animate-pulse" />
                      )}
                      {step.status === 'blocked' && (
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    
                    <div className={`text-sm mt-2 p-2 rounded ${
                      step.status === 'failed' ? 'bg-red-100' :
                      step.status === 'blocked' ? 'bg-red-100' :
                      'bg-white'
                    }`}>
                      {step.details}
                    </div>

                    {isActive && idx < maxSteps - 1 && step.status !== 'failed' && step.status !== 'blocked' && (
                      <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                        🔍 Vérification de la signature cryptographique en cours...
                      </div>
                    )}
                  </div>

                  {idx < currentSteps.length - 1 && step.status !== 'blocked' && (
                    <div className="flex justify-center py-2">
                      <div className={`text-2xl ${
                        step.status === 'failed' ? 'text-red-600' : 'text-gray-400'
                      }`}>
                        {step.status === 'failed' ? '⛔' : '⬇️'}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {tampered && bootStep >= 2 && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-400 rounded-lg">
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-red-800 mb-2">Boot Bloqué - Mode Récupération</div>
                  <div className="text-sm text-gray-700">
                    Le Secure Boot a détecté un composant modifié et a immédiatement arrêté le processus. 
                    L'appareil ne peut pas démarrer et affiche un écran de récupération. Il faut restaurer 
                    avec iTunes/Finder pour réinstaller iOS légitime.
                  </div>
                </div>
              </div>
            </div>
          )}

          {!tampered && bootStep >= 4 && (
            <div className="mt-6 p-4 bg-green-50 border-2 border-green-400 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-green-800 mb-2">Boot Réussi !</div>
                  <div className="text-sm text-gray-700">
                    Toutes les étapes ont été vérifiées avec succès. iOS démarre sur une base 
                    de confiance totale - chaque composant a été authentifié cryptographiquement.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Informations complémentaires */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">Protections du Secure Boot:</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Boot ROM immuable:</strong> Impossible à modifier, même avec accès physique</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Signatures RSA:</strong> Chaque composant doit être signé par Apple</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Chaîne non-contournable:</strong> Impossible de sauter une étape</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Protection anti-rollback:</strong> Empêche l'installation de versions vulnérables</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Pourquoi c'est la fondation de tout:</h4>
          <p className="text-sm text-gray-700">
            Sans le Secure Boot, toutes les autres protections (AMFI, Sandbox, Secure Enclave, etc.) 
            pourraient être contournées en installant un système d'exploitation malveillant. 
            Le Secure Boot est la <strong>racine de confiance</strong> qui garantit que tout commence bien.
          </p>
        </div>
      </div>
    );
  };

  const CodeSigningTab = () => {
    const [signatureProcess, setSignatureProcess] = useState(0);
    const [certificateType, setCertificateType] = useState('development');
    const [selectedEntitlement, setSelectedEntitlement] = useState(null);
    const [showVerification, setShowVerification] = useState(false);

    const certificates = {
      development: {
        name: "Development",
        icon: "🔧",
        color: "blue",
        desc: "Test sur vos propres appareils",
        devices: "Limité aux devices enregistrés",
        duration: "1 an",
        status: "valid"
      },
      adhoc: {
        name: "Ad Hoc",
        icon: "👥",
        color: "purple",
        desc: "Distribution à des testeurs (max 100)",
        devices: "Limité à 100 devices UDIDs",
        duration: "1 an",
        status: "valid"
      },
      enterprise: {
        name: "Enterprise",
        icon: "🏢",
        color: "orange",
        desc: "Distribution interne en entreprise",
        devices: "Illimité (employés uniquement)",
        duration: "1 an",
        status: "valid"
      },
      appstore: {
        name: "App Store",
        icon: "🏪",
        color: "green",
        desc: "Distribution publique via App Store",
        devices: "Tous les appareils iOS",
        duration: "Re-signé par Apple",
        status: "valid"
      },
      expired: {
        name: "Certificat Expiré",
        icon: "⏰",
        color: "red",
        desc: "Certificat expiré ou révoqué",
        devices: "N/A",
        duration: "Expiré",
        status: "expired"
      }
    };

    const entitlements = {
      sandbox: {
        name: "App Sandbox",
        key: "com.apple.security.app-sandbox",
        icon: "🔒",
        required: true,
        desc: "Isolation de l'application (obligatoire)"
      },
      icloud: {
        name: "iCloud",
        key: "com.apple.developer.icloud-services",
        icon: "☁️",
        required: false,
        desc: "Accès au stockage iCloud"
      },
      healthkit: {
        name: "HealthKit",
        key: "com.apple.developer.healthkit",
        icon: "💪",
        required: false,
        desc: "Accès aux données de santé"
      },
      push: {
        name: "Push Notifications",
        key: "aps-environment",
        icon: "🔔",
        required: false,
        desc: "Notifications push"
      },
      wallet: {
        name: "Apple Pay/Wallet",
        key: "com.apple.developer.pass-type-identifiers",
        icon: "💳",
        required: false,
        desc: "Intégration Wallet"
      }
    };

    const signingSteps = [
      {
        title: "Développement de l'App",
        desc: "Le développeur écrit le code en Swift/Objective-C",
        icon: "👨‍💻",
        color: "blue"
      },
      {
        title: "Compilation",
        desc: "Xcode compile le code source en binaire Mach-O",
        icon: "⚙️",
        color: "purple"
      },
      {
        title: "Ajout des Entitlements",
        desc: "Configuration des permissions et capacités",
        icon: "🔑",
        color: "orange"
      },
      {
        title: "Signature Cryptographique",
        desc: "Hash SHA-256 + Signature avec certificat développeur",
        icon: "✍️",
        color: "green"
      },
      {
        title: "Profil de Provisionnement",
        desc: "embedded.mobileprovision ajouté à l'app",
        icon: "📄",
        color: "indigo"
      },
      {
        title: "Signature Apple (si App Store)",
        desc: "Apple re-signe avec son propre certificat",
        icon: "🍎",
        color: "red"
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            Code Signing - Signature Cryptographique
          </h3>
          <p className="text-sm mb-3">
            Le Code Signing est le processus par lequel Apple garantit que chaque app provient 
            d'une source connue et n'a pas été modifiée depuis sa signature. C'est la fondation 
            qui permet à AMFI de vérifier l'intégrité du code.
          </p>
          <div className="text-sm bg-white border border-indigo-200 rounded p-3">
            <p className="font-semibold mb-2">Composants clés:</p>
            <ul className="space-y-1 text-gray-700 text-xs">
              <li>• <strong>Certificat:</strong> Identité du développeur (fourni par Apple)</li>
              <li>• <strong>Profil de provisionnement:</strong> Permissions + devices autorisés</li>
              <li>• <strong>Entitlements:</strong> Capacités spécifiques de l'app</li>
              <li>• <strong>Code Signature:</strong> Hash cryptographique (SHA-256) du binaire</li>
            </ul>
          </div>
        </div>

        {/* Processus de signature */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Processus de Signature (Étape par Étape)</h4>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {signingSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSignatureProcess(idx)}
                className={`flex-1 min-w-[80px] py-2 px-2 rounded text-xs font-semibold transition-all ${
                  signatureProcess === idx 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                Étape {idx + 1}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {signingSteps.map((step, idx) => {
              const isActive = idx === signatureProcess;
              const isPast = idx < signatureProcess;
              const isFuture = idx > signatureProcess;

              return (
                <div key={idx}>
                  <div className={`p-4 rounded-lg border-2 transition-all ${
                    isActive ? `border-${step.color}-500 bg-${step.color}-50 ring-4 ring-${step.color}-200 scale-105` :
                    isPast ? `border-${step.color}-300 bg-${step.color}-50` :
                    'border-gray-300 bg-gray-50 opacity-40'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`text-2xl ${isActive ? 'animate-pulse' : ''}`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="font-bold">{step.title}</div>
                        <div className="text-sm text-gray-600">{step.desc}</div>
                      </div>
                      {isPast && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
                    </div>

                    {isActive && idx === 3 && (
                      <div className="mt-3 p-3 bg-white rounded border border-gray-300 font-mono text-xs">
                        <div className="text-gray-600 mb-1"># Calcul du hash SHA-256</div>
                        <div className="text-green-600">$ shasum -a 256 MyApp</div>
                        <div className="mt-2 text-gray-800 break-all">
                          a3f2c1d9e8b7f6a5d4c3b2a1908f7e6d5c4b3a2918273645f...
                        </div>
                        <div className="mt-2 text-gray-600"># Signature avec certificat</div>
                        <div className="text-green-600">$ codesign -s "iPhone Developer" MyApp.app</div>
                      </div>
                    )}

                    {isActive && idx === 4 && (
                      <div className="mt-3 p-3 bg-white rounded border border-gray-300">
                        <div className="text-xs font-semibold mb-2">Contenu du profil:</div>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div>• Team ID: ABC123XYZ</div>
                          <div>• Bundle ID: com.example.myapp</div>
                          <div>• Devices autorisés: 5 appareils</div>
                          <div>• Expiration: 25 décembre 2026</div>
                          <div>• Entitlements inclus: iCloud, HealthKit</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {idx < signingSteps.length - 1 && !isFuture && (
                    <div className="flex justify-center py-2">
                      <div className="text-2xl text-gray-400">⬇️</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Types de certificats */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Types de Certificats et Distribution</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(certificates).map(([key, cert]) => (
              <button
                key={key}
                onClick={() => setCertificateType(key)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  certificateType === key
                    ? `border-${cert.color}-500 bg-${cert.color}-50 ring-4 ring-${cert.color}-200`
                    : 'border-gray-300 bg-white hover:border-gray-400'
                } ${cert.status === 'expired' ? 'opacity-75' : ''}`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-3xl">{cert.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold flex items-center gap-2">
                      {cert.name}
                      {cert.status === 'expired' && (
                        <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded">Expiré</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{cert.desc}</div>
                  </div>
                </div>
                <div className="text-xs space-y-1 mt-3 pt-3 border-t border-gray-200">
                  <div><strong>Devices:</strong> {cert.devices}</div>
                  <div><strong>Durée:</strong> {cert.duration}</div>
                </div>
              </button>
            ))}
          </div>

          {certificateType === 'expired' && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold text-red-800 mb-1">Certificat Expiré/Révoqué</div>
                  <div className="text-gray-700">
                    • Apps déjà installées: Continuent de fonctionner<br/>
                    • Nouvelles installations: Refusées par iOS<br/>
                    • Si révoqué par Apple: AMFI refuse de lancer l'app
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Entitlements */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Entitlements - Permissions de l'App</h4>
          <p className="text-sm text-gray-600 mb-4">
            Les entitlements définissent ce que l'app est autorisée à faire. Ils sont vérifiés 
            par le système au runtime.
          </p>

          <div className="space-y-2">
            {Object.entries(entitlements).map(([key, ent]) => (
              <div
                key={key}
                onClick={() => setSelectedEntitlement(key)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedEntitlement === key
                    ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-200'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                } ${ent.required ? 'border-l-4 border-l-red-500' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{ent.icon}</div>
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {ent.name}
                        {ent.required && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                            Obligatoire
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">{ent.desc}</div>
                    </div>
                  </div>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {ent.key.split('.').pop()}
                  </code>
                </div>

                {selectedEntitlement === key && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs font-mono bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                      <div>{'<key>'}{ent.key}{'</key>'}</div>
                      <div>{'<true/>'}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Anatomie d'une app signée */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Anatomie d'une App Signée</h4>
          <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-xs space-y-1">
            <div>📱 MyApp.app/</div>
            <div className="ml-4">├── 📄 MyApp <span className="text-gray-500">(binaire exécutable)</span></div>
            <div className="ml-4">├── 📋 Info.plist <span className="text-gray-500">(métadonnées)</span></div>
            <div className="ml-4">├── 🔐 _CodeSignature/</div>
            <div className="ml-8">│   └── CodeResources <span className="text-gray-500">(hash de tous les fichiers)</span></div>
            <div className="ml-4">├── 📄 embedded.mobileprovision <span className="text-gray-500">(profil)</span></div>
            <div className="ml-4">├── 🖼️  Assets.car <span className="text-gray-500">(images, icônes)</span></div>
            <div className="ml-4">└── 📚 Frameworks/ <span className="text-gray-500">(bibliothèques)</span></div>
          </div>
        </div>

        {/* Vérification de signature */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Vérifier une Signature (Outils développeur)</h4>
          
          <button
            onClick={() => setShowVerification(!showVerification)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all mb-4"
          >
            {showVerification ? 'Masquer' : 'Afficher'} les commandes de vérification
          </button>

          {showVerification && (
            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold mb-2">1. Vérifier la signature</div>
                <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs">
                  <div>$ codesign -dvvv MyApp.app</div>
                  <div className="text-gray-400 mt-2"># Affiche:</div>
                  <div className="text-white">Executable=/path/to/MyApp.app/MyApp</div>
                  <div className="text-white">Identifier=com.example.myapp</div>
                  <div className="text-white">Authority=iPhone Developer: John Doe</div>
                  <div className="text-white">Signed Time=26 déc. 2025 à 10:30:00</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold mb-2">2. Afficher les entitlements</div>
                <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs">
                  <div>$ codesign -d --entitlements - MyApp.app</div>
                  <div className="text-gray-400 mt-2"># Affiche tous les entitlements en XML</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold mb-2">3. Vérifier le profil de provisionnement</div>
                <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs">
                  <div>$ security cms -D -i MyApp.app/embedded.mobileprovision</div>
                  <div className="text-gray-400 mt-2"># Décode et affiche le profil</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chaîne de certificats */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">Chaîne de Confiance (Certificate Chain)</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded border-2 border-blue-300">
              <div className="font-bold text-sm">🍎 Apple Root CA</div>
              <div className="text-xs text-gray-600">Autorité de certification racine d'Apple</div>
            </div>
            <div className="text-center text-gray-400">⬇️ Signe</div>
            <div className="p-3 bg-purple-50 rounded border-2 border-purple-300">
              <div className="font-bold text-sm">🌐 Apple WWDR CA</div>
              <div className="text-xs text-gray-600">Worldwide Developer Relations</div>
            </div>
            <div className="text-center text-gray-400">⬇️ Signe</div>
            <div className="p-3 bg-green-50 rounded border-2 border-green-300">
              <div className="font-bold text-sm">👤 Certificat Développeur</div>
              <div className="text-xs text-gray-600">iPhone Developer: John Doe (ABC123)</div>
            </div>
            <div className="text-center text-gray-400">⬇️ Signe</div>
            <div className="p-3 bg-indigo-50 rounded border-2 border-indigo-300">
              <div className="font-bold text-sm">📱 MyApp.app</div>
              <div className="text-xs text-gray-600">L'application finale signée</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Relation avec AMFI:</h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Code Signing</strong> est le <em>processus</em> par lequel les développeurs 
              signent leurs apps avec des certificats Apple.
            </p>
            <p>
              <strong>AMFI</strong> est le <em>mécanisme de vérification</em> qui s'assure au runtime 
              que la signature est valide et que le code n'a pas été modifié.
            </p>
            <p className="pt-2 border-t border-blue-200">
              💡 Sans Code Signing, AMFI n'aurait rien à vérifier. Ensemble, ils garantissent 
              que seul du code légitime s'exécute sur iOS.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const ATSTab = () => {
    const [connectionType, setConnectionType] = useState('https');
    const [showAttempt, setShowAttempt] = useState(false);

    const connections = {
      https: {
        name: "HTTPS avec TLS 1.3",
        status: "secure",
        icon: "🔒",
        color: "green",
        details: "Connexion chiffrée avec certificat valide"
      },
      httpAllowed: {
        name: "HTTP (Exception configurée)",
        status: "warning",
        icon: "⚠️",
        color: "orange",
        details: "Autorisé via NSExceptionDomains dans Info.plist"
      },
      httpBlocked: {
        name: "HTTP (Non autorisé)",
        status: "blocked",
        icon: "🚫",
        color: "red",
        details: "ATS bloque la connexion non sécurisée"
      },
      tls10: {
        name: "HTTPS avec TLS 1.0",
        status: "blocked",
        icon: "🚫",
        color: "red",
        details: "Version TLS obsolète - ATS bloque"
      },
      selfsigned: {
        name: "HTTPS certificat auto-signé",
        status: "blocked",
        icon: "🚫",
        color: "red",
        details: "Certificat non approuvé - ATS bloque"
      }
    };

    const attemptConnection = () => {
      setShowAttempt(true);
      setTimeout(() => setShowAttempt(false), 3000);
    };

    const currentConnection = connections[connectionType];

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            ATS - App Transport Security
          </h3>
          <p className="text-sm mb-3">
            ATS force toutes les connexions réseau des apps à utiliser HTTPS avec des standards 
            de sécurité élevés. Il protège contre les attaques man-in-the-middle et garantit 
            que les données en transit sont chiffrées.
          </p>
          <div className="text-sm bg-white border border-blue-200 rounded p-3">
            <p className="font-semibold mb-2">Exigences ATS par défaut:</p>
            <ul className="space-y-1 text-gray-700 text-xs">
              <li>• HTTPS obligatoire (pas de HTTP)</li>
              <li>• TLS 1.2 ou supérieur</li>
              <li>• Certificats valides signés par une CA reconnue</li>
              <li>• Forward secrecy (PFS) requis</li>
              <li>• Suites de chiffrement fortes uniquement</li>
            </ul>
          </div>
        </div>

        {/* Sélection du type de connexion */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Types de Connexion</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(connections).map(([key, conn]) => (
              <button
                key={key}
                onClick={() => setConnectionType(key)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  connectionType === key
                    ? `border-${conn.color}-500 bg-${conn.color}-50 ring-4 ring-${conn.color}-200`
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{conn.icon}</div>
                  <div className="font-semibold text-sm">{conn.name}</div>
                </div>
                <div className="text-xs text-gray-600">{conn.details}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Simulation de connexion */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Simulation de Connexion</h4>
          
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
            <div className="text-sm mb-2">
              <strong>App tente de se connecter à:</strong>
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded border border-gray-300">
              {connectionType === 'https' || connectionType === 'tls10' || connectionType === 'selfsigned'
                ? 'https://api.example.com/data'
                : 'http://api.example.com/data'}
            </div>
          </div>

          <button
            onClick={attemptConnection}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            Tenter la connexion
          </button>

          {showAttempt && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="font-semibold">Étape 1: Analyse de la requête</span>
                </div>
                <div className="text-sm text-gray-700">
                  ATS intercepte la requête et vérifie le protocole et les paramètres de sécurité
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                currentConnection.status === 'secure' ? 'border-green-400 bg-green-50' :
                currentConnection.status === 'warning' ? 'border-orange-400 bg-orange-50' :
                'border-red-400 bg-red-50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {currentConnection.status === 'secure' && (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Connexion Autorisée</span>
                    </>
                  )}
                  {currentConnection.status === 'warning' && (
                    <>
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-orange-800">Connexion Autorisée (Exception)</span>
                    </>
                  )}
                  {currentConnection.status === 'blocked' && (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">Connexion Bloquée</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-700">
                  {currentConnection.status === 'secure' && (
                    <>✅ Tous les critères ATS sont respectés. La connexion est établie de manière sécurisée avec chiffrement TLS fort.</>
                  )}
                  {currentConnection.status === 'warning' && (
                    <>⚠️ Une exception ATS a été configurée pour ce domaine. La connexion est autorisée mais n'est pas recommandée pour des données sensibles.</>
                  )}
                  {currentConnection.status === 'blocked' && (
                    <>🚫 ATS a bloqué cette connexion car elle ne respecte pas les standards de sécurité minimum. L'app reçoit une erreur NSURLErrorAppTransportSecurityRequiresSecureConnection.</>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attaques protégées */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Protection contre Man-in-the-Middle</h4>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="font-semibold mb-2 text-red-800">❌ Sans ATS (HTTP)</div>
              <div className="text-sm text-gray-700 mb-3">
                Un attaquant sur le même WiFi peut intercepter et lire toutes les données
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-blue-100 px-2 py-1 rounded">📱 App</span>
                <span>→</span>
                <span className="bg-red-200 px-2 py-1 rounded font-semibold">🎭 Attaquant</span>
                <span>→</span>
                <span className="bg-gray-100 px-2 py-1 rounded">🖥️ Serveur</span>
              </div>
            </div>

            <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
              <div className="font-semibold mb-2 text-green-800">✅ Avec ATS (HTTPS + TLS 1.3)</div>
              <div className="text-sm text-gray-700 mb-3">
                Toutes les données sont chiffrées bout-en-bout. L'attaquant ne voit que du trafic chiffré
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-blue-100 px-2 py-1 rounded">📱 App</span>
                <span>→</span>
                <span className="bg-gray-200 px-2 py-1 rounded">🎭 ??? (chiffré)</span>
                <span>→</span>
                <span className="bg-gray-100 px-2 py-1 rounded">🖥️ Serveur</span>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration ATS */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">Configuration ATS (Info.plist):</h4>
          <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
            <div>{'<key>NSAppTransportSecurity</key>'}</div>
            <div>{'<dict>'}</div>
            <div className="ml-4">{'  <key>NSAllowsArbitraryLoads</key>'}</div>
            <div className="ml-4">{'  <false/> <!-- ATS activé par défaut -->'}</div>
            <div className="ml-4">{'  <key>NSExceptionDomains</key>'}</div>
            <div className="ml-4">{'  <dict>'}</div>
            <div className="ml-8">{'    <key>example.com</key>'}</div>
            <div className="ml-8">{'    <dict>'}</div>
            <div className="ml-12">{'      <key>NSExceptionAllowsInsecureHTTPLoads</key>'}</div>
            <div className="ml-12">{'      <true/> <!-- Exception pour ce domaine -->'}</div>
            <div className="ml-8">{'    </dict>'}</div>
            <div className="ml-4">{'  </dict>'}</div>
            <div>{'</dict>'}</div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Complémentarité avec Data Protection:</h4>
          <p className="text-sm text-gray-700">
            <strong>Data Protection</strong> chiffre les données <em>au repos</em> (sur l'appareil), 
            tandis qu'<strong>ATS</strong> protège les données <em>en transit</em> (sur le réseau). 
            Ensemble, ils assurent une protection complète des données utilisateur.
          </p>
        </div>
      </div>
    );
  };

  const SecureEnclaveTab = () => {
    const [operation, setOperation] = useState('idle');
    const [biometricAttempt, setBiometricAttempt] = useState(null);

    const performBiometric = (type) => {
      setBiometricAttempt(type);
      setOperation('processing');
      setTimeout(() => {
        setOperation(type === 'valid' ? 'success' : 'failed');
      }, 1500);
      setTimeout(() => {
        setOperation('idle');
        setBiometricAttempt(null);
      }, 4000);
    };

    return (
      <div className="space-y-6">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Secure Enclave - Coprocesseur de Sécurité
          </h3>
          <p className="text-sm mb-3">
            Le Secure Enclave est un coprocesseur sécurisé isolé du processeur principal. 
            Il possède son propre système d'exploitation (sepOS) et gère toutes les opérations 
            cryptographiques sensibles.
          </p>
          <div className="text-sm bg-white border border-purple-200 rounded p-3">
            <p className="font-semibold mb-2">Responsabilités du Secure Enclave:</p>
            <ul className="space-y-1 text-gray-700">
              <li>• Stockage et gestion des clés cryptographiques</li>
              <li>• Traitement des données biométriques (Touch ID/Face ID)</li>
              <li>• Génération de nombres aléatoires cryptographiques</li>
              <li>• Protection contre les attaques physiques</li>
            </ul>
          </div>
        </div>

        {/* Architecture visuelle */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Architecture Isolée</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Processeur principal */}
            <div className="p-4 rounded-lg border-2 border-blue-300 bg-blue-50">
              <div className="font-semibold mb-3 flex items-center gap-2">
                💻 Processeur Principal (Application Processor)
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-white rounded border border-blue-200">
                  <div className="font-semibold text-xs mb-1">iOS / Applications</div>
                  <div className="text-xs text-gray-600">Exécution des apps, UI, etc.</div>
                </div>
                <div className="p-2 bg-white rounded border border-blue-200">
                  <div className="font-semibold text-xs mb-1">Kernel (XNU)</div>
                  <div className="text-xs text-gray-600">Gestion système</div>
                </div>
                <div className="text-xs text-center text-gray-500 py-1">
                  ⬇️ Communication sécurisée ⬇️
                </div>
              </div>
            </div>

            {/* Secure Enclave */}
            <div className="p-4 rounded-lg border-2 border-purple-400 bg-purple-50 relative">
              <div className="absolute top-2 right-2">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="font-semibold mb-3 flex items-center gap-2">
                🔒 Secure Enclave (Isolé)
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-white rounded border-2 border-purple-300">
                  <div className="font-semibold text-xs mb-1">sepOS</div>
                  <div className="text-xs text-gray-600">OS dédié et isolé</div>
                </div>
                <div className="p-2 bg-purple-100 rounded border-2 border-purple-300">
                  <div className="font-semibold text-xs mb-1">🔑 Clés Cryptographiques</div>
                  <div className="text-xs text-gray-600">Ne quittent jamais l'enclave</div>
                </div>
                <div className="p-2 bg-purple-100 rounded border-2 border-purple-300">
                  <div className="font-semibold text-xs mb-1">👤 Données Biométriques</div>
                  <div className="text-xs text-gray-600">Stockage sécurisé</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation biométrique */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Simulation: Authentification Face ID</h4>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => performBiometric('valid')}
                disabled={operation !== 'idle'}
                className="flex-1 p-4 bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-3xl mb-2">✅</div>
                <div className="font-semibold">Visage Autorisé</div>
                <div className="text-xs text-gray-600">Propriétaire de l'appareil</div>
              </button>

              <button
                onClick={() => performBiometric('invalid')}
                disabled={operation !== 'idle'}
                className="flex-1 p-4 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-3xl mb-2">❌</div>
                <div className="font-semibold">Visage Non Autorisé</div>
                <div className="text-xs text-gray-600">Personne inconnue</div>
              </button>
            </div>

            {/* Processus de vérification */}
            {operation !== 'idle' && (
              <div className="space-y-3 mt-6">
                <div className={`p-4 rounded-lg border-2 ${
                  operation === 'processing' ? 'border-blue-400 bg-blue-50 animate-pulse' :
                  operation === 'success' ? 'border-green-400 bg-green-50' :
                  'border-red-400 bg-red-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {operation === 'processing' && (
                      <>
                        <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                        <span className="font-semibold">Étape 1: Capture Face ID</span>
                      </>
                    )}
                    {operation !== 'processing' && (
                      <>
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold">Étape 1: Capture Face ID</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-700">
                    La caméra TrueDepth capture et crée une carte 3D du visage
                  </div>
                </div>

                {operation !== 'idle' && (
                  <div className={`p-4 rounded-lg border-2 ${
                    operation === 'processing' ? 'border-purple-400 bg-purple-50 animate-pulse' :
                    operation === 'success' ? 'border-green-400 bg-green-50' :
                    'border-red-400 bg-red-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {operation === 'processing' && (
                        <>
                          <Lock className="w-5 h-5 text-purple-600 animate-pulse" />
                          <span className="font-semibold">Étape 2: Traitement dans Secure Enclave</span>
                        </>
                      )}
                      {operation !== 'processing' && (
                        <>
                          <CheckCircle className="w-5 h-5 text-gray-600" />
                          <span className="font-semibold">Étape 2: Traitement dans Secure Enclave</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      Les données sont envoyées au Secure Enclave pour comparaison. 
                      Les données biométriques ne quittent JAMAIS le Secure Enclave.
                    </div>
                  </div>
                )}

                {operation !== 'processing' && operation !== 'idle' && (
                  <div className={`p-4 rounded-lg border-2 ${
                    operation === 'success' ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {operation === 'success' ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">Authentification Réussie</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-800">Authentification Échouée</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      {operation === 'success' 
                        ? '✅ Le Secure Enclave confirme la correspondance. L\'appareil est déverrouillé et les clés de chiffrement sont libérées.'
                        : '🚫 Pas de correspondance détectée. L\'accès est refusé. Après 5 échecs, un code est requis.'}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Avantages de sécurité */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">Protection du Secure Enclave:</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Isolation matérielle:</strong> Complètement séparé du processeur principal</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Clés non extractibles:</strong> Les clés crypto ne peuvent jamais être lues par iOS</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Protection anti-rejeu:</strong> Compteur de tentatives qui ne peut pas être réinitialisé</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Boot sécurisé:</strong> Le Secure Enclave a sa propre chaîne de démarrage vérifiée</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Pourquoi c'est crucial:</h4>
          <p className="text-sm text-gray-700">
            Même si un attaquant compromet complètement iOS et obtient un accès root, 
            il ne peut pas extraire vos clés cryptographiques ou données biométriques du Secure Enclave. 
            C'est une <strong>forteresse matérielle</strong> indépendante.
          </p>
        </div>
      </div>
    );
  };

  const DataProtectionTab = () => {
    const [deviceState, setDeviceState] = useState('locked');
    const [selectedFile, setSelectedFile] = useState(null);

    const files = {
      complete: {
        name: "Messages.db",
        protection: "Complete",
        icon: "💬",
        desc: "Protection complète - Accessible uniquement déverrouillé"
      },
      unlessOpen: {
        name: "Document.pdf",
        protection: "CompleteUnlessOpen",
        icon: "📄",
        desc: "Protégé sauf si ouvert - Reste accessible après ouverture"
      },
      firstUnlock: {
        name: "Email.db",
        protection: "CompleteUntilFirstUserAuth",
        icon: "📧",
        desc: "Accessible après 1er déverrouillage depuis boot"
      },
      none: {
        name: "Cache.tmp",
        protection: "None",
        icon: "📦",
        desc: "Pas de protection - Toujours accessible"
      }
    };

    const canAccessFile = (protection) => {
      if (protection === 'None') return true;
      if (protection === 'CompleteUntilFirstUserAuth') return deviceState !== 'boot';
      if (protection === 'CompleteUnlessOpen') return deviceState === 'unlocked' || deviceState === 'locked-but-open';
      if (protection === 'Complete') return deviceState === 'unlocked';
      return false;
    };

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            Data Protection - Chiffrement des Données
          </h3>
          <p className="text-sm mb-3">
            iOS chiffre chaque fichier avec sa propre clé unique. Les clés sont protégées par 
            le code de l'utilisateur et gérées par le Secure Enclave. Différentes classes de 
            protection déterminent quand les fichiers sont accessibles.
          </p>
          <div className="text-sm bg-white border border-blue-200 rounded p-3">
            <p className="font-semibold mb-2">Architecture de chiffrement:</p>
            <div className="space-y-1 text-gray-700 text-xs">
              <div>1. <strong>Clé matérielle</strong> (unique par appareil, gravée dans silicon)</div>
              <div>2. <strong>Clé de classe</strong> (protégée par le code utilisateur)</div>
              <div>3. <strong>Clé de fichier</strong> (unique par fichier, AES-256)</div>
            </div>
          </div>
        </div>

        {/* Contrôle état appareil */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">État de l'appareil</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeviceState('boot')}
              className={`p-3 rounded-lg border-2 transition-all ${
                deviceState === 'boot'
                  ? 'border-red-500 bg-red-50 ring-4 ring-red-200'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🔴</div>
              <div className="font-semibold text-sm">Après Boot</div>
              <div className="text-xs text-gray-600">Jamais déverrouillé</div>
            </button>

            <button
              onClick={() => setDeviceState('locked')}
              className={`p-3 rounded-lg border-2 transition-all ${
                deviceState === 'locked'
                  ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-200'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🔒</div>
              <div className="font-semibold text-sm">Verrouillé</div>
              <div className="text-xs text-gray-600">Déjà déverrouillé 1×</div>
            </button>

            <button
              onClick={() => setDeviceState('unlocked')}
              className={`p-3 rounded-lg border-2 transition-all ${
                deviceState === 'unlocked'
                  ? 'border-green-500 bg-green-50 ring-4 ring-green-200'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🔓</div>
              <div className="font-semibold text-sm">Déverrouillé</div>
              <div className="text-xs text-gray-600">Accès complet</div>
            </button>

            <button
              onClick={() => setDeviceState('locked-but-open')}
              className={`p-3 rounded-lg border-2 transition-all ${
                deviceState === 'locked-but-open'
                  ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-200'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🔐</div>
              <div className="font-semibold text-sm">Verrouillé + Fichier Ouvert</div>
              <div className="text-xs text-gray-600">Protection Unless Open</div>
            </button>
          </div>
        </div>

        {/* Classes de protection */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">Classes de Protection des Fichiers</h4>
          <div className="space-y-3">
            {Object.entries(files).map(([key, file]) => {
              const accessible = canAccessFile(file.protection);
              return (
                <div
                  key={key}
                  onClick={() => setSelectedFile(key)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    accessible
                      ? 'border-green-300 bg-green-50 hover:border-green-400'
                      : 'border-red-300 bg-red-50'
                  } ${selectedFile === key ? 'ring-4 ring-blue-200' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{file.icon}</div>
                      <div>
                        <div className="font-semibold">{file.name}</div>
                        <div className="text-xs text-gray-600">{file.desc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {file.protection}
                      </code>
                      {accessible ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Lock className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs">
                    {accessible ? (
                      <span className="text-green-700">✅ Accessible dans l'état actuel</span>
                    ) : (
                      <span className="text-red-700">🔒 Chiffré - Clé non disponible</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schéma de chiffrement */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">Comment fonctionne le chiffrement:</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-white rounded border border-gray-300">
              <div className="font-semibold mb-1">1. Clé Matérielle (UID)</div>
              <div className="text-xs text-gray-600">
                Unique par appareil, gravée dans le silicon lors de la fabrication. 
                Impossible à extraire.
              </div>
            </div>
            <div className="text-center text-gray-400">+</div>
            <div className="p-3 bg-white rounded border border-gray-300">
              <div className="font-semibold mb-1">2. Code Utilisateur</div>
              <div className="text-xs text-gray-600">
                Dérivé du code/Face ID de l'utilisateur via le Secure Enclave.
              </div>
            </div>
            <div className="text-center text-gray-400">=</div>
            <div className="p-3 bg-green-50 rounded border-2 border-green-300">
              <div className="font-semibold mb-1">3. Clé de Classe Dérivée</div>
              <div className="text-xs text-gray-600">
                Utilisée pour déchiffrer les clés de fichiers individuels (AES-256).
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Protection contre les attaques:</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Vol de l'appareil:</strong> Sans le code, impossible de déchiffrer</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Extraction de données:</strong> Les fichiers restent chiffrés hors appareil</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span><strong>Attaque brute force:</strong> Secure Enclave impose des délais croissants</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SandboxTab = () => {
    const [selectedApp, setSelectedApp] = useState('malicious');
    const [accessAttempt, setAccessAttempt] = useState(null);

    const apps = {
      malicious: { name: "App Malveillante", color: "red", icon: "⚠️" },
      photos: { name: "Photos", color: "blue", icon: "📷" },
      contacts: { name: "Contacts", color: "green", icon: "👥" },
      files: { name: "Fichiers", color: "purple", icon: "📁" }
    };

    const attemptAccess = (target) => {
      setAccessAttempt(target);
      setTimeout(() => setAccessAttempt(null), 3000);
    };

    return (
      <div className="space-y-6">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            Sandbox - Isolation des applications
          </h3>
          <p className="text-sm text-gray-700">
            Chaque app iOS fonctionne dans son propre "bac à sable" (sandbox) isolé. 
            Elle ne peut accéder qu'à ses propres données et doit demander la permission 
            pour accéder aux ressources système.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(apps).map(([key, app]) => (
            <div
              key={key}
              onClick={() => setSelectedApp(key)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedApp === key
                  ? 'border-red-500 bg-red-50 ring-4 ring-red-200'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-2">{app.icon}</div>
              <div className="font-semibold">{app.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                Container: /private/var/mobile/Containers/{key}
              </div>
            </div>
          ))}
        </div>

        {selectedApp === 'malicious' && (
          <div className="bg-white border-2 border-red-300 rounded-lg p-6">
            <h4 className="font-bold mb-4 text-red-700">
              Tentatives d'accès depuis l'app malveillante
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => attemptAccess('photos')}
                className="w-full p-3 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg text-left transition-all"
              >
                <div className="font-semibold">Accéder aux Photos</div>
                <div className="text-xs text-gray-600">Lecture /var/mobile/Media/DCIM/</div>
              </button>
              <button
                onClick={() => attemptAccess('contacts')}
                className="w-full p-3 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg text-left transition-all"
              >
                <div className="font-semibold">Accéder aux Contacts</div>
                <div className="text-xs text-gray-600">Lecture AddressBook.sqlitedb</div>
              </button>
              <button
                onClick={() => attemptAccess('system')}
                className="w-full p-3 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg text-left transition-all"
              >
                <div className="font-semibold">Modifier fichiers système</div>
                <div className="text-xs text-gray-600">Écriture /System/Library/</div>
              </button>
            </div>
          </div>
        )}

        {accessAttempt && (
          <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-red-800 mb-1">Accès refusé par le Sandbox !</div>
                <div className="text-sm text-gray-700">
                  L'app malveillante n'a pas la permission d'accéder à {accessAttempt === 'photos' ? 'vos photos' : accessAttempt === 'contacts' ? 'vos contacts' : 'ces fichiers système'}.
                  Le sandbox bloque toute tentative d'accès non autorisé.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Restrictions du Sandbox :</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Chaque app a son propre répertoire isolé</li>
            <li>• Accès aux autres apps : <strong>Interdit</strong></li>
            <li>• Accès aux fichiers système : <strong>Lecture seule ou interdit</strong></li>
            <li>• Ressources (caméra, micro, GPS) : <strong>Permission requise</strong></li>
            <li>• Communication inter-apps : <strong>Via APIs contrôlées uniquement</strong></li>
          </ul>
        </div>
      </div>
    );
  };

  const MemoryBlock = ({ label, address, prevAddress, color }) => (
    <div className={`p-4 rounded-lg border-2 ${color} transition-all duration-300`}>
      <div className="font-semibold text-sm mb-2">{label}</div>
      <div className="font-mono text-lg">{address}</div>
      {prevAddress && showComparison && (
        <div className="mt-2 text-sm opacity-60">
          <span>Précédent: {prevAddress}</span>
          {address !== prevAddress && (
            <CheckCircle className="inline ml-2 w-4 h-4 text-green-500" />
          )}
        </div>
      )}
    </div>
  );

  const XNBitDemo = () => {
    const [attackStep, setAttackStep] = useState(0);
    
    const steps = [
      { title: "Situation normale", desc: "Le programme s'exécute normalement avec code et données séparés" },
      { title: "Tentative d'injection", desc: "Un attaquant tente d'injecter du code malveillant dans la pile (zone de données)" },
      { title: "XN Bit intervient", desc: "Le processeur détecte une tentative d'exécution dans une zone marquée non-exécutable" },
      { title: "Attaque bloquée", desc: "Le système termine immédiatement le processus (crash) - l'attaque échoue" }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Comment fonctionne le XN Bit
          </h3>
          <p className="text-sm mb-4">
            Le XN (eXecute Never) bit marque certaines zones mémoire comme NON-EXÉCUTABLES. 
            Même si un attaquant injecte du code malveillant, le processeur refuse de l'exécuter.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setAttackStep(idx)}
                className={`flex-1 py-2 px-3 rounded text-sm font-semibold transition-all ${
                  attackStep === idx 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                Étape {idx + 1}
              </button>
            ))}
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-6 min-h-64">
            <h4 className="font-bold mb-2">{steps[attackStep].title}</h4>
            <p className="text-sm mb-6 text-gray-600">{steps[attackStep].desc}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-2 transition-all ${
                attackStep === 0 ? 'border-green-300 bg-green-50' : 
                attackStep === 3 ? 'border-gray-300 bg-gray-100' :
                'border-blue-300 bg-blue-50'
              }`}>
                <div className="font-semibold mb-2 flex items-center gap-2">
                  Zone Code (Exécutable)
                  {attackStep === 0 && <CheckCircle className="w-4 h-4 text-green-600" />}
                </div>
                <div className="text-xs font-mono space-y-1">
                  <div>0x100000: MOV R1, #5</div>
                  <div>0x100004: ADD R2, R1</div>
                  <div>0x100008: RET</div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 transition-all ${
                attackStep === 0 ? 'border-gray-300 bg-gray-50' :
                attackStep === 1 ? 'border-orange-300 bg-orange-50' :
                attackStep === 2 ? 'border-red-300 bg-red-50' :
                'border-red-500 bg-red-100'
              }`}>
                <div className="font-semibold mb-2 flex items-center gap-2">
                  Zone Données (Stack) - XN activé
                  {attackStep >= 2 && <XCircle className="w-4 h-4 text-red-600" />}
                </div>
                <div className="text-xs font-mono space-y-1">
                  <div>0x7FF000: buffer[0]</div>
                  <div>0x7FF008: buffer[1]</div>
                  {attackStep >= 1 && (
                    <div className="text-red-600 font-bold animate-pulse">
                      0x7FF010: MALICIOUS_CODE
                    </div>
                  )}
                </div>
              </div>
            </div>

            {attackStep === 2 && (
              <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-300 rounded flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong>Détection:</strong> Le CPU détecte une tentative d'exécution à l'adresse 0x7FF010 
                  qui est marquée avec le bit XN (non-exécutable)
                </div>
              </div>
            )}

            {attackStep === 3 && (
              <div className="mt-4 p-3 bg-red-50 border-2 border-red-300 rounded flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong>Protection activée:</strong> Le système termine le processus immédiatement. 
                  L'attaquant ne peut pas exécuter son code malveillant. L'application crash plutôt que d'être compromise.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Zones mémoire typiques avec XN:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span><strong>Code:</strong> Exécutable, non modifiable</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span><strong>Stack:</strong> Non exécutable (XN activé)</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span><strong>Heap:</strong> Non exécutable (XN activé)</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span><strong>Données:</strong> Non exécutable (XN activé)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
<div className="flex items-center justify-between mb-6 flex-wrap gap-4">
  <div className="flex items-center gap-3">
    <Shield className="w-8 h-8 text-blue-600" />
    <div>
      <h1 className="text-3xl font-bold text-gray-800">{t('header.title')}</h1>
      <p className="text-gray-600">{t('header.subtitle')}</p>
    </div>
  </div>
  <LanguageSelector />
</div>
          <div className="flex gap-2 mb-6 border-b-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'overview'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.overview')}
            </button>
            <button
              onClick={() => setActiveTab('secureboot')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'secureboot'
                  ? 'border-b-4 border-green-600 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Secure Boot
            </button>
            <button
              onClick={() => setActiveTab('secureenclave')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'secureenclave'
                  ? 'border-b-4 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Secure Enclave
            </button>
            <button
              onClick={() => setActiveTab('dataprotection')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'dataprotection'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Data Protection
            </button>
            <button
              onClick={() => setActiveTab('codesigning')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'codesigning'
                  ? 'border-b-4 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Code Signing
            </button>
            <button
              onClick={() => setActiveTab('amfi')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'amfi'
                  ? 'border-b-4 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              AMFI
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'sandbox'
                  ? 'border-b-4 border-green-600 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sandbox
            </button>
            <button
              onClick={() => setActiveTab('aslr')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'aslr'
                  ? 'border-b-4 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ASLR
            </button>
            <button
              onClick={() => setActiveTab('xn')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'xn'
                  ? 'border-b-4 border-orange-600 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              XN Bit
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'ats'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ATS
            </button>
          </div>

          {activeTab === 'overview' ? (
            <OverviewTab />
          ) : activeTab === 'secureboot' ? (
            <SecureBootTab />
          ) : activeTab === 'secureenclave' ? (
            <SecureEnclaveTab />
          ) : activeTab === 'dataprotection' ? (
            <DataProtectionTab />
          ) : activeTab === 'codesigning' ? (
            <CodeSigningTab />
          ) : activeTab === 'amfi' ? (
            <AMFITab />
          ) : activeTab === 'sandbox' ? (
            <SandboxTab />
          ) : activeTab === 'aslr' ? (
            <div className="space-y-6">
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                  ASLR - Address Space Layout Randomization
                </h3>
                <p className="text-sm text-gray-700">
                  L'ASLR randomise les adresses mémoire à chaque exécution du programme. 
                  Cliquez sur "Nouvelle exécution" pour simuler un redémarrage et observer 
                  comment les adresses changent à chaque fois.
                </p>
              </div>

              <button
                onClick={handleRefresh}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                Nouvelle exécution (simuler un redémarrage)
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MemoryBlock
                  label="Stack (Variables locales)"
                  address={addresses.stack}
                  prevAddress={previousAddresses?.stack}
                  color="border-purple-300 bg-purple-50"
                />
                <MemoryBlock
                  label="Heap (Allocation dynamique)"
                  address={addresses.heap}
                  prevAddress={previousAddresses?.heap}
                  color="border-green-300 bg-green-50"
                />
                <MemoryBlock
                  label="Code (Instructions du programme)"
                  address={addresses.code}
                  prevAddress={previousAddresses?.code}
                  color="border-blue-300 bg-blue-50"
                />
                <MemoryBlock
                  label="Bibliothèques système"
                  address={addresses.library}
                  prevAddress={previousAddresses?.library}
                  color="border-orange-300 bg-orange-50"
                />
              </div>

              {showComparison && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800 mb-1">Protection active!</p>
                      <p className="text-sm text-gray-700">
                        Toutes les adresses ont changé. Un attaquant ne peut pas prédire où se trouvent 
                        les fonctions ou les données en mémoire, rendant l'exploitation beaucoup plus difficile.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm">Pourquoi c'est important:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Sans ASLR, les adresses seraient toujours identiques</li>
                  <li>• Les attaquants pourraient prédire où attaquer en mémoire</li>
                  <li>• Avec ASLR, chaque exécution a une disposition mémoire unique</li>
                  <li>• Les exploits basés sur des adresses fixes deviennent impossibles</li>
                </ul>
              </div>
            </div>
          ) : activeTab === 'xn' ? (
            <XNBitDemo />
          ) : (
            <ATSTab />
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>{t('footer.demo')}</p>
        </div>
      </div>
    </div>
  );
};

export default IOSSecurityDemo;