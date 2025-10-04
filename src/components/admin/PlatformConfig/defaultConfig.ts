import { PlatformConfigData } from './types';

export const defaultConfig: PlatformConfigData = {
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
};