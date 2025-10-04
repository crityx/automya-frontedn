'use client';

import { memo } from 'react';
import Input from '@/components/ui/Input';
import { CreditCard, Gift } from 'phosphor-react';
import { PlatformConfigData } from './types';

interface CreditsSettingsProps {
  config: PlatformConfigData;
  onChange: (field: keyof PlatformConfigData, value: any) => void;
}

const CreditsSettings = memo(function CreditsSettings({ config, onChange }: CreditsSettingsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <CreditCard size={20} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Paramètres des crédits</h3>
          <p className="text-sm text-gray">Configuration du système de crédits et tarification</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Gift size={16} className="text-blue-600" />
          <h4 className="font-medium text-blue-900">Crédits par défaut</h4>
        </div>
        <p className="text-sm text-blue-800">
          Nombre de crédits accordés automatiquement aux nouveaux utilisateurs selon leur plan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Plan Gratuit
          </label>
          <Input
            type="number"
            min="0"
            max="1000"
            value={config.defaultCredits}
            onChange={(e) => onChange('defaultCredits', parseInt(e.target.value) || 0)}
            placeholder="Ex: 50"
          />
          <p className="text-xs text-gray mt-1">Crédits gratuits</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Plan Premium
          </label>
          <Input
            type="number"
            min="0"
            max="10000"
            value={config.premiumCredits}
            onChange={(e) => onChange('premiumCredits', parseInt(e.target.value) || 0)}
            placeholder="Ex: 500"
          />
          <p className="text-xs text-gray mt-1">Crédits mensuels</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Plan Enterprise
          </label>
          <Input
            type="number"
            min="0"
            max="100000"
            value={config.enterpriseCredits}
            onChange={(e) => onChange('enterpriseCredits', parseInt(e.target.value) || 0)}
            placeholder="Ex: 2000"
          />
          <p className="text-xs text-gray mt-1">Crédits mensuels</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Prix par crédit
          </label>
          <div className="relative">
            <Input
              type="number"
              min="0"
              max="10"
              step="0.01"
              value={config.creditPrice}
              onChange={(e) => onChange('creditPrice', parseFloat(e.target.value) || 0)}
              placeholder="Ex: 0.10"
              className="pr-8"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray text-sm">
              €
            </div>
          </div>
          <p className="text-xs text-gray mt-1">
            Prix: {formatCurrency(config.creditPrice)}
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Commissions des vendeurs</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-yellow-900 mb-2">
              Commission par défaut
            </label>
            <div className="relative">
              <Input
                type="number"
                min="0"
                max="100"
                value={config.defaultCommission}
                onChange={(e) => onChange('defaultCommission', parseInt(e.target.value) || 0)}
                placeholder="Ex: 15"
                className="pr-8"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray text-sm">
                %
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-900 mb-2">
              Commission Premium
            </label>
            <div className="relative">
              <Input
                type="number"
                min="0"
                max="100"
                value={config.premiumCommission}
                onChange={(e) => onChange('premiumCommission', parseInt(e.target.value) || 0)}
                placeholder="Ex: 18"
                className="pr-8"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray text-sm">
                %
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-900 mb-2">
              Top vendeur
            </label>
            <div className="relative">
              <Input
                type="number"
                min="0"
                max="100"
                value={config.topSellerCommission}
                onChange={(e) => onChange('topSellerCommission', parseInt(e.target.value) || 0)}
                placeholder="Ex: 20"
                className="pr-8"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray text-sm">
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreditsSettings;