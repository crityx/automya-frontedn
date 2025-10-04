'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  Shield, 
  Bell, 
  Envelope, 
  DeviceMobile, 
  Eye, 
  EyeSlash,
  Trash,
  Download,
  Lock,
  ChartBar
} from 'phosphor-react';

export default function ProfileSettings() {
  const [settings, setSettings] = useState({
    // Security
    twoFactorEnabled: false,
    passwordVisible: false,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyReport: true,
    
    // Privacy
    profileVisible: true,
    analyticsSharing: false,
    
    // Account
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activeTab, setActiveTab] = useState('security');

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = () => {
    // TODO: Implement password change
  };

  const handleExportData = () => {
    // TODO: Implement data export
  };

  const handleDeleteAccount = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      // TODO: Implement account deletion
    }
  };

  const tabs = [
    { id: 'security', name: 'Sécurité', icon: <Shield size={16} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={16} /> },
    { id: 'privacy', name: 'Confidentialité', icon: <Eye size={16} /> },
    { id: 'account', name: 'Compte', icon: <Lock size={16} /> }
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Paramètres</h1>
        <p className="text-gray">Gérez vos préférences et paramètres de sécurité</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray/20 overflow-hidden">
        <div className="border-b border-gray/20">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-gray hover:text-black'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-black mb-6">Sécurité du compte</h2>
                
                {/* Two Factor Authentication */}
                <div className="p-6 border border-gray/20 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-black">Authentification à deux facteurs</h3>
                      <p className="text-sm text-gray">Ajoutez une couche de sécurité supplémentaire</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('twoFactorEnabled', !settings.twoFactorEnabled)}
                      className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                        settings.twoFactorEnabled ? 'bg-primary' : 'bg-gray/30'
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                          settings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                        } mt-1`}
                      />
                    </button>
                  </div>
                  {settings.twoFactorEnabled && (
                    <div className="text-sm text-green-600">
                      ✓ Authentification à deux facteurs activée
                    </div>
                  )}
                </div>

                {/* Password Change */}
                <div className="p-6 border border-gray/20 rounded-lg">
                  <h3 className="font-medium text-black mb-4">Changer le mot de passe</h3>
                  <div className="space-y-4">
                    <Input
                      label="Mot de passe actuel"
                      type="password"
                      value={settings.currentPassword}
                      onChange={(e) => handleSettingChange('currentPassword', e.target.value)}
                    />
                    <Input
                      label="Nouveau mot de passe"
                      type="password"
                      value={settings.newPassword}
                      onChange={(e) => handleSettingChange('newPassword', e.target.value)}
                    />
                    <Input
                      label="Confirmer le nouveau mot de passe"
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) => handleSettingChange('confirmPassword', e.target.value)}
                    />
                    <Button onClick={handlePasswordChange} className="mt-4">
                      Mettre à jour le mot de passe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-black">Notifications</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Envelope size={20} className="text-gray" />
                    <div>
                      <h3 className="font-medium text-black">Notifications par email</h3>
                      <p className="text-sm text-gray">Recevez des emails pour les activités importantes</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-primary' : 'bg-gray/30'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DeviceMobile size={20} className="text-gray" />
                    <div>
                      <h3 className="font-medium text-black">Notifications push</h3>
                      <p className="text-sm text-gray">Notifications sur votre navigateur</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                    className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                      settings.pushNotifications ? 'bg-primary' : 'bg-gray/30'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Envelope size={20} className="text-gray" />
                    <div>
                      <h3 className="font-medium text-black">Emails marketing</h3>
                      <p className="text-sm text-gray">Conseils, nouveautés et offres spéciales</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('marketingEmails', !settings.marketingEmails)}
                    className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                      settings.marketingEmails ? 'bg-primary' : 'bg-gray/30'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                        settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ChartBar size={20} className="text-gray" />
                    <div>
                      <h3 className="font-medium text-black">Rapport hebdomadaire</h3>
                      <p className="text-sm text-gray">Résumé de vos performances chaque semaine</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('weeklyReport', !settings.weeklyReport)}
                    className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                      settings.weeklyReport ? 'bg-primary' : 'bg-gray/30'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                        settings.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-black">Confidentialité</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                  <div>
                    <h3 className="font-medium text-black">Profil public</h3>
                    <p className="text-sm text-gray">Permettre aux autres utilisateurs de voir votre profil</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('profileVisible', !settings.profileVisible)}
                    className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                      settings.profileVisible ? 'bg-primary' : 'bg-gray/30'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                        settings.profileVisible ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray/20 rounded-lg">
                  <div>
                    <h3 className="font-medium text-black">Partage des analytics</h3>
                    <p className="text-sm text-gray">Aider à améliorer Automya en partageant des données anonymes</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('analyticsSharing', !settings.analyticsSharing)}
                    className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                      settings.analyticsSharing ? 'bg-primary' : 'bg-gray/30'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                        settings.analyticsSharing ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-black">Gestion du compte</h2>
              
              <div className="space-y-6">
                {/* Export Data */}
                <div className="p-6 border border-gray/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-black mb-2">Exporter mes données</h3>
                      <p className="text-sm text-gray">Téléchargez une copie de toutes vos données</p>
                    </div>
                    <Button onClick={handleExportData} variant="outline">
                      <Download size={16} className="mr-2" />
                      Exporter
                    </Button>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-red-800 mb-2">Zone de danger</h3>
                      <p className="text-sm text-red-600">
                        La suppression de votre compte est irréversible. Toutes vos données seront perdues.
                      </p>
                    </div>
                    <Button 
                      onClick={handleDeleteAccount} 
                      variant="ghost"
                      className="text-red-600 hover:bg-red-100 border-red-200"
                    >
                      <Trash size={16} className="mr-2" />
                      Supprimer le compte
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}