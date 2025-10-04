export interface Seller {
  id: string;
  name: string;
  email: string;
  company: string;
  usersCount: number;
  monthlyRevenue: number;
  totalRevenue: number;
  commission: number;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  lastLogin: string;
  performance: 'excellent' | 'good' | 'average' | 'new';
}

export interface NewSeller {
  name: string;
  email: string;
  company: string;
  commission: number;
}

export interface SellersStats {
  totalSellers: number;
  activeSellers: number;
  totalRevenue: number;
  avgCommission: number;
}