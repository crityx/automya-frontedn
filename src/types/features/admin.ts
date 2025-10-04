export interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'seller' | 'admin';
  credits: number;
  subscription: 'free' | 'basic' | 'premium';
  status: 'active' | 'suspended' | 'pending';
  linkedinConnected: boolean;
  company?: string;
  phone?: string;
  createdAt: string;
  lastActiveAt: string;
  totalSpent: number;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: 'spent' | 'added' | 'purchased' | 'refunded';
  amount: number;
  balanceAfter: number;
  reason: string;
  adminId?: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface PlatformConfig {
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  maxCreditsPerUser: number;
  defaultCredits: number;
  apiSettings: {
    rateLimit: number;
    timeout: number;
    retryAttempts: number;
  };
  featureFlags: Record<string, boolean>;
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalCreditsSpent: number;
  revenue: {
    monthly: number;
    yearly: number;
  };
  engagement: {
    averageViews: number;
    averageLikes: number;
    averageComments: number;
  };
}

export interface SellerMetrics {
  id: string;
  name: string;
  totalSales: number;
  commission: number;
  customersReferred: number;
  conversionRate: number;
  lastSaleAt?: string;
}