'use client';

import { useState } from 'react';
import { 
  UserPlus, 
  Heart,
  ChatCircle,
  Robot,
  Lock,
  Clock,
  MagnifyingGlass
} from 'phosphor-react';
import Button from '@/components/ui/Button';

interface InvitationConfig {
  inviteReactions: boolean;
  inviteComments: boolean;
  reactionTypes: string[];
  messageType: 'none' | 'fixed' | 'ai';
  fixedMessage: string;
  aiPrompt: string;
  inviteHours: { start: string; end: string };
}

export default function InvitationsAutomation() {
  const [activeTab, setActiveTab] = useState<'invitations' | 'prospection'>('invitations');
  const [config, setConfig] = useState<InvitationConfig>({
    inviteReactions: false,
    inviteComments: false,
    reactionTypes: ['like'],
    messageType: 'fixed',
    fixedMessage: '',
    aiPrompt: '',
    inviteHours: { start: '09:00', end: '18:00' }
  });

  const handleConfigChange = (field: keyof InvitationConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const reactionTypeOptions = [
    { id: 'like', label: 'J\'aime', icon: '👍' },
    { id: 'love', label: 'J\'adore', icon: '❤️' },
    { id: 'celebrate', label: 'Bravo', icon: '🎉' },
    { id: 'support', label: 'Soutien', icon: '🙌' },
    { id: 'insightful', label: 'Instructif', icon: '💡' },
    { id: 'funny', label: 'Amusant', icon: '😂' }
  ];

  const tabs = [
    { id: 'invitations', label: 'Invitations LinkedIn', icon: <UserPlus size={20} /> },
    { id: 'prospection', label: 'Prospection', icon: <MagnifyingGlass size={20} /> }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Invitations automatiques LinkedIn</h1>
        <p className="text-gray">Automatisez vos invitations et votre prospection LinkedIn</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray/20 overflow-hidden">
        <div className="flex border-b border-gray/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray hover:text-primary hover:bg-primary/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'invitations' ? (
            <div className="space-y-8">
              {/* Invitations LinkedIn Content */}
              <div className="space-y-6">
                {/* Invite Reactions */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={config.inviteReactions}
                      onChange={(e) => handleConfigChange('inviteReactions', e.target.checked)}
                    />
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${
                      config.inviteReactions ? 'bg-green-400' : 'bg-gray-300'
                    }`}>
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        config.inviteReactions ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </div>
                  </label>
                  <div className="flex-1">
                    <h3 className="font-medium text-black mb-2">Inviter toute personne ayant réagi à vos posts</h3>
                    <p className="text-sm text-gray mb-4">Envoyez automatiquement des invitations aux personnes qui mettent des réactions</p>
                    
                    {config.inviteReactions && (
                      <div>
                        <p className="text-sm font-medium text-black mb-3">Types de réactions :</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {reactionTypeOptions.map((reaction) => (
                            <label key={reaction.id} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={config.reactionTypes.includes(reaction.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleConfigChange('reactionTypes', [...config.reactionTypes, reaction.id]);
                                  } else {
                                    handleConfigChange('reactionTypes', config.reactionTypes.filter(t => t !== reaction.id));
                                  }
                                }}
                                className="w-4 h-4 text-primary bg-white border-gray/20 rounded focus:ring-primary/20"
                              />
                              <span className="text-sm text-black">{reaction.icon} {reaction.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Invite Comments */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={config.inviteComments}
                      onChange={(e) => handleConfigChange('inviteComments', e.target.checked)}
                    />
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${
                      config.inviteComments ? 'bg-green-400' : 'bg-gray-300'
                    }`}>
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        config.inviteComments ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </div>
                  </label>
                  <div className="flex-1">
                    <h3 className="font-medium text-black mb-2">Inviter toute personne ayant commenté vos posts</h3>
                    <p className="text-sm text-gray">Envoyez automatiquement des invitations aux personnes qui commentent vos publications</p>
                  </div>
                </div>

                {/* Horaires d'invitation */}
                {(config.inviteReactions || config.inviteComments) && (
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-black mb-4">
                      <Clock size={16} className="inline mr-2" />
                      Horaires d'envoi des invitations
                    </h3>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      <div>
                        <label className="block text-xs text-gray mb-2">Début</label>
                        <input
                          type="time"
                          value={config.inviteHours.start}
                          onChange={(e) => handleConfigChange('inviteHours', {
                            ...config.inviteHours,
                            start: e.target.value
                          })}
                          className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray mb-2">Fin</label>
                        <input
                          type="time"
                          value={config.inviteHours.end}
                          onChange={(e) => handleConfigChange('inviteHours', {
                            ...config.inviteHours,
                            end: e.target.value
                          })}
                          className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-blue-800 mt-2">
                      Les invitations seront envoyées uniquement pendant ces heures
                    </p>
                  </div>
                )}
              </div>

              {/* Message Configuration */}
              {(config.inviteReactions || config.inviteComments) && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-black">Message d'invitation</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-3">Configuration du message</label>
                      <select
                        value={config.messageType}
                        onChange={(e) => handleConfigChange('messageType', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="none">Pas de message (invitation simple)</option>
                        <option value="fixed">Message fixe personnalisé</option>
                        <option value="ai">Message généré automatiquement par l'IA</option>
                      </select>
                      <p className="text-xs text-gray mt-2">
                        Recommandé : ajouter un message personnalisé augmente le taux d'acceptation de 40%
                      </p>
                    </div>

                    {config.messageType === 'fixed' && (
                      <div>
                        <label className="block text-sm font-medium text-black mb-3">
                          Message fixe <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={config.fixedMessage}
                          onChange={(e) => handleConfigChange('fixedMessage', e.target.value)}
                          rows={4}
                          maxLength={300}
                          className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                          placeholder="Ex: Bonjour [Prénom], j'ai remarqué votre intérêt pour mon post sur [sujet]. J'aimerais échanger avec vous sur ce thème. Cordialement, Baptiste"
                          required
                        />
                        <p className="text-xs text-gray mt-2">{config.fixedMessage.length}/300 caractères</p>
                      </div>
                    )}

                    {config.messageType === 'ai' && (
                      <div>
                        <label className="block text-sm font-medium text-black mb-3">
                          Instructions pour l'IA <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={config.aiPrompt}
                          onChange={(e) => handleConfigChange('aiPrompt', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                          placeholder="Ex: Rédigez un message d'invitation personnalisé en mentionnant l'interaction de la personne avec mon post. Ton professionnel mais chaleureux, maximum 250 caractères. Mentionnez mon expertise en [domaine]."
                          required
                        />
                        <p className="text-xs text-gray mt-2">
                          L'IA générera un message unique basé sur le profil et l'interaction de chaque personne
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Save Button */}
              {(config.inviteReactions || config.inviteComments) && (
                <div className="flex justify-end pt-6 border-t border-gray/20">
                  <Button size="lg">
                    Sauvegarder la configuration
                  </Button>
                </div>
              )}
            </div>
          ) : (
            /* Prospection Tab */
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Lock size={32} className="text-gray" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray mb-4">Bientôt disponible</h2>
                <p className="text-gray mb-8 max-w-2xl mx-auto">
                  La prospection avancée sera bientôt disponible pour cibler des prospects par secteur d'activité et zone géographique.
                </p>
              </div>

              {/* Preview of upcoming features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
                <div className="bg-white rounded-lg p-6 border border-gray/20">
                  <h3 className="font-semibold text-gray mb-4">Ciblage par secteur</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" disabled className="w-4 h-4" />
                      <span className="text-sm text-gray">Marketing & Communication</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" disabled className="w-4 h-4" />
                      <span className="text-sm text-gray">Technologie & IT</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" disabled className="w-4 h-4" />
                      <span className="text-sm text-gray">Finance & Consulting</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray/20">
                  <h3 className="font-semibold text-gray mb-4">Zone géographique</h3>
                  <select disabled className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-gray-100 text-gray mb-4">
                    <option>France</option>
                    <option>Europe</option>
                    <option>International</option>
                  </select>
                  <input
                    disabled
                    placeholder="Ville ou région..."
                    className="w-full px-3 py-2 rounded-lg border border-gray/20 bg-gray-100 text-gray"
                  />
                </div>
              </div>

              <div className="text-center">
                <Button disabled className="opacity-50 cursor-not-allowed">
                  <Lock size={16} className="mr-2" />
                  Configuration verrouillée
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}