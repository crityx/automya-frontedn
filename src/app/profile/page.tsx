'use client';

import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ProfileInfo = dynamic(() => import('@/components/profile/ProfileInfo'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false
});
import { User, CreditCard, Gift, Gear, Globe, Users } from 'phosphor-react';

const profileMenuSections = [
  {
    title: 'Profil',
    items: [
      {
        name: 'Mes infos',
        href: '/profile',
        icon: <User size={20} />
      },
      {
        name: 'Abonnement',
        href: '/profile/subscription',
        icon: <CreditCard size={20} />
      },
      {
        name: 'Acheter des crédits',
        href: '/profile/credits',
        icon: <Gift size={20} />
      },
      {
        name: 'Parrainage',
        href: '/profile/referral',
        icon: <Gift size={20} />
      },
      {
        name: 'Paramètres',
        href: '/profile/settings',
        icon: <Gear size={20} />
      },
      {
        name: 'Langue',
        href: '/profile/language',
        icon: <Globe size={20} />
      },
      {
        name: 'Équipe',
        href: '/profile/team',
        icon: <Users size={20} />
      }
    ]
  }
];

export default function ProfilPage() {
  return (
    <DashboardLayout 
      leftMenuSections={profileMenuSections}
    >
      <ProfileInfo />
    </DashboardLayout>
  );
}