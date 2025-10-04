'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';

const SellerDashboard = dynamic(() => import('@/components/admin/SellerDashboard'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>,
  ssr: false
});
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

export default function AdminPage() {
  // Simuler le rôle utilisateur (en prod, cela viendrait du context/auth)
  const [userRole] = useState<'user' | 'seller' | 'admin'>('admin');
  
  // Filtrer les sections du menu selon le rôle
  const getMenuSections = () => {
    if (userRole === 'seller') {
      // Les vendeurs n'ont accès qu'à la gestion utilisateurs
      return adminMenuSections.filter(section => section.title === 'Gestion Utilisateurs');
    }
    // Les admins ont accès à tout
    return adminMenuSections;
  };

  return (
    <DashboardLayout 
      leftMenuSections={getMenuSections()}
    >
      <SellerDashboard userRole={userRole} />
    </DashboardLayout>
  );
}