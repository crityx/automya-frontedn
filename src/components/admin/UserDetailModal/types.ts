export interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onCreditAction: (action: 'add' | 'remove', amount: number, reason: string) => void;
}

export interface CreditHistoryItem {
  date: string;
  type: 'spent' | 'added';
  amount: number;
  balance: number;
  activity: string;
}

export interface PaymentHistoryItem {
  id: string;
  date: string;
  type: 'credit_purchase' | 'subscription';
  description: string;
  amount: number;
  currency: string;
  status: 'completed' | 'failed';
  paymentMethod: string;
  transactionId: string;
  credits: number;
  failureReason?: string;
}

export interface ActivityLogItem {
  date: string;
  action: string;
  details: string;
  status: 'success' | 'info' | 'error';
}

export interface RecentPost {
  id: string;
  date: string;
  title: string;
  type: string;
  engagement: {
    views: number;
    likes: number;
    comments: number;
  };
  credits: number;
}

export interface RecentMessage {
  id: string;
  date: string;
  type: string;
  count: number;
  scenario: string;
  success: number;
  credits: number;
}

export interface UserStats {
  totalPosts: number;
  totalMessages: number;
  totalConnections: number;
  totalLeads: number;
  avgEngagement: number;
  totalSpent: number;
  joinDate: string;
  lastActive: string;
}

export interface UserDetails {
  creditHistory: CreditHistoryItem[];
  paymentHistory: PaymentHistoryItem[];
  activityLogs: ActivityLogItem[];
  recentPosts: RecentPost[];
  recentMessages: RecentMessage[];
  stats: UserStats;
}