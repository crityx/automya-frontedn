'use client';

import { memo } from 'react';
import Input from '@/components/ui/Input';
import { Globe, Clock, Lightning, Warning, Users, Envelope, PenNib } from 'phosphor-react';
import { PlatformConfigData } from './types';

interface LinkedInSettingsProps {
  config: PlatformConfigData;
  onChange: (field: keyof PlatformConfigData, value: any) => void;
}

const LinkedInSettings = memo(function LinkedInSettings({ config, onChange }: LinkedInSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Globe size={20} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Limites LinkedIn</h3>
          <p className="text-sm text-gray">Configuration des limites d&apos;automation pour respecter LinkedIn</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Warning size={16} className="text-orange-600" />
          <h4 className="font-medium text-orange-900">Important</h4>
        </div>
        <p className="text-sm text-orange-800">
          Ces limites sont cruciales pour éviter les restrictions LinkedIn. 
          Ne les augmentez que si vous êtes sûr des conséquences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-gray" />
              <span>Connexions par jour</span>
            </div>
          </label>
          <Input
            type="number"
            min="1"
            max="200"
            value={config.maxConnectionsPerDay}
            onChange={(e) => onChange('maxConnectionsPerDay', parseInt(e.target.value) || 0)}
            placeholder="Ex: 50"
          />
          <p className="text-xs text-gray mt-1">
            Recommandé: 20-50 connexions/jour
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            <div className="flex items-center space-x-2">
              <Envelope size={16} className="text-gray" />
              <span>Messages par jour</span>
            </div>
          </label>
          <Input
            type="number"
            min="1"
            max="500"
            value={config.maxMessagesPerDay}
            onChange={(e) => onChange('maxMessagesPerDay', parseInt(e.target.value) || 0)}
            placeholder="Ex: 100"
          />
          <p className="text-xs text-gray mt-1">
            Recommandé: 50-100 messages/jour
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            <div className="flex items-center space-x-2">
              <PenNib size={16} className="text-gray" />
              <span>Posts par jour</span>
            </div>
          </label>
          <Input
            type="number"
            min="1"
            max="20"
            value={config.maxPostsPerDay}
            onChange={(e) => onChange('maxPostsPerDay', parseInt(e.target.value) || 0)}
            placeholder="Ex: 5"
          />
          <p className="text-xs text-gray mt-1">
            Recommandé: 3-5 posts/jour maximum
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray" />
              <span>Délai entre actions (secondes)</span>
            </div>
          </label>
          <Input
            type="number"
            min="5"
            max="300"
            value={config.delayBetweenActions}
            onChange={(e) => onChange('delayBetweenActions', parseInt(e.target.value) || 0)}
            placeholder="Ex: 30"
          />
          <p className="text-xs text-gray mt-1">
            Temps d&apos;attente entre chaque action automatisée
          </p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-3">Recommandations LinkedIn</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
          <div>
            <h5 className="font-medium mb-2">Limites sécurisées :</h5>
            <ul className="space-y-1">
              <li>• Connexions: 20-30/jour</li>
              <li>• Messages: 50-80/jour</li>
              <li>• Posts: 2-3/jour</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Bonnes pratiques :</h5>
            <ul className="space-y-1">
              <li>• Délai minimum: 30 secondes</li>
              <li>• Éviter les weekends</li>
              <li>• Personnaliser les messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LinkedInSettings;