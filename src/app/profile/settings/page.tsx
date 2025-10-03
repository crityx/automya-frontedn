'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileSettings from '@/components/profile/ProfileSettings';
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

export default function ParametresPage() {
  return (
    <DashboardLayout 
      leftMenuSections={profileMenuSections}
    >
      <ProfileSettings />
    </DashboardLayout>
  );
}