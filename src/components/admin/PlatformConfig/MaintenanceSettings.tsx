'use client';

import { memo } from 'react';
import Button from '@/components/ui/Button';
import { Database, ArrowClockwise, Bell, Warning, CheckCircle } from 'phosphor-react';
import { PlatformConfigData } from './types';

interface MaintenanceSettingsProps {
  config: PlatformConfigData;
  onChange: (field: keyof PlatformConfigData, value: any) => void;
}

const MaintenanceSettings = memo(function MaintenanceSettings({ config, onChange }: MaintenanceSettingsProps) {
  const handleBackup = () => {
    // TODO: Implement backup functionality
    alert('Sauvegarde lancée - Fonctionnalité à implémenter');
  };

  const handleTestNotifications = () => {
    // TODO: Implement notification test
    alert('Test de notifications envoyé');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const getBackupStatus = () => {
    const backupDate = new Date(config.lastBackup);
    const now = new Date();
    const hoursSinceBackup = (now.getTime() - backupDate.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceBackup < 24) {
      return { status: 'success', message: 'Sauvegarde récente', color: 'text-green-600' };
    } else if (hoursSinceBackup < 48) {
      return { status: 'warning', message: 'Sauvegarde un peu ancienne', color: 'text-orange-600' };
    } else {
      return { status: 'error', message: 'Sauvegarde trop ancienne', color: 'text-red-600' };
    }
  };

  const backupStatus = getBackupStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Database size={20} className="text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">Maintenance & Système</h3>
          <p className="text-sm text-gray">Gestion des sauvegardes et notifications système</p>
        </div>
      </div>

      {/* Mode Maintenance */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${config.maintenanceMode ? 'bg-red-100' : 'bg-green-100'}`}>
              <Warning size={16} className={config.maintenanceMode ? 'text-red-600' : 'text-green-600'} />
            </div>
            <div>
              <h4 className="font-medium text-black">Mode maintenance</h4>
              <p className="text-sm text-gray">Bloquer l&apos;accès aux utilisateurs</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onChange('maintenanceMode', !config.maintenanceMode)}
              className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                config.maintenanceMode ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                  config.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
            <span className={`text-sm font-medium ${config.maintenanceMode ? 'text-red-600' : 'text-green-600'}`}>
              {config.maintenanceMode ? 'Activé' : 'Désactivé'}
            </span>
          </div>
        </div>
        
        {config.maintenanceMode && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">
              ⚠️ La plateforme est actuellement en maintenance. 
              Les utilisateurs ne peuvent pas se connecter.
            </p>
          </div>
        )}
      </div>

      {/* Sauvegardes */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database size={16} className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-black">Sauvegardes</h4>
              <p className="text-sm text-gray">Gestion des sauvegardes automatiques</p>
            </div>
          </div>
          <Button onClick={handleBackup} size="sm">
            <ArrowClockwise size={16} className="mr-2" />
            Sauvegarder maintenant
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="font-bold text-lg text-black">{formatDate(config.lastBackup)}</div>
            <div className="text-sm text-gray">Dernière sauvegarde</div>
            <div className={`text-xs mt-1 ${backupStatus.color}`}>
              {backupStatus.message}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="font-bold text-lg text-black">{config.dbSize}</div>
            <div className="text-sm text-gray">Taille de la base</div>
            <div className="text-xs text-gray mt-1">
              {parseFloat(config.dbSize) < 5 ? 'Taille normale' : 'Taille importante'}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="font-bold text-lg text-black">{config.activeConnections}</div>
            <div className="text-sm text-gray">Connexions actives</div>
            <div className="text-xs text-gray mt-1">
              {config.activeConnections > 200 ? 'Charge élevée' : 'Charge normale'}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bell size={16} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-black">Notifications système</h4>
              <p className="text-sm text-gray">Configuration des alertes automatiques</p>
            </div>
          </div>
          <Button onClick={handleTestNotifications} size="sm" variant="outline">
            Tester les notifications
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-black">Notifications email</div>
              <div className="text-sm text-gray">Alertes par email</div>
            </div>
            <button
              onClick={() => onChange('emailNotifications', !config.emailNotifications)}
              className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                config.emailNotifications ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                  config.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-black">Alertes système</div>
              <div className="text-sm text-gray">Notifications critiques</div>
            </div>
            <button
              onClick={() => onChange('systemAlerts', !config.systemAlerts)}
              className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
                config.systemAlerts ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
                  config.systemAlerts ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Status général */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle size={16} className="text-green-600" />
          <h4 className="font-medium text-green-900">État du système</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className={`font-medium ${backupStatus.status === 'success' ? 'text-green-600' : 'text-orange-600'}`}>
              Sauvegardes
            </div>
            <div className="text-green-800">
              {backupStatus.status === 'success' ? 'OK' : 'Attention'}
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-green-600">Base de données</div>
            <div className="text-green-800">Opérationnelle</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-green-600">APIs</div>
            <div className="text-green-800">Connectées</div>
          </div>
          <div className="text-center">
            <div className={`font-medium ${config.maintenanceMode ? 'text-red-600' : 'text-green-600'}`}>
              Service
            </div>
            <div className="text-green-800">
              {config.maintenanceMode ? 'Maintenance' : 'En ligne'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MaintenanceSettings;