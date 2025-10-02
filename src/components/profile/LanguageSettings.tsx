'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Globe, Check } from 'lucide-react';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    supported: true
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    supported: true
  },
  {
    code: 'es',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇪🇸',
    supported: false
  },
  {
    code: 'de',
    name: 'Deutsch',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    supported: false
  },
  {
    code: 'it',
    name: 'Italiano',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    supported: false
  },
  {
    code: 'pt',
    name: 'Português',
    nativeName: 'Português',
    flag: '🇵🇹',
    supported: false
  }
];

const timeZones = [
  { value: 'Europe/Paris', label: 'Paris (GMT+1)' },
  { value: 'Europe/London', label: 'Londres (GMT+0)' },
  { value: 'America/New_York', label: 'New York (GMT-5)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-8)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },
  { value: 'Australia/Sydney', label: 'Sydney (GMT+10)' }
];

const dateFormats = [
  { value: 'DD/MM/YYYY', label: '31/12/2024 (DD/MM/YYYY)' },
  { value: 'MM/DD/YYYY', label: '12/31/2024 (MM/DD/YYYY)' },
  { value: 'YYYY-MM-DD', label: '2024-12-31 (YYYY-MM-DD)' },
  { value: 'DD MMM YYYY', label: '31 Déc 2024 (DD MMM YYYY)' }
];

export default function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [selectedTimeZone, setSelectedTimeZone] = useState('Europe/Paris');
  const [selectedDateFormat, setSelectedDateFormat] = useState('DD/MM/YYYY');
  const [saving, setSaving] = useState(false);

  const handleSaveChanges = async () => {
    setSaving(true);
    
    // Simuler une sauvegarde
    setTimeout(() => {
      setSaving(false);
      alert('Paramètres de langue sauvegardés !');
    }, 1000);
  };

  const requestLanguage = (languageCode: string) => {
    alert(`Demande envoyée pour ajouter ${languages.find(l => l.code === languageCode)?.name} !`);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Langue et région</h1>
        <p className="text-gray">Personnalisez l'affichage selon vos préférences</p>
      </div>

      <div className="space-y-8">
        {/* Language Selection */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-black">Langue de l'interface</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((language) => (
              <div
                key={language.code}
                onClick={() => language.supported && setSelectedLanguage(language.code)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  !language.supported
                    ? 'border-gray/20 bg-gray-50 cursor-not-allowed opacity-60'
                    : selectedLanguage === language.code
                    ? 'border-primary bg-primary/5 cursor-pointer'
                    : 'border-gray/20 hover:border-gray/40 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h3 className="font-medium text-black">{language.name}</h3>
                      <p className="text-sm text-gray">{language.nativeName}</p>
                    </div>
                  </div>
                  
                  {language.supported ? (
                    selectedLanguage === language.code && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        requestLanguage(language.code);
                      }}
                      className="text-xs px-2 py-1"
                    >
                      Demander
                    </Button>
                  )}
                </div>

                {!language.supported && (
                  <p className="text-xs text-gray mt-2">Bientôt disponible</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Regional Settings */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Paramètres régionaux</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Time Zone */}
            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Fuseau horaire
              </label>
              <select
                value={selectedTimeZone}
                onChange={(e) => setSelectedTimeZone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              >
                {timeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray mt-2">
                Heure actuelle : {new Date().toLocaleTimeString('fr-FR')}
              </p>
            </div>

            {/* Date Format */}
            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Format de date
              </label>
              <select
                value={selectedDateFormat}
                onChange={(e) => setSelectedDateFormat(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              >
                {dateFormats.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray mt-2">
                Exemple : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>

        {/* Translation Preferences */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <h2 className="text-xl font-semibold text-black mb-6">Préférences de traduction</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-black">Traduction automatique des contenus</h3>
                <p className="text-sm text-gray">Traduire automatiquement les posts générés</p>
              </div>
              <button className="relative inline-flex w-11 h-6 rounded-full bg-primary">
                <span className="inline-block w-4 h-4 bg-white rounded-full transform translate-x-6 mt-1" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-black">Correction grammaticale</h3>
                <p className="text-sm text-gray">Corriger automatiquement la grammaire dans votre langue</p>
              </div>
              <button className="relative inline-flex w-11 h-6 rounded-full bg-primary">
                <span className="inline-block w-4 h-4 bg-white rounded-full transform translate-x-6 mt-1" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-black">Suggestions de style local</h3>
                <p className="text-sm text-gray">Adapter le style d'écriture à votre région</p>
              </div>
              <button className="relative inline-flex w-11 h-6 rounded-full bg-gray/30">
                <span className="inline-block w-4 h-4 bg-white rounded-full transform translate-x-1 mt-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveChanges}
            loading={saving}
            size="lg"
            className="px-8"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
          </Button>
        </div>
      </div>
    </div>
  );
}