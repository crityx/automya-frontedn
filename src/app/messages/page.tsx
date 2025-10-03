'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import AIConfiguration from '@/components/messages/AIConfiguration';
import { Robot, Target, ChartBar } from 'phosphor-react';

const messagesMenuSections = [
  {
    title: 'IA Conversationnelle',
    items: [
      {
        name: 'Configuration IA',
        href: '/messages',
        icon: <Robot size={20} />
      },
      {
        name: 'Objectif de conversation',
        href: '/messages/objectifs',
        icon: <Target size={20} />
      },
      {
        name: 'Dashboard des messages',
        href: '/messages/dashboard',
        icon: <ChartBar size={20} />
      }
    ]
  }
];

export default function MessagesPage() {
  return (
    <DashboardLayout 
      leftMenuSections={messagesMenuSections}
    >
      <AIConfiguration />
    </DashboardLayout>
  );
}