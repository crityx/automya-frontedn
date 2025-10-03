'use client';

import { useState } from 'react';
import { 
  Robot, 
  Play, 
  Pause, 
  Clock
} from 'phosphor-react';
import Button from '@/components/ui/Button';

interface CommentAutomationConfig {
  enabled: boolean;
  responseHours: { start: string; end: string };
  responseObjective: 'thank' | 'educate' | 'engage' | 'contact' | 'redirect';
  customPrompt: string;
}

export default function CommentsAutomation() {
  const [config, setConfig] = useState<CommentAutomationConfig>({
    enabled: false,
    responseHours: { start: '09:00', end: '18:00' },
    responseObjective: 'engage',
    customPrompt: ''
  });

  const toggleAutomation = () => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleConfigChange = (field: keyof CommentAutomationConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const objectiveOptions = {
    thank: 'Remercier et apprécier',
    educate: 'Éduquer et informer', 
    engage: 'Engager la conversation',
    contact: 'Favoriser le contact',
    redirect: 'Rediriger vers mes services'
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Réponses automatiques aux commentaires</h1>
        <p className="text-gray">Configuration simple pour automatiser vos réponses LinkedIn</p>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Robot size={28} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-black">Réponses automatiques aux commentaires</h2>
              <p className="text-sm text-gray">
                Uniquement sur les posts publiés avec Automya • 
                Répond de {config.responseHours.start} à {config.responseHours.end}
              </p>
            </div>
          </div>
          
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={config.enabled}
              onChange={toggleAutomation}
            />
            <div className={`relative w-11 h-6 rounded-full transition-colors ${
              config.enabled ? 'bg-green-400' : 'bg-gray-300'
            }`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                config.enabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* Horaires de réponse */}
            <div>
              <label className="block text-sm font-medium text-black mb-3">
                <Clock size={16} className="inline mr-2" />
                Horaires de réponse
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray mb-2">Début</label>
                  <input
                    type="time"
                    value={config.responseHours.start}
                    onChange={(e) => handleConfigChange('responseHours', {
                      ...config.responseHours,
                      start: e.target.value
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray mb-2">Fin</label>
                  <input
                    type="time"
                    value={config.responseHours.end}
                    onChange={(e) => handleConfigChange('responseHours', {
                      ...config.responseHours,
                      end: e.target.value
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <p className="text-xs text-gray mt-2">
                L'IA répondra uniquement pendant ces heures
              </p>
            </div>

            {/* Objectif des réponses */}
            <div>
              <label className="block text-sm font-medium text-black mb-3">
                Objectif principal des réponses
              </label>
              <select
                value={config.responseObjective}
                onChange={(e) => handleConfigChange('responseObjective', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {Object.entries(objectiveOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Right Column - Prompt personnalisé */}
          <div>
            <label className="block text-sm font-medium text-black mb-3">
              Instructions personnalisées (optionnel)
            </label>
            <textarea
              value={config.customPrompt}
              onChange={(e) => handleConfigChange('customPrompt', e.target.value)}
              rows={10}
              className="w-full px-4 py-4 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
              placeholder="Ex: Je suis Baptiste, expert LinkedIn. Réponds avec un ton professionnel mais chaleureux. Pose toujours une question pour engager la conversation. Mentionne mes services de formation si pertinent..."
            />
            <p className="text-xs text-gray mt-2">
              Décrivez votre style de réponse et vos préférences
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-gray/20">
          <Button size="lg">
            Sauvegarder la configuration
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-800 mb-2">Comment ça fonctionne ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-700">
          <div>
            <strong>1. Détection</strong><br />
            L'IA surveille les commentaires sur vos posts Automya
          </div>
          <div>
            <strong>2. Analyse</strong><br />
            Elle analyse votre profil, celui du commentateur et fait des liens selon votre intention
          </div>
          <div>
            <strong>3. Réponse</strong><br />
            Elle génère une réponse personnalisée dans vos créneaux horaires
          </div>
        </div>
      </div>
    </div>
  );
}