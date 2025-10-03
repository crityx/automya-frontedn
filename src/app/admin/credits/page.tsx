'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CreditsManager from '@/components/admin/CreditsManager';
import { Users, CreditCard, ChartBar, UserPlus, Gear, TrendUp } from 'phosphor-react';

const adminMenuSections = [
  {
    title: 'Gestion Utilisateurs',
    items: [
      {
        name: 'Mes utilisateurs',
        href: '/admin',
        icon: <Users size={20} />
      },
      {
        name: 'Créer un compte',
        href: '/admin/create',
        icon: <UserPlus size={20} />
      },
      {
        name: 'Gestion crédits',
        href: '/admin/credits',
        icon: <CreditCard size={20} />
      },
      {
        name: 'Dashboard vendeur',
        href: '/admin/seller-dashboard',
        icon: <ChartBar size={20} />
      }
    ]
  },
  {
    title: 'Administration',
    items: [
      {
        name: 'Gestion vendeurs',
        href: '/admin/sellers',
        icon: <Users size={20} />
      },
      {
        name: 'Stats globales',
        href: '/admin/stats',
        icon: <TrendUp size={20} />
      },
      {
        name: 'Configuration',
        href: '/admin/config',
        icon: <Gear size={20} />
      }
    ]
  }
];

export default function CreditsPage() {
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
      videoTitle="Gérer les crédits utilisateurs"
      videoUrl="https://example.com/credits-management-tutorial"
    >
      <CreditsManager />
    </DashboardLayout>
  );
}