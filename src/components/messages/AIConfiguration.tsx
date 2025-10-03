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
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Configuration IA</h1>
        <p className="text-gray">Personnalisez le comportement de votre assistant conversationnel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-8">
          {/* Tone Configuration */}
          <div className="bg-white rounded-2xl p-8 border border-gray/20">
            <div className="flex items-center space-x-3 mb-6">
              <ChatCircle size={24} className="text-primary" />
              <h2 className="text-xl font-semibold text-black">Ton de réponse</h2>
            </div>
            
            <div className="space-y-3">
              {toneOptions.map((tone) => (
                <div
                  key={tone.id}
                  onClick={() => handleConfigChange('tone', tone.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    config.tone === tone.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray/20 hover:border-gray/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-black">{tone.name}</h3>
                    {config.tone === tone.id && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray">{tone.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Response Settings */}
          <div className="bg-white rounded-2xl p-8 border border-gray/20">
            <div className="flex items-center space-x-3 mb-6">
              <Clock size={24} className="text-primary" />
              <h2 className="text-xl font-semibold text-black">Paramètres de réponse</h2>
            </div>

            <div className="space-y-6">
              {/* Auto Response Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-black">Réponses automatiques</h3>
                  <p className="text-sm text-gray">Activer les réponses automatisées</p>
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

              {/* Response Delay */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Délai de réponse (minutes)
                </label>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={config.responseDelay}
                  onChange={(e) => handleConfigChange('responseDelay', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray mt-1">
                  <span>5 min</span>
                  <span className="font-medium text-primary">{config.responseDelay} min</span>
                  <span>2h</span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Heure de début"
                  type="time"
                  value={config.workingHours.start}
                  onChange={(e) => handleConfigChange('workingHours', { 
                    ...config.workingHours, 
                    start: e.target.value 
                  })}
                />
                <Input
                  label="Heure de fin"
                  type="time"
                  value={config.workingHours.end}
                  onChange={(e) => handleConfigChange('workingHours', { 
                    ...config.workingHours, 
                    end: e.target.value 
                  })}
                />
              </div>

              {/* Weekend Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-black">Actif le weekend</h3>
                  <p className="text-sm text-gray">Répondre automatiquement le weekend</p>
                </div>
                <button
                  onClick={() => handleConfigChange('enableWeekends', !config.enableWeekends)}
                  className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                    config.enableWeekends ? 'bg-primary' : 'bg-gray/30'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                      config.enableWeekends ? 'translate-x-6' : 'translate-x-1'
                    } mt-1`}
                  />
                </button>
              </div>

              {/* Daily Limit */}
              <Input
                label="Limite quotidienne de messages"
                type="number"
                value={config.maxMessagesPerDay}
                onChange={(e) => handleConfigChange('maxMessagesPerDay', parseInt(e.target.value))}
                min="1"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Templates and Preview */}
        <div className="space-y-8">
          {/* Response Templates */}
          <div className="bg-white rounded-2xl p-8 border border-gray/20">
            <div className="flex items-center space-x-3 mb-6">
              <Robot size={24} className="text-primary" />
              <h2 className="text-xl font-semibold text-black">Modèles de réponse</h2>
            </div>

            <div className="space-y-4 mb-6">
              {responseTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    setActiveTemplate(template.id);
                    setCustomTemplate(template.template);
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    activeTemplate === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray/20 hover:border-gray/40'
                  }`}
                >
                  <h3 className="font-medium text-black mb-2">{template.name}</h3>
                  <p className="text-sm text-gray line-clamp-2">{template.template}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Personnaliser le modèle
              </label>
              <textarea
                value={customTemplate}
                onChange={(e) => setCustomTemplate(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                placeholder="Écrivez votre modèle personnalisé..."
              />
              <p className="text-xs text-gray mt-2">
                Variables disponibles: {'{name}'}, {'{topic}'}, {'{expertise}'}
              </p>
            </div>
          </div>

          {/* AI Status and Testing */}
          <div className="bg-white rounded-2xl p-8 border border-gray/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-black">Statut de l'IA</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Actif</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray">Messages traités aujourd'hui</span>
                <span className="font-medium text-black">12 / {config.maxMessagesPerDay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray">Taux de réponse</span>
                <span className="font-medium text-black">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray">Temps de réponse moyen</span>
                <span className="font-medium text-black">{config.responseDelay} min</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={testAI} variant="outline" className="flex-1">
                <Play size={16} className="mr-2" />
                Tester l'IA
              </Button>
              <Button
                onClick={() => handleConfigChange('autoResponse', false)}
                variant="ghost"
                className="flex-1 text-red-600 hover:bg-red-50"
              >
                <Pause size={16} className="mr-2" />
                Suspendre
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Configuration */}
      <div className="mt-8 bg-white rounded-2xl p-8 border border-gray/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">Sauvegarder la configuration</h3>
            <p className="text-gray">Les modifications seront appliquées immédiatement</p>
          </div>
          <Button onClick={handleSaveConfiguration} size="lg" className="px-8">
            <Lightning size={16} className="mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
}