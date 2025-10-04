'use client';

import { memo } from 'react';
import Input from '@/components/ui/Input';
import { Shield, Key, Clock, Lock } from 'phosphor-react';
import { PlatformConfigData } from './types';

interface SecuritySettingsProps {
  config: PlatformConfigData;
  onChange: (field: keyof PlatformConfigData, value: string | number | boolean) => void;
}

const SecuritySettings = memo(function SecuritySettings({ config, onChange }: SecuritySettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <Shield size={20} className="text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Paramètres de sécurité</h3>
          <p className="text-sm text-gray">Configuration de la sécurité et de l&apos;authentification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray" />
              <span>Durée de session (heures)</span>
            </div>
          </label>
          <Input
            type="number"
            min="1"
            max="168"
            value={config.sessionTimeout}
            onChange={(e) => onChange('sessionTimeout', parseInt(e.target.value) || 0)}
            placeholder="Ex: 24"
          />
          <p className="text-xs text-gray mt-1">
            Temps avant déconnexion automatique
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            <div className="flex items-center space-x-2">
              <Lock size={16} className="text-gray" />
              <span>Tentatives de connexion max</span>
            </div>
          </label>
          <Input
            type="number"
            min="3"
            max="20"
            value={config.maxLoginAttempts}
            onChange={(e) => onChange('maxLoginAttempts', parseInt(e.target.value) || 0)}
            placeholder="Ex: 5"
          />
          <p className="text-xs text-gray mt-1">
            Nombre d&apos;essais avant blocage temporaire
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            <div className="flex items-center space-x-2">
              <Key size={16} className="text-gray" />
              <span>Longueur min. mot de passe</span>
            </div>
          </label>
          <Input
            type="number"
            min="6"
            max="32"
            value={config.passwordMinLength}
            onChange={(e) => onChange('passwordMinLength', parseInt(e.target.value) || 0)}
            placeholder="Ex: 8"
          />
          <p className="text-xs text-gray mt-1">
            Nombre minimum de caractères requis
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            <div className="flex items-center space-x-2">
              <Shield size={16} className="text-gray" />
              <span>Authentification à deux facteurs</span>
            </div>
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onChange('enableTwoFA', !config.enableTwoFA)}
              className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                config.enableTwoFA ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                  config.enableTwoFA ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
            <span className={`text-sm ${config.enableTwoFA ? 'text-green-600' : 'text-gray'}`}>
              {config.enableTwoFA ? 'Activé' : 'Désactivé'}
            </span>
          </div>
          <p className="text-xs text-gray mt-1">
            {config.enableTwoFA 
              ? 'Recommandé pour une sécurité maximale'
              : 'Fortement recommandé d\'activer la 2FA'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">Recommandations de sécurité</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Session: 8-24 heures max</li>
            <li>• Tentatives: 3-5 maximum</li>
            <li>• Mot de passe: 12+ caractères</li>
            <li>• 2FA: Toujours activé</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">Sécurité actuelle</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <div className="flex justify-between">
              <span>Session:</span>
              <span className={config.sessionTimeout <= 24 ? 'text-green-600' : 'text-red-600'}>
                {config.sessionTimeout}h
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tentatives:</span>
              <span className={config.maxLoginAttempts <= 5 ? 'text-green-600' : 'text-orange-600'}>
                {config.maxLoginAttempts}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mot de passe:</span>
              <span className={config.passwordMinLength >= 8 ? 'text-green-600' : 'text-red-600'}>
                {config.passwordMinLength} min
              </span>
            </div>
            <div className="flex justify-between">
              <span>2FA:</span>
              <span className={config.enableTwoFA ? 'text-green-600' : 'text-red-600'}>
                {config.enableTwoFA ? 'Activé' : 'Désactivé'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SecuritySettings;