'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import AnalyticsOverview from '@/components/dashboard/AnalyticsOverview';
import { BarChart3, Users, TrendingUp, MessageSquare } from 'lucide-react';

const dashboardMenuSections = [
  {
    title: 'Analytics',
    items: [
      {
        name: 'Vue d\'ensemble',
        href: '/dashboard',
        icon: <BarChart3 className="w-5 h-5" />
      },
      {
        name: 'Leads captés',
        href: '/dashboard/leads',
        icon: <Users className="w-5 h-5" />
      },
      {
        name: 'Engagement',
        href: '/dashboard/engagement',
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        name: 'Messages',
        href: '/dashboard/messages',
        icon: <MessageSquare className="w-5 h-5" />
      }
    ]
  }
];

export default function DashboardPage() {
  return (
    <DashboardLayout 
      leftMenuSections={dashboardMenuSections}
      videoTitle="Comprendre vos analytics"
      videoUrl="https://example.com/analytics-tutorial"
    >
      <AnalyticsOverview />
    </DashboardLayout>
  );
}