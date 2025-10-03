'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import ReferralProgram from '@/components/profile/ReferralProgram';
import { User, CreditCard, Gift, Settings, Globe, Users } from 'lucide-react';

const profileMenuSections = [
  {
    title: 'Profil',
    items: [
      {
        name: 'Mes infos',
        href: '/profile',
        icon: <User className="w-5 h-5" />
      },
      {
        name: 'Abonnement',
        href: '/profile/subscription',
        icon: <CreditCard className="w-5 h-5" />
      },
      {
        name: 'Acheter des crédits',
        href: '/profile/credits',
        icon: <Gift className="w-5 h-5" />
      },
      {
        name: 'Parrainage',
        href: '/profile/referral',
        icon: <Gift className="w-5 h-5" />
      },
      {
        name: 'Paramètres',
        href: '/profile/settings',
        icon: <Settings className="w-5 h-5" />
      },
      {
        name: 'Langue',
        href: '/profile/language',
        icon: <Globe className="w-5 h-5" />
      },
      {
        name: 'Équipe',
        href: '/profile/team',
        icon: <Users className="w-5 h-5" />
      }
    ]
  }
];

export default function ParrainagePage() {
  return (
    <DashboardLayout 
      leftMenuSections={profileMenuSections}
      videoTitle="Programme de parrainage"
      videoUrl="https://example.com/referral-tutorial"
    >
      <ReferralProgram />
    </DashboardLayout>
  );
}