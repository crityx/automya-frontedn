'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import ConversationObjectives from '@/components/messages/ConversationObjectives';
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

export default function ObjectifsPage() {
  return (
    <DashboardLayout 
      leftMenuSections={messagesMenuSections}
    >
      <ConversationObjectives />
    </DashboardLayout>
  );
}