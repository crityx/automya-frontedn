'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  Gear, 
  FloppyDisk, 
  ArrowClockwise,
  Globe,
  Envelope,
  CreditCard,
  Shield,
  Lightning,
  Bell,
  Database,
  Key,
  WarningTriangle
} from 'phosphor-react';

export default function PlatformConfig() {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState({
    // Paramètres généraux
    platformName: 'Automya',
    platformUrl: 'https://automya.fr',
    supportEmail: 'support@automya.fr',
    maxUsersPerSeller: 500,
    
    // Paramètres de crédits
    defaultCredits: 50,
    premiumCredits: 500,
    enterpriseCredits: 2000,
    creditPrice: 0.10, // €/crédit
    
    // Paramètres de commissions
    defaultCommission: 15,
    premiumCommission: 18,
    topSellerCommission: 20,
    
    // Limites LinkedIn
    maxConnectionsPerDay: 50,
    maxMessagesPerDay: 100,
    maxPostsPerDay: 5,
    delayBetweenActions: 30, // secondes
    
    // Paramètres de sécurité
    sessionTimeout: 24, // heures
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    enableTwoFA: true,
    
    // Notifications
    emailNotifications: true,
    systemAlerts: true,
    maintenanceMode: false,
    
    // API & Intégrations
    linkedinApiKey: '••••••••••••••••',
    openaiApiKey: '••••••••••••••••',
    stripeApiKey: '••••••••••••••••',
    
    // Maintenance
    lastBackup: '2024-10-02 03:00:00',
    dbSize: '2.4 GB',
    activeConnections: 156
  });

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simuler la sauvegarde
    setTimeout(() => {
      setIsLoading(false);
      alert('Configuration sauvegardée avec succès !');
    }, 2000);
  };

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser la configuration ?')) {
      // Reset à la configuration par défaut
      setConfig({
        ...config,
        defaultCredits: 50,
        premiumCredits: 500,
        enterpriseCredits: 2000,
        creditPrice: 0.10,
        defaultCommission: 15,
        premiumCommission: 18,
        topSellerCommission: 20
      });
    }
  };

  const handleMaintenanceToggle = () => {
    setConfig(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
  };

  const updateConfig = (field: string, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Configuration de la plateforme</h1>
        <p className="text-gray">Gérez les paramètres globaux d'Automya</p>
      </div>

      {/* Mode maintenance alert */}
      {config.maintenanceMode && (
        <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <WarningTriangle size={20} color="#ea580c" />
            <span className="font-medium text-orange-800">Mode maintenance activé</span>
          </div>
          <p className="text-sm text-orange-700 mt-1">
            La plateforme est actuellement en mode maintenance. Les utilisateurs ne peuvent pas se connecter.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {/* Paramètres généraux */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-50">
              <Globe size={20} color="#2563eb" />
            </div>
            <h2 className="text-xl font-semibold text-black">Paramètres généraux</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nom de la plateforme"
              value={config.platformName}
              onChange={(e) => updateConfig('platformName', e.target.value)}
            />
            
            <Input
              label="URL de la plateforme"
              value={config.platformUrl}
              onChange={(e) => updateConfig('platformUrl', e.target.value)}
            />
            
            <Input
              label="Email de support"
              type="email"
              value={config.supportEmail}
              onChange={(e) => updateConfig('supportEmail', e.target.value)}
              icon={<Envelope size={16} />}
            />
            
            <Input
              label="Max utilisateurs par vendeur"
              type="number"
              value={config.maxUsersPerSeller}
              onChange={(e) => updateConfig('maxUsersPerSeller', parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Paramètres de crédits */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-primary-light">
              <CreditCard size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-black">Système de crédits</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input
              label="Crédits gratuits"
              type="number"
              value={config.defaultCredits}
              onChange={(e) => updateConfig('defaultCredits', parseInt(e.target.value))}
            />
            
            <Input
              label="Crédits Premium"
              type="number"
              value={config.premiumCredits}
              onChange={(e) => updateConfig('premiumCredits', parseInt(e.target.value))}
            />
            
            <Input
              label="Crédits Enterprise"
              type="number"
              value={config.enterpriseCredits}
              onChange={(e) => updateConfig('enterpriseCredits', parseInt(e.target.value))}
            />
            
            <Input
              label="Prix par crédit (€)"
              type="number"
              step="0.01"
              value={config.creditPrice}
              onChange={(e) => updateConfig('creditPrice', parseFloat(e.target.value))}
            />
          </div>
        </div>

        {/* Paramètres de commissions */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-green-50">
              <CreditCard size={20} color="#16a34a" />
            </div>
            <h2 className="text-xl font-semibold text-black">Commissions vendeurs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Commission standard (%)"
              type="number"
              value={config.defaultCommission}
              onChange={(e) => updateConfig('defaultCommission', parseInt(e.target.value))}
            />
            
            <Input
              label="Commission premium (%)"
              type="number"
              value={config.premiumCommission}
              onChange={(e) => updateConfig('premiumCommission', parseInt(e.target.value))}
            />
            
            <Input
              label="Commission top vendeur (%)"
              type="number"
              value={config.topSellerCommission}
              onChange={(e) => updateConfig('topSellerCommission', parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Limites LinkedIn */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-50">
              <Lightning size={20} color="#2563eb" />
            </div>
            <h2 className="text-xl font-semibold text-black">Limites LinkedIn</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input
              label="Connexions/jour"
              type="number"
              value={config.maxConnectionsPerDay}
              onChange={(e) => updateConfig('maxConnectionsPerDay', parseInt(e.target.value))}
            />
            
            <Input
              label="Messages/jour"
              type="number"
              value={config.maxMessagesPerDay}
              onChange={(e) => updateConfig('maxMessagesPerDay', parseInt(e.target.value))}
            />
            
            <Input
              label="Posts/jour"
              type="number"
              value={config.maxPostsPerDay}
              onChange={(e) => updateConfig('maxPostsPerDay', parseInt(e.target.value))}
            />
            
            <Input
              label="Délai entre actions (s)"
              type="number"
              value={config.delayBetweenActions}
              onChange={(e) => updateConfig('delayBetweenActions', parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-red-50">
              <Shield size={20} color="#dc2626" />
            </div>
            <h2 className="text-xl font-semibold text-black">Sécurité</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Timeout session (h)"
              type="number"
              value={config.sessionTimeout}
              onChange={(e) => updateConfig('sessionTimeout', parseInt(e.target.value))}
            />
            
            <Input
              label="Max tentatives login"
              type="number"
              value={config.maxLoginAttempts}
              onChange={(e) => updateConfig('maxLoginAttempts', parseInt(e.target.value))}
            />
            
            <Input
              label="Longueur min. mot de passe"
              type="number"
              value={config.passwordMinLength}
              onChange={(e) => updateConfig('passwordMinLength', parseInt(e.target.value))}
            />
          </div>
          
          <div className="mt-6 space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.enableTwoFA}
                onChange={(e) => updateConfig('enableTwoFA', e.target.checked)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-black">Activer l'authentification à deux facteurs</span>
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-yellow-50">
              <Bell size={20} color="#d97706" />
            </div>
            <h2 className="text-xl font-semibold text-black">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.emailNotifications}
                onChange={(e) => updateConfig('emailNotifications', e.target.checked)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-black">Notifications par email</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.systemAlerts}
                onChange={(e) => updateConfig('systemAlerts', e.target.checked)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-black">Alertes système</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.maintenanceMode}
                onChange={handleMaintenanceToggle}
                className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-sm text-black">Mode maintenance</span>
            </label>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-50">
              <Key size={20} color="#9333ea" />
            </div>
            <h2 className="text-xl font-semibold text-black">Clés API</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Input
              label="LinkedIn API Key"
              type="password"
              value={config.linkedinApiKey}
              onChange={(e) => updateConfig('linkedinApiKey', e.target.value)}
            />
            
            <Input
              label="OpenAI API Key"
              type="password"
              value={config.openaiApiKey}
              onChange={(e) => updateConfig('openaiApiKey', e.target.value)}
            />
            
            <Input
              label="Stripe API Key"
              type="password"
              value={config.stripeApiKey}
              onChange={(e) => updateConfig('stripeApiKey', e.target.value)}
            />
          </div>
        </div>

        {/* Informations système */}
        <div className="bg-white rounded-2xl p-8 border border-gray/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gray-50">
              <Database size={20} color="#4b5563" />
            </div>
            <h2 className="text-xl font-semibold text-black">Informations système</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray mb-1">Dernière sauvegarde</div>
              <div className="font-medium text-black">{config.lastBackup}</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray mb-1">Taille de la DB</div>
              <div className="font-medium text-black">{config.dbSize}</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray mb-1">Connexions actives</div>
              <div className="font-medium text-black">{config.activeConnections}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button
            onClick={handleSave}
            loading={isLoading}
            className="flex-1"
          >
            <FloppyDisk size={16} className="mr-2" />
            {isLoading ? 'Sauvegarde...' : 'Sauvegarder la configuration'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            className="px-8"
          >
            <ArrowClockwise size={16} className="mr-2" />
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>
  );
}