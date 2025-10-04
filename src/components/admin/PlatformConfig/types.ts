export interface PlatformConfigData {
  // Paramètres généraux
  platformName: string;
  platformUrl: string;
  supportEmail: string;
  maxUsersPerSeller: number;
  
  // Paramètres de crédits
  defaultCredits: number;
  premiumCredits: number;
  enterpriseCredits: number;
  creditPrice: number; // €/crédit
  
  // Paramètres de commissions
  defaultCommission: number;
  premiumCommission: number;
  topSellerCommission: number;
  
  // Limites LinkedIn
  maxConnectionsPerDay: number;
  maxMessagesPerDay: number;
  maxPostsPerDay: number;
  delayBetweenActions: number; // secondes
  
  // Paramètres de sécurité
  sessionTimeout: number; // heures
  maxLoginAttempts: number;
  passwordMinLength: number;
  enableTwoFA: boolean;
  
  // Notifications
  emailNotifications: boolean;
  systemAlerts: boolean;
  maintenanceMode: boolean;
  
  // API & Intégrations
  linkedinApiKey: string;
  openaiApiKey: string;
  stripeApiKey: string;
  
  // Maintenance
  lastBackup: string;
  dbSize: string;
  activeConnections: number;
}

export interface ConfigSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}