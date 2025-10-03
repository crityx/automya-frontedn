'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import AnalyticsOverview from '@/components/dashboard/AnalyticsOverview';
import { ChartBar, Users, TrendUp, ChatCircle } from 'phosphor-react';

const dashboardMenuSections = [
  {
    title: 'Analytics',
    items: [
      {
        name: 'Vue d\'ensemble',
        href: '/dashboard',
        icon: <ChartBar size={20} />
      },
      {
        name: 'Leads captés',
        href: '/dashboard/leads',
        icon: <Users size={20} />
      },
      {
        name: 'Engagement',
        href: '/dashboard/engagement',
        icon: <TrendUp size={20} />
      },
      {
        name: 'Messages',
        href: '/dashboard/messages',
        icon: <ChatCircle size={20} />
      }
    ]
  }
];

export default function DashboardPage() {
  return (
    <DashboardLayout 
      leftMenuSections={dashboardMenuSections}
    >
      <AnalyticsOverview />
    </DashboardLayout>
  );
}