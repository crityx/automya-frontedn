'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import SubscriptionInfo from '@/components/profile/SubscriptionInfo';
import { User, CreditCard, Gift, Settings, Globe, BarChart3 } from 'lucide-react';

const profileMenuSections = [
  {
    title: 'Profil',
    items: [
      {
        name: 'Mes infos',
        href: '/profil',
        icon: <User className="w-5 h-5" />
      },
      {
        name: 'Abonnement',
        href: '/profil/abonnement',
        icon: <CreditCard className="w-5 h-5" />
      },
      {
        name: 'Acheter des crédits',
        href: '/profil/credits',
        icon: <Gift className="w-5 h-5" />
      },
      {
        name: 'Parrainage',
        href: '/profil/parrainage',
        icon: <Gift className="w-5 h-5" />
      },
      {
        name: 'Paramètres',
        href: '/profil/parametres',
        icon: <Settings className="w-5 h-5" />
      },
      {
        name: 'Langue',
        href: '/profil/langue',
        icon: <Globe className="w-5 h-5" />
      },
      {
        name: 'Dashboard global',
        href: '/profil/dashboard',
        icon: <BarChart3 className="w-5 h-5" />
      }
    ]
  }
];

export default function AbonnementPage() {
  return (
    <DashboardLayout 
      leftMenuSections={profileMenuSections}
      videoTitle="Gestion d'abonnement"
      videoUrl="https://example.com/subscription-tutorial"
    >
      <SubscriptionInfo />
    </DashboardLayout>
  );
}