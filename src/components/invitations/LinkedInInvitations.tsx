'use client';

import { useState } from 'react';
import { 
  UserPlus, 
  Heart,
  ChatCircle,
  Robot,
  Clock,
  Sparkle,
  Users,
  Envelope
} from 'phosphor-react';
import Button from '@/components/ui/Button';
import TimeSelector from '@/components/ui/TimeSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface LinkedInInvitationConfig {
  enabled: boolean;
  inviteReactions: boolean;
  inviteComments: boolean;
  reactionTypes: string[];
  messageType: 'none' | 'fixed' | 'ai';
  fixedMessage: string;
  aiPrompt: string;
  inviteHours: { start: string; end: string };
}

export default function LinkedInInvitations() {
  const { t } = useLanguage();
  const [config, setConfig] = useState<LinkedInInvitationConfig>({
    enabled: false,
    inviteReactions: false,
    inviteComments: false,
    reactionTypes: ['like'],
    messageType: 'none',
    fixedMessage: '',
    aiPrompt: '',
    inviteHours: { start: '09:00', end: '18:00' }
  });

  const handleConfigChange = (field: keyof LinkedInInvitationConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const toggleSystem = () => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const reactionTypeOptions = [
    { id: 'like', labelKey: 'reactions.like', icon: '👍' },
    { id: 'love', labelKey: 'reactions.love', icon: '❤️' },
    { id: 'celebrate', labelKey: 'reactions.celebrate', icon: '🎉' },
    { id: 'support', labelKey: 'reactions.support', icon: '🙌' },
    { id: 'insightful', labelKey: 'reactions.insightful', icon: '💡' },
    { id: 'funny', labelKey: 'reactions.funny', icon: '😂' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('invitations.automatic_invitations')}</h1>
        </div>
        
        <button
          onClick={toggleSystem}
          className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
            config.enabled ? 'bg-primary' : 'bg-gray/30'
          }`}
        >
          <span
            className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
              config.enabled ? 'translate-x-6' : 'translate-x-1'
            } mt-1`}
          />
        </button>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray/20">
        <div className="space-y-8">
          {/* Qui inviter ? */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              <Users size={16} className="inline mr-2" />
              {t('invitations.who_to_invite')}
            </h3>
            
            {/* Simple checkboxes for invitation types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Invite Comments */}
              <div className="flex items-center space-x-4 p-4 bg-white border border-purple-200 rounded-lg">
                <input
                  type="checkbox"
                  id="inviteComments"
                  checked={config.inviteComments}
                  onChange={(e) => handleConfigChange('inviteComments', e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="inviteComments" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <div>
                    <h4 className="font-medium text-gray-800">{t('invitations.people_who_commented')}</h4>
                  </div>
                </label>
              </div>

              {/* Invite Reactions */}
              <div className="flex items-center space-x-4 p-4 bg-white border border-purple-200 rounded-lg">
                <input
                  type="checkbox"
                  id="inviteReactions"
                  checked={config.inviteReactions}
                  onChange={(e) => handleConfigChange('inviteReactions', e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="inviteReactions" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <div>
                    <h4 className="font-medium text-gray-800">{t('invitations.people_who_reacted')}</h4>
                  </div>
                </label>
              </div>

            </div>
          </div>

          {/* Type d'invitation */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              <Envelope size={16} className="inline mr-2" />
              {t('invitations.invitation_type')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sans message */}
              <div 
                onClick={() => handleConfigChange('messageType', 'none')}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  config.messageType === 'none' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-purple-200 hover:border-purple-300'
                }`}
              >
                <div className="text-center">
                  <input
                    type="radio"
                    name="messageType"
                    value="none"
                    checked={config.messageType === 'none'}
                    onChange={() => handleConfigChange('messageType', 'none')}
                    className="w-4 h-4 text-purple-600 mb-3"
                  />
                  <h6 className="font-medium text-gray-800 mb-2">{t('invitations.no_message')}</h6>
                </div>
              </div>

              {/* Message fixe */}
              <div 
                onClick={() => handleConfigChange('messageType', 'fixed')}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  config.messageType === 'fixed' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-purple-200 hover:border-purple-300'
                }`}
              >
                <div className="text-center">
                  <input
                    type="radio"
                    name="messageType"
                    value="fixed"
                    checked={config.messageType === 'fixed'}
                    onChange={() => handleConfigChange('messageType', 'fixed')}
                    className="w-4 h-4 text-purple-600 mb-3"
                  />
                  <h6 className="font-medium text-gray-800 mb-2">{t('invitations.fixed_message')}</h6>
                </div>
              </div>

              {/* Message IA */}
              <div 
                onClick={() => handleConfigChange('messageType', 'ai')}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  config.messageType === 'ai' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-purple-200 hover:border-purple-300'
                }`}
              >
                <div className="text-center">
                  <input
                    type="radio"
                    name="messageType"
                    value="ai"
                    checked={config.messageType === 'ai'}
                    onChange={() => handleConfigChange('messageType', 'ai')}
                    className="w-4 h-4 text-purple-600 mb-3"
                  />
                  <h6 className="font-medium text-gray-800 mb-2">{t('invitations.ai_generated')}</h6>
                </div>
              </div>
            </div>

            {/* Message Content */}
            {config.messageType === 'fixed' && (
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <label className="block text-sm font-medium text-gray-800 mb-3">
                  {t('invitations.your_fixed_message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={config.fixedMessage}
                  onChange={(e) => handleConfigChange('fixedMessage', e.target.value)}
                  rows={4}
                  maxLength={300}
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 bg-white text-gray-800 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none"
                  placeholder={t('invitations.fixed_message_placeholder')}
                  required
                />
                <p className="text-xs text-gray-600 mt-2">{config.fixedMessage.length}/300 {t('common.characters')}</p>
              </div>
            )}

            {config.messageType === 'ai' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  <Sparkle size={16} className="inline mr-2" />
                  {t('invitations.ai_instructions')} <span className="text-red-500">*</span>
                </h3>
                <textarea
                  value={config.aiPrompt}
                  onChange={(e) => handleConfigChange('aiPrompt', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 bg-white text-gray-800 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none"
                  placeholder={t('invitations.ai_prompt_placeholder')}
                  required
                />
              </div>
            )}
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              <Clock size={16} className="inline mr-2" />
              {t('invitations.sending_schedule')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <TimeSelector
                  value={config.inviteHours.start}
                  onChange={(time) => handleConfigChange('inviteHours', {
                    ...config.inviteHours,
                    start: time
                  })}
                  label={t('common.start_time')}
                />
              </div>
              
              <div>
                <TimeSelector
                  value={config.inviteHours.end}
                  onChange={(time) => handleConfigChange('inviteHours', {
                    ...config.inviteHours,
                    end: time
                  })}
                  label={t('common.end_time')}
                />
              </div>
            </div>
            
            <p className="text-sm text-purple-700 mt-6 p-4 bg-purple-50 rounded-lg">
              📧 {t('invitations.schedule_info')}
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray/20">
            <Button size="lg">
              {t('common.save_configuration')}
            </Button>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">{t('invitations.how_it_works')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-800">
          <div>
            <strong>1. {t('invitations.detection')}</strong><br />
            {t('invitations.detection_description')}
          </div>
          <div>
            <strong>2. {t('invitations.targeting')}</strong><br />
            {t('invitations.targeting_description')}
          </div>
          <div>
            <strong>3. {t('invitations.invitation')}</strong><br />
            {t('invitations.invitation_description')}
          </div>
        </div>
      </div>
    </div>
  );
}