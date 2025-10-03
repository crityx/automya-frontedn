'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import LeadsAnalytics from '@/components/dashboard/LeadsAnalytics';
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

export default function LeadsPage() {
  return (
    <DashboardLayout 
      leftMenuSections={dashboardMenuSections}
      videoTitle="Analyser vos leads"
      videoUrl="https://example.com/leads-analytics-tutorial"
    >
      <LeadsAnalytics />
    </DashboardLayout>
  );
}