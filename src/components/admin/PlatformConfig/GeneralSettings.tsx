'use client';

import { memo } from 'react';
import Input from '@/components/ui/Input';
import { Globe, Envelope, Users } from 'phosphor-react';
import { PlatformConfigData } from './types';

interface GeneralSettingsProps {
  config: PlatformConfigData;
  onChange: (field: keyof PlatformConfigData, value: any) => void;
}

const GeneralSettings = memo(function GeneralSettings({ config, onChange }: GeneralSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Globe size={20} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Paramètres généraux</h3>
          <p className="text-sm text-gray">Configuration de base de la plateforme</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Nom de la plateforme
          </label>
          <Input
            value={config.platformName}
            onChange={(e) => onChange('platformName', e.target.value)}
            placeholder="Ex: Automya"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            URL de la plateforme
          </label>
          <Input
            value={config.platformUrl}
            onChange={(e) => onChange('platformUrl', e.target.value)}
            placeholder="Ex: https://automya.fr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Email de support
          </label>
          <Input
            type="email"
            value={config.supportEmail}
            onChange={(e) => onChange('supportEmail', e.target.value)}
            placeholder="Ex: support@automya.fr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Max utilisateurs par vendeur
          </label>
          <Input
            type="number"
            min="1"
            max="10000"
            value={config.maxUsersPerSeller}
            onChange={(e) => onChange('maxUsersPerSeller', parseInt(e.target.value) || 0)}
            placeholder="Ex: 500"
          />
          <p className="text-xs text-gray mt-1">
            Nombre maximum d&apos;utilisateurs qu&apos;un vendeur peut gérer
          </p>
        </div>
      </div>
    </div>
  );
});

export default GeneralSettings;