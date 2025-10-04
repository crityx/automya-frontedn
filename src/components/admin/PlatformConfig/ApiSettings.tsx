'use client';

import { memo, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Key, Eye, EyeSlash, Shield, Globe, CreditCard } from 'phosphor-react';
import { PlatformConfigData } from './types';

interface ApiSettingsProps {
  config: PlatformConfigData;
  onChange: (field: keyof PlatformConfigData, value: string | number | boolean) => void;
}

const ApiSettings = memo(function ApiSettings({ config, onChange }: ApiSettingsProps) {
  const [showKeys, setShowKeys] = useState({
    linkedin: false,
    openai: false,
    stripe: false
  });

  const toggleKeyVisibility = (key: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const maskKey = (key: string) => {
    if (key.length <= 4) return key;
    return key.substring(0, 4) + '•'.repeat(Math.max(0, key.length - 8)) + key.substring(key.length - 4);
  };

  const testConnection = (service: string) => {
    // TODO: Implement API connection test
    alert(`Test de connexion ${service} - Fonctionnalité à implémenter`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Key size={20} className="text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">API & Intégrations</h3>
          <p className="text-sm text-gray">Configuration des clés API et services externes</p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Shield size={16} className="text-red-600" />
          <h4 className="font-medium text-red-900">Sécurité des clés API</h4>
        </div>
        <p className="text-sm text-red-800">
          Ces clés sont sensibles et donnent accès à vos services. 
          Ne les partagez jamais et changez-les régulièrement.
        </p>
      </div>

      <div className="space-y-6">
        {/* LinkedIn API */}
        <div className="bg-white border border-gray/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe size={16} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-black">LinkedIn API</h4>
                <p className="text-sm text-gray">Connexion et automation LinkedIn</p>
              </div>
            </div>
            <Button
              onClick={() => testConnection('LinkedIn')}
              size="sm"
              variant="outline"
            >
              Tester
            </Button>
          </div>
          
          <div className="relative">
            <Input
              type={showKeys.linkedin ? 'text' : 'password'}
              value={showKeys.linkedin ? config.linkedinApiKey : maskKey(config.linkedinApiKey)}
              onChange={(e) => onChange('linkedinApiKey', e.target.value)}
              placeholder="sk-linkedin-api-key-xxxxxxxxxx"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => toggleKeyVisibility('linkedin')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray hover:text-black"
            >
              {showKeys.linkedin ? <EyeSlash size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* OpenAI API */}
        <div className="bg-white border border-gray/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Key size={16} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-black">OpenAI API</h4>
                <p className="text-sm text-gray">Génération de contenu IA</p>
              </div>
            </div>
            <Button
              onClick={() => testConnection('OpenAI')}
              size="sm"
              variant="outline"
            >
              Tester
            </Button>
          </div>
          
          <div className="relative">
            <Input
              type={showKeys.openai ? 'text' : 'password'}
              value={showKeys.openai ? config.openaiApiKey : maskKey(config.openaiApiKey)}
              onChange={(e) => onChange('openaiApiKey', e.target.value)}
              placeholder="sk-openai-xxxxxxxxxxxxxxxxxx"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => toggleKeyVisibility('openai')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray hover:text-black"
            >
              {showKeys.openai ? <EyeSlash size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Stripe API */}
        <div className="bg-white border border-gray/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard size={16} className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-black">Stripe API</h4>
                <p className="text-sm text-gray">Paiements et facturation</p>
              </div>
            </div>
            <Button
              onClick={() => testConnection('Stripe')}
              size="sm"
              variant="outline"
            >
              Tester
            </Button>
          </div>
          
          <div className="relative">
            <Input
              type={showKeys.stripe ? 'text' : 'password'}
              value={showKeys.stripe ? config.stripeApiKey : maskKey(config.stripeApiKey)}
              onChange={(e) => onChange('stripeApiKey', e.target.value)}
              placeholder="sk_live_xxxxxxxxxxxxxxxxxx"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => toggleKeyVisibility('stripe')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray hover:text-black"
            >
              {showKeys.stripe ? <EyeSlash size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Bonnes pratiques</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Utilisez des clés différentes pour test et production</li>
          <li>• Changez vos clés API tous les 3-6 mois</li>
          <li>• Surveillez l&apos;utilisation de vos APIs</li>
          <li>• Révoque immédiatement les clés compromises</li>
        </ul>
      </div>
    </div>
  );
});

export default ApiSettings;