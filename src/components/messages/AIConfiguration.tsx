'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Robot, ChatCircle, Clock, Lightning, Play, Pause } from 'phosphor-react';

const toneOptions = [
  { id: 'professional', name: 'Professionnel', description: 'Formel et respectueux' },
  { id: 'friendly', name: 'Amical', description: 'Chaleureux et accessible' },
  { id: 'expert', name: 'Expert', description: 'Technique et précis' },
  { id: 'casual', name: 'Décontracté', description: 'Naturel et spontané' }
];

const responseTemplates = [
  {
    id: 'greeting',
    name: 'Message de bienvenue',
    template: 'Bonjour {name}, merci pour votre connexion ! Je serais ravi d\'échanger avec vous sur {topic}.'
  },
  {
    id: 'followup',
    name: 'Relance après consultation',
    template: 'Salut {name}, j\'ai vu que vous aviez consulté mon profil. Avez-vous des questions sur {expertise} ?'
  },
  {
    id: 'meeting',
    name: 'Proposition de rendez-vous',
    template: 'Bonjour {name}, notre échange m\'a beaucoup intéressé. Seriez-vous disponible pour un call de 15 minutes cette semaine ?'
  }
];

export default function AIConfiguration() {
  const [config, setConfig] = useState({
    tone: 'professional',
    autoResponse: true,
    responseDelay: 30,
    workingHours: {
      start: '09:00',
      end: '18:00'
    },
    enableWeekends: false,
    maxMessagesPerDay: 50
  });

  const [activeTemplate, setActiveTemplate] = useState('greeting');
  const [customTemplate, setCustomTemplate] = useState(responseTemplates[0].template);

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveConfiguration = () => {
    console.log('Saving AI configuration:', config);
  };

  const testAI = () => {
    console.log('Testing AI with current configuration...');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Votre assistant IA conversationnel</h1>
        </div>
        
        <button
          onClick={() => handleConfigChange('autoResponse', !config.autoResponse)}
          className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
            config.autoResponse ? 'bg-primary' : 'bg-gray/30'
          }`}
        >
          <span
            className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
              config.autoResponse ? 'translate-x-6' : 'translate-x-1'
            } mt-1`}
          />
        </button>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <div className="space-y-8">
          {/* Instructions pour l'IA */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <Robot size={16} className="inline mr-2" />
              Instructions pour l'IA
            </h3>
            <textarea
              value={config.customPrompt}
              onChange={(e) => handleConfigChange('customPrompt', e.target.value)}
              rows={10}
              className="w-full px-4 py-4 rounded-lg border border-gray/20 bg-white text-gray-800 placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
              placeholder="Ex: Je suis Baptiste, expert LinkedIn. Réponds avec un ton professionnel mais chaleureux. Pose toujours une question pour engager la conversation. Mentionne mes services de formation si pertinent..."
            />
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <Clock size={16} className="inline mr-2" />
              Horaires de réponse
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-xs">
              <div>
                <label className="block text-xs text-gray mb-2">Début</label>
                <input
                  type="time"
                  value={config.workingHours.start}
                  onChange={(e) => handleConfigChange('workingHours', {
                    ...config.workingHours,
                    start: e.target.value
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-white text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-xs text-gray mb-2">Fin</label>
                <input
                  type="time"
                  value={config.workingHours.end}
                  onChange={(e) => handleConfigChange('workingHours', {
                    ...config.workingHours,
                    end: e.target.value
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-white text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <p className="text-xs text-gray mt-2">
              L'IA répondra uniquement pendant ces heures
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray/20">
            <Button size="lg">
              Sauvegarder la configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}