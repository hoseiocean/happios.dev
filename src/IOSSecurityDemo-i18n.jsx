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
        className="bg-alabaster border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
        name: t('securityLayers.secureboot.name'),
        shortName: t('securityLayers.secureboot.shortName'),
        level: t('securityLayers.secureboot.level'),
        category: 'hardware',
        color: 'green',
        icon: '🔐',
        description: t('securityLayers.secureboot.description'),
        details: t('securityLayers.secureboot.details'),
        protects: t('securityLayers.secureboot.protects')
      },
      {
        id: 'secureenclave',
        name: t('securityLayers.secureenclave.name'),
        shortName: t('securityLayers.secureenclave.shortName'),
        level: t('securityLayers.secureenclave.level'),
        category: 'hardware',
        color: 'purple',
        icon: '🔒',
        description: t('securityLayers.secureenclave.description'),
        details: t('securityLayers.secureenclave.details'),
        protects: t('securityLayers.secureenclave.protects')
      },
      {
        id: 'dataprotection',
        name: t('securityLayers.dataprotection.name'),
        shortName: t('securityLayers.dataprotection.shortName'),
        level: t('securityLayers.dataprotection.level'),
        category: 'data',
        color: 'blue',
        icon: '🗂️',
        description: t('securityLayers.dataprotection.description'),
        details: t('securityLayers.dataprotection.details'),
        protects: t('securityLayers.dataprotection.protects')
      },
      {
        id: 'codesigning',
        name: t('securityLayers.codesigning.name'),
        shortName: t('securityLayers.codesigning.shortName'),
        level: t('securityLayers.codesigning.level'),
        category: 'code',
        color: 'indigo',
        icon: '✍️',
        description: t('securityLayers.codesigning.description'),
        details: t('securityLayers.codesigning.details'),
        protects: t('securityLayers.codesigning.protects')
      },
      {
        id: 'amfi',
        name: t('securityLayers.amfi.name'),
        shortName: t('securityLayers.amfi.shortName'),
        level: t('securityLayers.amfi.level'),
        category: 'code',
        color: 'indigo',
        icon: '🛡️',
        description: t('securityLayers.amfi.description'),
        details: t('securityLayers.amfi.details'),
        protects: t('securityLayers.amfi.protects')
      },
      {
        id: 'sandbox',
        name: t('securityLayers.sandbox.name'),
        shortName: t('securityLayers.sandbox.shortName'),
        level: t('securityLayers.sandbox.level'),
        category: 'isolation',
        color: 'green',
        icon: '📦',
        description: t('securityLayers.sandbox.description'),
        details: t('securityLayers.sandbox.details'),
        protects: t('securityLayers.sandbox.protects')
      },
      {
        id: 'aslr',
        name: t('securityLayers.aslr.name'),
        shortName: t('securityLayers.aslr.shortName'),
        level: t('securityLayers.aslr.level'),
        category: 'memory',
        color: 'purple',
        icon: '🎲',
        description: t('securityLayers.aslr.description'),
        details: t('securityLayers.aslr.details'),
        protects: t('securityLayers.aslr.protects')
      },
      {
        id: 'xn',
        name: t('securityLayers.xn.name'),
        shortName: t('securityLayers.xn.shortName'),
        level: t('securityLayers.xn.level'),
        category: 'memory',
        color: 'orange',
        icon: '⛔',
        description: t('securityLayers.xn.description'),
        details: t('securityLayers.xn.details'),
        protects: t('securityLayers.xn.protects')
      },
      {
        id: 'ats',
        name: t('securityLayers.ats.name'),
        shortName: t('securityLayers.ats.shortName'),
        level: t('securityLayers.ats.level'),
        category: 'network',
        color: 'blue',
        icon: '🌐',
        description: t('securityLayers.ats.description'),
        details: t('securityLayers.ats.details'),
        protects: t('securityLayers.ats.protects')
      }
    ];

    const categories = [
      { id: 'hardware', name: t('categories.hardware'), color: 'from-amber-100 to-orange-100', border: 'border-amber-300' },
      { id: 'data', name: t('categories.data'), color: 'from-blue-100 to-cyan-100', border: 'border-blue-300' },
      { id: 'code', name: t('categories.code'), color: 'from-indigo-100 to-purple-100', border: 'border-indigo-300' },
      { id: 'isolation', name: t('categories.isolation'), color: 'from-green-100 to-emerald-100', border: 'border-green-300' },
      { id: 'memory', name: t('categories.memory'), color: 'from-purple-100 to-pink-100', border: 'border-purple-300' },
      { id: 'network', name: t('categories.network'), color: 'from-sky-100 to-blue-100', border: 'border-sky-300' }
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
      return 'bg-alabaster border-gray-300 hover:border-gray-400';
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
            {t('overview.title')}
          </h3>
          <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('overview.description') }} />
        </div>

        {/* Architecture visuelle en couches */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-center text-gray-700">{t('overview.architectureTitle')}</h4>
          
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
                <div className="bg-alabaster border border-gray-200 rounded p-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">{t('overview.protectsAgainst')}</div>
                  <div className="text-sm text-gray-800">{selectedLayerData.protects}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tableau récapitulatif complet */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3">{t('overview.summaryTitle')}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-2">{t('overview.tableHeaders.mechanism')}</th>
                  <th className="text-left py-2 px-2">{t('overview.tableHeaders.level')}</th>
                  <th className="text-left py-2 px-2">{t('overview.tableHeaders.mainRole')}</th>
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
            {t('overview.attackFlowTitle')}
          </h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p>{t('overview.attackFlowIntro')}</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li dangerouslySetInnerHTML={{ __html: t('overview.attackSteps.step1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('overview.attackSteps.step2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('overview.attackSteps.step3') }} />
              <li dangerouslySetInnerHTML={{ __html: t('overview.attackSteps.step4') }} />
              <li dangerouslySetInnerHTML={{ __html: t('overview.attackSteps.step5') }} />
              <li dangerouslySetInnerHTML={{ __html: t('overview.attackSteps.step6') }} />
              <li dangerouslySetInnerHTML={{ __html: t('overview.attackSteps.step7') }} />
            </ol>
            <p className="mt-3 font-semibold text-red-700">
              {t('overview.attackFlowConclusion')}
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
      { title: t('amfiTab.steps.legitimate.step1.title'), desc: t('amfiTab.steps.legitimate.step1.desc') },
      { title: t('amfiTab.steps.legitimate.step2.title'), desc: t('amfiTab.steps.legitimate.step2.desc') },
      { title: t('amfiTab.steps.legitimate.step3.title'), desc: t('amfiTab.steps.legitimate.step3.desc') },
      { title: t('amfiTab.steps.legitimate.step4.title'), desc: t('amfiTab.steps.legitimate.step4.desc') }
    ];

    const maliciousSteps = [
      { title: t('amfiTab.steps.malicious.step1.title'), desc: t('amfiTab.steps.malicious.step1.desc') },
      { title: t('amfiTab.steps.malicious.step2.title'), desc: t('amfiTab.steps.malicious.step2.desc') },
      { title: t('amfiTab.steps.malicious.step3.title'), desc: t('amfiTab.steps.malicious.step3.desc') },
      { title: t('amfiTab.steps.malicious.step4.title'), desc: t('amfiTab.steps.malicious.step4.desc') }
    ];

    const currentSteps = selectedFile === 'legitimate' ? steps : maliciousSteps;

    return (
      <div className="space-y-6">
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            {t('amfiTab.title')}
          </h3>
          <p className="text-sm mb-3">
            {t('amfiTab.description')}
          </p>
          <div className="text-sm bg-alabaster border border-indigo-200 rounded p-3">
            <p className="font-semibold mb-2">{t('amfiTab.components')}</p>
            <ul className="space-y-1 text-gray-700">
              <li>• <code className="bg-gray-100 px-1">AppleMobileFileIntegrity.kext</code> - {t('amfiTab.kernelExt')}</li>
              <li>• <code className="bg-gray-100 px-1">amfid</code> - {t('amfiTab.userDaemon')}</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => { setSelectedFile('legitimate'); setVerificationStep(0); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedFile === 'legitimate'
                ? 'border-green-500 bg-green-50 ring-4 ring-green-200'
                : 'border-gray-300 bg-alabaster hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold">{t('amfiTab.legitimateApp')}</div>
            <div className="text-xs text-gray-600 mt-1">{t('amfiTab.legitimateAppDesc')}</div>
          </button>

          <button
            onClick={() => { setSelectedFile('malicious'); setVerificationStep(0); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedFile === 'malicious'
                ? 'border-red-500 bg-red-50 ring-4 ring-red-200'
                : 'border-gray-300 bg-alabaster hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">⚠️</div>
            <div className="font-semibold">{t('amfiTab.modifiedApp')}</div>
            <div className="text-xs text-gray-600 mt-1">{t('amfiTab.modifiedAppDesc')}</div>
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
              {t('amfiTab.step')} {idx + 1}
            </button>
          ))}
        </div>

        <div className={`bg-alabaster border-2 rounded-lg p-6 ${
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
                <div className="font-semibold">{t('amfiTab.executableFile')}</div>
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
                    : `Hash: x9z8y7w6v5u4... ${t('amfiTab.hashModified')}`}
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
                  {t('amfiTab.verificationTitle')}
                </div>
                <div className="text-xs space-y-1">
                  <div>1. {t('amfiTab.verificationSteps.step1')}</div>
                  <div>2. {t('amfiTab.verificationSteps.step2')}</div>
                  <div>3. {t('amfiTab.verificationSteps.step3')}</div>
                  <div>4. {t('amfiTab.verificationSteps.step4')}</div>
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
                      <span className="font-semibold text-green-800">{t('amfiTab.validSignature')}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">{t('amfiTab.invalidSignature')}</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-700">
                  {selectedFile === 'legitimate' 
                    ? t('amfiTab.validSignatureDesc')
                    : t('amfiTab.invalidSignatureDesc')}
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
                      <span className="font-bold text-blue-800">{t('amfiTab.executionAllowed')}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <span className="font-bold text-red-800">{t('amfiTab.executionDenied')}</span>
                    </>
                  )}
                </div>
                <div className="text-sm">
                  {selectedFile === 'legitimate' 
                    ? `✅ ${t('amfiTab.executionAllowedDesc')}`
                    : `🚫 ${t('amfiTab.executionDeniedDesc')}`}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">{t('amfiTab.howProtects')}</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('amfiTab.protection1') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('amfiTab.protection2') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('amfiTab.protection3') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('amfiTab.protection4') }} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">{t('amfiTab.positionTitle')}</h4>
          <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('amfiTab.positionDesc') }} />
        </div>
      </div>
    );
  };

  const SecureBootTab = () => {
    const [bootStep, setBootStep] = useState(0);
    const [tampered, setTampered] = useState(false);

    const normalBootSteps = [
      {
        title: t('secureBootTab.steps.normal.step1.title'),
        desc: t('secureBootTab.steps.normal.step1.desc'),
        details: t('secureBootTab.steps.normal.step1.details'),
        status: "trusted",
        level: 0
      },
      {
        title: t('secureBootTab.steps.normal.step2.title'),
        desc: t('secureBootTab.steps.normal.step2.desc'),
        details: t('secureBootTab.steps.normal.step2.details'),
        status: "verified",
        level: 1
      },
      {
        title: t('secureBootTab.steps.normal.step3.title'),
        desc: t('secureBootTab.steps.normal.step3.desc'),
        details: t('secureBootTab.steps.normal.step3.details'),
        status: "verified",
        level: 2
      },
      {
        title: t('secureBootTab.steps.normal.step4.title'),
        desc: t('secureBootTab.steps.normal.step4.desc'),
        details: t('secureBootTab.steps.normal.step4.details'),
        status: "verified",
        level: 3
      },
      {
        title: t('secureBootTab.steps.normal.step5.title'),
        desc: t('secureBootTab.steps.normal.step5.desc'),
        details: t('secureBootTab.steps.normal.step5.details'),
        status: "running",
        level: 4
      }
    ];

    const tamperedBootSteps = [
      {
        title: t('secureBootTab.steps.tampered.step1.title'),
        desc: t('secureBootTab.steps.tampered.step1.desc'),
        details: t('secureBootTab.steps.tampered.step1.details'),
        status: "trusted",
        level: 0
      },
      {
        title: t('secureBootTab.steps.tampered.step2.title'),
        desc: t('secureBootTab.steps.tampered.step2.desc'),
        details: t('secureBootTab.steps.tampered.step2.details'),
        status: "failed",
        level: 1
      },
      {
        title: t('secureBootTab.steps.tampered.step3.title'),
        desc: t('secureBootTab.steps.tampered.step3.desc'),
        details: t('secureBootTab.steps.tampered.step3.details'),
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
            {t('secureBootTab.title')}
          </h3>
          <p className="text-sm mb-3">
            {t('secureBootTab.description')}
          </p>
          <div className="text-sm bg-alabaster border border-green-200 rounded p-3">
            <p className="font-semibold mb-2">{t('secureBootTab.fundamentalPrinciple')}</p>
            <p className="text-gray-700 text-xs">
              {t('secureBootTab.fundamentalPrincipleDesc')}
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
                : 'border-gray-300 bg-alabaster hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold">{t('secureBootTab.normalBoot')}</div>
            <div className="text-xs text-gray-600 mt-1">{t('secureBootTab.normalBootDesc')}</div>
          </button>

          <button
            onClick={() => { setTampered(true); setBootStep(0); }}
            className={`p-4 rounded-lg border-2 transition-all ${
              tampered
                ? 'border-red-500 bg-red-50 ring-4 ring-red-200'
                : 'border-gray-300 bg-alabaster hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">⚠️</div>
            <div className="font-semibold">{t('secureBootTab.compromisedBoot')}</div>
            <div className="text-xs text-gray-600 mt-1">{t('secureBootTab.compromisedBootDesc')}</div>
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
              {t('secureBootTab.step')} {idx + 1}
            </button>
          ))}
        </div>

        {/* Visualisation de la chaîne de boot */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('secureBootTab.bootSequence')}</h4>
          
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
                      'bg-alabaster'
                    }`}>
                      {step.details}
                    </div>

                    {isActive && idx < maxSteps - 1 && step.status !== 'failed' && step.status !== 'blocked' && (
                      <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                        🔍 {t('secureBootTab.verifyingSignature')}
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
                  <div className="font-bold text-red-800 mb-2">{t('secureBootTab.bootBlockedTitle')}</div>
                  <div className="text-sm text-gray-700">
                    {t('secureBootTab.bootBlockedDesc')}
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
                  <div className="font-bold text-green-800 mb-2">{t('secureBootTab.bootSuccessTitle')}</div>
                  <div className="text-sm text-gray-700">
                    {t('secureBootTab.bootSuccessDesc')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Informations complémentaires */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">{t('secureBootTab.protectionsTitle')}</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('secureBootTab.protection1') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('secureBootTab.protection2') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('secureBootTab.protection3') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('secureBootTab.protection4') }} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">{t('secureBootTab.foundationTitle')}</h4>
          <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('secureBootTab.foundationDesc') }} />
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
        name: t('codeSigningTab.certificates.development.name'),
        icon: "🔧",
        color: "blue",
        desc: t('codeSigningTab.certificates.development.desc'),
        devices: t('codeSigningTab.certificates.development.devices'),
        duration: t('codeSigningTab.certificates.development.duration'),
        status: "valid"
      },
      adhoc: {
        name: t('codeSigningTab.certificates.adhoc.name'),
        icon: "👥",
        color: "purple",
        desc: t('codeSigningTab.certificates.adhoc.desc'),
        devices: t('codeSigningTab.certificates.adhoc.devices'),
        duration: t('codeSigningTab.certificates.adhoc.duration'),
        status: "valid"
      },
      enterprise: {
        name: t('codeSigningTab.certificates.enterprise.name'),
        icon: "🏢",
        color: "orange",
        desc: t('codeSigningTab.certificates.enterprise.desc'),
        devices: t('codeSigningTab.certificates.enterprise.devices'),
        duration: t('codeSigningTab.certificates.enterprise.duration'),
        status: "valid"
      },
      appstore: {
        name: t('codeSigningTab.certificates.appstore.name'),
        icon: "🏪",
        color: "green",
        desc: t('codeSigningTab.certificates.appstore.desc'),
        devices: t('codeSigningTab.certificates.appstore.devices'),
        duration: t('codeSigningTab.certificates.appstore.duration'),
        status: "valid"
      },
      expired: {
        name: t('codeSigningTab.certificates.expired.name'),
        icon: "⏰",
        color: "red",
        desc: t('codeSigningTab.certificates.expired.desc'),
        devices: t('codeSigningTab.certificates.expired.devices'),
        duration: t('codeSigningTab.certificates.expired.duration'),
        status: "expired"
      }
    };

    const entitlements = {
      sandbox: {
        name: t('codeSigningTab.entitlementsList.sandbox.name'),
        key: "com.apple.security.app-sandbox",
        icon: "🔒",
        required: true,
        desc: t('codeSigningTab.entitlementsList.sandbox.desc')
      },
      icloud: {
        name: t('codeSigningTab.entitlementsList.icloud.name'),
        key: "com.apple.developer.icloud-services",
        icon: "☁️",
        required: false,
        desc: t('codeSigningTab.entitlementsList.icloud.desc')
      },
      healthkit: {
        name: t('codeSigningTab.entitlementsList.healthkit.name'),
        key: "com.apple.developer.healthkit",
        icon: "💪",
        required: false,
        desc: t('codeSigningTab.entitlementsList.healthkit.desc')
      },
      push: {
        name: t('codeSigningTab.entitlementsList.push.name'),
        key: "aps-environment",
        icon: "🔔",
        required: false,
        desc: t('codeSigningTab.entitlementsList.push.desc')
      },
      wallet: {
        name: t('codeSigningTab.entitlementsList.wallet.name'),
        key: "com.apple.developer.pass-type-identifiers",
        icon: "💳",
        required: false,
        desc: t('codeSigningTab.entitlementsList.wallet.desc')
      }
    };

    const signingSteps = [
      {
        title: t('codeSigningTab.signingSteps.step1.title'),
        desc: t('codeSigningTab.signingSteps.step1.desc'),
        icon: "👨‍💻",
        color: "blue"
      },
      {
        title: t('codeSigningTab.signingSteps.step2.title'),
        desc: t('codeSigningTab.signingSteps.step2.desc'),
        icon: "⚙️",
        color: "purple"
      },
      {
        title: t('codeSigningTab.signingSteps.step3.title'),
        desc: t('codeSigningTab.signingSteps.step3.desc'),
        icon: "🔑",
        color: "orange"
      },
      {
        title: t('codeSigningTab.signingSteps.step4.title'),
        desc: t('codeSigningTab.signingSteps.step4.desc'),
        icon: "✍️",
        color: "green"
      },
      {
        title: t('codeSigningTab.signingSteps.step5.title'),
        desc: t('codeSigningTab.signingSteps.step5.desc'),
        icon: "📄",
        color: "indigo"
      },
      {
        title: t('codeSigningTab.signingSteps.step6.title'),
        desc: t('codeSigningTab.signingSteps.step6.desc'),
        icon: "🍎",
        color: "red"
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            {t('codeSigningTab.title')}
          </h3>
          <p className="text-sm mb-3">
            {t('codeSigningTab.description')}
          </p>
          <div className="text-sm bg-alabaster border border-indigo-200 rounded p-3">
            <p className="font-semibold mb-2">{t('codeSigningTab.keyComponents')}</p>
            <ul className="space-y-1 text-gray-700 text-xs">
              <li dangerouslySetInnerHTML={{ __html: `• ${t('codeSigningTab.certificate')}` }} />
              <li dangerouslySetInnerHTML={{ __html: `• ${t('codeSigningTab.provisioningProfile')}` }} />
              <li dangerouslySetInnerHTML={{ __html: `• ${t('codeSigningTab.entitlements')}` }} />
              <li dangerouslySetInnerHTML={{ __html: `• ${t('codeSigningTab.codeSignature')}` }} />
            </ul>
          </div>
        </div>

        {/* Processus de signature */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('codeSigningTab.signingProcessTitle')}</h4>
          
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
                {t('codeSigningTab.step')} {idx + 1}
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
                      <div className="mt-3 p-3 bg-alabaster rounded border border-gray-300 font-mono text-xs">
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
                      <div className="mt-3 p-3 bg-alabaster rounded border border-gray-300">
                        <div className="text-xs font-semibold mb-2">{t('codeSigningTab.profileContent')}</div>
                        <div className="space-y-1 text-xs text-gray-700">
                          <div>• Team ID: ABC123XYZ</div>
                          <div>• Bundle ID: com.example.myapp</div>
                          <div>• {t('codeSigningTab.authorizedDevices')} 5</div>
                          <div>• {t('codeSigningTab.expiration')} 25/12/2026</div>
                          <div>• {t('codeSigningTab.includedEntitlements')} iCloud, HealthKit</div>
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
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('codeSigningTab.certificateTypesTitle')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(certificates).map(([key, cert]) => (
              <button
                key={key}
                onClick={() => setCertificateType(key)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  certificateType === key
                    ? `border-${cert.color}-500 bg-${cert.color}-50 ring-4 ring-${cert.color}-200`
                    : 'border-gray-300 bg-alabaster hover:border-gray-400'
                } ${cert.status === 'expired' ? 'opacity-75' : ''}`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-3xl">{cert.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold flex items-center gap-2">
                      {cert.name}
                      {cert.status === 'expired' && (
                        <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded">{t('codeSigningTab.expiredLabel')}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{cert.desc}</div>
                  </div>
                </div>
                <div className="text-xs space-y-1 mt-3 pt-3 border-t border-gray-200">
                  <div><strong>{t('codeSigningTab.devicesLabel')}</strong> {cert.devices}</div>
                  <div><strong>{t('codeSigningTab.durationLabel')}</strong> {cert.duration}</div>
                </div>
              </button>
            ))}
          </div>

          {certificateType === 'expired' && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold text-red-800 mb-1">{t('codeSigningTab.expiredCertificateTitle')}</div>
                  <div className="text-gray-700">
                    • {t('codeSigningTab.expiredCertificateDesc1')}<br/>
                    • {t('codeSigningTab.expiredCertificateDesc2')}<br/>
                    • {t('codeSigningTab.expiredCertificateDesc3')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Entitlements */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('codeSigningTab.entitlementsTitle')}</h4>
          <p className="text-sm text-gray-600 mb-4">
            {t('codeSigningTab.entitlementsDesc')}
          </p>

          <div className="space-y-2">
            {Object.entries(entitlements).map(([key, ent]) => (
              <div
                key={key}
                onClick={() => setSelectedEntitlement(key)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedEntitlement === key
                    ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-200'
                    : 'border-gray-300 bg-alabaster hover:border-gray-400'
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
                            {t('codeSigningTab.required')}
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
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('codeSigningTab.signedAppAnatomy')}</h4>
          <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-xs space-y-1">
            <div>📱 MyApp.app/</div>
            <div className="ml-4">├── 📄 MyApp <span className="text-gray-500">({t('codeSigningTab.anatomyBinary')})</span></div>
            <div className="ml-4">├── 📋 Info.plist <span className="text-gray-500">({t('codeSigningTab.anatomyMetadata')})</span></div>
            <div className="ml-4">├── 🔐 _CodeSignature/</div>
            <div className="ml-8">│   └── CodeResources <span className="text-gray-500">({t('codeSigningTab.anatomyHashFiles')})</span></div>
            <div className="ml-4">├── 📄 embedded.mobileprovision <span className="text-gray-500">({t('codeSigningTab.anatomyProfile')})</span></div>
            <div className="ml-4">├── 🖼️  Assets.car <span className="text-gray-500">({t('codeSigningTab.anatomyAssets')})</span></div>
            <div className="ml-4">└── 📚 Frameworks/ <span className="text-gray-500">({t('codeSigningTab.anatomyFrameworks')})</span></div>
          </div>
        </div>

        {/* Vérification de signature */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('codeSigningTab.verifySignatureTitle')}</h4>
          
          <button
            onClick={() => setShowVerification(!showVerification)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all mb-4"
          >
            {showVerification ? t('codeSigningTab.hideCommands') : t('codeSigningTab.showCommands')}
          </button>

          {showVerification && (
            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold mb-2">1. {t('codeSigningTab.verifySignature')}</div>
                <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs">
                  <div>$ codesign -dvvv MyApp.app</div>
                  <div className="text-gray-400 mt-2"># Output:</div>
                  <div className="text-white">Executable=/path/to/MyApp.app/MyApp</div>
                  <div className="text-white">Identifier=com.example.myapp</div>
                  <div className="text-white">Authority=iPhone Developer: John Doe</div>
                  <div className="text-white">Signed Time=26 Dec 2025 10:30:00</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold mb-2">2. {t('codeSigningTab.showEntitlements')}</div>
                <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs">
                  <div>$ codesign -d --entitlements - MyApp.app</div>
                  <div className="text-gray-400 mt-2"># Shows all entitlements in XML</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold mb-2">3. {t('codeSigningTab.verifyProvisioningProfile')}</div>
                <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs">
                  <div>$ security cms -D -i MyApp.app/embedded.mobileprovision</div>
                  <div className="text-gray-400 mt-2"># Decodes and shows the profile</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chaîne de certificats */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">{t('codeSigningTab.certificateChainTitle')}</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded border-2 border-blue-300">
              <div className="font-bold text-sm">🍎 {t('codeSigningTab.appleRootCA')}</div>
              <div className="text-xs text-gray-600">{t('codeSigningTab.appleRootCADesc')}</div>
            </div>
            <div className="text-center text-gray-400">⬇️ {t('codeSigningTab.signs')}</div>
            <div className="p-3 bg-purple-50 rounded border-2 border-purple-300">
              <div className="font-bold text-sm">🌐 {t('codeSigningTab.appleWWDRCA')}</div>
              <div className="text-xs text-gray-600">{t('codeSigningTab.appleWWDRCADesc')}</div>
            </div>
            <div className="text-center text-gray-400">⬇️ {t('codeSigningTab.signs')}</div>
            <div className="p-3 bg-green-50 rounded border-2 border-green-300">
              <div className="font-bold text-sm">👤 {t('codeSigningTab.developerCertificate')}</div>
              <div className="text-xs text-gray-600">{t('codeSigningTab.developerCertificateDesc')}</div>
            </div>
            <div className="text-center text-gray-400">⬇️ {t('codeSigningTab.signs')}</div>
            <div className="p-3 bg-indigo-50 rounded border-2 border-indigo-300">
              <div className="font-bold text-sm">📱 {t('codeSigningTab.finalApp')}</div>
              <div className="text-xs text-gray-600">{t('codeSigningTab.finalAppDesc')}</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">{t('codeSigningTab.amfiRelationTitle')}</h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p dangerouslySetInnerHTML={{ __html: t('codeSigningTab.amfiRelationDesc1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('codeSigningTab.amfiRelationDesc2') }} />
            <p className="pt-2 border-t border-blue-200">
              💡 {t('codeSigningTab.amfiRelationConclusion')}
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
        name: t('atsTab.connections.https.name'),
        status: "secure",
        icon: "🔒",
        color: "green",
        details: t('atsTab.connections.https.details')
      },
      httpAllowed: {
        name: t('atsTab.connections.httpAllowed.name'),
        status: "warning",
        icon: "⚠️",
        color: "orange",
        details: t('atsTab.connections.httpAllowed.details')
      },
      httpBlocked: {
        name: t('atsTab.connections.httpBlocked.name'),
        status: "blocked",
        icon: "🚫",
        color: "red",
        details: t('atsTab.connections.httpBlocked.details')
      },
      tls10: {
        name: t('atsTab.connections.tls10.name'),
        status: "blocked",
        icon: "🚫",
        color: "red",
        details: t('atsTab.connections.tls10.details')
      },
      selfsigned: {
        name: t('atsTab.connections.selfsigned.name'),
        status: "blocked",
        icon: "🚫",
        color: "red",
        details: t('atsTab.connections.selfsigned.details')
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
            {t('atsTab.title')}
          </h3>
          <p className="text-sm mb-3">
            {t('atsTab.description')}
          </p>
          <div className="text-sm bg-alabaster border border-blue-200 rounded p-3">
            <p className="font-semibold mb-2">{t('atsTab.defaultRequirements')}</p>
            <ul className="space-y-1 text-gray-700 text-xs">
              <li>• {t('atsTab.requirement1')}</li>
              <li>• {t('atsTab.requirement2')}</li>
              <li>• {t('atsTab.requirement3')}</li>
              <li>• {t('atsTab.requirement4')}</li>
              <li>• {t('atsTab.requirement5')}</li>
            </ul>
          </div>
        </div>

        {/* Sélection du type de connexion */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('atsTab.connectionTypesTitle')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(connections).map(([key, conn]) => (
              <button
                key={key}
                onClick={() => setConnectionType(key)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  connectionType === key
                    ? `border-${conn.color}-500 bg-${conn.color}-50 ring-4 ring-${conn.color}-200`
                    : 'border-gray-300 bg-alabaster hover:border-gray-400'
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
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('atsTab.connectionSimulationTitle')}</h4>
          
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
            <div className="text-sm mb-2">
              <strong>{t('atsTab.appTriesToConnect')}</strong>
            </div>
            <div className="font-mono text-sm bg-alabaster p-2 rounded border border-gray-300">
              {connectionType === 'https' || connectionType === 'tls10' || connectionType === 'selfsigned'
                ? 'https://api.example.com/data'
                : 'http://api.example.com/data'}
            </div>
          </div>

          <button
            onClick={attemptConnection}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            {t('atsTab.attemptConnection')}
          </button>

          {showAttempt && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="font-semibold">{t('atsTab.analysisStep')}</span>
                </div>
                <div className="text-sm text-gray-700">
                  {t('atsTab.analysisDesc')}
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
                      <span className="font-semibold text-green-800">{t('atsTab.connectionAllowed')}</span>
                    </>
                  )}
                  {currentConnection.status === 'warning' && (
                    <>
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-orange-800">{t('atsTab.connectionAllowedException')}</span>
                    </>
                  )}
                  {currentConnection.status === 'blocked' && (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">{t('atsTab.connectionBlocked')}</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-700">
                  {currentConnection.status === 'secure' && (
                    <>✅ {t('atsTab.secureConnectionDesc')}</>
                  )}
                  {currentConnection.status === 'warning' && (
                    <>⚠️ {t('atsTab.warningConnectionDesc')}</>
                  )}
                  {currentConnection.status === 'blocked' && (
                    <>🚫 {t('atsTab.blockedConnectionDesc')}</>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Attaques protégées */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('atsTab.mitmProtectionTitle')}</h4>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="font-semibold mb-2 text-red-800">❌ {t('atsTab.withoutATS')}</div>
              <div className="text-sm text-gray-700 mb-3">
                {t('atsTab.withoutATSDesc')}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-blue-100 px-2 py-1 rounded">📱 App</span>
                <span>→</span>
                <span className="bg-red-200 px-2 py-1 rounded font-semibold">🎭 Attacker</span>
                <span>→</span>
                <span className="bg-gray-100 px-2 py-1 rounded">🖥️ Server</span>
              </div>
            </div>

            <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
              <div className="font-semibold mb-2 text-green-800">✅ {t('atsTab.withATS')}</div>
              <div className="text-sm text-gray-700 mb-3">
                {t('atsTab.withATSDesc')}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-blue-100 px-2 py-1 rounded">📱 App</span>
                <span>→</span>
                <span className="bg-gray-200 px-2 py-1 rounded">🎭 ??? ({t('atsTab.encrypted')})</span>
                <span>→</span>
                <span className="bg-gray-100 px-2 py-1 rounded">🖥️ Serveur</span>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration ATS */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">{t('atsTab.atsConfigTitle')}</h4>
          <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-xs overflow-x-auto">
            <div>{'<key>NSAppTransportSecurity</key>'}</div>
            <div>{'<dict>'}</div>
            <div className="ml-4">{'  <key>NSAllowsArbitraryLoads</key>'}</div>
            <div className="ml-4">{`  <false/> <!-- ${t('atsTab.atsEnabledByDefault')} -->`}</div>
            <div className="ml-4">{'  <key>NSExceptionDomains</key>'}</div>
            <div className="ml-4">{'  <dict>'}</div>
            <div className="ml-8">{'    <key>example.com</key>'}</div>
            <div className="ml-8">{'    <dict>'}</div>
            <div className="ml-12">{'      <key>NSExceptionAllowsInsecureHTTPLoads</key>'}</div>
            <div className="ml-12">{`      <true/> <!-- ${t('atsTab.exceptionForDomain')} -->`}</div>
            <div className="ml-8">{'    </dict>'}</div>
            <div className="ml-4">{'  </dict>'}</div>
            <div>{'</dict>'}</div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">{t('atsTab.complementaryTitle')}</h4>
          <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('atsTab.complementaryDesc') }} />
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
            {t('secureEnclaveTab.title')}
          </h3>
          <p className="text-sm mb-3">
            {t('secureEnclaveTab.description')}
          </p>
          <div className="text-sm bg-alabaster border border-purple-200 rounded p-3">
            <p className="font-semibold mb-2">{t('secureEnclaveTab.responsibilities')}</p>
            <ul className="space-y-1 text-gray-700">
              <li>• {t('secureEnclaveTab.responsibility1')}</li>
              <li>• {t('secureEnclaveTab.responsibility2')}</li>
              <li>• {t('secureEnclaveTab.responsibility3')}</li>
              <li>• {t('secureEnclaveTab.responsibility4')}</li>
            </ul>
          </div>
        </div>

        {/* Architecture visuelle */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('secureEnclaveTab.architectureTitle')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Processeur principal */}
            <div className="p-4 rounded-lg border-2 border-blue-300 bg-blue-50">
              <div className="font-semibold mb-3 flex items-center gap-2">
                💻 {t('secureEnclaveTab.mainProcessor')}
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-alabaster rounded border border-blue-200">
                  <div className="font-semibold text-xs mb-1">{t('secureEnclaveTab.iosApps')}</div>
                  <div className="text-xs text-gray-600">{t('secureEnclaveTab.iosAppsDesc')}</div>
                </div>
                <div className="p-2 bg-alabaster rounded border border-blue-200">
                  <div className="font-semibold text-xs mb-1">{t('secureEnclaveTab.kernel')}</div>
                  <div className="text-xs text-gray-600">{t('secureEnclaveTab.kernelDesc')}</div>
                </div>
                <div className="text-xs text-center text-gray-500 py-1">
                  ⬇️ {t('secureEnclaveTab.secureCommunication')} ⬇️
                </div>
              </div>
            </div>

            {/* Secure Enclave */}
            <div className="p-4 rounded-lg border-2 border-purple-400 bg-purple-50 relative">
              <div className="absolute top-2 right-2">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="font-semibold mb-3 flex items-center gap-2">
                🔒 {t('secureEnclaveTab.secureEnclaveIsolated')}
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-alabaster rounded border-2 border-purple-300">
                  <div className="font-semibold text-xs mb-1">{t('secureEnclaveTab.sepOS')}</div>
                  <div className="text-xs text-gray-600">{t('secureEnclaveTab.sepOSDesc')}</div>
                </div>
                <div className="p-2 bg-purple-100 rounded border-2 border-purple-300">
                  <div className="font-semibold text-xs mb-1">🔑 {t('secureEnclaveTab.cryptoKeys')}</div>
                  <div className="text-xs text-gray-600">{t('secureEnclaveTab.cryptoKeysDesc')}</div>
                </div>
                <div className="p-2 bg-purple-100 rounded border-2 border-purple-300">
                  <div className="font-semibold text-xs mb-1">👤 {t('secureEnclaveTab.biometricData')}</div>
                  <div className="text-xs text-gray-600">{t('secureEnclaveTab.biometricDataDesc')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation biométrique */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('secureEnclaveTab.faceIdSimulation')}</h4>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => performBiometric('valid')}
                disabled={operation !== 'idle'}
                className="flex-1 p-4 bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-3xl mb-2">✅</div>
                <div className="font-semibold">{t('secureEnclaveTab.authorizedFace')}</div>
                <div className="text-xs text-gray-600">{t('secureEnclaveTab.authorizedFaceDesc')}</div>
              </button>

              <button
                onClick={() => performBiometric('invalid')}
                disabled={operation !== 'idle'}
                className="flex-1 p-4 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-3xl mb-2">❌</div>
                <div className="font-semibold">{t('secureEnclaveTab.unauthorizedFace')}</div>
                <div className="text-xs text-gray-600">{t('secureEnclaveTab.unauthorizedFaceDesc')}</div>
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
                        <span className="font-semibold">{t('secureEnclaveTab.step1Title')}</span>
                      </>
                    )}
                    {operation !== 'processing' && (
                      <>
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                        <span className="font-semibold">{t('secureEnclaveTab.step1Title')}</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-700">
                    {t('secureEnclaveTab.step1Desc')}
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
                          <span className="font-semibold">{t('secureEnclaveTab.step2Title')}</span>
                        </>
                      )}
                      {operation !== 'processing' && (
                        <>
                          <CheckCircle className="w-5 h-5 text-gray-600" />
                          <span className="font-semibold">{t('secureEnclaveTab.step2Title')}</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      {t('secureEnclaveTab.step2Desc')}
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
                          <span className="font-semibold text-green-800">{t('secureEnclaveTab.authSuccess')}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-800">{t('secureEnclaveTab.authFailed')}</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      {operation === 'success' 
                        ? `✅ ${t('secureEnclaveTab.authSuccessDesc')}`
                        : `🚫 ${t('secureEnclaveTab.authFailedDesc')}`}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Avantages de sécurité */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">{t('secureEnclaveTab.protectionsTitle')}</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('secureEnclaveTab.protection1') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('secureEnclaveTab.protection2') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('secureEnclaveTab.protection3') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('secureEnclaveTab.protection4') }} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">{t('secureEnclaveTab.whyCrucialTitle')}</h4>
          <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t('secureEnclaveTab.whyCrucialDesc') }} />
        </div>
      </div>
    );
  };

  const DataProtectionTab = () => {
    const [deviceState, setDeviceState] = useState('locked');
    const [selectedFile, setSelectedFile] = useState(null);

    const files = {
      complete: {
        name: t('dataProtectionTab.files.complete.name'),
        protection: "Complete",
        icon: "💬",
        desc: t('dataProtectionTab.files.complete.desc')
      },
      unlessOpen: {
        name: t('dataProtectionTab.files.unlessOpen.name'),
        protection: "CompleteUnlessOpen",
        icon: "📄",
        desc: t('dataProtectionTab.files.unlessOpen.desc')
      },
      firstUnlock: {
        name: t('dataProtectionTab.files.firstUnlock.name'),
        protection: "CompleteUntilFirstUserAuth",
        icon: "📧",
        desc: t('dataProtectionTab.files.firstUnlock.desc')
      },
      none: {
        name: t('dataProtectionTab.files.none.name'),
        protection: "None",
        icon: "📦",
        desc: t('dataProtectionTab.files.none.desc')
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
            {t('dataProtectionTab.title')}
          </h3>
          <p className="text-sm mb-3">
            {t('dataProtectionTab.description')}
          </p>
          <div className="text-sm bg-alabaster border border-blue-200 rounded p-3">
            <p className="font-semibold mb-2">{t('dataProtectionTab.encryptionArchitecture')}</p>
            <div className="space-y-1 text-gray-700 text-xs">
              <div dangerouslySetInnerHTML={{ __html: `1. ${t('dataProtectionTab.hardwareKey')}` }} />
              <div dangerouslySetInnerHTML={{ __html: `2. ${t('dataProtectionTab.classKey')}` }} />
              <div dangerouslySetInnerHTML={{ __html: `3. ${t('dataProtectionTab.fileKey')}` }} />
            </div>
          </div>
        </div>

        {/* Contrôle état appareil */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('dataProtectionTab.deviceStateTitle')}</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeviceState('boot')}
              className={`p-3 rounded-lg border-2 transition-all ${
                deviceState === 'boot'
                  ? 'border-red-500 bg-red-50 ring-4 ring-red-200'
                  : 'border-gray-300 bg-alabaster hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🔴</div>
              <div className="font-semibold text-sm">{t('dataProtectionTab.afterBoot')}</div>
              <div className="text-xs text-gray-600">{t('dataProtectionTab.afterBootDesc')}</div>
            </button>

            <button
              onClick={() => setDeviceState('locked')}
              className={`p-3 rounded-lg border-2 transition-all ${
                deviceState === 'locked'
                  ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-200'
                  : 'border-gray-300 bg-alabaster hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🔒</div>
              <div className="font-semibold text-sm">{t('dataProtectionTab.locked')}</div>
              <div className="text-xs text-gray-600">{t('dataProtectionTab.lockedDesc')}</div>
            </button>

            <button
              onClick={() => setDeviceState('unlocked')}
              className={`p-3 rounded-lg border-2 transition-all ${
                deviceState === 'unlocked'
                  ? 'border-green-500 bg-green-50 ring-4 ring-green-200'
                  : 'border-gray-300 bg-alabaster hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🔓</div>
              <div className="font-semibold text-sm">{t('dataProtectionTab.unlocked')}</div>
              <div className="text-xs text-gray-600">{t('dataProtectionTab.unlockedDesc')}</div>
            </button>

            <button
              onClick={() => setDeviceState('locked-but-open')}
              className={`p-3 rounded-lg border-2 transition-all ${
                deviceState === 'locked-but-open'
                  ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-200'
                  : 'border-gray-300 bg-alabaster hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🔐</div>
              <div className="font-semibold text-sm">{t('dataProtectionTab.lockedButOpen')}</div>
              <div className="text-xs text-gray-600">{t('dataProtectionTab.lockedButOpenDesc')}</div>
            </button>
          </div>
        </div>

        {/* Classes de protection */}
        <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6">
          <h4 className="font-bold mb-4">{t('dataProtectionTab.filesTitle')}</h4>
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
                      <span className="text-green-700">✅ {t('dataProtectionTab.accessible')}</span>
                    ) : (
                      <span className="text-red-700">🔒 {t('dataProtectionTab.notAccessible')}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schéma de chiffrement */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-3 text-sm">{t('dataProtectionTab.keyDerivationTitle')}</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-alabaster rounded border border-gray-300">
              <div className="font-semibold mb-1">1. {t('dataProtectionTab.hardwareKeyUID')}</div>
              <div className="text-xs text-gray-600">
                {t('dataProtectionTab.hardwareKeyUIDDesc')}
              </div>
            </div>
            <div className="text-center text-gray-400">+</div>
            <div className="p-3 bg-alabaster rounded border border-gray-300">
              <div className="font-semibold mb-1">2. {t('dataProtectionTab.userCode')}</div>
              <div className="text-xs text-gray-600">
                {t('dataProtectionTab.userCodeDesc')}
              </div>
            </div>
            <div className="text-center text-gray-400">=</div>
            <div className="p-3 bg-green-50 rounded border-2 border-green-300">
              <div className="font-semibold mb-1">3. {t('dataProtectionTab.derivedClassKey')}</div>
              <div className="text-xs text-gray-600">
                {t('dataProtectionTab.derivedClassKeyDesc')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">{t('dataProtectionTab.attackProtectionTitle')}</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('dataProtectionTab.attackProtection1') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('dataProtectionTab.attackProtection2') }} />
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: t('dataProtectionTab.attackProtection3') }} />
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
      malicious: { name: t('sandboxTab.maliciousApp'), color: "red", icon: "⚠️" },
      photos: { name: t('sandboxTab.photos'), color: "blue", icon: "📷" },
      contacts: { name: t('sandboxTab.contacts'), color: "green", icon: "👥" },
      files: { name: t('sandboxTab.files'), color: "purple", icon: "📁" }
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
            {t('sandboxTab.title')}
          </h3>
          <p className="text-sm text-gray-700">
            {t('sandboxTab.description')}
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
                  : 'border-gray-300 bg-alabaster hover:border-gray-400'
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
          <div className="bg-alabaster border-2 border-red-300 rounded-lg p-6">
            <h4 className="font-bold mb-4 text-red-700">
              {t('sandboxTab.accessAttemptsTitle')}
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => attemptAccess('photos')}
                className="w-full p-3 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg text-left transition-all"
              >
                <div className="font-semibold">{t('sandboxTab.accessPhotos')}</div>
                <div className="text-xs text-gray-600">{t('sandboxTab.accessPhotosPath')}</div>
              </button>
              <button
                onClick={() => attemptAccess('contacts')}
                className="w-full p-3 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg text-left transition-all"
              >
                <div className="font-semibold">{t('sandboxTab.accessContacts')}</div>
                <div className="text-xs text-gray-600">{t('sandboxTab.accessContactsPath')}</div>
              </button>
              <button
                onClick={() => attemptAccess('system')}
                className="w-full p-3 bg-red-100 hover:bg-red-200 border-2 border-red-300 rounded-lg text-left transition-all"
              >
                <div className="font-semibold">{t('sandboxTab.modifySystemFiles')}</div>
                <div className="text-xs text-gray-600">{t('sandboxTab.modifySystemFilesPath')}</div>
              </button>
            </div>
          </div>
        )}

        {accessAttempt && (
          <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-red-800 mb-1">{t('sandboxTab.accessDeniedTitle')}</div>
                <div className="text-sm text-gray-700">
                  {accessAttempt === 'photos' ? t('sandboxTab.accessDeniedPhotos') : accessAttempt === 'contacts' ? t('sandboxTab.accessDeniedContacts') : t('sandboxTab.accessDeniedSystem')}
                  {' '}{t('sandboxTab.accessDeniedDesc')}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">{t('sandboxTab.restrictionsTitle')}</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• {t('sandboxTab.restriction1')}</li>
            <li dangerouslySetInnerHTML={{ __html: `• ${t('sandboxTab.restriction2')}` }} />
            <li dangerouslySetInnerHTML={{ __html: `• ${t('sandboxTab.restriction3')}` }} />
            <li dangerouslySetInnerHTML={{ __html: `• ${t('sandboxTab.restriction4')}` }} />
            <li dangerouslySetInnerHTML={{ __html: `• ${t('sandboxTab.restriction5')}` }} />
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
          <span>{t('aslrTab.previous')} {prevAddress}</span>
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
      { title: t('xnBitTab.steps.step1.title'), desc: t('xnBitTab.steps.step1.desc') },
      { title: t('xnBitTab.steps.step2.title'), desc: t('xnBitTab.steps.step2.desc') },
      { title: t('xnBitTab.steps.step3.title'), desc: t('xnBitTab.steps.step3.desc') },
      { title: t('xnBitTab.steps.step4.title'), desc: t('xnBitTab.steps.step4.desc') }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            {t('xnBitTab.title')}
          </h3>
          <p className="text-sm mb-4">
            {t('xnBitTab.description')}
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
                {t('xnBitTab.step')} {idx + 1}
              </button>
            ))}
          </div>

          <div className="bg-alabaster border-2 border-gray-300 rounded-lg p-6 min-h-64">
            <h4 className="font-bold mb-2">{steps[attackStep].title}</h4>
            <p className="text-sm mb-6 text-gray-600">{steps[attackStep].desc}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-2 transition-all ${
                attackStep === 0 ? 'border-green-300 bg-green-50' : 
                attackStep === 3 ? 'border-gray-300 bg-gray-100' :
                'border-blue-300 bg-blue-50'
              }`}>
                <div className="font-semibold mb-2 flex items-center gap-2">
                  {t('xnBitTab.codeZone')}
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
                  {t('xnBitTab.dataZone')}
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
                  <strong>{t('xnBitTab.detection')}</strong> {t('xnBitTab.detectionDesc')}
                </div>
              </div>
            )}

            {attackStep === 3 && (
              <div className="mt-4 p-3 bg-red-50 border-2 border-red-300 rounded flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong>{t('xnBitTab.protectionActivated')}</strong> {t('xnBitTab.protectionActivatedDesc')}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">{t('xnBitTab.memoryZonesTitle')}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span dangerouslySetInnerHTML={{ __html: t('xnBitTab.codeExecutable') }} />
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span dangerouslySetInnerHTML={{ __html: t('xnBitTab.stackNonExecutable') }} />
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span dangerouslySetInnerHTML={{ __html: t('xnBitTab.heapNonExecutable') }} />
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span dangerouslySetInnerHTML={{ __html: t('xnBitTab.dataNonExecutable') }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-silken to-alabaster p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-alabaster rounded-xl shadow-lg p-8">
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
              {t('tabs.secureboot')}
            </button>
            <button
              onClick={() => setActiveTab('secureenclave')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'secureenclave'
                  ? 'border-b-4 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.secureenclave')}
            </button>
            <button
              onClick={() => setActiveTab('dataprotection')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'dataprotection'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.dataprotection')}
            </button>
            <button
              onClick={() => setActiveTab('codesigning')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'codesigning'
                  ? 'border-b-4 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.codesigning')}
            </button>
            <button
              onClick={() => setActiveTab('amfi')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'amfi'
                  ? 'border-b-4 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.amfi')}
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'sandbox'
                  ? 'border-b-4 border-green-600 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.sandbox')}
            </button>
            <button
              onClick={() => setActiveTab('aslr')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'aslr'
                  ? 'border-b-4 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.aslr')}
            </button>
            <button
              onClick={() => setActiveTab('xn')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'xn'
                  ? 'border-b-4 border-orange-600 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.xn')}
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`px-3 py-3 font-semibold transition-all whitespace-nowrap text-xs ${
                activeTab === 'ats'
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t('tabs.ats')}
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
                  {t('aslrTab.title')}
                </h3>
                <p className="text-sm text-gray-700">
                  {t('aslrTab.description')}
                </p>
              </div>

              <button
                onClick={handleRefresh}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                {t('aslrTab.newExecution')}
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MemoryBlock
                  label={t('aslrTab.stack')}
                  address={addresses.stack}
                  prevAddress={previousAddresses?.stack}
                  color="border-purple-300 bg-purple-50"
                />
                <MemoryBlock
                  label={t('aslrTab.heap')}
                  address={addresses.heap}
                  prevAddress={previousAddresses?.heap}
                  color="border-green-300 bg-green-50"
                />
                <MemoryBlock
                  label={t('aslrTab.code')}
                  address={addresses.code}
                  prevAddress={previousAddresses?.code}
                  color="border-blue-300 bg-blue-50"
                />
                <MemoryBlock
                  label={t('aslrTab.libraries')}
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
                      <p className="font-semibold text-green-800 mb-1">{t('aslrTab.protectionActive')}</p>
                      <p className="text-sm text-gray-700">
                        {t('aslrTab.protectionActiveDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm">{t('aslrTab.whyImportantTitle')}</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {t('aslrTab.whyImportant1')}</li>
                  <li>• {t('aslrTab.whyImportant2')}</li>
                  <li>• {t('aslrTab.whyImportant3')}</li>
                  <li>• {t('aslrTab.whyImportant4')}</li>
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