'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SellerAnalytics from '@/components/admin/SellerAnalytics';
import { Users, CreditCard, BarChart3, UserPlus, Settings, TrendingUp } from 'lucide-react';

const adminMenuSections = [
  {
    title: 'Gestion Utilisateurs',
    items: [
      {
        name: 'Mes utilisateurs',
        href: '/admin',
        icon: <Users className="w-5 h-5" />
      },
      {
        name: 'Créer un compte',
        href: '/admin/create',
        icon: <UserPlus className="w-5 h-5" />
      },
      {
        name: 'Gestion crédits',
        href: '/admin/credits',
        icon: <CreditCard className="w-5 h-5" />
      },
      {
        name: 'Dashboard vendeur',
        href: '/admin/seller-dashboard',
        icon: <BarChart3 className="w-5 h-5" />
      }
    ]
  },
  {
    title: 'Administration',
    items: [
      {
        name: 'Gestion vendeurs',
        href: '/admin/sellers',
        icon: <Users className="w-5 h-5" />
      },
      {
        name: 'Stats globales',
        href: '/admin/stats',
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        name: 'Configuration',
        href: '/admin/config',
        icon: <Settings className="w-5 h-5" />
      }
    ]
  }
];

export default function SellerDashboardPage() {
  const [userRole] = useState<'user' | 'seller' | 'admin'>('admin');
  
  const getMenuSections = () => {
    if (userRole === 'seller') {
      return adminMenuSections.filter(section => section.title === 'Gestion Utilisateurs');
    }
    return adminMenuSections;
  };

  return (
    <DashboardLayout 
      leftMenuSections={getMenuSections()}
      videoTitle="Analytics de performance vendeur"
      videoUrl="https://example.com/seller-analytics-tutorial"
    >
      <SellerAnalytics />
    </DashboardLayout>
  );
}