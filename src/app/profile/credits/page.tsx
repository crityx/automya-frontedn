'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import CreditsPurchase from '@/components/profile/CreditsPurchase';
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

export default function CreditsPage() {
  return (
    <DashboardLayout 
      leftMenuSections={profileMenuSections}
      videoTitle="Gestion des crédits"
      videoUrl="https://example.com/credits-tutorial"
    >
      <CreditsPurchase />
    </DashboardLayout>
  );
}