'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SellersManagement from '@/components/admin/SellersManagement';
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

export default function SellersPage() {
  // Seuls les admins peuvent accéder à cette page
  const [userRole] = useState<'user' | 'seller' | 'admin'>('admin');

  return (
    <DashboardLayout 
      leftMenuSections={adminMenuSections}
      videoTitle="Gérer vos vendeurs partenaires"
      videoUrl="https://example.com/sellers-management-tutorial"
    >
      <SellersManagement />
    </DashboardLayout>
  );
}