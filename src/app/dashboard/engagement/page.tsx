'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import EngagementAnalytics from '@/components/dashboard/EngagementAnalytics';
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

export default function EngagementPage() {
  return (
    <DashboardLayout 
      leftMenuSections={dashboardMenuSections}
      videoTitle="Optimiser votre engagement"
      videoUrl="https://example.com/engagement-tutorial"
    >
      <EngagementAnalytics />
    </DashboardLayout>
  );
}