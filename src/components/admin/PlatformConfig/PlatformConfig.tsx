'use client';

import { useState, memo, useCallback } from 'react';
import Button from '@/components/ui/Button';
import { FloppyDisk, ArrowClockwise } from 'phosphor-react';
import GeneralSettings from './GeneralSettings';
import CreditsSettings from './CreditsSettings';
import LinkedInSettings from './LinkedInSettings';
import SecuritySettings from './SecuritySettings';
import ApiSettings from './ApiSettings';
import MaintenanceSettings from './MaintenanceSettings';
import { PlatformConfigData } from './types';
import { defaultConfig } from './defaultConfig';

function PlatformConfig() {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<PlatformConfigData>(defaultConfig);
  const [activeSection, setActiveSection] = useState('general');

  const handleConfigChange = useCallback((field: keyof PlatformConfigData, value: string | number | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    
    // TODO: Implement actual save functionality
    setTimeout(() => {
      setIsLoading(false);
      alert('Configuration sauvegardée avec succès !');
    }, 2000);
  };

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser la configuration ?')) {
      setConfig(defaultConfig);
    }
  };

  const sections = [
    { id: 'general', title: 'Général', component: GeneralSettings },
    { id: 'credits', title: 'Crédits', component: CreditsSettings },
    { id: 'linkedin', title: 'LinkedIn', component: LinkedInSettings },
    { id: 'security', title: 'Sécurité', component: SecuritySettings },
    { id: 'api', title: 'API', component: ApiSettings },
    { id: 'maintenance', title: 'Maintenance', component: MaintenanceSettings }
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || GeneralSettings;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Configuration de la Plateforme</h1>
        <p className="text-gray">Gérez tous les paramètres système d&apos;Automya</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation latérale */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray/20 p-4">
            <h3 className="font-semibold text-black mb-4">Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'text-gray hover:bg-gray/10 hover:text-black'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-gray/10 space-y-2">
              <Button
                onClick={handleSave}
                loading={isLoading}
                className="w-full text-sm"
                size="sm"
              >
                <FloppyDisk size={16} className="mr-2" />
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full text-sm"
                size="sm"
              >
                <ArrowClockwise size={16} className="mr-2" />
                Réinitialiser
              </Button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray/20 p-8">
            <ActiveComponent
              config={config}
              onChange={handleConfigChange}
            />
          </div>
        </div>
      </div>

      {/* Footer avec statut */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4 flex items-center justify-between">
        <div className="text-sm text-gray">
          Dernière modification : {new Date().toLocaleString('fr-FR')}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray">Système opérationnel</span>
          </div>
          {config.maintenanceMode && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-600">Mode maintenance</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(PlatformConfig);