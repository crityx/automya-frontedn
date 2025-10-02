'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PlatformConfig from '@/components/admin/PlatformConfig';
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

export default function ConfigPage() {
  // Seuls les admins peuvent accéder à cette page
  const [userRole] = useState<'user' | 'seller' | 'admin'>('admin');

  return (
    <DashboardLayout 
      leftMenuSections={adminMenuSections}
      videoTitle="Configuration de la plateforme"
      videoUrl="https://example.com/platform-config-tutorial"
    >
      <PlatformConfig />
    </DashboardLayout>
  );
}