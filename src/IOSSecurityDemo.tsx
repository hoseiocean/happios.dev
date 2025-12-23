import React, { useState, useEffect } from 'react';
import { RefreshCw, Shield, AlertTriangle, CheckCircle, XCircle, Lock, Layers } from 'lucide-react';

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
    const [attackPhase, setAttackPhase] = useState(0);
    
    const phases = [
      {
        title: "Application normale",
        desc: "L'app fonctionne dans son environnement sécurisé",
        amfi: "active",
        sandbox: "active",
        aslr: "active",
        xn: "active",
        threat: "none"
      },
      {
        title: "Phase 1: Tentative de modification du binaire",
        desc: "L'attaquant essaie de remplacer le code de l'app",
        amfi: "blocking",
        sandbox: "active",
        aslr: "active",
        xn: "active",
        threat: "code-integrity"
      },
      {
        title: "Phase 2: Tentative d'accès non autorisé",
        desc: "L'app malveillante tente d'accéder aux photos",
        amfi: "bypassed",
        sandbox: "blocking",
        aslr: "active",
        xn: "active",
        threat: "sandbox"
      },
      {
        title: "Phase 3: Tentative d'exploitation mémoire",
        desc: "L'attaquant essaie de trouver des adresses à exploiter",
        amfi: "bypassed",
        sandbox: "bypassed",
        aslr: "blocking",
        xn: "active",
        threat: "memory"
      },
      {
        title: "Phase 4: Injection de code",
        desc: "Code malveillant injecté dans la mémoire",
        amfi: "bypassed",
        sandbox: "bypassed",
        aslr: "bypassed",
        xn: "blocking",
        threat: "execution"
      },
      {
        title: "Attaque totalement bloquée",
        desc: "Les quatre couches ont travaillé ensemble",
        amfi: "active",
        sandbox: "active",
        aslr: "active",
        xn: "active",
        threat: "blocked"
      }
    ];

    const currentPhase = phases[attackPhase];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-6">
          <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600" />
            Défense en Profondeur (Defense in Depth)
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            iOS utilise quatre couches de sécurité complémentaires. Si une protection échoue, 
            les autres restent actives pour bloquer l'attaque.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {phases.map((phase, idx) => (
            <button
              key={idx}
              onClick={() => setAttackPhase(idx)}
              className={`flex-1 min-w-[100px] py-2 px-2 rounded text-xs font-semibold transition-all ${
                attackPhase === idx 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {idx === 0 ? 'Normal' : `Phase ${idx}`}
            </button>
          ))}
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
          <div className="mb-4">
            <h4 className="font-bold text-lg mb-1">{currentPhase.title}</h4>
            <p className="text-sm text-gray-600">{currentPhase.desc}</p>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-2 transition-all duration-500 ${
              currentPhase.amfi === 'blocking' ? 'border-yellow-400 bg-yellow-50 ring-4 ring-yellow-200' :
              currentPhase.amfi === 'bypassed' ? 'border-red-300 bg-red-50' :
              'border-indigo-300 bg-indigo-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className={`w-5 h-5 ${
                    currentPhase.amfi === 'blocking' ? 'text-yellow-600' :
                    currentPhase.amfi === 'bypassed' ? 'text-red-600' :
                    'text-indigo-600'
                  }`} />
                  <span className="font-bold">Couche 0: AMFI (Intégrité du code)</span>
                </div>
                {currentPhase.amfi === 'blocking' && (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 animate-pulse" />
                )}
                {currentPhase.amfi === 'bypassed' && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                {currentPhase.amfi === 'active' && (
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                )}
              </div>
              <div className="text-sm">
                <div className="font-semibold mb-1">Protège contre:</div>
                <div className="text-gray-700">Exécution de code non signé ou modifié</div>
              </div>
              {currentPhase.amfi === 'blocking' && (
                <div className="mt-2 text-sm bg-yellow-100 p-2 rounded">
                  ⚠️ Signature invalide détectée - Exécution refusée
                </div>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all duration-500 ${
              currentPhase.sandbox === 'blocking' ? 'border-yellow-400 bg-yellow-50 ring-4 ring-yellow-200' :
              currentPhase.sandbox === 'bypassed' ? 'border-red-300 bg-red-50' :
              'border-green-300 bg-green-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Lock className={`w-5 h-5 ${
                    currentPhase.sandbox === 'blocking' ? 'text-yellow-600' :
                    currentPhase.sandbox === 'bypassed' ? 'text-red-600' :
                    'text-green-600'
                  }`} />
                  <span className="font-bold">Couche 1: Sandbox (Isolation)</span>
                </div>
                {currentPhase.sandbox === 'blocking' && (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 animate-pulse" />
                )}
                {currentPhase.sandbox === 'bypassed' && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                {currentPhase.sandbox === 'active' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="text-sm">
                <div className="font-semibold mb-1">Protège contre:</div>
                <div className="text-gray-700">Accès non autorisés aux ressources système et autres apps</div>
              </div>
              {currentPhase.sandbox === 'blocking' && (
                <div className="mt-2 text-sm bg-yellow-100 p-2 rounded">
                  ⚠️ Bloque la tentative d'accès aux photos
                </div>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all duration-500 ${
              currentPhase.aslr === 'blocking' ? 'border-yellow-400 bg-yellow-50 ring-4 ring-yellow-200' :
              currentPhase.aslr === 'bypassed' ? 'border-red-300 bg-red-50' :
              'border-blue-300 bg-blue-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <RefreshCw className={`w-5 h-5 ${
                    currentPhase.aslr === 'blocking' ? 'text-yellow-600' :
                    currentPhase.aslr === 'bypassed' ? 'text-red-600' :
                    'text-blue-600'
                  }`} />
                  <span className="font-bold">Couche 2: ASLR (Randomisation)</span>
                </div>
                {currentPhase.aslr === 'blocking' && (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 animate-pulse" />
                )}
                {currentPhase.aslr === 'bypassed' && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                {currentPhase.aslr === 'active' && (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="text-sm">
                <div className="font-semibold mb-1">Protège contre:</div>
                <div className="text-gray-700">Exploits basés sur des adresses mémoire prévisibles</div>
              </div>
              {currentPhase.aslr === 'blocking' && (
                <div className="mt-2 text-sm bg-yellow-100 p-2 rounded">
                  ⚠️ Adresses randomisées - exploitation impossible
                </div>
              )}
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all duration-500 ${
              currentPhase.xn === 'blocking' ? 'border-yellow-400 bg-yellow-50 ring-4 ring-yellow-200' :
              currentPhase.xn === 'bypassed' ? 'border-red-300 bg-red-50' :
              'border-purple-300 bg-purple-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <XCircle className={`w-5 h-5 ${
                    currentPhase.xn === 'blocking' ? 'text-yellow-600' :
                    currentPhase.xn === 'bypassed' ? 'text-red-600' :
                    'text-purple-600'
                  }`} />
                  <span className="font-bold">Couche 3: XN Bit (Non-exécution)</span>
                </div>
                {currentPhase.xn === 'blocking' && (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 animate-pulse" />
                )}
                {currentPhase.xn === 'active' && (
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                )}
              </div>
              <div className="text-sm">
                <div className="font-semibold mb-1">Protège contre:</div>
                <div className="text-gray-700">Exécution de code malveillant injecté en mémoire</div>
              </div>
              {currentPhase.xn === 'blocking' && (
                <div className="mt-2 text-sm bg-yellow-100 p-2 rounded">
                  ⚠️ Code injecté détecté - exécution refusée - Crash
                </div>
              )}
            </div>
          </div>

          {attackPhase === 5 && (
            <div className="mt-6 p-4 bg-green-50 border-2 border-green-400 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-green-800 text-lg mb-2">
                    Attaque totalement bloquée !
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>✅ <strong>AMFI</strong> a vérifié l'intégrité et la signature du code</p>
                    <p>✅ <strong>Sandbox</strong> a empêché l'accès direct aux ressources</p>
                    <p>✅ <strong>ASLR</strong> a rendu l'exploitation mémoire imprévisible</p>
                    <p>✅ <strong>XN Bit</strong> a bloqué l'exécution du code injecté</p>
                    <p className="mt-3 font-semibold">
                      L'attaquant devrait contourner les QUATRE protections simultanément - 
                      une tâche extrêmement difficile voire impossible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3">Récapitulatif des couches de défense</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-2">Mécanisme</th>
                  <th className="text-left py-2 px-2">Niveau</th>
                  <th className="text-left py-2 px-2">Objectif</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold">AMFI</td>
                  <td className="py-2 px-2">Noyau</td>
                  <td className="py-2 px-2">Vérifier que le code est <em>signé et non modifié</em></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold">Sandbox</td>
                  <td className="py-2 px-2">Système/App</td>
                  <td className="py-2 px-2">Limiter ce qu'une app <em>peut faire</em></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold">ASLR</td>
                  <td className="py-2 px-2">Mémoire</td>
                  <td className="py-2 px-2">Rendre difficile de <em>trouver</em> où attaquer</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-semibold">XN Bit</td>
                  <td className="py-2 px-2">Processeur</td>
                  <td className="py-2 px-2">Empêcher <em>l'exécution</em> de code injecté</td>
                </tr>
              </tbody>
            </table>
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
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sécurité iOS</h1>
              <p className="text-gray-600">Architecture de défense en profondeur</p>
            </div>
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
              Vue d'ensemble
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
          <p>Démonstration interactive de l'architecture de sécurité iOS</p>
        </div>
      </div>
    </div>
  );
};

export default IOSSecurityDemo;